/**
 * User: retro.
 * Time: 11/4/19
 */

const {query} = require('./sql.js')

// 注册用户
exports.insertData = (value) => {
  let _sql = `insert into ManageUser set 
    RoleID=?,
    UserName=?,
    UserPwd=?,
    Avator=?,
    RealName=?,
    Tel=?,
    Email=?,
    AddDate=?,
    ReleaseDate=?
  ;`
  return query(_sql, value)
}
// 删除
exports.deleteData = (UserID) => {
  let _sql = `delete from ManageUser where UserID="${UserID}";`
  return query(_sql)
}
// 查找
exports.queryData = (UserName) => {
  let _sql = `select * from ManageUser where UserName="${UserName}";`
  return query(_sql)
}
// 查找所有
exports.queryAllData = () => {
  let _sql = `select * from ManageUser;`
  return query(_sql)
}
