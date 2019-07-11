import {getSignatures} from '../api/login';
import {ddApi} from '../api/dingding';
import {BackHandler} from '../utils/handleBack';
import {RouteUtil} from '../utils/routeUtil';

/**
 * 配置钉钉
 * @param store
 */
export const authConfig = (store, dingUserId) => new Promise(async (resolve, reject) => {
  try {
    const res = await getSignatures();
    store.commit('user/changeConfig', res);
    dd.ready(() => {
      console.log('配置开始');
      dd.config({
        agentId: res.agentId, // 必填，微应用ID
        corpId: res.corpId, // 必填，企业ID
        timeStamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.noncestr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        type: 0, // 选填，0表示微应用的jsapi，1表示服务窗的jsapi，不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList: [
          'version',
          'device.notification.alert',
          'device.notification.confirm',
          'device.notification.prompt',
          'device.notification.vibrate',
          'device.accelerometer.watchShake',
          'device.accelerometer.clearShake',
          'device.notification.toast',
          'device.notification.actionSheet',
          'device.notification.showPreloader',
          'device.notification.hidePreloader',
          'biz.navigation.setLeft',
          'biz.navigation.setRight',
          'biz.navigation.setTitle',
          'device.connection.getNetworkType',
          'device.base.getWifiStatus',
          'biz.util.openLink',
          'biz.util.datepicker',
          'biz.util.timepicker',
          'biz.util.datetimepicker',
          'biz.navigation.goBack',
          'biz.navigation.goBack',
          'biz.navigation.close',
          'biz.navigation.setMenu',
          'biz.navigation.replace',
          'biz.util.previewImage',
          'biz.util.chosen',
          'biz.calendar.chooseOneDay',
          'biz.calendar.chooseDateTime',
          'biz.calendar.chooseHalfDay',
          'biz.calendar.chooseInterval',
          'ui.input.plain',
          'ui.progressBar.setColors',
          'ui.pullToRefresh.enable',
          'ui.pullToRefresh.disable',
          'ui.pullToRefresh.stop',
          'ui.webViewBounce.disable',
          'ui.webViewBounce.enable',
          'channel.permission.requestAuthCode',
          'device.notification.modal',
          'device.notification.extendModal',
          'biz.util.multiSelect',
          'biz.util.scan',
          'biz.navigation.setIcon',
          'device.nfc.nfcRead',
          'util.domainStorage.setItem',
          'util.domainStorage.getItem',
          'util.domainStorage.removeItem',
          'biz.util.share',
          'device.geolocation.get',
          'device.geolocation.start',
          'device.geolocation.stop',
          'device.geolocation.status',
          'device.base.getPhoneInfo',
          'device.base.getUUID',
          'device.base.getInterface',
          'device.launcher.checkInstalledApps',
          'device.launcher.launchApp',
          'biz.util.open',
          'biz.contact.choose',
          'biz.contact.chooseMobileContacts',
          'biz.user.get',
          'biz.util.uploadImage',
          'biz.ding.create',
          'biz.ding.post',
          'biz.telephone.call',
          'biz.telephone.showCallMenu',
          'biz.telephone.checkBizCall',
          'biz.telephone.quickCallList',
          'biz.contact.createGroup',
          'biz.map.locate',
          'biz.map.search',
          'biz.map.view',
          'biz.util.uploadImageFromCamera',
          'biz.customContact.multipleChoose',
          'biz.customContact.choose',
          'biz.contact.complexPicker',
          'biz.contact.departmentsPicker',
          'biz.contact.setRule',
          'biz.contact.externalComplexPicker',
          'biz.contact.externalEditForm',
          'biz.chat.pickConversation',
          'biz.intent.fetchData',
          'biz.chat.chooseConversationByCorpId',
          'biz.chat.openSingleChat',
          'biz.chat.toConversation',
          'biz.cspace.saveFile',
          'biz.cspace.preview',
          'biz.cspace.chooseSpaceDir',
          'biz.util.uploadAttachment',
          'biz.clipboardData.setData',
          'biz.chat.locationChatMessage',
          'device.audio.startRecord',
          'device.audio.stopRecord',
          'device.audio.onRecordEnd',
          'device.audio.download',
          'device.audio.play',
          'device.audio.pause',
          'device.audio.resume',
          'device.audio.stop',
          'device.audio.onPlayEnd',
          'device.audio.translateVoice',
          'biz.alipay.pay',
          'device.nfc.nfcWrite',
          'biz.util.encrypt',
          'biz.util.decrypt',
          'runtime.permission.requestOperateAuthCode',
          'biz.util.scanCard',
          'device.screen.rotateView',
          'device.screen.resetView'
        ] // 必填，需要使用的jsapi列表，注意：不要带dd。
      });
      dd.error((err) => {
        console.error('钉钉配置错误', err);
        // alert(`dd错误: ${JSON.stringify(err)}`);
        let elementById = document.getElementById('appSplashScreen');
        if (elementById) {
          // elementById.style.opacity = 0;
          elementById.remove();
          // setTimeout(() => elementById.remove(), 500);
        }
        RouteUtil.error(err);
        // reject({code: -1, message: `钉钉配置错误${JSON.stringify(err)}`});
        // AlertUtil.showToast({txt: `钉钉配置失败：${JSON.stringify(err)}`, type: 'error'});
      });
    });
    ddApi.bounceDisable();
    // 配置自定义返回
    BackHandler.configDingDing();
  } catch (e) {
    reject(e);
  }
  resolve(store.dispatch('user/getDingDingUserInfo', dingUserId));

});

