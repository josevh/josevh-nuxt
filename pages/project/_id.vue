<template>
    <div class="content">
        <div class="empty" v-if="!document">Unable to locate requested project.</div>
        <div v-else>
            <h2 class="title">{{document.title[0].text}}</h2>
            <div class="rich-text"
                 v-html="prismicDom.RichText.asHtml(document.description, linkResolver, htmlSerializer)"></div>
            <div class="image-gallery" v-if="documentImageGalleryImages.length > 0">
                <no-ssr placeholder="Loading...">
                    <gallery :images="documentImageGalleryImages"
                             :index="imageGalleryIndex"
                             ref="imageGalleryWrap"
                             @onopen="onImageGalleryOpen"
                             @close="imageGalleryIndex = null"></gallery>
                    <div class="thumbnail"
                         @click="imageGalleryIndex = 0"
                         :style="{ backgroundImage: 'url(' + documentImageGalleryImages[0].href + ')', width: '300px', height: '200px' }"
                    ></div>
                </no-ssr>
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
        linkResolver: LinkResolver
      }
    },
    mixins: [htmlSerializer],
    computed: {
      documentImageGalleryImages () {
        return this.document.image_gallery
          .filter(function (item) {
            return item.image_gallery_item_image.url.trim() !== ''
          })
          .map(function (item) {
            return {
              title: item.image_gallery_item_caption[0].text,
              href: item.image_gallery_item_image.url
            }
          })
      }
    },
    methods: {
      onImageGalleryOpen () {
        // override 'X' for '×'
        this.$refs.imageGalleryWrap.$el.querySelector('.close').innerHTML = '×';
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

<style lang="scss" scoped>
    .content > .title {
        margin: 1.5rem 0;
    }
</style>
<style lang="scss">
    .image-gallery {
        .blueimp-gallery a.close {
            font-family: sans-serif;
            border-bottom: none;
        }
        .thumbnail {
            margin: 0 auto;
            width: 300px;
            height: 200px;
            border: 1px solid #666;
            box-shadow: 10px 8px 1px 1px #b1b1b1, 18px 14px 1px 3px #ccc;
            transition: box-shadow 250ms, border-width 125ms;
            background-clip: padding-box;

            &:hover {
                cursor: pointer;
                box-shadow: none;
                border-width: 3px;
            }
        }
    }
</style>
