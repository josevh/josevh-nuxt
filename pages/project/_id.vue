<template>
    <div class="content">
        <div class="empty" v-if="!document">Unable to locate requested project.</div>
        <div v-else>
            <h1 class="title">{{document.data.title[0].text}}</h1>

            <div class="rich-text"
                 v-html="prismicDom.RichText.asHtml(document.data.description, linkResolver, htmlSerializer)"></div>
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
        prismicDom: PrismicDom,
        linkResolver: LinkResolver
      }
    },
    mixins: [htmlSerializer],
    computed: {
      document () {
        return this.$store.getters.docByUID(this.$route.params.id)
      },
      documentImageGalleryImages () {
        if (!this.document || !this.document.data.image_gallery || !Array.isArray(this.document.data.image_gallery)) return []

        return this.document.data.image_gallery
          .filter(function (item) {
            return typeof item.image_gallery_item_image === 'object'
              && typeof item.image_gallery_item_image.url === 'string'
              && item.image_gallery_item_image.url !== ''
          })
          .map(function (item) {
            return {
              title: item.image_gallery_item_caption.length > 0 ? item.image_gallery_item_caption[0].text : '',
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
