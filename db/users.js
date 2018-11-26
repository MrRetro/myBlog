/**
 * User: retro.
 * Time: 26/11/18
 */

const {query} = require('./sql.js')

// 注册用户
exports.insertData = (value) => {
  let _sql = 'insert into users set name=?,pass=?,avator=?,moment=?;'
  return query(_sql, value)
}
// 删除用户
exports.deleteData = (name) => {
  let _sql = `delete from users where name="${name}";`
  return query(_sql)
}
// 查找用户
exports.queryData = (name) => {
  let _sql = `select * from users where name="${name}";`
  return query(_sql)
}
// 查找所有
exports.queryAllData = (name) => {
  let _sql = `select * from users;`
  return query(_sql)
}
