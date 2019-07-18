
export {default as storage} from './storage.js'


export function parseurl(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export function parsePostList(list, field)
{
  let posts = []
  for(let attr in list) {
    let post = list[attr]
    let data = {};
    for (let item in field) {
      data[field[item]] = post[field[item]]
    }
    posts.push(data)
  }

  return posts
}

/**
 * 分页计算
 * @param  string url        当前URL
 * @param  Object pagination 分页参数
 * @return Object 分页连接
 */
export function calculationPagination(url, pagination) {
  let links = {
    first: null,
    next: null,
    prev: null
  }

  if (!url || !url.split('?')[0] || !pagination) {
    return links
  }

  const path = url.split('?')[0]

  let next = pagination.page + 1,
      prev = pagination.page - 1

  links.first = url
  links.next = `${path}?page=${next}`
  links.prev = `${path}?page=${prev}`

  if (pagination.page === pagination.pagenum) {
    links.next = null
  }
  if (pagination.page === 1) {
    links.prev = null
  }
  return links
}

export function loadYaml() {

}
