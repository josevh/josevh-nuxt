<template>
    <div class="content">
        <div class="empty" v-if="!document">Unable to locate requested project.</div>
        <div v-else>
            <h2 class="title">{{document.title[0].text}}</h2>
            <p v-for="(description, index) in document.description" :key="index" class="description">{{ description.text }}</p>
        </div>
    </div>
</template>

<script>
  const Prismic = require('prismic-javascript')

  export default {
    data () {
      return {
        document: null
      }
    },
    asyncData ({params, error, payload, store}) {
      if (payload) {
        return {document: payload}
      } else {
        return Prismic.getApi(store.state.prismicApiEndpoint)
          .then((api) => {
            return api.getByUID('project', params.id)
          })
          .then((response) => {
            return {document: response.data}
          })
      }
    }
  }
</script>
