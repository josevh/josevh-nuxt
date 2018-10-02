<template>
    <div class="content">
        <section class="headline"><h1>Web Developer. Application Developer. Technology enthusiast.</h1></section>
        <section class="message">
            <h4>What I do</h4>
            <p>I am currently part of the awesome web development team at Brighton Inc. There, I focus my efforts on
                both frontend and backend development. I am strengthening my competencies in HTML/CSS/JS as well as PHP
                and MySQL development. I work with frontend technologies such as Vue.js as well as develop the backend
                APIs that drive them.</p>
        </section>
        <section class="message">
            <h4>Where I'm headed</h4>
            <p>My goal is to become an established Android application developer. With that in mind, I have so far
                released an Android app to begin to learn the environment. My plan is to release another app by end of
                year to further develop my abilities.</p>
            <p>In my spare time, I have also begun to experiment with Unity game development using C#. I hope to can
                find a nice intersection of Android and game development which I will unite both my interests and
                goals.</p>
        </section>
    </div>
</template>

<script>
  export default {
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
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
    .headline h1 {
        margin-top: 1.5rem;
    }
</style>

