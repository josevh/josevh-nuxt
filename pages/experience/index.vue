<template>
    <div class="content">
        <h2>Exp</h2>
        <section class="experience-listing">
            <ul class="docs">
                <li v-for="experience in experiences" :key="experience.id" class="doc">
                    <div class="name">{{ experience.data.position[0].text }}</div>
                    <div class="desc"
                         v-html="prismicDom.RichText.asHtml(experience.data.description, linkResolver, htmlSerializer)"></div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
  const Prismic = require('prismic-javascript')
  const PrismicDom = require('prismic-dom')
  const PrismicDocumentType = 'experience'
  import LinkResolver from '~~/LinkResolver'
  import { Date } from 'prismic-dom'

  export default {
    name: 'ExperienceIndex',
    data () {
      return {
        documents: [],
        prismicDom: PrismicDom,
        linkResolver: LinkResolver,
        prismicDate: Date
      }
    },
    computed: {
      experiences () {
        return this.documents
          .slice()
          .sort(function (a, b) {
            // desc
            return new Date(b.data.from) - new Date(a.data.from)
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
