/**
 * User: retro.
 * Time: 2018/5/21
 */
import {RUN_IN_DD} from '../config';
import {AlertUtil} from '../utils/AlertUtil';
import {isFastExecute, isDevice} from '../utils/commonUtil';

let vuex = null;
let vue = null;
export const setVuex = (a) => {
  vuex = a;
};
export const setVue = (a) => {
  vue = a;
};

// 获取钉钉API
export const ddApi = {
  // 弹窗alert
  alert: obj => dd.ready(() => dd.device.notification.alert(obj)),
  // 禁用弹性效果
  bounceDisable: () => dd.ready(() => dd.ui.webViewBounce.disable()),
  // 启动弹性效果
  bounceEnable: () => dd.ready(() => dd.ui.webViewBounce.enable()),
  // 返回取消的弹窗confirm
  editConfirm: ({message = '确认放弃此次编辑', title = '', buttonLabels = ['取消', '是的'], onSuccess, ...params}) => {
    if (!RUN_IN_DD) {
      AlertUtil.showToast({txt: '直接放弃'});
      onSuccess({buttonIndex: 1});
    }
    return dd.ready(() => {
      dd.device.notification.confirm({message, title, buttonLabels, ...params, onSuccess});
    });
  }, // 弹窗confirm
  confirm: ({message = '确认放弃此次编辑', title = '', buttonLabels = ['取消', '是的'], onSuccess, ...params}) => {
    // onSuccess({
    //   buttonIndex: 1,
    // });
    return dd.ready(() => {
      dd.device.notification.confirm({message, title, buttonLabels, ...params, onSuccess});
    });
  },
  // 弹窗prompt
  prompt: ({title,buttonLabels,onSuccess,...params}) => {
    if (!RUN_IN_DD) {
      AlertUtil.showToast({txt: '转交理由'});
      onSuccess({value: '转交理由'});
    }
    return dd.ready(() => {
      dd.device.notification.prompt({title,buttonLabels,onSuccess,...params});
    });
  },
  // 震动
  vibrate: (obj) => {
    return dd.ready(() => {
      dd.device.notification.vibrate(obj);
    });
  },
  // 启动摇一摇
  watchShake: (obj) => {
    return dd.ready(() => {
      dd.device.accelerometer.watchShake(obj);
    });
  },
  // 停止摇一摇
  clearShake: (obj) => {
    return dd.ready(() => {
      dd.device.accelerometer.clearShake(obj);
    });
  },
  // 打开附件
  open: (obj) => {
    return dd.ready(() => {
      dd.biz.util.open(obj);
    });
  },
  // 打开外部URL
  openLink: (obj) => {
    return dd.ready(() => {
      dd.biz.util.openLink(obj);
    });
  },
  /**
   * 分享
   * @param type 分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
   * @param url  地址
   * @param title 标题
   * @param content 内容
   * @param image 图片
   * @param onSuccess 成功回调
   * @param onFail
   * @returns {*}
   */
  share: ({type = '1', url, title, content, image, onSuccess, onFail}) => {
    console.log('分享地址', url);
    return dd.ready(() => {
      dd.biz.util.share({type, url, title, content, image, onSuccess, onFail});
    });
  },
  // UT打点
  ut: (obj) => {
    return dd.ready(() => {
      dd.biz.util.ut(obj);
    });
  },

  /**
   * 日期选择器
   * @param format
   * @param onSuccess
   * @param isTime
   * @param params
   * @returns {DatePicker}
   * @param min  最小值
   * @param max  最大值
   */
  datepicker: ({format = 'yyyy-MM-dd HH:mm:ss', min = new Date(2008, 7, 8), max = new Date(2025, 9, 20), onSuccess, isTime = false, ...params}) => {
    console.log('params', format);
    let datePicker = vue.$createDatePicker({
      title: '',
      min,
      max,
      value: params.value ? new Date(params.value.split('-')[0], params.value.split('-')[1] - 1, params.value.split('-')[2])
        : new Date(),
      onSelect: (arg1, arg2) => {
        console.log(arg2);
        console.log(isTime);
        onSuccess({value: `${arg2[0]}-${arg2[1] < 10 ? '0' : ''}${arg2[1]}-${arg2[2] < 10 ? '0' : ''}${arg2[2]}`});
      }
    });
    datePicker.show();
    return datePicker;
    // return dd.ready(() => {
    //   dd.biz.util.datepicker({
    //     format,
    //     onSuccess,
    //     ...params
    //   });
    // });
  },
  // 时间选择器
  timepicker: (obj) => {
    return dd.ready(() => {
      dd.biz.util.timepicker(obj);
    });
  },
  // 设置左侧导航 仅支持ios
  setLeft: (obj) => {
    return dd.ready(() => {
      dd.biz.navigation.setLeft(obj);
    });
  },
  // 设置右侧导航
  setRight: ({text = ' ', show = true, onSuccess, onFail, control = true, auth} = {}) => {
    if (auth && !vuex.state.user.userAuths[auth]) {
      text = ' ';
    }
    if (text.trim() === '') {
      onSuccess = () => {
      };
    }
    !RUN_IN_DD && vuex && vuex.commit('nav/setRight', {control, text, show, onSuccess, onFail});
    return dd.ready(() => {
      dd.biz.navigation.setRight({control, show, text, onSuccess, onFail});
    });
  },
  // 设置标题
  setTitle: ({title = ' '} = {}) => {
    !RUN_IN_DD && vuex && vuex.commit('nav/setTitle', {title});
    return dd.ready(() => {
      dd.biz.navigation.setTitle({title});
    });
  },
  // 页面后退
  back: (obj) => {
    return dd.ready(() => {
      dd.biz.navigation.back(obj);
    });
  },

  /**
   *
   * @param icon icon样式，有success和error，默认为空 0.0.2
   * @param text 提示信息
   * @param duration 显示持续时间，单位秒，默认按系统规范[android只有两种
   * @returns {*}
   */
  toast: ({icon, text, duration = 2}) => {
    !RUN_IN_DD && vue.$createToast({txt: text, type: icon, time: duration * 1000}).show();
    let type = '';
    if (icon === 'success' || icon === 'correct') {
      type = 'success';
    }
    if (icon === 'error') {
      type = 'error';
    }
    return dd.ready(() => {
      dd.device.notification.toast({icon: type, text, duration});
    });
  },
  // 显示loading
  showPreloader: (obj) => {
    return dd.ready(() => {
      dd.device.notification.showPreloader(obj);
    });
  },
  // 隐藏loading
  hidePreloader: (obj) => {
    return dd.ready(() => {
      dd.device.notification.hidePreloader(obj);
    });
  },

  /**
   * 获取经纬度
   * @param targetAccuracy  经度 200米
   * @param withReGeocode   是否需要带有逆地理编码信息
   * @param useCache        是否缓存地理位置信息。默认是true。如果true，客户端会对定位的地理位置信息缓存，在缓存期内（2分钟）再次定位会返回旧的定位
   * @param coordinate      1：获取高德坐标， 0：获取标准坐标；
   * @param onSuccess       成功回调
   * @returns {*}
   */
  getLocation: ({targetAccuracy = 200, withReGeocode = true, useCache = true, coordinate = 1, onSuccess}) => {
    !RUN_IN_DD && onSuccess({
      latitude: 24.503,
      longitude: 118.163
    });
    return dd.ready(() => {
      dd.device.geolocation.get({targetAccuracy, coordinate, withReGeocode, useCache, onSuccess});
    });
  },
  // 上传图片(单图)
  uploadImage: (obj) => {
    return dd.ready(() => {
      dd.biz.util.uploadImage(obj);
    });
  },

  /**
   * 浏览图片
   * @param urls       显示的图片列表
   * @param current    当前的图片地址
   * @return {*}
   */
  previewImage: ({urls, current}) => {
    !RUN_IN_DD && AlertUtil.showImageViewer({images: urls, activeIndex: urls.findIndex(item => current === item)});
    return dd.ready(() => {
      dd.biz.util.previewImage({urls, current});
    });
  },
  // ui.input.plain
  plain: (obj) => {
    return dd.ready(() => {
      dd.ui.input.plain(obj);
    });
  },
  // actionSheet
  actionSheet: (obj) => {
    !RUN_IN_DD && vue && vue.$createPicker({
      data: [obj.otherButtons.map((item, index) => ({text: item, value: index}))],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        console.log('------------------');
        console.log(selectedVal);
        console.log(selectedIndex);
        console.log(selectedText);
        console.log('------------------');
        obj.onSuccess({key: selectedText[0], value: selectedVal[0]});
      }
    }).show();
    return dd.ready(() => {
      dd.device.notification.actionSheet(obj);
    });
  },
  // 网络类型
  getNetworkType: (obj) => {
    return dd.ready(() => {
      dd.device.connection.getNetworkType(obj);
    });
  },
  // 发钉(应用内类型)
  post: (obj) => {
    return dd.ready(() => {
      dd.biz.ding.post(obj);
    });
  },
  // 打电话
  call: (obj) => {
    return dd.ready(() => {
      dd.biz.telephone.call(obj);
    });
  },
  // 创建企业群聊天
  createGroup: (obj) => {
    return dd.ready(() => {
      dd.biz.contact.createGroup(obj);
    });
  },
  // 日期+时间选择器
  datetimepicker: (obj) => {
    return dd.ready(() => {
      dd.biz.util.datetimepicker(obj);
    });
  },
  // 下拉组件
  chosen: (obj) => {
    if (isFastExecute()) return;
    console.log(obj, '======>obj');
    if (isDevice('ios') || !RUN_IN_DD) {
      vue.$createPicker({
        data: [obj.source.map(item => ({text: item.key, value: item.value}))],
        onSelect: (selectedVal, selectedIndex, selectedText) => {
          console.log('------------------');
          console.log(selectedVal);
          console.log(selectedIndex);
          console.log(selectedText);
          console.log('------------------');
          obj.onSuccess({key: selectedText[0], value: selectedVal[0]});
        }
      }).show();
    } else {
      dd.ready(() => {
        dd.biz.util.chosen(obj);
      });
    }
  },
  // 获取通用唯一识别码
  getUUID: (obj) => {
    return dd.ready(() => {
      dd.device.base.getUUID(obj);
    });
  },
  // 获取热点接入信息
  getInterface: (obj) => {
    return dd.ready(() => {
      dd.device.base.getInterface(obj);
    });
  },
  // 检测应用是否安装
  checkInstalledApps: (obj) => {
    return dd.ready(() => {
      dd.device.launcher.checkInstalledApps(obj);
    });
  },
  // 启动第三方app
  launchApp: (obj) => {
    return dd.ready(() => {
      dd.device.launcher.launchApp(obj);
    });
  },
  // 设置进度条颜色
  setColors: (obj) => {
    return dd.ready(() => {
      dd.ui.progressBar.setColors(obj);
    });
  },
  // 启用下拉刷新功能
  enable: (obj) => {
    return dd.ready(() => {
      dd.ui.pullToRefresh.enable(obj);
    });
  },
  // 收起下拉刷新控件
  stop: (obj) => {
    return dd.ready(() => {
      dd.ui.pullToRefresh.stop(obj);
    });
  },
  // 禁用下拉刷新功能
  disable: (obj) => {
    return dd.ready(() => {
      dd.ui.pullToRefresh.disable(obj);
    });
  },
  // 启用webview
  webViewBounce: {
    // 启用webview下拉弹性效果
    enable: (obj) => {
      return dd.ready(() => {
        dd.ui.webViewBounce.enable(obj);
      });
    },
    // 禁用webview下拉弹性效果
    disable: (obj) => {
      return dd.ready(() => {
        dd.ui.webViewBounce.disable(obj);
      });
    }
  },
  // 地图搜索
  search: ({latitude, longitude, onSuccess}) => {
    !RUN_IN_DD && onSuccess({longitude: 118.09547, latitude: 24.57491});
    return dd.ready(() => {
      dd.biz.map.search({latitude, longitude, scope: 50000000, onSuccess});
    });
  },
  // 地图定位
  locate: (obj) => {
    return dd.ready(() => {
      dd.biz.map.locate(obj);
    });
  },
  // 地图预览
  view: (obj) => {
    return dd.ready(() => {
      dd.biz.map.view(obj);
    });
  },
  // 扫码
  scan: (obj) => {
    return dd.ready(() => {
      dd.biz.util.scan(obj);
    });
  },
  // 企业通讯录选人
  choose: (obj) => {
    !RUN_IN_DD && vue && vue.$AlertUtil.show('choose', obj);
    return dd.ready(() => {
      dd.biz.contact.choose(obj);
    });
  },
  // 企业通讯录同时选人，选部门
  complexChoose: (obj) => {
    // let isUsers = true;
    // obj.onSuccess(isUsers?
    //   {selectedCount: 1, users: [{name: "陈燕东", avatar: "", emplId: "160152352437894959"}], departments: []}:
    //   {selectedCount: 11, users: [], departments: [{id: 69061279, name: "打杂部", number: 11}]}
    // )
    return dd.ready(() => {
      dd.biz.contact.complexChoose(obj);
    });
  },
  // 选群组
  pickConversation: (obj) => {
    return dd.ready(() => {
      dd.biz.chat.pickConversation(obj);
    });
  },
  // 弹层
  modal: (obj) => {
    return dd.ready(() => {
      dd.device.notification.modal(obj);
    });
  },
  // 设置导航icon
  setIcon: (obj) => {
    return dd.ready(() => {
      dd.biz.navigation.setIcon(obj);
    });
  },
  // 关闭webview
  close: (obj) => {
    return dd.ready(() => {
      dd.biz.navigation.close(obj);
    });
  },
  // 上传照片（限制只能拍照）
  uploadImageFromCamera: (obj) => {
    return dd.ready(() => {
      dd.biz.util.uploadImageFromCamera(obj);
    });
  },
  // 打开Gps设置 仅支持android
  openGps: (obj) => {
    return dd.ready(() => {
      dd.device.geolocation.openGps(obj);
    });
  },
  // 检测是否安装微应用
  checkInstalled: (obj) => {
    return dd.ready(() => {
      dd.internal.microapp.checkInstalled(obj);
    });
  },
  // 可扩展弹层
  extendModal: (obj) => {
    return dd.ready(() => {
      dd.device.notification.extendModal(obj);
    });
  },
  // 自定义
  customContact: {
    // 自定义选人控件（多选）
    multipleChoose: ({
      title = '人员选择', max = 5, users = vuex.state.user.users, corpId = vuex.state.user.config.corpId, disabledUsers = [],
      isShowCompanyName = true, onSuccess, onFail
    }) => {
      if (isFastExecute()) return;
      !RUN_IN_DD && vue && vue.$AlertUtil.show('choose', {
        personList: users.map(item => ({
          ...item,
          emplId: item.dingUserId
        })),
        multiple: true,
        max,
        disabledUsers,
        onSuccess
      });
      dd.ready(() => {
        dd.biz.customContact.multipleChoose({
          title,
          max,
          users: users.map(item => item.dingUserId),
          corpId,
          disabledUsers,
          isShowCompanyName,
          onSuccess,
          onFail
        });
      });
    },
    // 自定义选人控件
    choose: ({
      title = '人员选择', users = vuex.state.user.users, corpId = vuex.state.user.config.corpId, disabledUsers = [],
      isShowCompanyName = true, onSuccess, onFail
    }) => {
      if (isFastExecute()) return;
      !RUN_IN_DD && vue && vue.$AlertUtil.show('choose', {
        personList: users.map(item => ({
          ...item,
          emplId: item.dingUserId
        })),
        disabledUsers,
        onSuccess
      });
      dd.ready(() => {
        dd.biz.customContact.choose({
          title,
          users: users.map(item => item.dingUserId),
          corpId,
          isShowCompanyName,
          disabledUsers,
          onSuccess,
          onFail
        });
      });
    }
  },
  // 根据corpId选择会话(2.6新增)
  chooseConversationByCorpId: (obj) => {
    return dd.ready(() => {
      dd.biz.chat.chooseConversationByCorpId(obj);
    });
  },
  // 根据chatId调整到对应会话(2.6新增)
  toConversation: (obj) => {
    return dd.ready(() => {
      dd.biz.chat.toConversation(obj);
    });
  },
  // 返回上一步
  goBack: (obj) => {
    return dd.ready(() => {
      dd.biz.navigation.goBack(obj);
    });
  },
  // 上传附件
  uploadAttachment: (obj) => {
    return dd.ready(() => {
      dd.biz.util.uploadAttachment(obj);
    });
  },
  // setMenu
  setMenu: ({items, onSuccess}) => {
    !RUN_IN_DD && vuex && vuex.commit('nav/setMenus', {items, onSuccess});
    return dd.ready(() => {
      dd.biz.navigation.setMenu({items, onSuccess});
    });
  },
  /**
   * 弹窗一个menu弹窗
   * @param items
   * @param onSuccess
   */
  setPopMenu: ({items, onSuccess}) => {
    AlertUtil.show('menu', {items, onSuccess});
  },

  /**
   * 拨打电话
   * @param phoneNumber
   * @param code
   * @param showDingCall
   * @returns {*}
   */
  showCallMenu: ({phoneNumber, code = '+86', showDingCall = true}) => {
    !RUN_IN_DD && alert(`拨打电话:${phoneNumber}`);
    return dd.ready(() => {
      dd.biz.telephone.showCallMenu({phoneNumber, code, showDingCall});
    });
  },
  // 本地存储（区分域名）读
  getItem: (obj) => {
    return dd.ready(() => {
      dd.util.domainStorage.getItem(obj);
    });
  },
  // 本地存储（区分域名）写
  setItem: (obj) => {
    return dd.ready(() => {
      dd.util.domainStorage.setItem(obj);
    });
  },
  // 本地存储（区分域名）删除
  removeItem: (obj) => {
    return dd.ready(() => {
      dd.util.domainStorage.removeItem(obj);
    });
  },
  // 选人+选部门
  complexPicker: (obj) => {
    return dd.ready(() => {
      dd.biz.contact.complexPicker(obj);
    });
  },
  // 选取手机通讯录
  chooseMobileContacts: (obj) => {
    !RUN_IN_DD && vue && vue.$AlertUtil.show('chooseMobile', obj);
    if (isFastExecute()) return;
    dd.ready(() => {
      dd.biz.contact.chooseMobileContacts(obj);
    });
  },
  // 选部门
  departmentsPicker: (obj) => {
    return dd.ready(() => {
      dd.biz.contact.departmentsPicker(obj);
    });
  },
  // 打开某个用户的聊天页面，如果没有，创建会话
  openSingleChat: (obj) => {
    return dd.ready(() => {
      dd.biz.chat.openSingleChat(obj);
    });
  },
  // 打开DING、任务、会议界面
  create: (obj) => {
    return dd.ready(() => {
      dd.biz.ding.create(obj);
    });
  },
  // 唤起人脸录入界面
  startCameraRecordFromPartner: (obj) => {
    return dd.ready(() => {
      dd.biz.faceBox.startCameraRecordFromPartner(obj);
    });
  },
  // 设置屏幕亮度和高度
  setScreenBrightnessAndKeepOn: (obj) => {
    return dd.ready(() => {
      dd.biz.util.setScreenBrightnessAndKeepOn(obj);
    });
  },
  // 获取用户信息
  getUserInfo: (obj) => {
    return dd.ready(() => {
      dd.biz.user.get(obj);
    });
  },


  /**
   * 旋转屏幕
   * @param showStatusBar 否显示statusbar
   * @param clockwise  是否顺时针方向
   * @param onSuccess
   * @param onFail
   * @returns {*}
   */
  rotateView: ({showStatusBar = false, clockwise = true, onSuccess, onFail} = {}) => {
    return dd.ready(() => {
      dd.device.screen.rotateView({showStatusBar, clockwise, onSuccess, onFail});
    });
  },
  /**
   * 重置旋转屏幕
   * @param onSuccess
   * @param onFail
   * @returns {*}
   */
  resetView: ({onSuccess, onFail} = {}) => {
    return dd.ready(() => {
      dd.device.screen.resetView({onSuccess, onFail});
    });
  },

  /**
   * 复制到粘贴板
   * @param text       文本
   * @param onSuccess  成功回调
   * @returns {*}
   */
  setData: ({text = '', onSuccess}) => {
    !RUN_IN_DD && onSuccess && onSuccess();
    return dd.ready(() => {
      dd.biz.clipboardData.setData({text, onSuccess});
    });
  },
  // 下拉多选
  multiSelect: (obj) => {
    return dd.ready(() => {
      dd.biz.util.multiSelect(obj);
    });
  },
  // 获取省市区 all为真表示显示可选全省/全市 proCity为真表示只显示省市数据
  getAdress: async ({title = '省市区', selectAdress = [8, 7, 4], all = false, proCity = false, onSuccess}) => {
    console.log(vue.$store.state.user.addressList);
    if (vue.$store.state.user.addressList.length === 0) {
      await vue.$store.dispatch('user/getAddressList');
    }
    let data = JSON.parse(JSON.stringify(vue.$store.state.user.addressList));
    console.log(data);
    // 显示全省及全市可筛选
    if (all) {
      // 添加全省 全市
      data.forEach((item, index) => {
        // 给所有市加上全省
        if (!data[index].children) {
          data[index].children = [];
        }

        // 给所有区加上全市
        data[index].children.forEach((item1, index1) => {
          if (!data[index].children[index1].children) {
            data[index].children[index1].children = [];
          }
          data[index].children[index1].children.unshift({
            city: item.text,
            text: '全市',
            value: item1.value
          });
        });

        data[index].children.unshift(
          {
            province: item.text,
            text: '全省',
            value: item.value,
            children: [{
              city: '全省',
              text: '全市',
              value: item.value
            }]
          });
      });
    }
    // 只显现省市可以选择
    if (proCity) {
      data.forEach((item, index) => {
        if (!data[index].children) {
          data[index].children = [{
            province: item.text,
            text: item.text,
            value: item.value
          }];
        }

        // 删除所有区
        data[index].children.forEach((item1, index1) => {
          if (data[index].children[index1].children) {
            delete data[index].children[index1].children;
          }
        });
      });
    }

    let cascadePicker = vue.$createCascadePicker({
      title,
      data,
      selectedIndex: selectAdress,
      onSelect: onSuccess
    });
    cascadePicker.show();
    return cascadePicker;
  }
};
