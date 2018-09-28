<template>
    <footer>
        <span class="copyright">&copy; {{ $store.state.siteAuthor }} 2018</span>
    </footer>
</template>

<script>
  export default {
    name: 'Footer',
  }
</script>

<style scoped>
    .copyright {
        color: #999999;
        font-family: 'Oswald', sans-serif;
        font-size: 0.8125rem;
    }
</style>
