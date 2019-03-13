const Prismic = require('prismic-javascript')
const ApiEndpoint = 'https://josevhcom.cdn.prismic.io/api/v2'
import linkResolver from './LinkResolver.js'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Jose V Herrera',
    titleTemplate: (titleChunk) => {
      return titleChunk ? `Jose V Herrera - ${titleChunk}` : 'Jose V Herrera';
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Jose\'s thoughts, projects, etc.'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather:400,700|Oswald:400,700|Inconsolata:400'},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/6.0.0/sanitize.min.css'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },
  generate: {
    fallback: true,
    routes: function () {
      return Prismic.getApi(ApiEndpoint)
        .then((api) => {
          return api.query('')
        })
        .then((response) => {
          return response.results.map((doc) => {
            let route = linkResolver(doc)

            return {
              route: route,
              payload: doc
            }
          })
        })
    },
    subFolders: false
  },
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-77365099-1'
    }]
  ],
  plugins: [
    { src: '~/plugins/vue-silentbox', mode: 'client' }
  ]
}

