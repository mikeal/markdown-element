const ZComponent = require('zcomponent')
const marked = require('marked')
const loadcss = require('loadcss')
const highlight = require('highlight.js')

marked.setOptions({
  highlight: code => highlight.highlightAuto(code).value
})

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

const markedProperties = [
  'gfm',
  'tables',
  'breaks',
  'pedantic',
  'smartLists',
  'smartypants'
]

class MarkdownElement extends ZComponent {
  constructor () {
    super()
    setTimeout(() => {
      this.render()
    }, 0)
  }
  render () {
    if (this._rendering) return this._rendering
    // clear old render
    this._rendering = new Promise(resolve => {
      this._rendering = null

      // TODO: convert all this CSS to slotted CSS.
      let css = this.getAttribute('loadcss') || 'default.css'
      loadcss(`https://cdn.jsdelivr.net/npm/highlight.js@latest/styles/` + css)

      let render = this.querySelector('[slot="render"]')
      if (!render) {
        render = document.createElement('div')
        render.classList.add('markdown-render')
        render.setAttribute('slot', 'render')
        this.appendChild(render)
      }

      let opts = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      }
      markedProperties.forEach(key => {
        if (this.getAttribute(key)) {
          opts[key] = JSON.parse(this.getAttribute(key))
        }
      })
      if (this.getAttribute('highlight') === 'false') opts.highlight = false
      render.innerHTML = marked(clean(this.textContent), opts)
    })
    return this._rendering
  }
  get shadow () {
    return `
    <style>
    :host {
      margin: 0 0 0 0;
      padding: 0 0 0 0;
    }
    </style>
    <slot name="render"></slot>
    `
  }
}

window.customElements.define('mark-down', MarkdownElement)
