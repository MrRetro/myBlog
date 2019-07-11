/**
 * User: puti.
 * Time: 2018/5/23 下午6:18.
 * @param id
 */
import {isFastExecute} from './commonUtil';


export class RouteUtil {
  static mInstance = null;
  static number = -1;
  static laskPushTime = 0;

  /**
   * 保存路由栈
   * @type {Array}
   */
  static stack = [];

  /**
   * 返回路由注册的名字所在的页面
   * @param name  根据名字返回
   * @param path  根据路径返回 优先根据路径查询
   */
  static back({name, path}) {
    let index = -1;
    if (path) {
      index = this.stack.findIndex(item => item.ROUTE_PATH === path);
    } else if (name) {
      index = this.stack.findIndex(item => item.ROUTE_NAME === name);
    }
    if (index === -1) {
      this.mInstance.go(-1);
    } else {
      this.mInstance.go(index + 1 - this.stack.length);
    }
  }

  static init(instance) {
    RouteUtil.mInstance = instance;
  }

  static main() {
    RouteUtil.replace({name: 'main'});
  }

  /**
   * 错误页面
   * @param message      错误信息
   * @param hideBtn      隐藏按钮
   * @param btnParams    按钮参数{title,click}
   */
  static error({message, hideBtn, btnParams}) {
    RouteUtil.push({name: 'error', params: {message, hideBtn, btnParams}});
  }

  /**
   * 通用列表页
   * @param type      类型enum (all, follow, sea, invalid)
   * @param module    模块 enum (customers, agents, clues, order)
   * @param onSuccess 选择回传数据
   * @param choose    是否选择模式
   * @param needBack  选择模式-是否返回
   */
  static searchList({module = 'customers', type = 'all', onSuccess, condition, choose = false, needBack = true, ...params}) {
    RouteUtil.push({name: 'searchList', params: {type, module, onSuccess, condition, choose, needBack, ...params}});
  }

  /**
   * 客户新建
   * @param id      可选,客户id
   * @param type    类型,enum['add','edit']
   * @param params  编辑参数
   * @param other   其它参数
   */
  static clientAdd({id, type = 'add', params, ...other} = {}) {
    RouteUtil.push({name: type === 'add' ? 'clientAdd' : 'clientEdit', params: {id, type, params, ...other}});
  }

  /**
   * 客户新建成功
   */
  static clientAddSuccess({name = '标题', id = 'id', ...params}) {
    RouteUtil.push({name: 'clientAddSuccess', params: {name, id, ...params}});
  }

  /**
   * 通用搜索
   * @param type 类型
   * @param module 模块
   * @param params 其它参数
   */
  static commonSearch({type, module, ...params}) {
    RouteUtil.push({name: 'commonSearch', params: {type, module, ...params}});
  }

  /**
   * 客户搜索结果
   * @param type 类型
   * @param key 搜索关键字
   * @param module 模块
   * @param params 其它参数
   */
  static commonSearchResult({type, module, key, ...params}) {
    RouteUtil.push({name: 'commonSearchResult', params: {type, module, key, ...params}});
  }

  /**
   * 通用详情页面
   * @param id     用户id
   * @param module 模块   enum['customers','agents','clues','order','followUpPlans']
   * @param type   类型   enum['all','sea','customer','agent','clue','follow']
   * @param BACK_ACTION  {name,path}
   * @param params
   */
  static commonDetail({id, module, type = 'all', BACK_ACTION = null, ...params}) {
    RouteUtil.push({name: 'commonDetail', params: {id, module, type, BACK_ACTION, ...params}});
  }

  /**
   * 详情更多
   * @param params   详情页的数据
   * @param id       id
   * @param module   模块
   * @param onSuccess
   */
  static commonDetailMore({id, module, params, onSuccess}) {
    RouteUtil.push({name: 'commonDetailMore', params: {id, module, params, onSuccess}});
  }

  /**
   * 跟进
   * @param id       id
   * @param module   模块
   * @param onSuccess 跟进成功回调
   * @param type      类型 enum(['add','edit'])
   * @param targetId   经纪人/客户/线索 id
   * @param targetName 经纪人/客户名字
   * @param planId     可选，计划页面跟进入口必传
   */
  static commonFollowUp({id, module, targetId, targetName, onSuccess, planId, type = 'add'}) {
    RouteUtil.push({name: 'commonFollowUp', params: {id, module, targetId, targetName, onSuccess, type, planId}});
  }

  /**
   * 询价
   * @param params   详情页的数据
   * @param id       id
   * @param module   模块
   * @param onSuccess 询价成功的回调
   * @param type      添加/编辑状态
   */
  static commonInquiry({id, module, params, type, onSuccess, ...etc}) {
    RouteUtil.push({name: 'commonInquiry', params: {id, module, params, type, onSuccess, ...etc}});
  }


