<template>
    <div class="content" v-cloak>
        <div v-if="!document" class="empty">Unable to locate requested project.</div>
        <div v-if="typeof document !== 'undefined'">
            <h1 class="title">{{document.data.title[0].text}}</h1>
            <!-- TODO: featured image -->
            <div v-if="documentDateStr" class="timestamp">
                <small>{{ documentDateStr }}</small>
            </div>
            <div class="rich-text"
                 v-html="prismicDom.RichText.asHtml(document.data.content, linkResolver, htmlSerializer)"></div>
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
            <!-- TODO: related posts, based on tags -->
            <!-- TODO: tag links -->
            <nav class="pagination" v-if="documentPrev || documentNext">
                <div class="item prev" v-if="documentPrev">
                    <h5>PREVIOUS</h5>
                    <nuxt-link :to="linkResolver(documentPrev)">{{ documentPrev.data.title[0].text }}</nuxt-link>
                </div
                ><div class="item next" v-if="documentNext">
                    <h5>NEXT</h5>
                    <nuxt-link :to="linkResolver(documentNext)">{{ documentNext.data.title[0].text }}</nuxt-link>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
  const PrismicDom = require('prismic-dom')
  import LinkResolver from '~~/LinkResolver'
  import { htmlSerializer } from '~~/components/mixins/PrismicHtmlSerializer'

  export default {
    name: 'BlogPostItem',
    head () {
      return {
        title: this.document.data.title[0].text
      }
    },
    data () {
      return {
        prismicDom: PrismicDom,
        linkResolver: LinkResolver,
        imageGalleryIndex: null
      }
    },
    mixins: [htmlSerializer],
    computed: {
      document () {
        return this.$store.getters.docByUID(this.$route.params.id)
      },
      documentNext() {
        return this.$store.getters.docNext(this.document.uid, this.document.type, 'publish_date', 'asc')
      },
      documentPrev() {
        return this.$store.getters.docNext(this.document.uid, this.document.type, 'publish_date', 'desc')
      },
      documentDate () {
        if (!this.document) return null

        return this.prismicDom.Date(this.document.data.publish_date)
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
      onImageGalleryOpen (event) { // override 'X' for '×'
        this.$refs.imageGalleryWrap.$el.querySelector('.close').innerHTML = '×'
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

    .pagination {
        margin-top: 2rem;
        border-top: 2px solid #333333;


        & > .item {
            display: inline-block;
            vertical-align: top;
            width: 50%;

            &.next {
                float: right;
                text-align: right;
                padding-left: 1rem;
            }

            &.prev {
                float: left;
                padding-right: 1rem;
            }
        }

        &:after {
            content: '';
            display: table;
            clear: both;
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
            border: 1px solid #333;
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
