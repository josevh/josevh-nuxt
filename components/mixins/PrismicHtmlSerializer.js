import { highlightAuto } from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export const htmlSerializer = {
  methods: {
    htmlSerializer (type, element, content, children) {
      let Elements = require('prismic-dom').RichText.Elements
      switch (type) {
        case Elements.preformatted:
          // prep preformatted text for highlighting
          // @link https://prismic.io/docs/javascript/templating/rich-text
          return `<pre><code class="hljs">${highlightAuto(element.text).value}</code></pre>`
        default:
          return null
      }
    }
  }
}
