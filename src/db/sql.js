var mysql = require('mysql')
var config = require('../../config/mysql')

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
})

// exports.getUsers = () =>{
//   let list = [];
//   connection.connect()

//   connection.query('SELECT * from users', function (err, rows, fields) {
//     if (err) throw err

//     console.log('-----------------------------')
//     console.log(fields)
//     console.log('-----------------------------')
//     console.log('The solution is: ', rows[0].name)
//   })

//   connection.endß()
// }
let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}
// let query = (sql, values) => {
//   return new Promise((resolve, reject) => {
//     resolve('123')
//     connection.connect()
//     connection.query(sql, function (err, rows) {
//       try {
//         if (err) {
//           console.log('-------------------')
//           console.log(err)
//           reject(err)
//         } else {
//           resolve(rows)
//         }
//         connection.end()
//         console.log('第三方苏打粉')
//       } catch (e) { alert(e) }
//     })
//   })
// }

// let users =
//     `create table if not exists users(
//      id INT NOT NULL AUTO_INCREMENT,
//      name VARCHAR(100) NOT NULL COMMENT '用户名',
//      pass VARCHAR(100) NOT NULL COMMENT '密码',
//      avator VARCHAR(100) NOT NULL COMMENT '头像',
//      moment VARCHAR(100) NOT NULL COMMENT '注册时间',
//      PRIMARY KEY ( id )
//     );`

// let createTable = (sql) => {
//   return query(sql, [])
// }

// // 建表
// createTable(users)

// // 注册用户
// exports.insertData = (value) => {
//   let _sql = 'insert into users set name=?,pass=?,avator=?,moment=?;'
//   return query(_sql, value)
// }

// 查找用户
exports.findUserData = () => {
  let _sql = `select * from users`
  return query(_sql)
}
