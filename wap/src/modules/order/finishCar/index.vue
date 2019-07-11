<template>
  <div class="container">
    <div class="input-box2">
      <cube-scroll>
        <div class="content">
          <template v-for="(item,index) in form.data">
            <div v-if="item.attr === 'customerId'" :key="'index'+index" class="id-box" >
              <div
                :key="'index2'+index1"
                class="in-box"
                :class="{'self':item1.columnWidth===50}"
                v-for="(item1,index1) in form.info"
              >
                <yi-input
                  ref="info"
                  v-bind="item1"
                  v-model="item1.text"
                  :value.sync="item1.value"
                  :indent="true"
                  :selData="item1.selData || null"
                  :clearMR="item1.columnWidth===50"
                  :disable="true"
                />
              </div>
            </div>
            <div
              v-else-if="item.type==='groupHeader'"
              class="section-title section-margin-top"
              :key="'index'+index">
              {{item.title}}
            </div>
            <div
              v-else
              :key="'index'+index"
              class="in-box"
              :class="{'self':item.columnWidth===50}"
            >
              <yi-input
                :ref="'va'"
                :class="{'hide':item.attr==='orderNo'}"
                v-bind="item"
                v-model="item.text"
                :value.sync="item.value"
                :indent="true"
                :selData="item.selData || null"
                :clearMR="item.columnWidth===50"
                @onCarModel="onCarModel"
                @onGetName="onGetName"
                @onSelect="onSelect"
                @onChangeMoney="onChangeMoney"
              />
            </div>
            <!--{{item}}-->
          </template>
          <div class="space-box"></div>
        </div>
      </cube-scroll>
    </div>
    <yi-btn-box
      :name="btnName"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
/* eslint-disable array-callback-return */

import Numeral from 'numeral';
import {
  getFinishAddress,
  createFinishCar,
  getAddOrderFinishModule,
  getWarrant,
  getUsers
} from '../../../api/order';
import {inputType} from '../../../config/module';
import Page from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import {validate} from '../../../config/validate';
import {isEmptyObject} from '../../../utils/commonUtil';

