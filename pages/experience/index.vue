<template>
    <div class="content">
        <h1>Experience</h1>

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
            <!-- TODO: languages used -->
        </section>
    </div>
</template>

<script>
  const PrismicDom = require('prismic-dom')
  const PrismicDocumentType = 'experience'
  import LinkResolver from '~~/LinkResolver'

  export default {
    name: 'ExperienceIndex',
    data () {
      return {
        prismicDom: PrismicDom,
        linkResolver: LinkResolver
      }
    },
    computed: {
      experiences () {
        let dtStrOpts = {month: 'short', year: 'numeric'}
        let docs = JSON.parse(JSON.stringify(this.$store.getters.docsByType(PrismicDocumentType)))

        docs.forEach(function (doc) {
          doc.data.fromStr = new Date(doc.data.from).toLocaleDateString('en-US', dtStrOpts)
          doc.data.toStr = !!doc.data.to ? new Date(doc.data.to).toLocaleDateString('en-US', dtStrOpts) : 'Present'
        })
        docs.sort(function (a, b) { // desc
          return new Date(b.data.from) - new Date(a.data.from)
        })

        return docs
      }
    }
  }
</script>

<style lang="scss" scoped>
    /* TODO: import a global scss for vars */
    .content {
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
                            color: #666666;
                        }
                    }
                }

                .dates {
                    font-family: 'Oswald', sans-serif;
                }

                .desc {
                    margin-top: 0.25rem;
                }

                .langs {
                    .label {
                        font-family: 'Oswald', sans-serif;
                    }

                    .lang-str {
                        font-family: 'Inconsolata', monospace;
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
