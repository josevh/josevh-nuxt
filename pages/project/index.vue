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
  const PrismicDocumentType = 'project'

  export default {
    name: 'ProjectIndex',
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
                margin-bottom: 1.5rem;
            }
        }
    }
</style>
