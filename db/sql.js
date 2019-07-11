var mysql = require('mysql')
var config = require('../config/mysql')

// 链接数据库配置参数
var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT,
  dateStrings: true
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

// 用户角色表
let ManageRole =
  `create table if not exists ManageRole(
      RoleID int(4) NOT NULL AUTO_INCREMENT COMMENT '1',
      RoleName varchar(100) DEFAULT NULL,
      RoleDesc varchar(500) DEFAULT NULL,
      AddDate datetime(6) DEFAULT NULL,
      ReleaseDate datetime(6) DEFAULT NULL,
      PRIMARY KEY (RoleID)
    );`

// 用户表
let ManageUser =
  `create table if not exists ManageUser(
      UserID int(4) NOT NULL AUTO_INCREMENT COMMENT '1',
      RoleID int(4) DEFAULT NULL,
      UserName varchar(100) DEFAULT NULL,
      UserPwd varchar(100) DEFAULT NULL,
      Avator varchar(255) DEFAULT NULL,
      RealName varchar(100) DEFAULT NULL,
      Tel varchar(100) DEFAULT NULL,
      Email varchar(100) DEFAULT NULL,
      AddDate datetime(6) DEFAULT NULL,
      ReleaseDate datetime(6) DEFAULT NULL,
      PRIMARY KEY (UserID)
    );`

// 用户登录/退出日志表
let ManageLoginLog =
  `create table if not exists ManageLoginLog(
      LogID int(4) NOT NULL AUTO_INCREMENT COMMENT '1',
      UserID int(4) DEFAULT NULL,
      StartTime datetime(6) DEFAULT NULL,
      ExitTime datetime(6) DEFAULT NULL,
      IP varchar(100) DEFAULT NULL,
      Remark varchar(1000) DEFAULT NULL,
      PRIMARY KEY (LogID)
    );`

// 文章表
let Article =
    `create table if not exists Article(
      ArticleID int(4) NOT NULL AUTO_INCREMENT COMMENT '1',
      TypeID int(4) DEFAULT NULL,
      ArticleName varchar(255) DEFAULT NULL,
      ArticleDesc varchar(4000) DEFAULT NULL,
      ArticleContent text CHARACTER SET utf8 COLLATE utf8_general_ci,
      UpLoadID varchar(100) DEFAULT NULL,
      SortID int(4) DEFAULT NULL,
      IsShow int(4) DEFAULT NULL,
      ViewCount int(4) DEFAULT NULL,
      MasterID int(4) DEFAULT NULL,
      AddDate datetime(6) DEFAULT NULL,
      ReleaseDate datetime(6) DEFAULT NULL,
      iLanguage int(4) DEFAULT NULL,
      PageTitle varchar(200) DEFAULT NULL,
      Keywords varchar(1000) DEFAULT NULL,
      Description varchar(1000) DEFAULT NULL,
      PRIMARY KEY (ArticleID)
    );`

// 文章类别表
let ArticleType =
    `create table if not exists ArticleType(
      TypeID int(4) NOT NULL AUTO_INCREMENT COMMENT '1',
      TypeName varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
      TypeDesc varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
      TypeContent text CHARACTER SET utf8 COLLATE utf8_general_ci,
      UpLoadID varchar(100) DEFAULT NULL,
      TypeLevel int(4) DEFAULT NULL,
      IsLeaf bit(2) DEFAULT NULL,
      IDTree varchar(100) DEFAULT NULL,
      ParentID int(4) DEFAULT NULL,
      SortID int(4) DEFAULT NULL,
      IsShow int(4) DEFAULT NULL,
      MasterID int(4) DEFAULT NULL,
      AddDate datetime(6) DEFAULT NULL,
      ReleaseDate datetime(6) DEFAULT NULL,
      iLanguage int(4) DEFAULT NULL,
      PageTitle varchar(200) DEFAULT NULL,
      Keywords varchar(1000) DEFAULT NULL,
      Description varchar(1000) DEFAULT NULL,
      PRIMARY KEY (TypeID) USING BTREE
    );`

// 执行建表sql
let createTable = (sql) => {
  return query(sql, [])
}

// 创建角色表
createTable(ManageRole)

// 创建用户表
createTable(ManageUser)

// 创建用户登录/退出日志表
createTable(ManageLoginLog)

// 创建文章表
createTable(Article)

// 创建文章类别表
createTable(ArticleType)

// 对数据库处理
exports.query = query
