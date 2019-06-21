import Prismic from 'prismic-javascript'

const config = {
  baseUrl: 'https://josevhcom.cdn.prismic.io/api/v2',
  access_token: '<ACCESS_TOKEN>'
}

export const initApi = req => {
  return Prismic.getApi(config.baseUrl, {
    // accessToken: config.access_token,
    req: req
  })
}

export const linkResolver = doc => {
  let type = (doc.type === 'blog_post') ? 'blog' : doc.type
  return `/${type}/${doc.uid}`
}