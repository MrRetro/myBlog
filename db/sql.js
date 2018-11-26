var mysql = require('mysql')
var config = require('../config/mysql')

// 链接数据库配置参数
var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
})

// 链接mysql池,并操作数据库。这边要注意写法参考当前mysql版本里的readme
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

// 用户表
let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     password VARCHAR(100) NOT NULL COMMENT '密码',
     avator VARCHAR(100) NOT NULL COMMENT '头像',
     moment VARCHAR(100) NOT NULL COMMENT '注册时间',
     PRIMARY KEY ( id )
    );`

// 执行建表sql
let createTable = (sql) => {
  return query(sql, [])
}

// 创建用户表
createTable(users)

// 对数据库处理
exports.query = query
