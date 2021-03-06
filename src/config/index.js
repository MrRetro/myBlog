/**
 * User: retro.
 * Time: 11/4/19
 */

const ENV = 'prod'

const appId = 'wxfa31699874ea5f4f'
const appSecret = '47de945a0478c005fd9257687f7c6e14'
// dev
const dev = {
  apiUrl: 'http://localhost:3008', // 请求接口地址
  whileUrl: 'http://localhost:8080', // 跨域白名单地址
  appId: appId,
  appSecret: appSecret
}

// prod
const prod = {
  apiUrl: 'https://api.o-wu.com', // 请求接口地址
  whileUrl: 'http://api.o-wu.com', // 跨域白名单地址
  appId: appId,
  appSecret: appSecret
}

const Conf = {
  dev,
  prod
}

exports.config = Conf[ENV]
