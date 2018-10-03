<template>
    <div class="content" v-cloak>
        <div class="empty" v-if="!document">Unable to locate requested project.</div>
        <div v-else>
            <h2 class="title">{{document.title[0].text}}</h2>
            <!-- TODO: featured image -->
            <div v-if="documentDateStr" class="timestamp">
                <small>{{ documentDateStr }}</small>
            </div>
            <div class="rich-text"
                 v-html="prismicDom.RichText.asHtml(document.content, linkResolver, htmlSerializer)"></div>
            <div class="image-gallery" v-if="documentImageGalleryImages.length > 0">
                <no-ssr placeholder="Loading...">
                    <gallery :images="documentImageGalleryImages"
                             :index="imageGalleryIndex"
                             ref="imageGalleryWrap"
                             @onopen="onImageGalleryOpen"
                             @close="imageGalleryIndex = null"></gallery>
                    <div class="thumbnail"
                         @click="imageGalleryIndex = 0"
                         :style="{ backgroundImage: 'url(' + documentImageGalleryImages[0].href + ')' }"
                    ></div>
                </no-ssr>
            </div>
            <!-- TODO: next/prev posts -->
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
        if (!this.document.image_gallery || !Array.isArray(this.document.image_gallery)) return []

        return this.document.image_gallery
          .filter(function (item) {
            return typeof item.image_gallery_item_image === 'object'
              && typeof item.image_gallery_item_image.url === 'string'
              && item.image_gallery_item_image.url !== ''
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
        this.$refs.imageGalleryWrap.$el.querySelector('.close').innerHTML = '×'
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
