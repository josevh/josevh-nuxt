<template>
    <header>
        <nav>
            <nuxt-link to="/" class="brand">{{ $store.state.siteTitle }}</nuxt-link>
            <ul>
                <li>
                    <nuxt-link to="/blog">Blog</nuxt-link>
                </li
                >
                <li>
                    <nuxt-link to="/project">Projects</nuxt-link>
                </li
                >
                <li><nuxt-link to="/experience">Experience</nuxt-link></li
                >
                <li><nuxt-link to="/contact">Contact</nuxt-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style lang="scss" scoped>
    $breakpoint: 420px;

    header {
        margin-bottom: 1.5rem;

        > h1 {
            margin: 0;
        }
    }

    nav {
        font-family: 'Oswald', sans-serif;
        overflow: hidden;

        a.brand {
            display: inline-block;
            vertical-align: top;
            background-color: #333333;
            padding: 0.33rem 1rem;
            margin-right: 1rem;
            font-style: italic;
            color: #fff;
        }

        ul {
            display: inline-block;
            vertical-align: top;
            padding-left: 0;
            margin: 0;

            @media screen and (max-width: $breakpoint) {
                display: block;
                margin-top: 1.5rem;
            }

            li {
                display: inline-block;
                vertical-align: middle;

                & + li {
                    padding: 0 0.5rem;
                }

                &:first-of-type {
                    padding-right: 0.5rem;
                }

                a {
                    color: #333333;
                    text-decoration: none;
                    display: inline-block;
                    vertical-align: middle;
                }

            }
        }
    }

</style>
