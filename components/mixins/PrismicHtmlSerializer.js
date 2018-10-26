import { highlightAuto } from 'highlight.js'
// css imported in ~/layouts/default.vue

export const htmlSerializer = {
  methods: {
    htmlSerializer (type, element, content, children) {
      let Elements = require('prismic-dom').RichText.Elements
      switch (type) {
        case Elements.preformatted:
          // prep preformatted text for highlighting
          // @link https://prismic.io/docs/javascript/templating/rich-text
          let langSubset = ['plaintext', 'php', 'javascript', 'python', 'css', 'json', 'markdown', 'ruby', 'shell', 'xml']
          let highlight = highlightAuto(element.text, langSubset)

          return `<pre><code class="hljs ${highlight.language}">${highlight.value}</code></pre>`
        default:
          return null
      }
    }
  }
}
