<template>
    <div class="content">
        <div class="empty" v-if="!document">Unable to locate requested project.</div>
        <div v-else>
            <h1 class="title">{{document.data.title[0].text}}</h1>

            <div class="rich-text"
                 v-html="prismicDom.RichText.asHtml(document.data.description, linkResolver, htmlSerializer)"></div>
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
        </div>
    </div>
</template>

<script>

  const Prismic = require('prismic-javascript')
  const PrismicDom = require('prismic-dom')
  import LinkResolver from '~~/LinkResolver'
  import { htmlSerializer } from '~~/components/mixins/PrismicHtmlSerializer'

  export default {
    name: 'ProjectItem',
    head () {
      return {
        title: this.document.data.title[0].text
      }
    },
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
        text-align: center;
        font-family: 'Oswald', sans-serif;

        .silentbox-item:first-of-type {
            width: 300px;
            height: 200px;
            display: block;
            margin: 0 auto;

            border: 1px solid #333;
            box-shadow: 10px 8px 1px 1px #b1b1b1, 18px 14px 1px 3px #ccc;
            transition: box-shadow 250ms, border-width 125ms;
            background-clip: padding-box;

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
