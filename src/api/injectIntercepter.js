// import store from '../../store/index'
// import { getToken } from '../../utils/auth'
// import ErrorMessager from '../error/ErrorMessager'

// const TokenName = 'access_token'
export function inject (service, option) {
  // request拦截器
  service.interceptors.request.use(
    config => {
      if (!option || !option.withoutToken) {
        const url = config.url
        // console.log('retro04091513==>option', option);
        console.log('retro04091513==>config', config)
        let newurl = ''
        if (url.indexOf('?') !== -1) {
          newurl = `${url}`
        } else {
          newurl = `${url}`
        }
        config.url = newurl
        config.data = config.data || {}
      }
      return config
    },
    error => {
      // console.log('Request拦截器Error ==>', error);
      Promise.reject(error)
    }
  )
  // response拦截器
  service.interceptors.response.use(
    response => {
      console.log('Axios Response ==>', response)
      if (response.status === 200) {
        // return response.data;
        // 当返回的相应中有code才做进一步判断
        if (
          !response.data.code ||
          response.data.code === 200
        ) {
          return response.data
        } else {
          console.log('报错retro19211700==>', response)
          // 暂时不抛出异常,改为修改返回的消息文字
          const errorMessage = response.data
          /* return {
            ...response.data,
            message: errorMessage
          }; */
          // 抛出异常
          return Promise.reject(new Error(errorMessage))
        }
      } else {
        // response.data.message && Message.error(response.data.message);
        // 错误的响应码交由ErrorHandler处理
        errorHandler(response)
      }
      return Promise.reject(new Error('请求响应码错误!'))
    },
    error => {
      console.log(JSON.stringify(error))
      // 返回的异常统一交由错误处理器决定处理
      return errorHandler
        ? errorHandler(error.response)
        : Promise.reject(error)
    }
  )
}

const errorHandler = response => {
  console.log('错误的响应信息 ==>', response)
  if (!response || !response.status) {
    alert('服务器无响应,请检查您的网络状态!')
    return Promise.reject(new Error('服务器无响应,请检查您的网络状态!'))
  }
  console.log('响应异常 ==>', response)
  switch (response.status) {
    case 401:
      alert(new Error('Token失效,请重新登录'))
      break
    case 403:
      alert(new Error('您没有访问权限!'))
      break
    case 404:
      alert(new Error('404:访问的资源不存在!'))
      break
    case '401':
      alert(new Error('Token失效,请重新登录'))
      break
    case '403':
      alert(new Error('您没有访问权限!'))
      break
    case '404':
      alert(new Error('404:访问的资源不存在!'))
      break
    default:
      break
  }
}

export default inject
