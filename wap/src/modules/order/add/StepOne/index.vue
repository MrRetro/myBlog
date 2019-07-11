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
                v-bind="item"
                v-model="item.text"
                :value.sync="item.value"
                :indent="true"
                :selData.sync="item.selData || null"
                @onCarModel="onCarModel"
                @selClue="selClue"
                @onSelect="onSelect"
              />
              <!--{{item}}-->
            </div>
          </template>
          <div class="space-box"></div>
        </div>
      </cube-scroll>
    </div>
    <yi-btn-box
      name="下一步"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import Numeral from 'numeral';
import {getAddOrderModule, getEditOrderInfo, getClueByCustomerId} from '../../../../api/order';
import {getModelDetail} from '../../../../api/carModel';
import {inputType} from '../../../../config/module';
import {addUserInfo} from '../../../../api/clue';
import Page from '../../../../components/Mixins/EditPage';
import {ddApi} from '../../../../api/dingding';
import {validate} from '../../../../config/validate';
import {isEmptyObject, changeMoneyToChinese} from '../../../../utils/commonUtil';
import {getDetail} from '../../../../api/common';

export default {
  name: 'clue-add',
  extends: Page,
  created() {
    this.$nextTick(async ()=>{

      // 清除order vuex
      this.$store.dispatch('order/clearData');

      // 重新组装clueInfo
      const clueInfo = this.params.clueInfo && this.params.clueInfo.id;
      if (clueInfo) {
        const newInfo = await getDetail({module: 'clues', id: this.params.clueInfo.id});
        console.log('clueInfo==>', clueInfo);
        this.params.clueInfo = newInfo;
      }

      // 路由参数 判断是否为编辑状态或新增状态
      this.params = this.$route.params;
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
        getEditOrderInfo(this.id)
          .then(async (res)=>{
            this.edit = res;
            this.params.type = 'edit';
            this.params.oldData = res;
            console.log(res, '--------------------0203');

            // 重新给线索赋值
            const clueId = res && res.clueId;

            if (clueId) {
              const newInfo = await getDetail({module: 'clues', id: clueId});
              console.log('clueInfo==>', clueId);
              this.params.clueInfo = newInfo;
            }

            this.getPage(res);
          })
          .catch(err=>{ console.log(err); });
      }
    });
  },
  data() {
    return {
      initData: null,
      form: {
        type: 'add',
        // 用户信息
        info: {
          name: '',
          mobile: '',
          gender: ''
        },
        // 客户主键
        customer: {
          attr: 'customerPK',
          title: '客户主键',
          text: null,
          hide: true
        },
        carName: {
          attr: 'carName',
          title: '车型信息',
          text: null,
          hide: true
        },
        data: []
      },
      // 是否模糊车型
      isIntention: true,
      // 是否关联线索
      isContactClue: false,
      // 是否线索关联弹框
      isShowContact: false
    };
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    onBtnClick() {
      console.log('新建订单1');
      const arr = [];
      this.$refs.va.forEach((item)=>{
        if (item.rules && !isEmptyObject(item) && item.hide === false) {
          arr.push(item.changeV());
        }
      });
      Promise.all(arr).then(data => {
        let state = data.every(item => item);
        if (state) {
          console.log(this.form, '校验成功并提交数据');

          // todo
          let items = {};
          this.form.data.forEach((item)=>{
            if (item.attr !== 'group') {
              let val = '';
              if (item.value) {
                val = item.value;
              } else {
                val = item.value === 0 ? 0 : item.text;
              }
              console.log(val, 'item');

              if (item.attr === 'vehicleModelId') {
                this.form.carName.text = item.text;
              }

              items[item.attr] = val;
            }
          });
          console.log(items, '==>items');

          if (this.isIntention) {
            this.$AlertUtil.showToast({txt: '车型信息不明确', type: 'warn'});
            return false;
          }

          // 用户信息
          let userInfo = {};
          userInfo.name = items.name;
          userInfo.mobile = items.mobile;
          userInfo.gender = items.gender;
          addUserInfo(userInfo)
            .then(async (res) => {
              // console.log(res);
              // debugger
              // 设置客户id
              this.$store.dispatch('order/getCustomerNo', res.id);
              this.form.customer.text = res.id;
              this.form.data.push(this.form.customer);
              this.form.data.push(this.form.carName);

              console.log(this.form.data, '==>dataOne');
              // 姓名 电话 性别 用户信息被修改了
              console.log(userInfo.name, '===', this.form.info.name);
              console.log(userInfo.mobile, '===', this.form.info.mobile);
              console.log(userInfo.gender, '===', this.form.info.gender);

              // 当客户存在线索请款项,且是直接创建时，做线索关联处理
              if (!this.params.clueInfo && !this.isShowContact) {
                let objClue = {
                  'attr': 'cluePK',
                  'type': 'selClue',
                  'title': '选择线索',
                  'text': 'FJM02181101001I',
                  'value': '40288a4866ce5cb50166ce6702360016',
                  'placeholder': '请选择线索',
                  'indent': true,
                  'columnWidth': 120,
                  'selData': {
                    'source': [],
                    'selectedKey': ''
                  },
                  'disable': true,
                  'rules': {},
                  hide: true
                };
                const clue = await getClueByCustomerId({id: res.mobile});
                if (clue) {
                  this.isContactClue = true;
                  // debugger
                  ddApi.confirm({
                    message: `经纪人[${clue.brokerName}]已经提交该线索，是否以该线索进行签约。`,
                    'title': '提示',
                    'buttonLabels': ['否', '是'],
                    onSuccess: (data1)=>{
                      if (data1.buttonIndex === 0) {
                        // 后退
                        this.$router.back();
                      } else {
                        // 下一步
                        this.isShowContact = true;
                        this.isContactClue = false;
                        objClue.text = clue.clueNo;
                        objClue.value = clue.id;
                        this.form.data.push(objClue);
                        this.onBtnClick();
                      }
                    }
                  });
                }
              }

              // 直接创建-默认情况不做线索判断
              if (!this.isContactClue) {

                if (
                  res.isExist &&
                  !(
                    userInfo.name === this.form.info.name &&
                    userInfo.mobile === this.form.info.mobile &&
                    userInfo.gender === this.form.info.gender
                  )
                ) {
                  userInfo.id = res.id;
                  if (this.params.oldData) {
                    this.params.oldData.customerId = res.id;
                  }
                  userInfo.isOverride = true;
                  // 下一步
                  this.$RouteUtil.orderAddTwo({
                    ...this.params,
                    info: res,
                    newInfo: userInfo,
                    data1: this.form.data
                  });
                } else {
                  this.$RouteUtil.orderAddThree({
                    ...this.params,
                    info: res,
                    data1: this.form.data
                  });
                }

                setTimeout(()=>{
                  // 状态恢复
                  this.isContactClue = false;
                  this.isShowContact = false;
                }, 1000);
              }
            })
            .catch((err) => {
              console.log(err, '888');
            });
        }
        return false;
      });
    },
    // 车信息回调
    onCarModel(obj, initial) {
      console.log(obj, '2233344');
      if (obj.type === 'dim') {
        this.isIntention = true;
      } else {
        this.isIntention = false;
      }

      // 设置外观和内饰
      let innerColors = obj.data.innerColors;
      let outerColors = obj.data.outerColors;
      this.form.data.forEach((item, index) => {
        if (item.attr === 'appearance') {
          // 外观绑定车型id
          this.form.data[index].carId = obj.data.id;
          if (!initial) {
            this.form.data[index].text = '';
            this.form.data[index].value = '';
          }
          this.form.data[index].selData = outerColors;
          this.form.data[index].disable = false;
        }
        if (item.attr === 'interior') {
          // 内饰绑定车型id
          this.form.data[index].carId = obj.data.id;
          if (!initial) {
            this.form.data[index].text = '';
            this.form.data[index].value = '';
          }
          this.form.data[index].selData = innerColors;
          this.form.data[index].disable = false;
        }
        // 指导价
        if (item.attr === 'indicativePrice') {
          this.form.data[index].text = Numeral(obj.data.indicativePrice * 10000).format('0,0.00');
          this.form.data[index].value = Numeral(obj.data.indicativePrice * 10000).format('0.00');
        }
      });

      // 初始数据保留
      if (initial) {
        this.initData = JSON.stringify(this.form);
      }

      console.log(this.form, '2233355');
    },
    // 线索回调
    selClue(obj) {
      console.log(obj, ' 123 ');

      this.form.data.forEach((item, index)=>{
        if (item.attr === 'vehicleModelId' && obj.carName && obj.vehicleModelId) {
          this.form.data[index].text = obj.carName;
          this.form.data[index].value = obj.vehicleModelId;
        }
        // 外观
        if (item.attr === 'appearance' && obj.appearance) {
          try {
            let outColor = JSON.parse(obj.appearance);
            this.form.data[index].text = outColor && outColor.name;
            this.form.data[index].value = outColor || null;
          } catch (e) {
            console.log(e);
          }
        }

        // 内饰
        if (item.attr === 'interior' && obj.interior) {
          try {
            let innerColor = JSON.parse(obj.interior);
            let name = innerColor && innerColor.colors && innerColor.colors[0].name;
            if (innerColor.colors && innerColor.colors[1]) {
              name += `/${innerColor.colors[1].name}`;
            }
            this.form.data[index].text = name;
            this.form.data[index].value = innerColor || null;
          } catch (e) {
            console.log(e);
          }
        }

        // 客户信息 编辑 > 线索签约
        if (this.form.type !== 'edit') {
          // 客户名称
          if (item.attr === 'name' && (obj.name || obj.customerName)) {
            this.form.data[index].text = obj.name || obj.customerName;
            this.form.data[index].value = obj.name || obj.customerName;
            this.form.info.name = this.form.data[index].value;
          }

          // 客户电话
          if (item.attr === 'mobile' && (obj.mobile || obj.customerMobile)) {
            this.form.data[index].text = obj.mobile || obj.customerMobile;
            this.form.data[index].value = obj.mobile || obj.customerMobile;
            this.form.info.mobile = this.form.data[index].value;
          }

          // 客户性别
          if (item.attr === 'gender' && (obj.gender || obj.customerGender)) {
            let name = (obj.gender && obj.gender.name) || (obj.customerGender && obj.customerGender.name);
            let code = (obj.gender && obj.gender.code) || (obj.customerGender && obj.customerGender.code);
            this.form.data[index].text = name;
            this.form.data[index].value = code;
            this.form.info.gender = code;
          }
        }

        // 购车方式
        if (item.attr === 'shoppingWay' && obj.shoppingWay) {
          this.form.data[index].text = obj.shoppingWay.name;
          this.form.data[index].value = obj.shoppingWay.code;
        }

        // 指导价
        if (item.attr === 'indicativePrice' && obj.indicativePrice) {
          this.form.data[index].text = Numeral(obj.indicativePrice * 10000).format('0,0.00');
          this.form.data[index].value = Numeral(obj.indicativePrice * 10000).format('0,0.00');
        }

      });

      obj.vehicleModelId && getModelDetail(obj.vehicleModelId)
        .then((res1)=>{
          console.log(res1, 'res1');
          this.onCarModel({data: res1}, true);
          // this.isIntention = false;
        })
        .catch((err)=>console.log(err));
    },
    // 选择回调 obj={type,value}
    onSelect(obj) {
      console.log(obj, 'type');
      obj.value = this.$ChangeType.xToType(obj.value, 'string');
      console.log(typeof obj.value);
      // 联动触发
      switch (obj.type) {
        case 'orderCustomerType':
          // 个人
          if (obj.value === '0') {
            this.form.data.forEach((item, index)=>{

              // 字段名显示
              if (item.attr === 'name') {
                this.form.data[index].title = '客户姓名';
                this.form.data[index].placeholder = '请输入客户姓名';
              }
              if (item.attr === 'gender') {
                this.form.data[index].title = '客户性别';
              }
              if (item.attr === 'idNumber') {
                this.form.data[index].title = '身份证';
              }

              // 切换字段
              if (
                item.attr === 'proxyName' ||
                item.attr === 'unifiedSocialCreditCode'
              ) {
                this.form.data[index].hide = true;
                return false;
              }
              this.form.data[index].hide = false;
              return false;
            });
          }
          // 公司
          if (obj.value === '1') {
            this.form.data.forEach((item, index)=>{

              // 字段名显示
              if (item.attr === 'name') {
                this.form.data[index].title = '公司名称';
                this.form.data[index].placeholder = '请输入公司名称';
              }
              if (item.attr === 'gender') {
                this.form.data[index].title = '代理人性别';
              }
              if (item.attr === 'idNumber') {
                this.form.data[index].title = '代理人身份证';
              }

              this.form.data[index].hide = false;
              return false;
            });
          }
          break;
        default:
      }
    },
    // 获取模版
    getPage(edit) {
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
      let orderCustomerType = [
        {
          'code': 0,
          'name': '个人'
        }, {
          'code': 1,
          'name': '公司'
        }
      ];
      // 获取添加模版
      getAddOrderModule()
        .then((res)=>{

          let clueInfo = this.params.clueInfo; // 线索回调

          console.log(res, '=========================>success1');
          let data1 = [];
          res.forEach((item)=>{
            console.log(item);
            if (item.code === 'create-order' && this.form.type === 'add') {
              data1 = item.fields;
            } else if (item.code === 'edit-order' && this.form.type === 'edit') {
              data1 = item.fields;
            }
          });
          // 升序
          data1.sort((a, b)=>a.sort - b.sort);

          console.log(data1, '=========================>data1');
          let data = data1.filter((item)=>{
            return item.description === 'step1';
          });
          let formData = [];
          data.forEach((item)=>{
            let obj = {
              attr: item.attr,
              type: inputType[item.configsObj.type],
              title: item.name,
              text: '',
              value: null,
              placeholder: item.configsObj.placeholder,
              indent: true,
              columnWidth: item.columnWidth,
              selData: {'source': [{'key': '选项一', 'value': 1}, {'key': '选项二', 'value': 2}], 'selectedKey': '下单客户1'}
            };

            if (obj.attr === 'vehicleModelId') {
              obj.singleChoose = true;
            }
            // 外观
            if (obj.attr === 'appearance') {
              obj.clearMR = true;
            }
            // 指导价
            if (obj.attr === 'indicativePrice') {
              obj.disable = true;
            }
            // 外观与内饰包括其他颜色
            if (obj.attr === 'appearance' || obj.attr === 'interior') {
              obj.isOther = true;
            }
            // 台数默认一台
            if (obj.attr === 'amount') {
              obj.text = '壹台';
              obj.value = 1;
            }

            // 跟线索人赋初值
            if (clueInfo && item.attr === 'cluePK') {
              obj.text = clueInfo.clueNo;
              obj.value = clueInfo.id;
              obj.disable = true;
            }

            // 跟线索人赋初值
            if (clueInfo && clueInfo.intentionType.code === 2 && item.attr === 'vehicleModelId') {
              let name = '模糊车型';
              if (clueInfo.carSeriesId) {
                name = clueInfo.carName;
              }
              obj.text = name;
              obj.value = '';
              this.isIntention = true;
            }

            // 编辑 数据绑定
            if (edit[obj.attr]) {
              obj.value = edit[obj.attr];
              obj.text = edit[obj.attr];

              // 车型名称
              if (obj.attr === 'vehicleModelId') {
                obj.text = edit[obj.attr].carName;
                obj.value = edit[obj.attr].vehicleModelId;
              }

              // 客户类型
              if (obj.attr === 'orderCustomerType') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }
              // 姓名
              if (obj.attr === 'name') {
                this.form.info.name = edit[obj.attr];
              }
              // 电话
              if (obj.attr === 'mobile') {
                this.form.info.mobile = edit[obj.attr];
              }
              // 性别
              if (obj.attr === 'gender') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
                this.form.info.gender = edit[obj.attr].code;
              }
              // 台数
              if (obj.attr === 'amount') {
                obj.text = changeMoneyToChinese(edit[obj.attr]);
                obj.value = edit[obj.attr];
                obj.disable = true;
              }
              // 外观
              if (obj.attr === 'appearance') {
                try {
                  let appearData = edit[obj.attr];
                  if (typeof appearData === 'string') {
                    obj.text = JSON.parse(appearData).name;
                    obj.value = JSON.parse(appearData);
                  } else {
                    obj.text = appearData.name;
                    obj.value = appearData;
                  }

                  console.log(edit);
                } catch (e) {
                  console.log(e, '==>>>>>>');
                }
              }
              // 内饰
              if (obj.attr === 'interior') {
                try {
                  let interiorData = edit[obj.attr];
                  if (typeof interiorData === 'string') {
                    interiorData = JSON.parse(interiorData);
                  }
                  let name = JSON.parse(edit[obj.attr]).colors[0].name;
                  if (JSON.parse(edit[obj.attr]).colors[1]) {
                    name += `/${JSON.parse(edit[obj.attr]).colors[1].name}`;
                  }
                  obj.text = name;
                  obj.value = interiorData;
                } catch (e) {
                  obj.text = null;
                }
              }
              // 指导价
              if (obj.attr === 'indicativePrice' && edit[obj.attr]) {
                obj.text = Numeral(edit[obj.attr]).format('0,0.00');
                obj.value = Numeral(edit[obj.attr]).format('0,0.00');
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
              case 'orderCustomerType':
                obj.selData.source = orderCustomerType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
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
              default:

            }
            if ((item.name === '选择线索' || item.attr === 'cluePK') && !clueInfo) {
              console.log('111');
            } else {
              formData.push(obj);
            }
          });

          this.form.data = formData;
          console.log(this.form.data, '---------->>>>>>>>>>');

          clueInfo && this.selClue(clueInfo);

          if (this.form.type === 'edit') {
            // 判断是否是个人或公司
            if (edit.orderCustomerType) {
              let vl = this.$ChangeType.xToType(edit.orderCustomerType.code, 'string');
              this.onSelect({
                type: 'orderCustomerType',
                value: vl
              });
            }
            // 初始化页面编辑数据
            this.form.data.forEach((item, index) => {
              if (item.attr === 'vehicleModelId') {
                this.form.data[index].text = edit.carName;
                this.form.data[index].value = edit.vehicleModelId.vehicleModelId;

                edit.vehicleModelId && edit.carName !== '模糊意向' && getModelDetail(edit.vehicleModelId.vehicleModelId)
                  .then((res1) => this.onCarModel({data: res1}, true))
                  .catch((err) => console.log(err));
              }
            });
          }

          // 初始数据保留
          this.initData = JSON.stringify(this.form);
        })
        .catch((err)=>{ console.log(err, '==============================>err'); });

    }
  },
  activated() {
    ddApi.setRight();

    if (this.params.id) {
      ddApi.setTitle({title: '编辑合同'});
    } else {
      ddApi.setTitle({title: '基础信息'});
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
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
