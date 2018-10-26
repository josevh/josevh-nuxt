<template>
    <div>
        <Header/>
        <nuxt/>
        <Footer/>
    </div>
</template>

<script>
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'
  import 'highlight.js/styles/monokai-sublime.css'

  export default {
    components: {Header, Footer}
  }
</script>

<style lang="scss">
    @import '~assets/variables';

    html {
        font-size: $base-font-size;
        line-height: 1.5rem;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;

        body {
            display: flex;
            flex-direction: column;
            max-width: 42rem;
            padding: 0 2rem;
            background-color: #F8F8F8;
            color: $primary-color;
            font-weight: 400;
            font-size: 16px;
            margin: 4rem auto;
            font-family: $fonts-serif;

            @media screen and (max-width: 768px) {
                margin: 2rem auto;
            }
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: $fonts-sans-serif;
            line-height: 1.5em;
            color: #333333;
            letter-spacing: -1px;
        }

        h1 {
            font-size: 2.5rem;
        }

        h2 {
            font-size: 2rem;
        }

        h3 {
            font-size: 1.75rem;
        }

        h4 {
            font-size: 1.5rem;
        }

        h5 {
            font-size: 1.25rem;
        }

        h6 {
            font-size: 1rem;
        }
    }

    a {
        color: $link-color;
        border-bottom: 1px dotted $link-color;
        text-decoration: none;

        &:hover {
            color: #000;
            border-bottom-color: #000;
            text-decoration: none;
        }
    }

    pre, code {
        font-family: $fonts-monospace;
    }

</style>

