<template>
    <div class="content" v-cloak>
        <div class="empty" v-if="!document">Unable to locate requested project.</div>
        <div v-else>
            <h2 class="title">{{document.title[0].text}}</h2>
            <div v-if="documentDateStr" class="timestamp">
                <small>{{ documentDateStr }}</small>
            </div>
            <div class="rich-text" v-html="prismicDom.RichText.asHtml(document.content, linkResolver)"></div>
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
    computed: {
      documentDate () {
        if (!this.document) return null

        return this.prismicDate(this.document.publish_date)
      },
      documentDateStr () {
        if (!this.documentDate) return ''
        return this.documentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    },
    mounted () {
      // highlight code
      document.querySelectorAll('.rich-text pre').forEach(function (elem) {
        // pre => pre>code
        let contents = elem.textContent
        elem.innerHTML = ''

        let code = document.createElement('code')
        code.innerHTML = highlightAuto(contents).value
        code.classList.add('hljs')

        elem.appendChild(code)
      })
    },
    asyncData ({params, error, payload, store}) {
      if (payload) {
        return {document: payload}
      } else {
        return Prismic.getApi(store.state.prismicApiEndpoint)
          .then((api) => {
            return api.getByUID('blog_post', params.id)
          })
          .then((response) => {
            return {document: response.data}
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .content {
        .title {
            margin-bottom: 0;
        }

        .timestamp {
            color: #999999;
            font-family: 'Oswald', sans-serif;
        }

    }
</style>
