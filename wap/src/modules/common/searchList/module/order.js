/**
 * User: puti.
 * Time: 2018/6/11 下午4:12.
 */
import {RouteUtil} from '../../../../utils/routeUtil';
import {ddApi} from '../../../../api/dingding';


export default {
  rightTitleParams: (vueInstance) => ({
    text: '新建',
    onSuccess: () => {
      ddApi.actionSheet(
        {
          'title': '选择',
          'cancelButton': '取消',
          'otherButtons': ['直接创建', '选择线索'],
          'onSuccess': (data) => {
            console.log(data, '---');
            let index = data.buttonIndex || data.value;
            if (data.buttonIndex === 0) {
              index = 0;
            }
            console.log(index, '---');
            switch (index) {
              case 0:
                console.log('直接创建');
                RouteUtil.orderAddOne({...vueInstance.$route.params, BACK_ACTION: {path: vueInstance.ROUTE_PATH}});
                break;
              case 1:
                console.log('选取线索');
                vueInstance.$RouteUtil.searchList({
                  module: 'clues',
                  type: 'all',
                  needBack: false,
                  choose: true,
                  condition: {fastScreening: ['1'], status: [1, 3]},
                  onSuccess: (res) => {
                    RouteUtil.orderAddOne({
                      ...vueInstance.params,
                      BACK_ACTION: {path: vueInstance.ROUTE_PATH},
                      clueInfo: res
                    });
                  }
                });
                break;
              default:
                break;
            }
          }
        }
      );
    }
  }),
  title: '合同',
  chooseTitle: '选择合同订单',
  totalText: '条合同订单',
  searchText: '搜索姓名/手机/备注名称',
  filterArray: ['orderSort',
    ['orderType', 'orderContractStatus', 'orderBelongPlaceId', 'orderBelongStoreId', 'orderCreateTime', 'orderResponsible', 'orderTeamwork']]
};
