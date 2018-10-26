<template>
    <div class="content">
        <h1 class="title">Experience</h1>

        <section class="experience-listing">
            <ul class="docs">
                <li v-for="experience in experiences" :key="experience.id" class="doc">
                    <div class="position">
                        <h3>{{ experience.data.position[0].text }}</h3>
                    </div>
                    <div class="dates">{{ experience.data.employer[0].text }} | {{ experience.data.fromStr }} - {{
                        experience.data.toStr }}
                    </div>
                    <div class="desc"
                         v-html="prismicDom.RichText.asHtml(experience.data.description, linkResolver)"></div>
                    <div class="langs" v-if="experience.data.languages_used.length > 0"><span class="label">Languages used:</span>
                        <span
                                class="lang-str">{{ experience.data.languages_used.map(lang => {return lang.text}).join(', ') }}</span>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
  const PrismicDom = require('prismic-dom')
  const PrismicDocumentType = 'experience'
  import LinkResolver from '~~/LinkResolver'

  export default {
    name: 'ExperienceIndex',
    head () {
      return {
        title: 'Experience'
      }
    },
    data () {
      return {
        prismicDom: PrismicDom,
        linkResolver: LinkResolver
      }
    },
    computed: {
      experiences () {
        let component = this
        let dtStrOpts = {month: 'short', year: 'numeric'}
        let docs = JSON.parse(JSON.stringify(this.$store.getters.docsByType(PrismicDocumentType)))

        docs.forEach(function (doc) {
          doc.data.fromStr = new Date(doc.data.from + 'T00:00:00').toLocaleDateString('en-US', dtStrOpts)

          if (doc.data.to) {
            doc.data.toStr = new Date(doc.data.to + 'T00:00:00').toLocaleDateString('en-US', dtStrOpts)
          } else {
            doc.data.toStr = 'Present'
          }
        })
        docs.sort(function (a, b) { // desc
          return new Date(new Date(b.data.from + 'T00:00:00')) - new Date(new Date(a.data.from + 'T00:00:00'))
        })

        return docs
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '~assets/variables';

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

                .position {
                    h3 {
                        margin-bottom: 0;

                        small {
                            font-weight: 400;
                            color: $primary-color;
                        }
                    }
                }

                .dates {
                    font-family: $fonts-sans-serif;
                }

                .desc {
                    margin-top: 0.25rem;
                }

                .langs {
                    .label {
                        font-family: $fonts-serif;
                    }

                    .lang-str {
                        font-family: $fonts-monospace;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .content .docs .doc .desc ul {
        list-style-type: none;

        li:before {
            content: '•';
            font-size: 1.5rem;
            display: inline-block;
            vertical-align: middle;
            width: 1em;
            margin-left: -1em;
        }
    }
</style>
