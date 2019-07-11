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
  getAddOrderModule,
  addOrderInfo,
  editOrderInfo,
  getWarrant,
  getUsers,
  getIsExecute
} from '../../../api/order';
import {inputType} from '../../../config/module';
import Page from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import {validate} from '../../../config/validate';
import {isEmptyObject} from '../../../utils/commonUtil';

export default {
  name: 'order-add',
  extends: Page,
  created() {
    this.$nextTick(()=>{

      // 路由参数 判断是否为编辑状态或新增状态
      this.params = this.$route.params;
      console.log(this.params, '----------->0203');
      let params = this.params;
      if (params && params.id) {
        this.id = params.id;
        this.form.type = 'edit';
      } else {
        this.form.type = 'add';
      }
      if (this.form.type === 'add') {
        this.getPage({});
      } else {
        // 编辑赋初值
        this.params.oldData && this.getPage(this.params.oldData);
      }
    });
  },
  activated() {
    ddApi.setRight();

    if (this.params.id) {
      ddApi.setTitle({title: '编辑合同'});
    } else {
      ddApi.setTitle({title: '付款与交车'});
    }
  },
  computed: {
    btnName() {
      let id = this.id;
      return id ? '确认编辑' : '创建合同';
    }
  },
  data() {
    return {
      initData: null,
      params: this.$route.params, // 路由参数
      clueId: '', // 线索id
      id: '',
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
          // 设置data4
          this.$store.dispatch('order/getData4', this.form.data);

          console.log(state);
          if (state) {
            console.log(this.form, '校验成功并提交数据');
            let contractUrl = [];
            let certificateUrl = [];
            let depositVoucherUrl = [];

            // 图片数据格式处理
            this.form.data.map((item) => {
              // 图片1
              if (item.attr === 'contractUrl') {
                let vl = item.value || [];
                contractUrl = vl.map(item1 =>{
                  return item1.url;
                });
              }
              // 图片2
              if (item.attr === 'certificateUrl') {
                let vl = item.value || [];
                certificateUrl = vl.map(item1 =>{
                  return item1.url;
                });
              }
              // 图片3
              if (item.attr === 'depositVoucherUrl') {
                let vl = item.value || [];
                depositVoucherUrl = vl.map(item1 =>{
                  return item1.url;
                });
              }
            });

            // todo
            this.params.data4 = this.form.data;

            console.log(this.params, '4444');
            // 整理参数
            let nowData = this.params;
            let list = [];
            if (nowData.data1 instanceof Array) {
              list = list.concat(nowData.data1);
            }
            if (nowData.data2 instanceof Array) {
              list = list.concat(nowData.data2);
            }
            if (nowData.data3 instanceof Array) {
              list = list.concat(nowData.data3);
            }
            if (nowData.data4 instanceof Array) {
              list = list.concat(nowData.data4);
            }

            console.log(list);

            let items = list.filter((item) => {
              return item.attr !== 'group' && item.attr !== 'files';
            }).map((item) => {
              let val = '';
              if (item.value) {
                val = item.value;
              } else {
                val = item.value === 0 ? 0 : item.text;
              }
              // 地面店
              if (item.attr === 'belongStoreId') {
                if (typeof item.value === 'object') {
                  val = item.value && item.value.id;
                } else if (typeof item.value === 'string') {
                  val = item.value && JSON.parse(item.value) && JSON.parse(item.value).id;
                }
              }
              // 转换外观和内饰格式
              if (item.attr === 'appearance' || item.attr === 'interior') {
                if (val === '无') {
                  val = null;
                } else {
                  val = val && JSON.stringify(val) || '';
                }
              }
              return {
                [item.attr]: val
              };
            });

            let lastItems = {};
            items.forEach((items1) => {
              for (let item in items1) {
                lastItems[item] = items1[item];
              }
            });

            // this.form.data.forEach((item) => {
            //   // 订单编号重新组装
            //   if (item.attr === 'orderNo') {
            //     lastItems.orderNo = item.text + item.value;
            //   }
            // });

            console.log(lastItems, 'itemssss');

            // 线索id为空串或null 不提交这个字段
            if (!lastItems.cluePK) {
              delete lastItems.cluePK;
            }

            // 处理android默认将数字类型转字符串问题
            lastItems.gender = parseInt(lastItems.gender);
            lastItems.shoppingWay = parseInt(lastItems.shoppingWay);

            // 将外观和类似转成JSON字符串
            lastItems.appearance = this.$ChangeType.xToType(lastItems.appearance, 'string');
            lastItems.interior = this.$ChangeType.xToType(lastItems.interior, 'string');
            console.log(lastItems, '-->>>123');

            // ----------------start----------------
            if (lastItems.contractUrl) {
              lastItems.contractUrl = contractUrl;
            }
            if (lastItems.certificateUrl) {
              lastItems.certificateUrl = certificateUrl;
            }
            if (lastItems.depositVoucherUrl) {
              lastItems.depositVoucherUrl = depositVoucherUrl;
            }
            // 判断图片是否传了正确格式
            let status = true;
            lastItems.contractUrl && lastItems.contractUrl.forEach((item)=>{
              if (item && typeof item !== 'string' || item.indexOf('blob:') !== -1) {
                status = false;
              }
            });
            lastItems.certificateUrl && lastItems.certificateUrl.forEach((item)=>{
              if (item && typeof item !== 'string' || item.indexOf('blob:') !== -1) {
                status = false;
              }
            });
            lastItems.depositVoucherUrl && lastItems.depositVoucherUrl.forEach((item)=>{
              if (item && typeof item !== 'string' || item.indexOf('blob:') !== -1) {
                status = false;
              }
            });
            if (!status) {
              this.$AlertUtil.showToast({txt: '您传的图片未成功，请重新选择图片', type: 'warn'});
              return false;
            }
            // 委托订单合同/图片不能为空
            if (this.$AlertUtil.isEmpty(lastItems.contractUrl)) {
              this.$AlertUtil.showToast({txt: '您传的委托订单合同未成功，请重新选择图片', type: 'warn'});
              return false;
            }
            // 身份证/营业执照 图片不能为空
            if (!this.isOnline && this.$AlertUtil.isEmpty(lastItems.certificateUrl)) {
              this.$AlertUtil.showToast({txt: '您传的身份证/营业执照未成功，请重新选择图片', type: 'warn'});
              return false;
            }
            // 客户定金凭证/图片不能为空
            if (this.$AlertUtil.isEmpty(lastItems.depositVoucherUrl)) {
              this.$AlertUtil.showToast({txt: '您传的客户定金凭证未成功，请重新选择图片', type: 'warn'});
              return false;
            }
            // ----------------end----------------

            // 走电子合同不提交合同图片字段
            this.isOnline && delete lastItems.contractUrl;


            if (this.form.type === 'add') {
              addOrderInfo(lastItems).then((res) => {
                console.log(res, 'res001');
                this.params.onSuccess && this.params.onSuccess();
                this.$RouteUtil.orderAddSuccess({
                  ...this.params,
                  module: 'order',
                  type: 'all',
                  ico: '',
                  title: !this.isOnline ? '创建成功' : '完成创建',
                  name: '新建订单',
                  content: !this.isOnline ? '' : `<p style="line-height:20px;">订单${res.no}完成创建，</p>` +
                    '<p style="line-height:20px;">合同一小时内有效，请告知客户在手机上签约订单。</p>',
                  isContent: true,
                  btnName: '查看',
                  customerNo: res.no,
                  id: res.orderId // 合同id:orderId  合同编号:no
                });
                console.log(res, '--------01---------');

              }).catch((err) => {
                console.log(err, '--------02---------');
              });
            } else {
              lastItems.orderId = this.params.oldData.id;
              lastItems.customerId = this.params.oldData.customerId;
              lastItems.orderNo = this.params.oldData.orderNo;

              this.$RouteUtil.orderAddSuccess({
                ...this.params,
                isBack: true,
                ico: !this.isOnline ? '' : this.$images.order.ic_cancel,
                title: !this.isOnline ? '修改成功' : '签约内容将发送至客户',
                name: '客户确认',
                content: !this.isOnline ? '' : '<p style="line-height:20px;">签约内容将发送至客户进行确认。</p>' +
                      '<p style="line-height:20px;"><span style="color:red;">请确保修改内容的完整</span>，是否继续？</p>',
                isContent: true,
                btns: [
                  {
                    name: '取消',
                    event: ()=>{
                      this.$RouteUtil.back(this.params.BACK_ACTION);
                    }
                  },
                  {
                    name: '确认',
                    event: ()=>{
                      editOrderInfo(lastItems)
                        .then((res1) => {
                          console.log(res1, '==>edit success');
                          this.params.onSuccess && this.params.onSuccess();
                          this.$RouteUtil.back(this.params.BACK_ACTION);
                          this.$AlertUtil.showToast({txt: '修改成功'});
                        })
                        .catch(err => console.log(err, '==>edit err'));
                    }
                  }
                ]
              });
            }

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
    async getPage(edit) {
      console.log(edit);
      // 获取枚举类别
      let form = this.menu;
      let clueAdditionalConfiguration = form.clueAdditionalConfiguration; // 车型信息
      let outerColor = null; // 外观
      let innerColor = null; // 内饰
      let clueIntentionType = form.clueIntentionType; // 意向类型
      let clueShoppingWay = form.clueShoppingWay; // 购买方式
      let genderData = form.gender; // 性别
      let customerOrigin = form.customerOrigin; // 客户来源
      let customer = form.customerType; // 客户类型
      let paymentWay = form.paymentWay; // 付款方式
      let deliveryPlaceType = form.deliveryPlaceType; // 交货地址
      let deliveryPlace = form.deliveryPlace; // 交货地址

      // console.log(JSON.stringify(form));

      // 门店零售及特殊地面店走电子合同
      this.isOnline = false;
      // debugger;
      // let isSales = false;
      // console.log('---------------------------------------------------------');
      // debugger;
      try {
        this.params.data2.forEach(async (item)=>{
          if (item.attr === 'orderType') {
            item.value = item.value.toString();
            this.orderType = item.value;
            const status = await getIsExecute(item.value);
            this.isOnline = !!status;
          }
        });
      } catch (e) {
        console.log(e);
      }
      // this.params.data2.forEach((item)=>{
      //   // 电子合同只针对这两家门店开发
      //   if (item.attr === 'belongStoreId' && item.value) {
      //     if (typeof item.value === 'string') {
      //       item.value = JSON.parse(item.value);
      //     }
      //     if (
      //       isSales && item.value.id &&
      //     [
      //       '7982a73e9a4611e8abed00163e088cae',
      //       '79828cff9a4611e8abed00163e088cae'
      //     ].indexOf(item.value.id) > -1
      //     ) {
      //       isOnline = true;
      //       this.isOnline = true;
      //     }
      //   }
      // });
      console.log('---------------------------------------------------------');

      // 保留操作痕迹
      if (this.$store.state.order.data4) {
        this.form.data = this.$store.state.order.data4;

        // 应收总和
        let all = this.getAllAcount();
        // 定金
        let sub = null;
        // debugger;

        this.form.data.forEach(item=>{
          if (item.attr === 'totalAmount') {
            item.text = Numeral(all).format('0,0.00');
            item.value = Numeral(all).format('0.00');
          }
          if (item.attr === 'deposit') {
            if (item.value) {
              sub = item.value;
            } else if (item.value === 0) {
              sub = 0;
            }
          }
          if (item.attr === 'balance') {
            if (sub) {
              item.text = Numeral(all - sub).format('0,0.00');
              item.value = Numeral(all - sub).format('0.00');
            }
          }

          // 交车类型
          if (item.attr === 'deliveryPlaceType') {
            item.text = '';
            item.value = '';
          }
          // 交车地点
          if (item.attr === 'deliveryPlace') {
            item.text = '';
            item.value = '';
          }

          // 业务类型为渠道批售，渠道垫资，大客户部批售，房车部销售，夏宜销售 锁定客户4S店自提
          if (['3', '4', '5', '6', '7'].indexOf(this.orderType) > -1) {
            this.form.data.forEach((item2, index2)=>{
              // deliveryPlace
              if (item2.attr === 'deliveryPlaceType') {
                this.form.data[index2].text = '客户4S店自提';
                this.form.data[index2].value = 1;
                this.form.data[index2].disable = true;
              }
              if (item2.attr === 'deliveryPlace') {
                this.form.data[index2].disable = false;
              }
            });
          }

          // 授权代表同步更新
          if (item.attr === 'ambassadornId') {
            // item = this.getAgent(item);
            console.log(this.$store.state.order.storeId, '==>storeId');
            // debugger;
            // 门店不存在，直接拿登录用户主管
            if (this.$store.state.order.storeId) {
              getWarrant({
                storeId: this.$store.state.order.storeId,
                orderType: this.$store.state.order.orderType,
                userId: this.$store.state.order.customerNo
              })
                .then(res2 => {
                  console.log(res2, '==>>>>>>>>>>res');
                  item.text = res2[0].name;
                  item.value = res2[0].id;
                  item.disable = true;
                })
                .catch(err => console.log(err));
            } else {
              getUsers({id: this.$store.state.user.id})
                .then(res2 => {
                  console.log(res2, '==>>>>>>>>>>getUsers');
                  item.text = res2[0].name;
                  item.value = res2[0].id;
                  item.disable = false;
                  item.type = 'select';
                  item.selData = {source: res2 && res2.map(item2=>({key: item2.name, value: item2.id}))};
                })
                .catch(err => console.log(err));
            }
          }
        });

        return;
      }


      // 获取添加模版
      getAddOrderModule()
        .then((res)=>{

          console.log(res, '=========================>success2');
          let data1 = [];
          res.forEach((item)=>{
            console.log(item);
            if (item.code === 'create-order' && this.form.type === 'add') {
              data1 = item.fields;
            }
            if (item.code === 'edit-order' && this.form.type === 'edit') {
              data1 = item.fields;
            }
          });
          // 升序
          data1.sort((a, b)=>a.sort - b.sort);
          this.allData = data1;


          let data = data1.filter((item)=>{
            return item.description === 'step4';
          });
          console.log(data, '=========================>data2');

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
              selData: {'source': [{'key': '选项一', 'value': 1}, {'key': '选项二', 'value': 2}], 'selectedKey': '下单客户1'}
            };

            if (obj.attr === 'vehicleModelId') {
              obj.singleChoose = true;
            }

            // 应收总额自动算出
            if (obj.attr === 'totalAmount' && this.form.type !== 'edit') {
              // let price = 0;
              // let amount = 1;
              // this.params.data1.forEach((item1)=>{
              //   console.log('==>item1', item1);
              //   if (item1.attr === 'amount') {
              //     try {
              //       item1.value = parseInt(item1.value);
              //     } catch (e) {
              //       item1.value = 1;
              //     }
              //     amount = item1.value;
              //   }
              // });
              // this.params.data3.forEach((item3)=>{
              //   if (
              //     item3.attr !== 'additionalProvisions' &&
              //     item3.attr !== 'insuranceCompany' &&
              //     item3.attr !== 'group'
              //   ) {
              //     try {
              //       item.value = parseFloat(item.value);
              //     } catch (e) {
              //       item.value = 0;
              //     }
              //     price = parseFloat(price) + parseFloat(item3.value);
              //   }
              // });
              obj.text = Numeral(this.getAllAcount()).format('0,0.00');
              obj.value = Numeral(this.getAllAcount()).format('0.00');

            }

            // 委托订单合同
            if (obj.attr === 'totalAmount') {
              obj.disable = true;
            }

            // 委托订单合同
            if (obj.attr === 'contractUrl') {
              obj.line = false;
            }

            // 身份证/企业执照
            if (obj.attr === 'certificateUrl') {
              obj.line = false;
            }

            // 订单付款凭证
            if (obj.attr === 'depositVoucherUrl') {
              obj.line = false;
            }

            // 授权代表
            if (obj.attr === 'ambassadornId') {
              obj.disable = true;
            }

            // 授权代表
            if (obj.attr === 'ambassadornId' && !edit.ambassadorn) {
              // obj = this.getAgent(obj);

              console.log(this.$store.state.order.storeId, '==>storeId');
              // 门店不存在，直接拿登录用户主管
              if (!edit[obj.attr] && this.$store.state.order.storeId) {
                getWarrant({
                  storeId: this.$store.state.order.storeId,
                  orderType: this.$store.state.order.orderType,
                  userId: this.$store.state.order.customerNo
                })
                  .then(res2 => {
                    console.log(res2, '==>>>>>>>>>>res');
                    obj.text = res2[0].name;
                    obj.value = res2[0].id;
                    obj.disable = true;
                  })
                  .catch(err => console.log(err));
              } else {
                getUsers({id: this.$store.state.user.id})
                  .then(res2 => {
                    console.log(res2, '==>>>>>>>>>>getUsers');
                    obj.text = res2[0].name;
                    obj.value = res2[0].id;
                    obj.disable = false;
                    obj.type = 'select';
                    obj.selData = {source: res2 && res2.map(item2=>({key: item2.name, value: item2.id}))};
                  })
                  .catch(err => console.log(err));
              }
            }

            // 编辑 数据绑定
            if (edit[obj.attr]) {
              obj.value = edit[obj.attr];
              obj.text = edit[obj.attr];

              // 编号
              if (item.attr === 'orderNo') {
                obj.text = obj.value && obj.value.substring(0, 8);
                obj.value = obj.value && obj.value.substring(9, obj.value.length);
                obj.disable = true;
              }
              //  性别
              if (obj.attr === 'gender') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 购车方式
              if (obj.attr === 'shoppingWay' || obj.attr === 'paymentWay' || obj.attr === 'deliveryPlaceType') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 委托订单合同
              if (obj.attr === 'contractUrl') {
                let vl = obj.value || [];
                obj.value = vl.map(item1=>({
                  base64: '',
                  file: {},
                  name: '',
                  progress: 1,
                  response: {},
                  responseHeaders: '',
                  size: 150797,
                  status: 'success',
                  url: item1
                }));
              }

              // 身份证/企业执照
              if (obj.attr === 'certificateUrl') {
                let vl = obj.value || [];
                obj.value = vl.map(item1=>({
                  base64: '',
                  file: {},
                  name: '',
                  progress: 1,
                  response: {},
                  responseHeaders: '',
                  size: 150797,
                  status: 'success',
                  url: item1
                }));
              }

              // 订单付款凭证
              if (obj.attr === 'depositVoucherUrl') {
                let vl = obj.value || [];
                obj.value = vl.map(item1=>({
                  base64: '',
                  file: {},
                  name: '',
                  progress: 1,
                  response: {},
                  responseHeaders: '',
                  size: 150797,
                  status: 'success',
                  url: item1
                }));
              }

              // 授权代表
              if (obj.attr === 'ambassadornId') {
                // obj.text = edit.ambassadorn.name;
                // obj.value = edit.ambassadorn.id;
                //
                // // 门店不存在，直接拿登录用户主管
                // if (!edit.ambassadorn && this.$store.state.order.storeId) {
                //   console.log('');
                // } else {
                //   getUsers({id: this.$store.state.user.id})
                //     .then(res2 => {
                //       obj.disable = false;
                //       obj.type = 'select';
                //       obj.selData = {source: res2 && res2.map(item2=>({key: item2.name, value: item2.id}))};
                //     })
                //     .catch(err => console.log(err));
                // }
              }

              if (obj.type === 'money') {
                obj.text = Numeral(edit[obj.attr]).format('0,0.00');
                obj.value = Numeral(edit[obj.attr]).format('0.00');
              }

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

            // 类别
            switch (item.attr) {
              case 'vehicleModelId':
                obj.selData.source = clueAdditionalConfiguration.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'intentionType':
                obj.selData.source = clueIntentionType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'intentionGrade':
                obj.selData.source = clueIntentionType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'shoppingWay':
                obj.selData.source = clueShoppingWay.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'appearance':
                obj.selData = outerColor;
                break;
              case 'interior':
                obj.selData = innerColor;
                break;
              case 'gender':
                obj.selData.source = genderData.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'origin':
                obj.selData.source = customerOrigin.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'type':
                obj.selData.source = customer.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'paymentWay':
                obj.selData.source = paymentWay && paymentWay.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'deliveryPlaceType':
                obj.selData.source = deliveryPlaceType && deliveryPlaceType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'orderType':
                obj.selData.source = deliveryPlace && deliveryPlace.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              default:

            }
            if (obj.attr === 'contractUrl' && this.isOnline) {
              return;
            }
            formData.push(obj);
          });
          this.form.data = formData;
          console.log(this.form.data, '---------->>>>>>>>>>');


          if (this.form.type === 'edit') {
            // 初始化页面编辑数据
            this.form.data.forEach((item) => {
              // 交车地点类型
              if (item.attr === 'deliveryPlaceType') {
                let value = this.$ChangeType.xToType(item.value, 'string');
                if (value === '0') {
                  this.onSelect({
                    type: 'deliveryPlaceType',
                    value: '0'
                  }, true);
                } else {
                  this.onSelect({
                    type: 'deliveryPlaceType',
                    value: '1',
                    address: edit.deliveryPlace
                  }, true);
                }
              }
            });
          }

          // 业务类型为渠道批售，渠道垫资，大客户部批售，房车部销售，夏宜销售 锁定客户4S店自提
          if (['3', '4', '5', '6', '7'].indexOf(this.orderType) > -1) {
            this.form.data.forEach((item2, index2)=>{
              // deliveryPlace
              if (item2.attr === 'deliveryPlaceType') {
                this.form.data[index2].text = '客户4S店自提';
                this.form.data[index2].value = 1;
                this.form.data[index2].disable = true;
              }
              if (item2.attr === 'deliveryPlace') {
                this.form.data[index2].disable = false;
              }
            });
          }

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