export default {
  name: 'order-finish-car',
  extends: Page,
  created() {
    this.$nextTick(()=>{

      // 路由参数 判断是否为编辑状态或新增状态
      this.params = this.$route.params;
      console.log(this.params, '----------->0203');
      let params = this.params;
      if (params && params.id) {
        this.id = params.id;
      }
      this.getPage({});
    });
  },
  activated() {
    ddApi.setRight();
  },
  computed: {
    btnName() {
      return '完成提车';
    }
  },
  data() {
    return {
      initData: null,
      params: this.$route.params, // 路由参数
      clueId: '', // 线索id
      id: '', // '40288a5266f8f69b0166fc4680010037',
      isOnline: false, // 是否走电子合同
      orderType: null, // 业务类型
      form: {
        type: 'add',
        info: [
          {
            attr: 'name',
            type: 'text',
            title: '客户名称',
            text: null,
            value: null,
            placeholder: '请选择客户名称1',
            required: false,
            indent: false
          },
          {
            attr: 'mobile',
            type: 'text',
            title: '联系电话',
            text: null,
            value: null,
            placeholder: '客户联系电话',
            required: false,
            indent: false
          },
          {
            attr: 'gender',
            type: 'text',
            title: '性别',
            text: null,
            value: null,
            placeholder: '请选择性别',
            required: false,
            indent: false
          }
        ],
        data: []
      },
      edit: null
    };
  },
  methods: {
    isEdit() {
      // 设置data4
      this.$store.dispatch('order/getData4', this.form.data);
      return false;
    },
    onBtnClick() {
      // 40288a5266f8f69b0166fc4680010037
      console.log(this.form);
      const arr = [];
      this.$refs.va.forEach((item)=>{
        if (item.rules && !isEmptyObject(item)) {
          arr.push(item.changeV());
        }
      });
      console.log(arr, '--------');
      Promise.all(arr).then(data => {

        let state = data.every(item => item);
        if (state) {
          if (state) {
            let objData = {};
            this.form.data.filter((item) => {
              return item.attr !== 'group' &&
                  item.attr !== 'departureAddress' &&
                  item.attr !== 'arrivalsAddress';
            }).map((item) => {
              let val = '';
              if (item.value) {
                val = item.value;
              } else {
                val = item.value === 0 ? 0 : item.text;
              }
              // return {
              //   [item.attr]: val
              // };
              objData[item.attr] = val;
            });
            let {vin, carInspectionPhoto} = objData;
            // 图片单独处理
            carInspectionPhoto = carInspectionPhoto.map(v=>v.url);
            createFinishCar({
              orderId: this.id,
              vin,
              carInspectionPhoto
            })
              .then(res=>{
                console.log(res);
                this.params.onSuccess && this.params.onSuccess();
                this.$RouteUtil.back();
              })
              .catch(err=>{
                console.log(err);
              });


            // if (this.form.type === 'add') {
            //   addOrderInfo(items).then((res) => {
            //     console.log(res, 'res001');
            //     this.params.onSuccess && this.params.onSuccess();
            //     this.$RouteUtil.orderAddSuccess({
            //       ...this.params,
            //       module: 'order',
            //       type: 'all',
            //       ico: '',
            //       title: !this.isOnline ? '创建成功' : '完成创建',
            //       name: '新建订单',
            //       content: !this.isOnline ? '' : `<p style="line-height:20px;">订单${res.no}完成创建，</p>` +
            //         '<p style="line-height:20px;">合同一小时内有效，请告知客户在手机上签约订单。</p>',
            //       isContent: true,
            //       btnName: '查看',
            //       customerNo: res.no,
            //       id: res.orderId // 合同id:orderId  合同编号:no
            //     });
            //     console.log(res, '--------01---------');
            //
            //   }).catch((err) => {
            //     console.log(err, '--------02---------');
            //   });
            // } else {
            //   lastItems.orderId = this.params.oldData.id;
            //   lastItems.customerId = this.params.oldData.customerId;
            //   lastItems.orderNo = this.params.oldData.orderNo;
            //
            //   this.$RouteUtil.orderAddSuccess({
            //     ...this.params,
            //     isBack: true,
            //     ico: !this.isOnline ? '' : this.$images.order.ic_cancel,
            //     title: !this.isOnline ? '修改成功' : '签约内容将发送至客户',
            //     name: '客户确认',
            //     content: !this.isOnline ? '' : '<p style="line-height:20px;">签约内容将发送至客户进行确认。</p>' +
            //       '<p style="line-height:20px;"><span style="color:red;">请确保修改内容的完整</span>，是否继续？</p>',
            //     isContent: true,
            //     btns: [
            //       {
            //         name: '取消',
            //         event: ()=>{
            //           this.$RouteUtil.back(this.params.BACK_ACTION);
            //         }
            //       },
            //       {
            //         name: '确认',
            //         event: ()=>{
            //           editOrderInfo(lastItems)
            //             .then((res1) => {
            //               console.log(res1, '==>edit success');
            //               this.params.onSuccess && this.params.onSuccess();
            //               this.$RouteUtil.back(this.params.BACK_ACTION);
            //               this.$AlertUtil.showToast({txt: '修改成功'});
            //             })
            //             .catch(err => console.log(err, '==>edit err'));
            //         }
            //       }
            //     ]
            //   });
            // }

          }
        }

        return false;
      });
    },
    // 回到获取姓名
    onGetName(name) {
      this.$refs.va.forEach((item)=>{
        console.log(item);
        if (item.$attrs.attr === 'name') {
          item.setText(name);
        }
      });
    },
    // 金额回调 联动余款
    onChangeMoney(obj) {
      console.log(obj, 'obj');
      let totalAmount = 0;
      let deposit = 0;
      if (obj.type === 'totalAmount' || obj.type === 'deposit') {
        console.log('要联动了');
        this.form.data.forEach((item)=>{
          if (item.attr === 'totalAmount' && item.value) {
            totalAmount = Numeral(item.value).format('0.00');
          }
          if (item.attr === 'deposit' && item.value) {
            deposit = Numeral(item.value).format('0.00');
          }
        });

        if (totalAmount && deposit) {
          let balance = Numeral(totalAmount - deposit).format('0,0.00');
          this.form.data.forEach((item, index)=>{
            if (item.attr === 'balance') {
              this.form.data[index].text = balance;
              this.form.data[index].value = Numeral(balance).format('0.00');
            }
          });
        }
      }

    },
    // 交通地点类型回调
    onSelect(obj, initial) {
      if (obj.type === 'deliveryPlaceType') {
        obj.value = this.$ChangeType.xToType(obj.value, 'string');

        console.log(obj.value);
        console.log(typeof obj.value, 'pppppppppp');

        switch (obj.value) {
          // 宜买车车展厅
          case '0':
            this.form.data.forEach((item, index) => {
              if (item.attr === 'deliveryPlace') {
                if (!initial) {
                  this.form.data[index].text = this.params.storeAddress;
                  this.form.data[index].value = this.params.storeAddress;
                }
                this.form.data[index].disable = true;
              }
            });
            break;
            // 4s自提
          case '1':
            this.form.data.forEach((item, index) => {
              if (item.attr === 'deliveryPlace') {
                if (!initial) {
                  this.form.data[index].text = obj.address || '';
                  this.form.data[index].value = obj.address || '';
                }
                this.form.data[index].disable = false;
              }
            });
            break;
          default:
        }
      }
    },
    // 车信息回调
    onCarModel(obj, initial) {
      console.log(obj, 'data');
      // 设置外观和内饰
      let innerColors = obj.data.innerColors;
      let outerColors = obj.data.outerColors;
      this.form.data.forEach((item, index) => {
        if (item.attr === 'appearance') {
          if (!initial) {
            this.form.data[index].text = null;
            this.form.data[index].value = null;
          }
          if (outerColors) {
            this.form.data[index].selData = outerColors;
            this.form.data[index].disable = false;
            this.form.data[index].text = null;
          } else {
            this.form.data[index].selData = null;
            this.form.data[index].disable = true;
            this.form.data[index].text = '无';
          }
        }
        if (item.attr === 'interior') {
          if (!initial) {
            this.form.data[index].text = null;
            this.form.data[index].value = null;
          }
          if (innerColors) {
            this.form.data[index].selData = innerColors;
            this.form.data[index].disable = false;
            this.form.data[index].text = null;
          } else {
            this.form.data[index].selData = null;
            this.form.data[index].disable = true;
            this.form.data[index].text = '无';
          }
        }
      });

      // 初始数据保留
      if (initial) {
        this.initData = JSON.stringify(this.form);
      }
    },
    // 获取授权代表独自处理
    async getAgent(obj) {
      let newObj = JSON.parse(JSON.stringify(obj));
      let res = [];
      try {
        if (this.$store.state.order.storeId) {
          res = await getWarrant({
            storeId: this.$store.state.order.storeId,
            orderType: this.$store.state.order.orderType,
            userId: this.$store.state.order.customerNo});
          newObj.text = res && res[0] && res[0].name || '';
          newObj.value = res && res[0] && res[0].id || '';
          newObj.disable = true;
          newObj.type = 'text';
          newObj.selData = {source: []};
        } else {
          res = await getUsers({id: this.$store.state.user.id});
          newObj.text = res && res[0] && res[0].name || '';
          newObj.value = res && res[0] && res[0].id || '';
          newObj.disable = false;
          newObj.type = 'select';
          newObj.selData = {source: res && res.map(item2=>({key: item2.name, value: item2.id}))};
        }

      } catch (e) {
        console.log('报错了==>', e);
      }
      console.log(newObj);
      return newObj;
    },
    // 获取应收总和
    getAllAcount() {
      // 独自处理应收总额 及 余额 联动
      let price = 0;
      let amount = 1;
      this.params.data1.forEach((item1)=>{
        console.log('==>item1', item1);
        if (item1.attr === 'amount') {
          try {
            item1.value = parseInt(item1.value);
          } catch (e) {
            item1.value = 1;
          }
          amount = item1.value;
        }
      });
      this.params.data3.forEach((item3)=>{
        if (
          item3.attr !== 'insuranceExpensesType' &&
            item3.attr !== 'insuranceCompany' &&
            item3.attr !== 'purchaseTaxType' &&
            item3.attr !== 'additionalProvisions' &&
            item3.attr !== 'group'
        ) {
          try {
            item3.value = parseFloat(item.value);
          } catch (e) {
            // item3.value = 0;
          }
          price = parseFloat(price) + parseFloat(item3.value);
        }
      });
      return price * amount;
    },
    // 获取模版
    async getPage() {

      // 获取发车地址 & 到达地址
      const res = await getFinishAddress({orderId: this.id});
      const { departureAddress, arrivalsAddress } = res;
      // debugger;

      // 获取添加模版
      getAddOrderFinishModule()
        .then((res1)=>{

          console.log(res1, '=========================>success2');
          // debugger;
          let data1 = [];
          res1.forEach((item)=>{
            data1 = item.fields;
          });
          // 升序
          data1.sort((a, b)=>a.sort - b.sort);

          let data = data1;

          let formData = [];
          data.forEach((item) => {
            let obj = {
              attr: item.attr,
              type: inputType[item.configsObj.type],
              title: item.name,
              text: null,
              value: null,
              placeholder: item.configsObj.placeholder,
              indent: true,
              columnWidth: item.columnWidth,
              selData: {'source': [], 'selectedKey': '下单客户1'}
            };

              // 发车地址
            if (item.attr === 'departureAddress') {
              obj.text = departureAddress;
              obj.value = departureAddress;
              obj.disable = true;
            }
            // 到车地址
            if (item.attr === 'arrivalsAddress') {
              obj.text = arrivalsAddress;
              obj.value = arrivalsAddress;
              obj.disable = true;
            }

            // 是否必填
            let required = false;
            item.rulesObj && item.rulesObj.forEach((item2)=>{
              if (item2.type === 'required') {
                required = true;
              }
            });

            // 校验规则
            let rules = validate(item);
            if (required) { obj.required = required; }
            if (rules) { obj.rules = rules; }
            formData.push(obj);
          });
          this.form.data = formData;
          console.log(this.form.data, '---------->>>>>>>>>>');

          // 初始数据保留
          this.initData = JSON.stringify(this.form);
        })
        .catch((err)=>{ console.log(err, '==============================>err'); });
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl";
  .hide{
    display none
  }
  .container {
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    display flex
    flex-direction column

    .section-title {
      width 100%
      font-size: px2rem(16);
      color: $deepBlack
      text-align left
      margin 0 px2rem(14)
      medium()
    }
    .section-margin-top {
      margin-top px2rem(28)
    }
    .input-box2 {
      display flex
      height calc(100% - 50px)
      flex-direction column
      flex 1
      overflow-y auto

      .content{
        display flex
        flex-direction row
        flex-wrap wrap
        .id-box{
          width 100%
          display flex
          flex-direction row
          flex-wrap wrap
        }
        .in-box{
          width 100%
        }
        .self {
          width 50%

          &:nth-child(even) .input-box{
            margin-right px2rem(14)
          }
        }

      }
    }

    .p-warm {
      width 100%
      background-color #FDFCEA
      height px2rem(28);
      line-height px2rem(28)
      font-size px2rem(12)
      color #EF465B
    }

    .space-box{
      display flex
      width 100%
      height px2rem(78)
    }
  }
</style>
