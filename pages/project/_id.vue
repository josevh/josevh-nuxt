<template>
    <div class="content">
        <div class="empty" v-if="!document">Unable to locate requested project.</div>
        <div v-else>
            <h2 class="title">{{document.title[0].text}}</h2>
            <div class="rich-text"
                 v-html="prismicDom.RichText.asHtml(document.description, linkResolver, htmlSerializer)"></div>
        </div>
    </div>
</template>

<script>

  const Prismic = require('prismic-javascript')
  const PrismicDom = require('prismic-dom')
  import LinkResolver from '~~/LinkResolver'
  import { htmlSerializer } from '~~/components/mixins/PrismicHtmlSerializer'

  export default {
    data () {
      return {
        document: null,
        prismicDom: PrismicDom,
        linkResolver: LinkResolver
      }
    },
    mixins: [htmlSerializer],
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
