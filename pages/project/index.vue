<template>
    <div class="content">
        <h2>Projects</h2>
        <section class="projects listing">
            <ul>
                <li v-for="project in projects" :key="project.id"><span class="name"><a
                        v-for="(title, index) in project.data.title" :key="index" :href="'/project/'+project.uid">{{ title.text }}</a>:&nbsp;</span><span
                        class="desc">A fast, simple & powerful blog framework</span></li>
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
        return this.documents.filter(function (document) {
          return document.type === PrismicDocumentType
        })
      }
    },
    asyncData ({ store }) {
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
