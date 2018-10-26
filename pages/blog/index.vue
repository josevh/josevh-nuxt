<template>
    <div class="content">
        <h1 class="title">Blog</h1>

        <section class="blog-listing">
            <ul class="docs">
                <li v-if="!blogPosts">No blog posts.</li>
                <li v-for="blogPost in blogPosts" :key="blogPost.id" class="doc">
                    <!-- TODO: featured image -->
                    <span class="date">{{ blogPost.data.publish_date | docDate }}</span
                    ><span class="name"><a v-for="(title, index) in blogPost.data.title" :key="index"
                                           :href="'/blog/' + blogPost.uid">{{ title.text }}</a></span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
  const PrismicDocumentType = 'blog_post'
  import { Date } from 'prismic-dom'

  // TODO: fix dates

  export default {
    name: 'BlogIndex',
    head () {
      return {
        title: 'Blog'
      }
    },
    data () {
      return {
        prismicDate: Date
      }
    },
    computed: {
      blogPosts () {
        let component = this
        return this.$store.getters.docsByType(PrismicDocumentType)
          .slice()
          .sort(function (a, b) {
            // desc
            return new Date(b.data.publish_date + 'T00:00:00') - new Date(a.data.publish_date + 'T00:00:00')
          })
      }
    },
    filters: {
      docDate: function (val) {
        if (!val) return ''
        let dt = Date(val + 'T00:00:00')

        return dt.toLocaleString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    $breakpoint: 768px;

    .content {
        .title {
            margin-bottom: 1.5rem;
        }

        & > h2 {
            margin: 1.5rem 0;
        }

        ul.docs {
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
    }

</style>
