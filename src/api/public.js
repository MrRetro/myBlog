// 通用型api
// import request from './request'
import axios from 'axios'
const {config} = require('../config') // 配置文件

// 文件上传 api 地址
export const ossUpload = () => {
  return axios.get(`${config.apiUrl}/auth/ali`, {})
}

export const uploadImg = (data, file) => {
  console.log('retro04102014==>', data)
  let ossConfig = data.data
  let uploadUrl = data.data.url
  let formData = new FormData()
  formData.append('OSSAccessKeyId', ossConfig.OSSAccessKeyId)
  formData.append('Signature', ossConfig.signature)
  formData.append('key', ossConfig.key)
  formData.append('policy', ossConfig.policy)
  formData.append('Content-Type', file.type)
  formData.append('file', file)
  return axios.post(uploadUrl, formData).then(res => {
    console.log('结果是==>', res)
    let res1 = {
      code: 0,
      data: {name: data.data.imgUrl},
      msg: ''
    }
    return Promise.resolve(res1)
  }).catch(err => {
    return err
  })
}
