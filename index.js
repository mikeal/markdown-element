const ZComponent = require('zcomponent')
const marked = require('marked')
const loadcss = require('loadcss')
const highlight = require('./highlight.min.js')
// const highlight = require('highlight.js')

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

function toggleAttribute (el, attr, isOn) {
  if (isOn) {
    el.setAttribute(attr, '')
  } else {
    el.removeAttribute(attr)
  }
}

class MarkdownElement extends ZComponent {
  constructor () {
    super()
    setTimeout(() => {
      this.render()
    }, 0)
  }

  get noGFM () { return this.hasAttribute('nogfm') }
  set noGFM (value) { toggleAttribute(this, 'nogfm', value) }

  get noTables () { return this.hasAttribute('notables') }
  set noTables (value) { toggleAttribute(this, 'notables', value) }

  get breaks () { return this.hasAttribute('breaks') }
  set breaks (value) { toggleAttribute(this, 'breaks', value) }

  get noHighlight () { return this.hasAttribute('nohighlight') }
  set noHighlight (value) { toggleAttribute(this, 'nohighlight', value) }

  get pedantic () { return this.hasAttribute('pedantic') }
  set pedantic (value) { toggleAttribute(this, 'pedantic', value) }

  get noSmartLists () { return this.hasAttribute('nosmartlists') }
  set noSmartLists (value) { toggleAttribute(this, 'nosmartlists', value) }

  get smartyPants () { return this.hasAttribute('smartypants') }
  set smartyPants (value) { toggleAttribute(this, 'smartypants', value) }

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
        gfm: !this.noGFM,
        tables: !this.noTables,
        breaks: this.breaks,
        pedantic: this.pedantic,
        highlight: !this.noHighlight,
        sanitize: false,
        smartLists: !this.noSmartLists,
        smartypants: this.smartyPants
      }
      if (opts.highlight) {
        delete opts.highlight
      }
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
