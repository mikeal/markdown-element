# Markdown Element

HTML Element for markdown content.

<p>
  <a href="https://www.patreon.com/bePatron?u=880479">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" height="40px" />
  </a>
</p>

Usage:

```html
<body>
  <script src="https://cdn.jsdelivr.net/npm/markdown-element/dist/markdown-element.min.js"></script>
  <mark-down>
    ## h2

    * test
      * test2

    ```javascript
    let x = 'asdf'

    class Text {
      constructor() {

      }
    }
    ```
  </mark-down>
</body>
```

## Attributes/properties

The following element properties can be used to change the render settings. They can be set either from JavaScript or from HTML.

* **noGFM**: Disables GitHub flavored markdown (GFM).
* **noTables**: Disables GFM tables. This has no effect if `noGFM` is true.
* **breaks**: Enable GFM line breaks. This has no effect if `noGFM` is true.
* **noHighlight**: Disables syntax highlighting.
* **pedantic**: Conform to obscure parts of markdown.pl as much as possible. Don't fix any of the original markdown bugs or poor behavior.
* **noSmartLists**: Disable smarter list behavior than the original markdown. May eventually be default with the old behavior moved into pedantic.
* **smartyPants**: Use "smart" typographic punctuation for things like quotes and dashes.

Examples:

```html
<mark-down notables pedantic>
    # h1

    * test
</mark-down>
```

```js
let marked = document.createElement('mark-down')
marked.noGFM = true
marked.smartyPants = true
document.body.appendChild(marked)
```

## Rendering

The rendered markdown is placed in a `<render>` element.

```html
<mark-down>
  <render>
    <h1>h1</h1>
    <ul>
      <li>test</li>
    </ul>
  </render>
</mark-down>
```

### Bundling

If you want to build the component into the JavaScript bundle of your app
you can do so easily, but you'll need to handle loading a WebComponents
polyfill on your own.

