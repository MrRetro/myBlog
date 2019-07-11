/* eslint-disable eqeqeq */

/**
 * 全局弹窗的工具类
 */
import {ddApi} from '../api/dingding';

export class AlertUtil {
  // 保存弹窗的实例
  static instances = {};
  static vueInstance = null;

  static saveInstance(type, instance) {
    this.instances[type] = instance;
  }

  static removeInstance(type) {
    this.instances[type] = null;
  }


  /**
   * 显示一个吐司
   * @param txt  文本
   * @param type loading/correct/error/warn
   * @param time 显示时间
   * @param mask 遮罩
   */
  static showToast({txt, type, time}) {
    ddApi.toast({duration: time, icon: type, text: txt});
  }


  /**
   * 显示图片预览
   * @param images      图片列表
   * @param activeIndex 活动索引
   */
  static showImageViewer({images, activeIndex}) {
    this.show('imageViewer', {images, activeIndex});
  }

  /**
   * 显示加载弹窗
   */
  static showLoading() {
    this.show('loading');
  }

  /**
   * 隐藏加载弹窗
   */
  static hideLoading() {
    this.hide('loading');
  }

  /**
   * 显示弹窗
   * @param tag
   * @param params
   */
  static show(tag, params) {
    console.log('alert', tag, params, this.instances);
    this.instances[tag] && this.instances[tag].show(params);
  }


  /**
   * 显示一个对话框
   * @param title      标题
   * @param message    消息
   * @param icon       图标
   */
  static showDialog({title, message, icon}) {
    this.instances.dialog && this.instances.dialog.show({title, message, icon});
  }

  /**
   * 显示输入框弹窗
   * @param hint
   * @param title
   * @param placeholder
   * @param onSuccess
   * @param type   类型
   */
  static showInputPop({hint, title, placeholder, onSuccess, type}) {
    this.instances.input && this.instances.input.show({hint, title, placeholder, onSuccess, type});
  }

  /**
   * 隐藏弹窗
   * @param type  传入type隐藏type,没传隐藏全部
   */
  static hide(type) {
    if (type) {
      this.instances[type] && this.instances[type].hide && this.instances[type].hide();
    } else {
      Object.keys(this.instances).forEach(item => this.instances[item].hide && this.instances[item].hide());
    }
  }

  /**
   * 判断是否为空
   * @param a
   * @returns {boolean}
   */
  static isEmpty(a) {
    try {
      let state = false;
      if (a === undefined) { // 只能用 === 运算来测试某个值是否是未定义的
        state = true;
      }

      if (a == null) { // 等同于 a === undefined || a === null
        state = true;
      }


      // String
      if (a == '' || a == null || a == undefined) { // "",null,undefined
        state = true;
      }
      if (!a) { // "",null,undefined,NaN
        state = true;
      }
      // if(!$.trim(a)){ // "",null,undefined
      //   state = true;
      // }

      // Array
      if (a.length == 0) { // "",[]
        state = true;
      }
      if (!a.length) { // "",[]
        state = true;
      }

      // Object {}
      // if($.isEmptyObject(a)){ // 普通对象使用 for...in 判断，有 key 即为 false
      //   console.log("为空");
      // }
      return state;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
