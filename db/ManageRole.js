/**
 * User: retro.
 * Time: 11/4/19
 */

const {query} = require('./sql.js')

// 注册用户
exports.insertData = (value) => {
  let _sql = `insert into ManageRole set 
    RoleName=?,
    RoleDesc=?,
    AddDate=?,
    ReleaseDate=?
  ;`
  return query(_sql, value)
}
// 删除
exports.deleteData = (RoleID) => {
  let _sql = `delete from ManageRole where RoleID="${RoleID}";`
  return query(_sql)
}
// 查找
exports.queryData = (RoleName) => {
  let _sql = `select * from ManageRole where RoleName="${RoleName}";`
  return query(_sql)
}
// 查找所有
exports.queryAllData = () => {
  let _sql = `select * from ManageRole;`
  return query(_sql)
}
