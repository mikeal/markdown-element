/* globals same */
const puppeteer = require('puppeteer')
const { test } = require('tap')

const path = require('path')
const bl = require('bl')
const browserify = require('browserify')

const bundle = new Promise((resolve, reject) => {
  var b = browserify()
  b.add(path.join(__dirname, '..', 'index.js'))
  b.bundle().pipe(bl((err, buff) => {
    if (err) return reject(err)
    resolve(buff.toString())
  }))
})

const index = async inner => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      ${await inner}
    </body>
  </html>
  `
}

let browser

test('setup', async t => {
  browser = await puppeteer.launch()
  t.end()
})

const getPage = async (t, inner) => {
  const page = await browser.newPage()
  page.on('console', msg => console.log(msg.text))
  page.on('error', err => { throw err })
  page.on('pageerror', msg => { throw new Error(`Page Error: ${msg}`) })
  await page.setContent(await index(inner))
  await page.addScriptTag({content: await bundle})
  page.browser = browser
  let same = (x, y) => t.same(x, y)
  await page.exposeFunction('same', (x, y) => {
    same(x, y)
  })
  return page
}

test('basic', async t => {
  t.plan(1)
  let page = await getPage(t, `<mark-down># h1</mark-down>`)
  await page.waitFor('mark-down render')
  await page.evaluate(async () => {
    let expects = '<h1 id="h1">h1</h1>'
    let clean = str => str.replace(/^\s+|\s+$/g, '')
    let render = document.querySelector('mark-down render')
    same(clean(render.innerHTML), expects)
  })
  await page.close()
})

test('noGFM', async t => {
  t.plan(1)
  let page = await getPage(t, `
  <mark-down noGFM>
    \`\`\`javascript
    test = "asdf"
    \`\`\`
  </mark-down>`)
  await page.waitFor('mark-down render')
  await page.evaluate(async () => {
    let expects = '<p><code>javascript\ntest = "asdf"</code></p>'
    let clean = str => str.replace(/^\s+|\s+$/g, '')
    let render = document.querySelector('mark-down render')
    same(clean(render.innerHTML), expects)
  })
  await page.close()
})

test('teardown', async t => {
  await browser.close()
  t.end()
})
