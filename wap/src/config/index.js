/**
 * User: puti.
 * Time: 2018/5/18 上午10:43.
 */
import Vue from 'vue';
import './es5fix';
// 环境
// TODO 设置环境
const ENV = 'PROD';
// 是否运行在钉钉平台上
const RUN_IN_DD = false;
// 判断是不是开发环境
const DEV = ENV === 'DEV';
// const DEV = true;
// 判断是不是生产环境ƒ
const PROD = ENV === 'PROD';
// 判断是不是测试环境
const TEST = ENV === 'TEST';
// 判断是不是预发布环境
const PRE = ENV === 'PRE';
const BAST_HOST = {
  DEV: 'http://devzuul.erp.itsmycar.cn',
  // DEV: 'http://192.168.10.200:8169',
  // DEV: 'http://192.168.10.200:7201',
  TEST: 'http://testzuul.erp2.itsmycar.cn:7777',
  // TEST: 'http://192.168.10.210:7201',
  PRE: 'https://pre.api.erp.yiautos.com',
  PROD: 'https://api.erp.yiautos.com'
};
const HOST = {
  // 系统模块
  SYS_IP: {
    DEV: `${BAST_HOST.DEV}/authorize`,
    PROD: `${BAST_HOST.PROD}/zuul/authorize`,
    TEST: `${BAST_HOST.TEST}/zuul/v1-0-0/authorize`,
    PRE: `${BAST_HOST.PRE}/authorize`
  },
  // CRM模块
  CRM_IP: {
    DEV: `${BAST_HOST.DEV}/v1-2-20/crm`,
    // DEV: 'http://192.168.10.200:8169',
    PROD: `${BAST_HOST.PROD}/zuul/crm`,
    PRE: `${BAST_HOST.PRE}/crm`,
    // todo 需要跟后端分支同步
    TEST: `${BAST_HOST.TEST}/zuul/v1-0-0/crm`
  },
  // erp模块
  ERP_IP: {
    DEV: `${BAST_HOST.DEV}/erp`,
    // DEV: 'http://192.168.10.200:8169',
    PROD: `${BAST_HOST.PROD}/zuul/erp`,
    PRE: `${BAST_HOST.PRE}/erp`,
    // todo 需要跟后端分支同步
    TEST: `${BAST_HOST.TEST}/v2-4-0/erp`
  },
  // 车型模块
  CAR_IP: {
    DEV: `${BAST_HOST.DEV}/models`,
    PROD: `${BAST_HOST.PROD}/zuul/models`,
    PRE: `${BAST_HOST.PRE}/models`,
    TEST: `${BAST_HOST.TEST}/zuul/models`
  },
  CONFIG_URL: {
    DEV: 'http://dev.erp.itsmycar.cn/waperp/',
    PROD: 'https://wap.erp.yiautos.com/',
    PRE: 'https://pre.wap.erp.yiautos.com/',
    TEST: 'http://test.erp2.itsmycar.cn:7777/waperp/'
  },
  BASE_IP: {
    DEV: `${BAST_HOST.DEV}/v1-4-0/base`,
    PROD: `${BAST_HOST.PROD}/zuul/base`,
    PRE: `${BAST_HOST.PRE}/base`,
    TEST: `${BAST_HOST.TEST}/zuul/v1-0-0/base`
  },
  AUTH_IP: {
    DEV: 'http://devoauth.erp.itsmycar.cn/oauth/',
    // DEV: 'http://192.168.10.200:7101/oauth',
    PROD: 'https://oauth.erp.yiautos.com/oauth/',
    PRE: 'https://pre.oauth.erp.yiautos.com/oauth/',
    TEST: 'http://testoauth.erp2.itsmycar.cn:7777/oauth/'
    // TEST: 'http://192.168.10.210:7101/oauth/'
  }
};

export const SHARE_URL = 'http://event.itsmycar.cn/erp-redirect/public/';

export const SYS_IP = HOST.SYS_IP[ENV];
export const CRM_IP = HOST.CRM_IP[ENV];
export const ERP_IP = HOST.ERP_IP[ENV];
export const CAR_IP = HOST.CAR_IP[ENV];
export const CONFIG_URL = HOST.CONFIG_URL[ENV];
export const BASE_IP = HOST.BASE_IP[ENV];
export const AUTH_IP = HOST.AUTH_IP[ENV];
export const QINIU_HOST = 'http://p831g0sg5.bkt.clouddn.com/'; // 七牛图片访问路径前缀

// // 取消Vue所有的日志
Vue.config.silent = PROD;
// Vue.config.performance = DEV;
// // 正式环境关闭所有的日志
if (PROD) {
  window.console = {
    info: () => {
    },
    log: () => {
    },
    warn: () => {
    },
    error: () => {
    }
  };
}


export {
  DEV,
  PROD,
  HOST,
  TEST,
  RUN_IN_DD,
  ENV,
  PRE
};
