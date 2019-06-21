import { initApi } from '../prismic.config';
const Prismic = require('prismic-javascript')

export const state = () => ({
    siteTitle: 'josevh',
    siteAuthor: 'Jose V Herrera',
    docs: []
})

export const getters = {
    docTypes (state) {
        let types = []

        state.docs.forEach((doc) => {
            if (types.indexOf(doc.type) === -1) {
                types.push(doc.type)
            }
        })

        return types
    },
    docsByType: (state) => (type) => state.docs.filter(doc => doc.type === type),
    docByUID: (state) => (uid) => state.docs.find(doc => doc.uid === uid),
    docNext: (state, getters) => (uid, type, sortProp, sortDirection = 'asc') => {
        let allowedSortDirections = ['asc', 'desc']
        if (allowedSortDirections.indexOf(sortDirection) === -1) {
            sortDirection = 'asc'
        }

        // sort
        let docs = getters.docsByType(type).slice().sort((a, b) => {
            let ret = 0
            if (a.data[sortProp] < b.data[sortProp]) ret = -1
            else if (b.data[sortProp] < a.data[sortProp]) ret = 1

            if (sortDirection === 'desc') {
                ret *= -1
            }

            return ret
        })

        // get next
        for (let i = 0; i < docs.length; i++) {
            if (docs[i].uid === uid) {
                return docs[i + 1]
            }
        }
    },
    docsRelated: (state, getters) => (doc) => {
        if (doc.tags.length === 0) return []

        let docsRelated = []
        let tagsInCommonCountById = {}

        getters.docsByType(doc.type).forEach(d => {
            if (d.id !== doc.id) {
                let tagsInCommonCount = d.tags.reduce(
                    (accumulator, tag) => accumulator + (doc.tags.indexOf(tag) >= 0 ? 1 : 0),
                    0
                )
                if (tagsInCommonCount > 0) {
                    tagsInCommonCountById[d.id] = tagsInCommonCount
                    docsRelated.push(d)
                }
            }
        })

        return docsRelated.sort((a, b) => tagsInCommonCountById[b.id] - tagsInCommonCountById[a.id]) // desc order
    }
}

export const mutations = {
    setDocs (state, newDocs) {
        state.docs = newDocs
    },
    addDocs (state, newDocs) {
        state.docs.push(...newDocs)
    }
}

export const actions = {
    async nuxtServerInit ({commit, state}) {
        const api = await initApi()

        let responseBlogPosts = await api.query(
            Prismic.Predicates.at('document.type', 'blog_post'),
            {pageSize: 100}
        )
        let responseProjects = await api.query(
            Prismic.Predicates.at('document.type', 'project'),
            {pageSize: 100}
        )
        let responseExperience = await api.query(
            Prismic.Predicates.at('document.type', 'experience'),
            {pageSize: 100}
        )

        commit('addDocs', responseBlogPosts.results)
        commit('addDocs', responseProjects.results)
        commit('addDocs', responseExperience.results)

        return {
            responseBlogPosts: responseBlogPosts,
            responseProjects: responseProjects,
            responseExperience: responseExperience,
        }
    }
}
