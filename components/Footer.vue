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
    footer {
        margin-top: 3rem;

        .copyright {
            color: #999999;
            font-family: 'Oswald', sans-serif;
            font-size: 0.8125rem;
        }
    }
</style>
