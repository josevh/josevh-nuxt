export default function linkResolver(doc) {
  let type = (doc.type === 'blog_post') ? 'blog' : doc.type

  return '/' + type + '/' + doc.uid;
}
