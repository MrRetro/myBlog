
import request from '../utils/request';
import { ERP_IP} from '../config';

// 车辆到店
export function addCarArrival(params) {
  console.log('提交数据', params);
  return Promise.resolve();
  // return request({
  //   url: `${ERP_IP}/delivery/arrival`,
  //   method: 'post',
  //   data: params
  // });
}
// 多退少补页面数据
export function getRefundsDataById({ id }) {
  return request({
    url: `${ERP_IP}/delivery/addInfo/moreRetreat/${id}`,
    method: 'get'
  });
}
// 多退少补
export function addRefundsMoreRetreat(params) {
  return request({
    url: `${ERP_IP}/delivery/moreRetreat`,
    method: 'post',
    data: params
  });
}
// 获取客户收款历史数据
export function getReceivalHistoryDataById({ id }) {
  console.log('id==>', id);
  return Promise.resolve({otherIncome: '21312', licensePlateIncome: '111', carPrice: '212313', deposit: '21321'});
  // return request({
  //   url: `${ERP_IP}/delivery/history/receipt/${id}`,
  //   method: 'get'
  // });
}
// 新增客户收款
export function addReceival(params) {
  console.log('提交数据', params);
  return Promise.resolve();
  // return request({
  //   url: `${ERP_IP}/delivery/receipt`,
  //   method: 'post',
  //   data: params
  // });
}

// 获取调拨数据
export function allotInfo(id) {
  return request({
    url: `${ERP_IP}delivery/addInfo/allot/${id}`,
    method: 'get'
  });
}

// 申请调拨
export function deliveryAllot(data) {
  return request({
    url: `${ERP_IP}delivery/allot`,
    method: 'post',
    data
  });
}

// 收入小计
export function getLiveryIncome({ id }) {
  console.log('id==>', id);
  return Promise.resolve({totalIncome: '21321', otherInsurance: '111'});
  // return request({
  //   url: `${ERP_IP}delivery/income/${id}`,
  //   method: 'get'
  // });
}

// 成本小计
export function getLiveryCost({ id }) {
  console.log('id==>', id);
  return Promise.resolve({totalCost: '211111321', transfer: '121121'});
  // return request({
  //   url: `${ERP_IP}delivery/cost/${id}`,
  //   method: 'get'
  // });
}

// 获取服务商列表
export function getDeliveryService(params) {
  console.log('提交数据', params);
  return Promise.resolve([{
    serviceProviderId: '21321321',
    name: '厦门服务删账户',
    account: '212112121-21',
    accountName: '我是户名',
    bankOfDeposit: '厦门分行',
    serviceProviderType: {
      name: '精品商'
    }
  }]);
  // return request({
  //   url: `${ERP_IP}delivery/service/list`,
  //   method: 'post',
  //   data: params
  // });
}

// 完成交车表单提交
export function submitTransferComplete(params) {
  console.log('提交数据', params);
  return Promise.resolve();
  // return request({
  //   url: `${ERP_IP}delivery/complete`,
  //   method: 'POST',
  //   data: params
  // });
}

// 提交金融款项
export function submitFinanceFee(params) {
  console.log('提交数据', params);
  return Promise.resolve();
  // return request({
  //   url: `${ERP_IP}delivery/financialFund`,
  //   method: 'POST',
  //   data: params
  // });
}

// 提交其他费用
export function submitOtherFee(params) {
  console.log('提交数据', params);
  return Promise.resolve();
  // return ERP_IP + request({
  //   url: `${ERP_IP}delivery/batch/incidentals`,
  //   method: 'POST',
  //   data: params
  // });
}

