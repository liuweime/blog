import Mock from 'mockjs'
import {parseurl, parsePostList, calculationPagination} from '@/common/util'



function getArticleIdRandom(id)
{
  return !id ? Math.floor(Math.random() * 30 + 1) : id
}

function getParentId(id)
{
  if (id % 10 === 0) {
    return 0
  }

  return parseInt(id / 10) * 10
}

function getComments(comments, topicId)
{
  return comments.filter((comment) => {
    return comment.topic_id === topicId && comment.parent_id === 0
  })
}
function getReplys(comments, parentId)
{
  return comments.filter((comment) => {
    return comment.parent_id === parentId
  })
}


const Random = Mock.Random
// 总数评论 100
const commentLen = 100
// 总回复数量
const replyLen = 100
const len = commentLen + replyLen
let comments = []
//
// 生产评论
for (let i = 0; i < len; i++) {
  comments.push({
    id: i+1,
    topic_id: getArticleIdRandom(12),
    parent_id: getParentId(i+1),
    nickname: Random.cname(),
    email: Random.email(),
    content: Random.cparagraph(),
    created_at: Random.datetime(),
    updated_at: Random.datetime()
  })
}


export default {
  getComments: (config) => {
    let { page = 1} = parseurl(config.url)
    let response = {
      code: 0,
      info: {
        data: null,
        links: null
      },
      msg: null
    }

    const regxp = /comment\/(?<id>[0-9]+)/
    const result = regxp.exec(config.url)

    if (result === null) {
      return response
    }

    const id = parseInt(result['groups']['id'])
    const limit = 10
    page = parseInt(page)

    let data = getComments(comments, id)
    const count = data.length
    if (count < 1) {
      return response
    }
    data = data.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    const field = ["id", "nickname", "email", "content", "created_at", "updated_at"]
    data = parsePostList(data, field)

    const pagination = {
      page: page,
      pagenum: parseInt(Math.floor(count / limit)),
    }
    response.info.data = data
    response.info.links = calculationPagination(config.url, pagination)

    return response
  },
  createComments: (config) => {

    let post = config.body
    if (typeof config.body === 'string') {
      post = JSON.parse(config.body)
    }
    const id = comments.length + 1
    let parentId = 0
    if (post.comment_id) {
      parentId = post.comment_id
    }
    const comment = {
      id: id,
      topic_id: post.article_id,
      parent_id: parentId,
      nickname: post.nickname,
      email: post.email,
      content: post.content,
      created_at: Random.datetime(),
      updated_at: Random.datetime()
    }
    comments.push(comment)

    let field = ["id", "nickname", "email", "content", "created_at", "updated_at"]
    const data = parsePostList([comment], field)

    return {
      code: 0,
      info: data.pop(),
      msg: ''
    }
  }
}
