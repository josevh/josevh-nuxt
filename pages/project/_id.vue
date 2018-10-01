<template>
    <div class="content">
        <div class="empty" v-if="!document">Unable to locate requested project.</div>
        <div v-else>
            <h2 class="title">{{document.title[0].text}}</h2>
            <div class="rich-text" v-html="prismicDom.RichText.asHtml(document.description, linkResolver, htmlSerializer)"></div>
        </div>
    </div>
</template>

<script>

  const Prismic = require('prismic-javascript')
  const PrismicDom = require('prismic-dom')
  import LinkResolver from '~~/LinkResolver'
  import { Date } from 'prismic-dom'
  import { highlightAuto } from 'highlight.js'
  import 'highlight.js/styles/monokai-sublime.css'

  export default {
    data () {
      return {
        document: null,
        prismicDom: PrismicDom,
        linkResolver: LinkResolver,
        prismicDate: Date
      }
    },
    methods: {
      htmlSerializer (type, element, content, children) {
        let Elements = this.prismicDom.RichText.Elements
        switch (type) {
          case Elements.preformatted:
            // prep preformatted text for highlighting
            // @link https://prismic.io/docs/javascript/templating/rich-text
            return '<pre><code class="hljs">' + highlightAuto(element.text).value + '</code></pre>';
          default:
            return null;
        }
      }
    },
    asyncData ({params, error, payload, store}) {
      if (payload) {
        return {document: payload}
      } else {
        return Prismic.getApi(store.state.prismicApiEndpoint)
          .then((api) => {
            return api.getByUID('project', params.id)
          })
          .then((response) => {
            return {document: response.data}
          })
      }
    }
  }
</script>
