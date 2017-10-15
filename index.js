const gza = require('gza')
const marked = require('marked')
const loadcss = require('loadcss')
const highlight = require('./highlight.min.js')

marked.setOptions({
  highlight: code => highlight.highlightAuto(code).value
})

let highlightCss = '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@latest/build/styles/default.min.css'

loadcss(highlightCss)

const clean = str => {
  let split = str.split('\n')
  let i = 0
  if (!split[i].length) {
    i += 1
  }
  let firstline = split[i]
  i = 0
  while (i < firstline.length && firstline[i] === ' ') {
    i++
  }
  return split.map(line => {
    let x = 0
    while (x < i && x < line.length && line[x] === ' ') {
      x++
    }
    return line.slice(x)
  }).join('\n')
}

const cssCDN = `https://cdn.jsdelivr.net/npm/highlight.js@latest/styles/`

const render = (settings, innerHTML) => {
  loadcss(cssCDN + settings.loadcss)
  // TODO: slot css w/ a transform.

  let opts = {
    gfm: !settings.noGFM,
    tables: !settings.noTables,
    breaks: settings.breaks,
    pedantic: settings.pedantic,
    highlight: !settings.noHighlight,
    sanitize: !settings.noSanitize,
    smartLists: !settings.noSmartLists,
    smartypants: settings.smartyPants
  }
  if (opts.highlight) {
    delete opts.highlight
  }
  if (!innerHTML.length) return ''
  return marked(clean(innerHTML), opts)
}

const defaults = {
  noGFM: false,
  noTables: false,
  breaks: false,
  pedantic: false,
  noHighlight: false,
  noSanitize: false,
  noSmartLists: false,
  smartypants: false,
  loadcss: 'default.css'
}
module.exports = gza`
<mark-down ${defaults}>
  ${render}
</mark-down>
`