  /**
   * 跟进统计
   * @param module  模块
   * @param type    类型
   */
  static commonPlanAll({module, type}) {
    RouteUtil.push({name: 'commonPlanAll', params: {module, type}});
  }

  /**
   * 跟进统计列表
   * @param module  模块
   * @param type    类型
   * @param id
   * @param date
   */
  static commonPlanList({module, type, id, date}) {
    RouteUtil.push({name: 'commonPlanList', params: {module, type, id, date}});
  }

  /**
   * 新建跟进统计
   * @param module  模块
   * @param type    类型
   */
  static commonPlanAdd({module, type, ...params}) {
    RouteUtil.push({name: 'commonPlanAdd', params: {module, type, ...params}});
  }

  /**
   * 变更记录
   * @param id
   */
  static changeList({id}) {
    RouteUtil.push({name: 'changeList', params: {id}});
  }

  /**
   * 跳入合同电子签字页面
   * @param id
   */
  static orderSign({onSuccess}) {
    RouteUtil.push({name: 'orderSign', params: {onSuccess}});
  }


  /**
   * 确认合同
   * @param params   参数
   * @param onSuccess 成功回调
   * @param id        订单id
   * @param state     订单状态
   */
  static orderConfirm({params, id, state, onSuccess}) {
    RouteUtil.push({name: 'orderConfirm', params: {params, state, id, onSuccess}});
  }

  /**
   * 合同订单 列表
   * @param params  参数待定
   */
  static orderList({id, module}) {
    RouteUtil.push({name: 'orderList', params: {id, module}});
  }


  /**
   * 报价详情
   * @param item  列表数据
   */
  static offerDetail({onSuccess, ...other}) {
    RouteUtil.push({name: 'offerDetail', params: {...other, onSuccess}});
  }

  /**
   * 签约-确认信息
   * @param params  详情的参数
   * @param onSuccess 成功的回调
   * */
  static contractConfirm({onSuccess, ...params}) {
    RouteUtil.push({name: 'contractConfirm', params: {...params, onSuccess}});
  }

  /**
   * 签约-合同资料
   * */
  static contractData({onSuccess, ...params}) {
    RouteUtil.push({name: 'contractData', params: {...params, onSuccess}});
  }

  /**
   * 签约-单据图片上传
   * */
  static contractUpload({onSuccess, ...params}) {
    RouteUtil.push({name: 'contractUpload', params: {...params, onSuccess}});
  }

  /**
   * 签约-成功
   * */
  static contractSuccess({onSuccess, ...params}) {
    RouteUtil.push({name: 'contractSuccess', params: {...params, onSuccess}});
  }

  /**
   * 线索新建 步骤一
   * @param customerId  客户id
   * @param onSuccess
   * @param type    是否选择
   * @param params
   */
  static clueAdd({customerId, onSuccess, type, ...params}) {
    // 如果有客户id,直接进入步骤3
    if (customerId) {
      this.clueAddThree({customerId, onSuccess, type, ...params});
    } else {
      // 没有客户id,进入步骤1
      RouteUtil.push({name: 'clueAdd', params: {onSuccess, type, ...params}});
    }
  }

  /**
   * 线索新建 步骤二
   */
  static clueAddTwo = ({info, data, ...params}) => {
    RouteUtil.push({name: 'clueAddTwo', params: {info, data, ...params}});
  }

  /**
   * 线索新建 步骤三
   * @param obj
   * @param customerId
   * @param onSuccess
   * @param type
   * @param params
   * @param method      [push]|[replace]
   */
  static clueAddThree = ({obj, customerId, onSuccess, type, ...params}, method = 'push') => {
    RouteUtil[method]({name: 'clueAddThree', params: {obj, customerId, onSuccess, type, ...params}});
  }

  /**
   * 编辑线索
   * @param obj
   */
  static clueEdit = ({id, onSuccess, ...params}) => {
    RouteUtil.push({name: 'clueEdit', params: {id, onSuccess, type: 'edit', ...params}});
  }

  /**
   * 线索跟踪
   */
  static clueDetailFollowUp() {
    RouteUtil.push({name: 'clueDetailFollowUp'});
  }


  /**
   * 线索询价
   */
  static clueDetailInquiry() {
    RouteUtil.push({name: 'clueDetailInquiry'});
  }

  /**
   * 线索新建成功
   */
  static clueAddSuccess({name, id, customerNo, ...params}) {
    RouteUtil.push({name: 'clueAddSuccess', params: {name, id, customerNo, ...params}});
  }

  /**
   * 线索搜索
   */
  static clueSearch() {
    RouteUtil.push({name: 'clueSearch'});
  }

