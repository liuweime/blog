const hostname = 'http://' + window.location.hostname + ':' + window.location.port

export function api() {
  return {
    'category' : {
      'index': hostname + '/category'
    },
    'article': {
      'index': hostname + '/article',
      'archive': hostname + '/article/archive',
      'show': hostname + '/article/',
      'category': hostname + '/article/category/',
      'tag': hostname + '/article/tag/',
    },
    'comment': {
      'show': hostname + '/comment/',
      'store': hostname + '/comment',
      'reply': hostname + '/comment/reply'
    }
  }
}
