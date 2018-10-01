<template>
    <div class="content">
        <h2>Projects</h2>
        <section class="project-listing">
            <ul class="docs">
                <li v-for="project in projects" :key="project.id" class="doc">
                    <div class="name"><a v-for="(title, index) in project.data.title" :key="index"
                                         :href="'/project/'+project.uid">{{ title.text }}</a>:&nbsp;
                    </div>
                    <div class="desc">A fast, simple & powerful blog framework</div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
  const Prismic = require('prismic-javascript')
  const PrismicDocumentType = 'project'

  export default {
    name: 'ProjectIndex',
    data () {
      return {
        documents: []
      }
    },
    computed: {
      projects () {
        return this.documents
          .slice()
          .sort(function (a, b) {
            // desc
            return new Date(b.first_publication_date) - new Date(a.first_publication_date)
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
    .content ul.docs {
        list-style-type: none;
        padding-left: 0;

        li.doc {
            margin-bottom: 1.5rem;
        }
    }
</style>
