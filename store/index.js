const Prismic = require('prismic-javascript')
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      siteTitle: 'josevh',
      siteAuthor: 'Jose V Herrera',
      prismicApiEndpoint: 'https://josevhcom.cdn.prismic.io/api/v2',
      docs: []
    }),
    getters: {
      docTypes (state) {
        let types = []

        state.docs.forEach((doc) => {
          if (types.indexOf(doc.type) === -1) {
            types.push(doc.type)
          }
        })

        return types
      },
      docsByType: (state) => (type) => {
        return state.docs.filter(doc => doc.type === type)
      },
      docByUID: (state) => (uid) => {
        return state.docs.find(doc => doc.uid === uid)
      }
    },
    mutations: {
      setDocs (state, newDocs) {
        state.docs = newDocs
      }
    },
    actions: {
      nuxtServerInit ({commit, state}) {
        return Prismic.getApi(state.prismicApiEndpoint)
          .then((api) => {
            return api.query('')
          })
          .then((response) => {
            commit('setDocs', response.results)
          })
      }
    }
  })
}

export default createStore
