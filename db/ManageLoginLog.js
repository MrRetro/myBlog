/**
 * User: retro.
 * Time: 11/4/19
 */

const {query} = require('./sql.js')

// 注册用户
exports.insertData = (value) => {
  let _sql = `insert into ManageLoginLog set 
    UserID=?,
    StartTime=?,
    ExitTime=?,
    IP=?,
    Remark=?
  ;`
  return query(_sql, value)
}
// 删除
exports.deleteData = (LogID) => {
  let _sql = `delete from ManageLoginLog where TypeID="${LogID}";`
  return query(_sql)
}
// 查找
exports.queryData = (UserID) => {
  let _sql = `select * from ManageLoginLog where UserID="${UserID}";`
  return query(_sql)
}
// 查找所有
exports.queryAllData = () => {
  let _sql = `select * from ManageLoginLog;`
  return query(_sql)
}
