/**
 * User: retro.
 * Time: 11/4/19
 */

const {query} = require('./sql.js')

// 注册用户
exports.insertData = (value) => {
  let _sql = `insert into ArticleType set 
    TypeName=?,
    TypeDesc=?,
    TypeContent=?,
    UpLoadID=?,
    TypeLevel=?,
    IsLeaf=?,
    IDTree=?,
    ParentID=?,
    SortID=?,
    IsShow=?,
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
// 删除
exports.deleteData = (TypeID) => {
  let _sql = `delete from ArticleType where TypeID="${TypeID}";`
  return query(_sql)
}
// 查找
exports.queryData = (TypeName) => {
  let _sql = `select * from ArticleType where TypeName="${TypeName}";`
  return query(_sql)
}
// 查找所有
exports.queryAllData = () => {
  let _sql = `select * from ArticleType;`
  return query(_sql)
}
