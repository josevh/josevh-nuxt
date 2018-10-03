<template>
    <div class="content">
        <h1>Projects</h1>

        <section class="project-listing">
            <ul class="docs">
                <li v-for="project in projects" :key="project.id" class="doc">
                    <!-- TODO: featured image -->
                    <div class="name"><h3 v-for="(title, index) in project.data.title" :key="index">{{ title.text }}</h3></div>
                    <div class="desc rich-text"
                         v-html="prismicDom.RichText.asHtml(project.data.description, linkResolver, htmlSerializer)"></div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
  const PrismicDom = require('prismic-dom')
  const PrismicDocumentType = 'project'
  import LinkResolver from '~~/LinkResolver'
  import { htmlSerializer } from '~~/components/mixins/PrismicHtmlSerializer'

  export default {
    name: 'ProjectIndex',
    data () {
      return {
        prismicDom: PrismicDom,
        linkResolver: LinkResolver
      }
    },
    mixins: [htmlSerializer],
    computed: {
      projects () {
        return this.$store.getters.docsByType(PrismicDocumentType)
          .slice()
          .sort(function (a, b) {
            // desc
            return new Date(b.first_publication_date) - new Date(a.first_publication_date)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .content {
        & > h2 {
            margin: 1.5rem 0;
        }

        ul.docs {
            list-style-type: none;
            padding-left: 0;

            li.doc {
                margin-bottom: 2.5rem;

                .name > h3 {
                    margin-bottom: 0;
                }

                .desc {
                    padding-left: 1.5rem;
                }
            }
        }
    }
</style>
