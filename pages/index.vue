<template>
    <div class="content">
        <section class="headline"><h1>Web Developer. Application Developer. Technology enthusiast.</h1></section>
        <section class="message">
            <h4>Who I am</h4>
            <p>My name is Jose Victor Herrera. I am a web/app/etc developer in Los Angeles, CA.</p>
        </section>
        <section class="message">
            <h4>What I do</h4>
            <p>For myself, I experiment with new technologies and languages. From <code>C#</code> in Unity to
                <code>Java</code> for Android.</p>
            <p>For Brighton Collectibles, I write applications in <code>PHP</code> and <code>Javascript</code> that help
                the internal company efficiency as well as empower our customers.</p>
        </section>
        <section class="message">
            <h4>Where I'm headed</h4>
            <p>I am in pursuit of my undergrad degree and seek to delve deeper into the depths of computer science.</p>
        </section>
    </div>
</template>

<script>
  export default {
    name: 'Home',
    head () {
      return {
        title: ''
      }
    },
    data () {
      return {
        documents: []
      }
    },
    computed: {
      blogPosts () {
        return this.documents.filter(function (document) {
          return document.type === TypeBlogPost
        })
      },
      projects () {
        return this.documents.filter(function (document) {
          return document.type === TypeProject
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

    .content {
        .headline h1 {
            margin-bottom: 2.5rem;
        }

        section.message {
            h4 {
                margin: 1.5rem 0 0;
            }
        }

        p > code {
            font-weight: bold;
        }
    }
</style>
