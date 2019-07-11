import axios from 'axios'
import { inject } from './injectIntercepter'
import {config} from '../config'

const service = axios.create({
  baseURL: config.apiUrl, // api的base_url
  timeout: 30000 // 请求超时时间
})

inject(service)

export default service