  /**
   * 标记失效
   */
  static clueFailure({id, onSuccess}) {
    RouteUtil.push({name: 'clueFailure', params: {id, onSuccess}});
  }

  /**
   * 线索列表
   * @param module       模块
   * @param id           id
   * @param onSuccess    选择回调
   * @param type         类型  enum('choose','list')
   * @param isAll        是否线索全部线索
   */
  static clueList({module, id, onSuccess, isAll = false, type = 'list'}) {
    RouteUtil.push({name: 'clueList', params: {module, id, type, isAll, onSuccess}});
  }


  /**
   * 车型选择
   * @param onSuccess 选择成功回调
   * @param singleChoose 是否单选车型
   */
  static carModel({onSuccess, singleChoose = false}) {
    RouteUtil.push({name: 'carModel', params: {onSuccess, singleChoose}});
  }

  /**
   * 车系选择
   */
  static carSeriesChoose(item = {
    name: '奔驰',
    firstLetter: 'B',
    avatar: 'http://p7msyshs3.bkt.clouddn.com/FkubgFfNP61hIJr30QPObkaxqfPZ',
    status: 0,
    id: '4028817763951897016395190af30000',
    createTime: '2018-05-25 10:20:36',
    updateTime: '2018-05-25 10:20:07'
  }) {
    RouteUtil.push({name: 'carSeriesChoose', params: {...item}});
  }

  /**
   * 车型搜索
   * @param onSuccess 选择车型回调
   */
  static carModelSearch({onSuccess}) {
    RouteUtil.push({name: 'carModelSearch', params: {onSuccess}});
  }

  /**
   * 车型搜索结果
   */
  static carModelSearchList({text, onSuccess}) {
    RouteUtil.push({name: 'carModelSearchList', params: {text, onSuccess}});
  }


  /**
   * 车型选择
   */
  static carModelChoose(item = {
    name: '奔驰C级',
    avatar: 'http://p7msyshs3.bkt.clouddn.com/FgQyUqlbsWR0zaKReu02gAwukYdp',
    firmId: '402881776395d108016395d175740000',
    status: 0,
    id: '4028817763962279016396240d540001',
    createTime: '2018-05-25 15:12:15',
    updateTime: '2018-05-25 15:10:32'
  }) {
    RouteUtil.push({name: 'carModelChoose', params: {...item}});
  }

  /**
   * 跟进统计
   * */
  static planAll() {
    RouteUtil.push({name: 'planAll'});
  }

  /**
   * 统计列表
   * */
  static planList(item = {
    id: '',
    date
  }) {
    RouteUtil.push({name: 'planList', params: {...item}});
  }

  /**
   * 新建计划
   * */
  static planAdd({type, onSuccess}) {
    RouteUtil.push({name: 'planAdd', params: {type, onSuccess}});
  }


  /**
   * 新建成功
   * */
  static commonPlanAddSuccess(item = {
    name,
    id
  }) {
    RouteUtil.push({name: 'commonPlanAddSuccess', params: {...item}});
  }

  /**
   * 编辑计划
   * */
  static commonPlanEdit({id, type, onSuccess}) {
    RouteUtil.push({name: 'commonPlanEdit', params: {id, type, onSuccess}});
  }


  /**
   * 附件经纪人
   * */
  static nearAgent() {
    RouteUtil.push({name: 'nearAgent'});
  }

  /**
   * 协助开通
   * */
  static assistOpen() {
    RouteUtil.push({name: 'assistOpen'});
  }

  /**
   * 标记失效
   * */
  static markFailure() {
    RouteUtil.push({name: 'failure'});
  }

  /**
   * 编辑信息
   * @param id     经纪人id
   * @param params 经纪人参数
   * */
  static editInfo({id, params, ...other} = {}) {
    RouteUtil.push({name: 'editInfo', params: {id, params, ...other}});
  }

  /**
   * 编辑记录
   * */
  static editRecord() {
    RouteUtil.push({name: 'editRecord'});
  }

  /**
   * 二维码开通
   * */
  static qrcodeOpen() {
    RouteUtil.push({name: 'qrcodeOpen'});
  }

  /**
   * 订单新建 步骤一
   */
  static orderAddOne(params) {
    RouteUtil.push({name: 'orderAddOne', params});
  }

  /**
   * 订单新建 步骤二
   */
  static orderAddTwo = ({info, data1, ...params}) => {
    RouteUtil.push({name: 'orderAddTwo', params: {info, data1, ...params}});
  };

  /**
   * 订单新建 步骤二
   */
  static orderAddThree = ({data1, info, ...params}, method = 'push') => {
    RouteUtil[method]({name: 'orderAddThree', params: {data1, info, ...params}});
  };

