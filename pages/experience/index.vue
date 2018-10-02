<template>
    <div class="content">
        <h2>Exp</h2>
        <section class="experience-listing">
            <ul class="docs">
                <li v-for="experience in experiences" :key="experience.id" class="doc">
                    <div class="position">
                        <h4>{{ experience.data.position[0].text }}
                            <small>{{ experience.data.employer[0].text }}</small>
                        </h4>
                    </div>
                    <div>{{ experience.data.fromStr }} - {{ experience.data.toStr }}</div>
                    <div class="desc"
                         v-html="prismicDom.RichText.asHtml(experience.data.description, linkResolver)"></div>
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

  export default {
    name: 'ExperienceIndex',
    data () {
      return {
        documents: [],
        prismicDom: PrismicDom,
        linkResolver: LinkResolver
      }
    },
    computed: {
      experiences () {
        let dtStrOpts = {month: 'short', year: 'numeric'}
        let docs = JSON.parse(JSON.stringify(this.documents))

        docs.forEach(function (doc) {
          doc.data.fromStr = new Date(doc.data.from).toLocaleDateString('en-US', dtStrOpts)
          doc.data.toStr = !!doc.data.to ? new Date(doc.data.to).toLocaleDateString('en-US', dtStrOpts) : 'Present'
        })
        docs.sort(function (a, b) { // desc
          return new Date(b.data.from) - new Date(a.data.from)
        })

        return docs
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

            .position {
                h4 {
                    margin-bottom: 0;

                    small {
                        font-weight: 400;
                        color: #666666;
                    }
                }
            }
        }
    }
</style>
