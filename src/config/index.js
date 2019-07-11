/**
 * User: retro.
 * Time: 11/4/19
 */

const ENV = 'dev'

// dev
const dev = {
  apiUrl: 'http://localhost:3008', // 请求接口地址
  whileUrl: 'http://localhost:8080' // 跨域白名单地址
}

// prod
const prod = {
  apiUrl: 'http://47.96.98.104:3008', // 请求接口地址
  whileUrl: 'http://47.96.98.104' // 跨域白名单地址
}

const Conf = {
  dev,
  prod
}

exports.config = Conf[ENV]