  /**
   * 订单新建 步骤三
   */
  static orderAddFour = ({data1, ...params}, method = 'push') => {
    RouteUtil[method]({name: 'orderAddFour', params: {data1, ...params}});
  };

  /**
   * 订单新建 步骤四
   */
  static orderAdd = ({data1, data2, ...params}) => {
    RouteUtil.push({name: 'orderAdd', params: {data1, data2, ...params}});
  };

  /**
   *  取消订单
   */
  static orderCancel = ({id, onSuccess}) => {
    RouteUtil.push({name: 'orderCancel', params: {id, onSuccess}});
  };

  /**
   * 订单新建成功
   */
  static orderAddSuccess({
    name,
    id,
    customerNo,
    ...params
  }) {
    RouteUtil.push({name: 'orderAddSuccess', params: {name, id, customerNo, ...params}});
  }

  /**
   * 订单合同上传
   */
  static orderContactUpload({onSuccess}) {
    RouteUtil.push({name: 'orderAddUpload', params: {onSuccess}});
  }


  /**
   * 先建订单合同
   */
  static orderAdd({onSuccess}) {
    RouteUtil.push({name: 'orderAdd', params: {onSuccess}});
  }

  /**
   * 订单合同通用列表页
   * @param id         合同订单id
   * @param type       类型
   */
  static orderTabList({id, item}) {
    RouteUtil.push({name: 'orderTabList', params: {id, ...item}});
  }

  /**
   * 订单合同编辑
   */
  static orderEdit({id, onSuccess, ...params}) {
    RouteUtil.push({name: 'orderEdit', params: {id, onSuccess, ...params}});
  }

  /**
   * 订单编辑失败
   * @param id
   * @param items
   * @param onSuccess
   */
  static orderEditFail({info, items, onSuccess, ...params}) {
    RouteUtil.push({name: 'orderEditFail', params: {info, items, onSuccess, ...params}});
  }

  /**
   * 新建询价
   * */
  static inquiryAdd({type, onSuccess, ...params}) {
    RouteUtil.push({name: 'inquiryAdd', params: {type, onSuccess, ...params}});
  }

  /**
   * 编辑询价
   * */
  static inquiryEdit({id, onSuccess, ...params}) {
    RouteUtil.push({name: 'inquiryEdit', params: {id, onSuccess, ...params}});
  }

  /**
   * 新建报价
   * @param id
   * @param module
   * @param params
   * @param type
   * @param onSuccess
   * @param params
   * */
  static quotedAdd({id, module, params, type, onSuccess}) {
    RouteUtil.push({name: 'quotedAdd', params: {id, module, params, type, onSuccess}});
  }

  /**
   * 新建报价记录
   * @param id
   * @param module
   * @param params
   * @param type
   * @param onSuccess
   */
  static quotedRecordAdd({id, module, params, type, onSuccess, ...etc}) {
    RouteUtil.push({name: 'quotedRecordAdd', params: {id, module, params, type, onSuccess, ...etc}});
  }

  /**
   * 颜色选择步骤一
   * @param onSuccess
   * @param singleChoose
   */
  static colorSelect1({onSuccess, singleChoose = true, ...params}) {
    RouteUtil.push({name: 'clueColors1', params: {onSuccess, singleChoose, ...params}});
  }

  /**
   * 颜色选择步骤二
   * @param onSuccess
   * @param singleChoose
   */
  static colorSelect2({index, onSuccess, singleChoose = true, ...params}) {
    RouteUtil.push({name: 'clueColors2', params: {index, onSuccess, singleChoose, ...params}});
  }

  /**
   * 编辑个人中心
   * @param onSuccess
   */
  static clientEditInfo({ onSuccess = {}, ...params}) {
    RouteUtil.push({name: 'clientEditInfo', params: { onSuccess, ...params}});
  }

  /**
   * 订车单-完成提车
   * @param onSuccess
   */
  static orderFinishCar({ onSuccess = {}, id, ...params}) {
    RouteUtil.push({name: 'orderFinishCar', params: { onSuccess, id, ...params}});
  }

  static push(...params) {
    if (isFastExecute()) return;
    this.laskPushTime = Date.now();
    let param = params[0];
    if (param.params) {
      param.params.CREATE_TIME = Date.now();
    } else {
      param.params = {CREATE_TIME: Date.now()};
    }
    console.log('跳转', params);
    if (this.mInstance) {
      this.mInstance.push(...params);
    } else if (this.$router) {
      this.$router.push(...params);
    } else {
      console.error('路由实例不存在');
    }
  }

  static replace(...params) {
    console.log('跳转', params);
    if (this.mInstance) {
      this.mInstance.replace(...params);
    } else if (this.$router) {
      this.$router.replace(...params);
    } else {
      console.error('路由实例不存在');
    }
  }
}
