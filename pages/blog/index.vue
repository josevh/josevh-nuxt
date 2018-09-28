<template>
    <div class="content">
        <h2>Writing</h2>
        <section class="writing listing">
            <ul>
                <li v-if="!blogPosts">No blog posts.</li>
                <li v-for="blogPost in blogPosts" :key="blogPost.id">
                    <span class="date">{{ blogPost.data.publish_date }}</span>
                    <span class="name">
            <a v-for="(title, index) in blogPost.data.title" :key="index" :href="'/blog/' + blogPost.uid">{{ title.text }}</a>
          </span>
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
          .filter(function (document) {
            return document.type === PrismicDocumentType
          })
          .slice()
          .sort(function (a, b) {
            // desc
            return component.prismicDate(b.data.publish_date) - component.prismicDate(a.data.publish_date)
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
