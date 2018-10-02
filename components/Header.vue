<template>
    <header>
        <!--<h1>{{ siteTitle }}</h1>-->
        <nav>
            <ul>
                <li>
                    <nuxt-link to="/" class="brand">{{ $store.state.siteTitle }}</nuxt-link>
                </li
                >
                <li>
                    <nuxt-link to="/blog">Blog</nuxt-link>
                </li
                >
                <li>
                    <nuxt-link to="/project">Projects</nuxt-link>
                </li
                >
                <li><a href="/experience">Experience</a></li
                >
                <li><a href="/contact">Contact</a></li>
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
    header {
        margin-bottom: 1.5rem;

        > h1 {
            margin: 0;
        }
    }

    nav {
        font-family: 'Oswald', sans-serif;
        overflow: hidden;

        ul {
            padding-left: 0;
            margin: 0;

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

                    &.brand {
                        color: #fff;
                        background-color: #333333;
                        padding: 0.33rem 1rem;
                        font-style: italic;
                    }
                }

            }
        }
    }

</style>
