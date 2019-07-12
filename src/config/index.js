/**
 * User: retro.
 * Time: 11/4/19
 */

const ENV = 'prod'

// dev
const dev = {
  apiUrl: 'http://localhost:3008', // 请求接口地址
  whileUrl: 'http://localhost:8080' // 跨域白名单地址
}

// prod
const prod = {
  apiUrl: 'https://api.o-wu.com', // 请求接口地址
  whileUrl: 'http://api.o-wu.com' // 跨域白名单地址
}

const Conf = {
  dev,
  prod
}

exports.config = Conf[ENV]
