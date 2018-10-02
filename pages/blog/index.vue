<template>
    <div class="content">
        <h2>Blog</h2>

        <section class="blog-listing">
            <ul class="docs">
                <li v-if="!blogPosts">No blog posts.</li>
                <li v-for="blogPost in blogPosts" :key="blogPost.id" class="doc">
                    <span class="date">{{ blogPost.data.publish_date | docDate }}</span
                    ><span class="name"><a v-for="(title, index) in blogPost.data.title" :key="index"
                                           :href="'/blog/' + blogPost.uid">{{ title.text }}</a></span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
  const Prismic = require('prismic-javascript')
  const PrismicDocumentType = 'blog_post'
  import { Date } from 'prismic-dom'

  export default {
    name: 'BlogIndex',
    data () {
      return {
        documents: [],
        prismicDate: Date
      }
    },
    computed: {
      blogPosts () {
        let component = this
        return this.documents
          .slice()
          .sort(function (a, b) {
            // desc
            return component.prismicDate(b.data.publish_date) - component.prismicDate(a.data.publish_date)
          })
      }
    },
    filters: {
      docDate: function (val) {
        if (!val) return ''
        let dt = Date(val)
        return dt.toLocaleString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        })
      }
    },
    asyncData ({store}) {
      return Prismic.getApi(store.state.prismicApiEndpoint)
        .then((api) => {
          return api.query(
            Prismic.Predicates.at('document.type', PrismicDocumentType)
          )
        })
        .then((response) => {
          return {documents: response.results}
        })
    }
  }
</script>

<style lang="scss" scoped>
    $breakpoint: 768px;

    .content ul.docs {
        list-style-type: none;
        padding-left: 0;

        li.doc {
            margin-bottom: 1.5rem;
            position: relative;

            span {
                display: inline-block;
                vertical-align: top;

                @media screen and (max-width: $breakpoint) {
                    display: block;
                }

                &.date {
                    width: 120px;

                    @media screen and (max-width: $breakpoint) {
                        width: 100%;
                        font-size: 0.875rem;
                    }
                }

                &.name {
                    width: calc(100% - 120px);

                    @media screen and (max-width: $breakpoint) {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
