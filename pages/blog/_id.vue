<template>
    <div class="content" v-cloak>
        <div v-if="!document" class="empty">Unable to locate requested blog entry.</div>
        <div v-if="typeof document !== 'undefined'">
            <div class="heading">
                <h1 class="title">{{document.data.title[0].text}}</h1>
                <!-- TODO: featured image -->
                <div v-if="documentDateStr" class="timestamp">
                    <small>{{ documentDateStr }}</small>
                </div>
            </div>
            <div class="rich-text body"
                 v-html="prismicDom.RichText.asHtml(document.data.content, linkResolver, htmlSerializer)"></div>
            <div class="image-gallery" v-if="documentImageGalleryImages.length > 0">
                <no-ssr placeholder="Loading...">
                    <silentbox-group>
                        <silentbox-item v-for="(image, index) in documentImageGalleryImages" :key="index"
                                        :src="image.href"
                                        :style="'background-image: url(\''+image.href+'\')'"
                                        :description="image.title">
                        </silentbox-item>
                    </silentbox-group>
                </no-ssr>
            </div>
            <div class="links-section related" v-if="docsRelated.length">
                <h5>RELATED</h5>
                <div v-for="docRelated in docsRelated" :key="docRelated.id" class="item">
                    <nuxt-link :to="linkResolver(docRelated)">{{ docRelated.data.title[0].text }}</nuxt-link>
                </div>
            </div>
            <nav class="links-section pagination" v-if="documentPrev || documentNext">
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
        title: this.headTitle
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
      headTitle () {
          if (!this.document) return 'Whoops'

          return this.document.data.title[0].text
      },
      document () {
        return this.$store.getters.docByUID(this.$route.params.id)
      },
      documentNext() {
        if (!this.document) return null

        return this.$store.getters.docNext(this.document.uid, this.document.type, 'publish_date', 'asc')
      },
      documentPrev() {
        if (!this.document) return null

        return this.$store.getters.docNext(this.document.uid, this.document.type, 'publish_date', 'desc')
      },
      documentDate () {
        if (!this.document) return null

        return new Date(this.document.data.publish_date + 'T00:00:00')
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
      },
      docsRelated () {
        return this.$store.getters.docsRelated(this.document).slice(0, 3)
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '~assets/variables';

    .content {
        .heading {
            margin-bottom: 1.5rem;

            .title {
                margin-bottom: 0;
            }

            .timestamp {
                color: $light-color;
                font-family: $fonts-sans-serif;
            }
        }
    }

    .links-section {
        margin-top: 2rem;
        border-top: 2px solid #333333;

        &.related {
            border-top-color: #dddddd;
            border-top-width: 1px;

            & > .item {
                display: inline-block;
                vertical-align: top;
                width: 33.33%;

                &:nth-of-type(1) {
                    padding-right: 1rem;
                }

                &:nth-of-type(2) {
                    padding: 0 1rem;
                }

                &:nth-of-type(3) {
                    padding-left: 1rem;
                }

                @media screen and (max-width: 768px){
                    display: block;
                    width: 100%;
                    padding: 0;

                    &+.item {
                        margin-top: 1rem;
                    }

                    &:nth-of-type(1) {
                        padding-right: 0;
                    }

                    &:nth-of-type(2) {
                        padding: 0 0;
                    }

                    &:nth-of-type(3) {
                        padding-left: 0;
                    }
                }
            }
        }

        &.pagination {
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
    }

</style>
<style lang="scss">
    @import '~assets/variables';

    .content .block-img {
        text-align: center;

        img {
            max-width: 100%;
            height: auto;
        }
    }

    .image-gallery {
        text-align: center;
        font-family: $fonts-sans-serif;

        .silentbox-item:first-of-type {
            width: 300px;
            height: 200px;
            display: block;
            margin: 0 auto;

            border: 1px solid #333333;
            box-shadow: 10px 8px 1px 1px #b1b1b1, 18px 14px 1px 3px #cccccc;
            transition: box-shadow 250ms, border-width 125ms;
            background-clip: padding-box;
            background-size: cover;

            @media screen and (max-width: 414px) {
                width: 100%;
            }

            &:hover {
                cursor: pointer;
                box-shadow: none;
                border-width: 3px;
            }
        }

        #silentbox-overlay__embed img {
            @media screen and (max-width: 500px) {
                max-width: 95%;
            }
            @media screen and (max-width: 414px) {
                max-width: 90%;
            }
        }
    }
</style>
