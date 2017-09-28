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
  <script src="https://cdn.jsdelivr.net/npm/markdown-element@latest/dist/markdown-elements.min.js"></script>
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

## Attributes

The following element attributes can be used to change the render settings.

* **gfm**: defaults to true. Enable GitHub flavored markdown.
* **tables**: defaults to true. Enable GFM tables. This option requires the gfm option to be true.
* **breaks**: defaults to false. Enable GFM line breaks. This option requires the gfm option to be true.
* **highlight**: defaults to true. Enables syntax highlighting.
* **pedantic**: defaults to false. Conform to obscure parts of markdown.pl as much as possible. Don't fix any of the original markdown bugs or poor behavior.
* **smartLists**: defaults to true. Use smarter list behavior than the original markdown. May eventually be default with the old behavior moved into pedantic.
* **smartypants**: defaults to false. Use "smart" typograhic punctuation for things like quotes and dashes.

Example:

```html
<mark-down highlight=false>
  # h1

  ```javascript
  const highlights = false
  // this will show up withou syntax highlights.
  ```
</mark-down>
```

### Bundling

If you want to build the component into the JavaScript bundle of your app
you can do so easily, but you'll need to handle loading a WebComponents
polyfill on your own.
