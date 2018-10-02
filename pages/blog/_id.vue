<template>
    <div class="content" v-cloak>
        <div class="empty" v-if="!document">Unable to locate requested project.</div>
        <div v-else>
            <h2 class="title">{{document.title[0].text}}</h2>
            <div v-if="documentDateStr" class="timestamp">
                <small>{{ documentDateStr }}</small>
            </div>
            <div class="rich-text"
                 v-html="prismicDom.RichText.asHtml(document.content, linkResolver, htmlSerializer)"></div>
            <div class="image-gallery" v-if="documentImageGalleryImages.length > 0">
                <gallery :images="documentImageGalleryImages" :index="imageGalleryIndex"
                         @close="imageGalleryIndex = null"></gallery>
                <div class="thumbnail"
                     @click="imageGalleryIndex = 0"
                     :style="{ backgroundImage: 'url(' + documentImageGalleryImages[0] + ')', width: '300px', height: '200px' }"
                ></div>
            </div>
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
        linkResolver: LinkResolver,
        imageGalleryIndex: null
      }
    },
    mixins: [htmlSerializer],
    computed: {
      documentDate () {
        if (!this.document) return null

        return this.prismicDom.Date(this.document.publish_date)
      },
      documentDateStr () {
        if (!this.documentDate) return ''
        return this.documentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      },
      documentImageGalleryImages () {
        return this.document.image_gallery
          .filter(function (item) {
            return item.image_gallery_item_image.url.trim() !== ''
          })
          .map(function (item) {
            return item.image_gallery_item_image.url
          })
      }
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
            margin-top: 1.5rem;
            margin-bottom: 0;
        }

        .timestamp {
            color: #999999;
            font-family: 'Oswald', sans-serif;
        }
    }
</style>
<style lang="scss">
    .content .block-img {
        text-align: center;

        img {
            max-width: 100%;
            height: auto;
        }
    }
</style>
