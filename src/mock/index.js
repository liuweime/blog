import Mock from 'mockjs'
import Category from './category'
import Article from './article'
import Comment from './comment'

Mock.setup({
    timeout: '200-600'
})

Mock.mock(/\/article\/archive/, 'get', Article.getArchive)
Mock.mock(/\/article\/category\/[\s\S]*/, 'get', Article.getArchive)
Mock.mock(/\/article\/[0-9]+/, 'get', Article.getArticle)
Mock.mock(/\/article/, 'get', Article.getList)
Mock.mock(/\/category/, 'get', Category)
Mock.mock(/\/comment\/[0-9]+/, 'get', Comment.getComments)
Mock.mock(/\/comment/, 'post', Comment.createComments)

export default Mock;
