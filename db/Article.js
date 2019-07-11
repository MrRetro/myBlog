/**
 * User: retro.
 * Time: 11/4/19
 */

const {query} = require('./sql.js')

// 新增
exports.insertData = (value) => {
  let _sql = `insert into Article set 
    TypeID=?,
    ArticleName=?,
    ArticleDesc=?,
    ArticleContent=?,
    UpLoadID=?,
    SortID=?,
    IsShow=?,
    ViewCount=?,
    MasterID=?,
    AddDate=?,
    ReleaseDate=?,
    iLanguage=?,
    PageTitle=?,
    Keywords=?,
    Description=?
  ;`
  return query(_sql, value)
}
// 编辑
exports.updateData = (value) => {
  let _sql = `update Article set 
    ArticleName=?,
    TypeID=?,
    ArticleContent=?,
    ReleaseDate=?
    where ArticleID=?
  ;`
  return query(_sql, value)
}
// 编辑 字段
exports.updateDataUp = (value) => {
  let _sql = `update Article set 
    ViewCount=ViewCount + 1
    where ArticleID=?
  ;`
  return query(_sql, value)
}
// 删除
exports.deleteData = (ArticleID) => {
  let _sql = `delete from Article where ArticleID="${ArticleID}";`
  return query(_sql)
}
// 查找-通过id
exports.queryDataById = (ArticleID) => {
  let _sql = `select * from Article where ArticleID="${ArticleID}";`
  return query(_sql)
}
// 查找
exports.queryData = (ArticleName) => {
  let _sql = `select * from Article where ArticleName="${ArticleName}";`
  return query(_sql)
}
// 查找所有 || 根据TypeID筛选
exports.queryAllData = (TypeID) => {
  let _sql = `select * from Article`
  if (TypeID) {
    _sql += ` where TypeID="${TypeID}";`
  } else {
    _sql += `;`
  }
  return query(_sql)
}
