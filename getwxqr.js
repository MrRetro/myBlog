/**
 * User: retro.
 * Time: 12/7/19
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const bluebird = require('bluebird')
const axios = require('axios')
const WechatAPI = require('co-wechat-api')
const GlobalConfig = require('./src/config') //这里放了微信appid跟appSecret，文件没有引入进来，要用的时候，改一下吧。

const wxAppAPI = new WechatAPI(GlobalConfig.config.appId, GlobalConfig.config.appSecret)

function sha1(message) {
  return crypto.createHash('sha1').update(message, 'utf8').digest('hex')
}

module.exports = {

  async getWxaCodeUnlimit({ page, scene }) {
    // 图片文件名使用page和scene等数据生成Hash
    // 以避免重复生成内容相同的小程序码
    const fileName = scene + sha1(page + scene)
    const filePath = path.join(__dirname, `./upload/qr/${fileName}.png`)

    let readable

    try {
      console.log('正常流程==>')
      // 检测该名字的小程序码图片文件是否已存在
      await bluebird.promisify(fs.access)(filePath, fs.constants.R_OK);
      readable = fs.createReadStream(filePath)
    } catch (e) {
      console.log('异常流程==>',e)
      // 小程序码不存在，则创建一张新的
      const token = await wxAppAPI.ensureAccessToken()
      const response = await axios({
        method: 'post',
        url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit',
        responseType: 'stream',
        params: { access_token: token.accessToken },
        data: { page, scene }
      })
      readable = response.data
      readable.pipe(fs.createWriteStream(filePath))
    }

    // 返回该小程序码图片的文件流
    return `/qr/${fileName}.png`;
    // return readable;
  }

}
