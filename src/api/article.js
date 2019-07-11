/**
 * User: retro.
 * Time: 11/4/19
 */
import request from '../api/request'

// 添加
export function addArticle (params) {
  return request({
    url: `/article/add`,
    method: 'post',
    data: params
  })
}
// 删除
export function delArticle ({id}) {
  return request({
    url: `/article/del/${id}`,
    method: 'post'
  })
}

// 获取数据通过id
export function getArticleById ({id}) {
  return request({
    url: `/article/${id}`,
    method: 'get'
  })
}

// 编辑数据通过id
export function editArticle ({ArticleID, TypeID, ArticleName, ArticleContent}) {
  return request({
    url: `/article/edit`,
    method: 'post',
    data: {ArticleID, TypeID, ArticleName, ArticleContent}
  })
}

// 给字段加1通过id
export function editArticleUp ({ArticleID}) {
  return request({
    url: `/article/edit/up`,
    method: 'post',
    data: {ArticleID}
  })
}

// 获取数据通过名称
export function getArticleByName ({name}) {
  return request({
    url: `/article/name/${name}`,
    method: 'get'
  })
}

// 获取列表
export function getArticle ({typeID}) {
  let url = '/article'
  if (typeID) {
    url += `/type/${typeID}`
  }
  return request({
    url,
    method: 'get'
  })
}
