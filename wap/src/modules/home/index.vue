<template>
  <cube-scroll class="container">
    <div style="width:100%;">{{`name:${$store.state.user.name}+token:${$store.state.user.token}`}}</div>
    <div v-for="(item,index) in routes" :key="index">
      <div style="font-size: 20px;margin-top: 10px;">{{item.title}}</div>
      <div style="display: flex;flex-wrap: wrap">
        <div class="touch-opacity" v-for="(subItem,index) in item.routes" style="padding: 5px;" @click="handleClick(subItem)"
             :key="index">
          {{subItem.title}}{{subItem.todo && ' --待做'}}
        </div>
      </div>
    </div>
    <div class="touch-opacity">点击效果</div>
    <div style="height:100px"></div>
  </cube-scroll>
</template>

<script>
import {ddApi} from '../../api/dingding';
import {RouteUtil} from '../../utils/routeUtil';

export default {
  name: 'index',
  data() {
    return {
      form: 'fc',
      routes: [
        {
          title: '主页面',
          routes: [
            {
              title: '测试标题',
              click: () => {
                ddApi.setTitle({title: '我是标题'});
              }
            }, {
              title: '测试组件',
              click: () => {
                RouteUtil.push({name: 'ComponentTest'});
              }
            },
            {
              title: '选择线索',
              click: () => {
                RouteUtil.searchList({
                  module: 'clues',
                  type: 'all',
                  choose: true,
                  onSuccess: (data) => {
                    console.log('线索选择成功', data);
                    this.vl = data.id;
                    this.txt = data.name;
                    this.$emit('selClue', data);
                  }
                });
              }
            },
            {
              title: '测试右边按钮',
              click: () => {
                ddApi.setRight({
                  text: '测试',
                  show: true,
                  control: false,
                  onSuccess: () => {
                    console.log('eee', this);
                  }
                });
              }
            },
            {
              title: '测试右边menus',
              click: () => {
                ddApi.setMenu({
                  items: [
                    {id: '1', text: '我是1'},
                    {id: '2', text: '我是2'},
                    {id: '3', text: '我是3'},
                    {id: '4', text: '我是4'}
                  ],
                  onSuccess: (data) => {
                    console.log(data);
                  }
                });
              }
            },
            {
              title: '测试DingDing',
              click: () => this.$router.push({name: 'DingDing'})
            },
            {
              title: '测试弹窗',
              click: () => {
                ddApi.chosen({
                  source: [{key: '1', value: '男'}, {key: '2', value: '女'}],
                  onSuccess: (value) => {
                    console.log('onSuccess', value);
                  }
                });
              }
            },
            {
              title: '调用手机通讯录',
              click: () => {
                //= ===============
                console.log('通讯录');
                document.addEventListener('deviceready', () => {
                  console.log('你进来了！');
                  let list = this.getList();

                  let options = new ContactFindOptions();
                  let fields = ['displayName', 'phoneNumbers'];
                  if (filter) {
                    options.filter = filter;
                  } else {
                    options.filter = '';
                  }
                  options.multiple = true;

                  navigator.contacts.find(
                    fields,
                    (contacts) => {
                      console.log(`Found ${contacts.length} contacts.`);

                      let records = [];
                      for (let i = 0; i < contacts.length; i++) {
                        let obj = {
                          displayName: contacts[i].displayName,
                          phoneNumber: contacts[i].phoneNumbers[0].value
                        };
                        records.push(obj);
                      }
                      let store1 = new Ext.data.Store({
                        data: records,
                        fields: ['displayName', 'phoneNumber']
                      });
                      list.setStore(store1);
                    },
                    (contactError) => {
                      console.log('onError!');
                      console.log(contactError);
                    }, options);
                },
                false);
                //= ===============
              }
            },
            {
              title: '测试顏色选框',
              click: () => {
                this.$AlertUtil.show('chooseColor', {
                  selKey: 2,
                  colorList: [
                    {
                      name: '批次黑色',
                      colors: {size: 1, color: ['#fff', '#eedcdc']}
                    },
                    {
                      name: '批次黑色',
                      colors: {size: 2, color: ['#eee', '#b5b6b7']}
                    },
                    {
                      name: '批次黑色123',
                      colors: {size: 1, color: ['#fff', '#ffc8c5']}
                    },
                    {
                      name: '批次黑色',
                      colors: {size: 1, color: ['#fff', '#ffc8c5']}
                    },
                    {
                      name: '批次黑色',
                      colors: {size: 1, color: ['#fff', '#ffc8c5']}
                    },
                    {
                      name: '批次黑色',
                      colors: {size: 1, color: ['#fff', '#ffc8c5']}
                    },
                    {
                      name: '批次黑色',
                      colors: {size: 1, color: ['#fff', '#ffc8c5']}
                    }
                  ],
                  onSuccess: (data) => {
                    console.log(data);
                  }
                });
              }
            }
          ]
        },
        // {
        //   title: '测试页面',
        //   routes: [
        //     {
        //       title: '报价详情',
        //       click: ()=> this.$router.push({name: 'offerDetail'})
        //     }, {
        //       title: '确认合同',
        //       click: ()=> this.$router.push({name: 'orderConfirm'})
        //     }
        //   ]
        // },
        {
          title: '客户模块',
          routes: [
            {
              title: '详情',
              click: this.$RouteUtil.clientDetail
            },
            {
              title: '新建',
              click: this.$RouteUtil.clientAdd
            },
            {
              title: '更多',
              click: this.$RouteUtil.clientDetailMore
            },
            {
              title: '跟踪',
              click: this.$RouteUtil.clientDetailFollowUp
            },
            {
              title: '询价',
              click: this.$RouteUtil.clientDetailInquiry
            },
            {
              title: '新建成功',
              click: this.$RouteUtil.clientAddSuccess
            },
            {
              title: '搜索',
              click: this.$RouteUtil.clientSearch
            },
            {
              title: '签约-确认信息',
              click: this.$RouteUtil.contractConfirm
            },
            {
              title: '签约-合同资料',
              click: this.$RouteUtil.contractData
            },
            {
              title: '签约-单据图片上传',
              click: this.$RouteUtil.contractUpload
            },
            {
              title: '签约-创建成功',
              click: this.$RouteUtil.contractSuccess
            }
          ]
        },
        {
          title: '线索模块',
          routes: [
            {
              title: '详情',
              click: this.$RouteUtil.clueDetail
            },
            {
              title: '新建一',
              click: this.$RouteUtil.clueAdd
            },
            {
              title: '新建三',
              click: this.$RouteUtil.clueAddThree
            },
            {
              title: '跟踪',
              click: this.$RouteUtil.clueDetailFollowUp
            },
            {
              title: '询价',
              click: this.$RouteUtil.clueDetailInquiry
            },
            {
              title: '新建成功',
              click: this.$RouteUtil.clueAddSuccess
            },
            {
              title: '搜索',
              click: this.$RouteUtil.clueSearch
            },
            {
              title: '统计列表',
              click: () => this.$router.push({path: '/plan/planlist'})
            },
            {
              title: '标为失效',
              click: this.$RouteUtil.markFailure
            }
          ]
        },
        {
          title: '车型模块',
          routes: [
            {
              title: '选择车型',
              click: ()=>this.$RouteUtil.carModel({onSuccess: (item)=>{
                console.log(item);
              }})
            },
            {
              title: '车系列表',
              click: () => this.$RouteUtil.carSeriesChoose()
            },
            {
              title: '车型列表',
              click: () => this.$RouteUtil.carModelChoose()
            },
            {
              title: '车型搜索',
              click: () => this.$RouteUtil.carModelSearch()
            }
          ]
        }, {
          title: '跟进计划',
          routes: [
            {
              title: '跟进统计',
              click: this.$RouteUtil.planAll
            },
            {
              title: '统计列表',
              click: ()=>this.$RouteUtil.planList()
            },
            {
              title: '新建计划',
              click: this.$RouteUtil.planAdd
            },
            {
              title: '计划详情',
              click: this.$RouteUtil.planDetail
            }
          ]
        }, {
          title: '组件测试',
          routes: [
            {
              title: '测试',
              click: () => this.$router.push({name: 'ComponentTest'})
            }
          ]
        }, {
          title: '经纪人',
          routes: [
            {
              title: '附近经纪人',
              click: this.$RouteUtil.nearAgent
            },
            {
              title: '协助开通',
              click: this.$RouteUtil.assistOpen
            },
            {
              title: '编辑信息',
              click: this.$RouteUtil.editInfo
            },
            {
              title: '编辑记录',
              click: this.$RouteUtil.editRecord
            },
            {
              title: '二维码开通',
              click: this.$RouteUtil.qrcodeOpen
            }
          ]
        }
      ]
    };
  },
  methods: {
    requestAuthCode: () => {


      // dd.runtime.permission.requestAuthCode({
      //   corpId: 'ding7d0358e5937f35a535c2f4657eb6378f',
      //   onSuccess: (result)=>{
      //     // alert(JSON.stringify(result));
      //     console.log('requestAuthCode onSuccess', result);
      //
      //   },
      //   onFail(err) {
      //     alert(JSON.stringify(err));
      //     console.log('requestAuthCode onFail', err);
      //   }
      // });
    },
    alert: () => {
      console.log('---alert---', dd);
      dd.device.notification.alert({
        message: '亲爱的',
        title: '提示', // 可传空
        buttonName: '收到',
        onSuccess() {
          // onSuccess将在点击button之后回调
          /* 回调 */
        },
        onFail(err) {
          alert(JSON.stringify(err));
          console.log('alert onFail', err);
        }
      });
    },
    // 菜单返回
    onDraggingData(data) {
      console.log('data==>', data);
      this.dragData.menuData = data;
    },
    // 菜单收起
    onCloseMenu() {
      this.dragData.isShow = false;
    },
    // 选中菜单
    onSelectById(id) {
      console.log('选中id===>', id);
    },
    // 弹出菜单
    onChangeNav() {
      this.dragData.isShow = true;
    },
    handleClick(item) {
      item.click && item.click();
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .container
    position absolute
    top: px2rem(60)
    width 100%
    height: px2rem(530)
    font-size px2rem(16)

  .btn
    width 100%
    font-size px2rem(16)
</style>
