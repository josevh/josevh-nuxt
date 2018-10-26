<template>
    <footer>
        <span class="copyright">&copy; 2018 {{ $store.state.siteAuthor }}</span>
    </footer>
</template>

<script>
  export default {
    name: 'Footer',
  }
</script>

<style lang="scss" scoped>
    @import '~assets/variables';

    footer {
        margin-top: 3rem;

        .copyright {
            color: $light-color;
            font-family: $fonts-sans-serif;
            font-size: 0.8125rem;
        }
    }
</style>
