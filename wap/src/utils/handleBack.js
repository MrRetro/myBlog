/**
 * User: puti.
 * Time: 2018/6/26 上午11:30.
 */
// import {RouteUtil} from './routeUtil';
// import {ddApi} from '../api/dingding';
// import {AlertUtil} from './AlertUtil';


export class BackHandler {

  static isFirstAddListener = true;

  /**
   * 处理钉钉返回事件
   */
  static configDingDing() {
    dd.ready(() => {
      if (dd.ios) {
        dd.biz.navigation.setLeft({
          control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
          text: '返回', // 控制显示文本，空字符串表示显示默认文本
          onSuccess() {
            // 统一转交处理
            BackHandler.handleBackAction();
          }
        });
      }
      if (dd.android && this.isFirstAddListener) {
        this.isFirstAddListener = false;
        document.addEventListener('backbutton', (e) => {
          e.preventDefault();
          // 统一转交处理
          BackHandler.handleBackAction();
        });
      }
    });
  }

  /**
   * 路由的实例
   * @type {null}
   */
  static routeInstance = null;

  /**
   * 返回监听事件
   * @type {null} (route)=>route.back()
   */
  static backListener = null;

  /**
   * 初始化
   * @param instance
   */
  static init(instance) {
    this.routeInstance = instance;
  }

  /**
   * 添加返回监听事件
   * @param listener
   */
  static addBackListener(listener) {
    this.backListener = listener;
  }

  static remove() {
    console.log('remove');
    this.backListener = null;
  }

  /**
   * 处理钉钉系统返回事件
   */
  static handleBackAction() {
    if (this.backListener) {
      this.backListener(this.routeInstance);
      return;
    }
    this.routeInstance.go(-1);
  }
}
