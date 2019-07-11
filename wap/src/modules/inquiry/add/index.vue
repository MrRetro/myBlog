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
                :selData="item.selData || null"
                :clearMR="item.columnWidth===50"
                @onCarModel="onCarModel"
                @selClue="selClue"
              />
            </div>
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
import Numeral from 'numeral';
import {
  getAddInquiryModule,
  addInquiryInfo,
  editInquiryInfo,
  getEditInquiryInfo
} from '../../../api/inquiry';
// import {getModelDetail} from '../../../api/carModel';
import {inputType} from '../../../config/module';
import Page from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import {validate} from '../../../config/validate';
import {isEmptyObject, enterFomart} from '../../../utils/commonUtil';
import {formatDateTime, removeSecond} from '../../../utils/TimeUtil';
// import {AlertUtil} from '../../../utils/AlertUtil';

export default {
  name: 'inquiry-add',
  extends: Page,
  created() {
    this.$nextTick(()=>{

      // 路由参数 判断是否为编辑状态或新增状态
      this.params = this.$route.params;
      let params = this.params;
      console.log(params, '==>type');
      if (params && params.type === 'edit') {
        this.id = params.id;
        this.form.type = 'edit';
      } else {
        this.id = params.id;
        this.form.type = 'add';
      }
      if (this.form.type === 'add') {
        this.getPage({});
      } else {
        // 编辑赋初值
        getEditInquiryInfo(this.id)
          .then((res) => {
            this.id = res.id;
            this.edit = res;
            this.getPage(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  },
  activated() {
    ddApi.setRight();
  },
  computed: {
    btnName() {
      let type = this.params.type;
      return type === 'edit' ? '编辑询价' : '发起询价';
    }
  },
  data() {
    return {
      initData: null,
      clueId: '', // 线索id
      id: '',
      form: {
        type: 'add',
        data: []
      },
      edit: null
    };
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
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
          console.log(this.form, '校验成功并提交数据');
          // todo
          let items = {};
          this.form.data.forEach((item) => {
            if (item.attr !== 'group') {
              let val = '';
              if (item.value) {
                val = item.value;
              } else {
                val = item.value === 0 ? 0 : item.text;
              }
              console.log(val, 'item');

              // 转换外观和内饰格式
              if (item.attr === 'appearance' || item.attr === 'interior') {
                if (val === '无') {
                  val = null;
                } else {
                  val = val && JSON.stringify(val) || '';
                }
              }

              // 转换时间格式
              if (item.attr === 'estimateObtainTime' && item.text) {
                val = formatDateTime(item.text);
              }
              if (item.attr === 'billingTime' && item.text) {
                val = formatDateTime(item.text);
              }

              items[item.attr] = val;

              if (item.attr === 'areaId') {
                items[item.attr] = `${items[item.attr]}`;
              }
            }
          });

          // 处理参数格式
          items.clueId = this.$ChangeType.xToType(items.clueId, 'string');
          items.customerType = this.$ChangeType.xToType(items.customerType, 'number');
          items.areaId = this.$ChangeType.xToType(items.areaId, 'string');
          items.number = this.$ChangeType.xToType(items.number, 'number');
          items.estimateObtainTime = this.$ChangeType.xToType(items.estimateObtainTime, 'string');
          items.billingDemand = this.$ChangeType.xToType(items.billingDemand, 'string');
          items.billingTime = this.$ChangeType.xToType(items.billingTime, 'string');
          items.demand = this.$ChangeType.xToType(items.demand, 'string');

          // if (typeof items.clueId !== 'string' && items.clueId) { items.clueId = `${items.clueId}`; }
          // if (typeof items.customerType !== 'number' && items.customerType) { items.customerType = parseInt(items.customerType); }
          // if (typeof items.areaId !== 'string' && items.areaId) { items.areaId = `${items.areaId}`; }
          // if (typeof items.number !== 'number' && items.number) { items.number = parseInt(items.number); }
          // // if (typeof items.capitalCost !== 'number' && items.capitalCost) { items.capitalCost = parseFloat(items.capitalCost); }
          // if (typeof items.estimateObtainTime !== 'string' && items.estimateObtainTime) { items.estimateObtainTime = `${items.estimateObtainTime}`; }
          // if (typeof items.billingDemand !== 'string' && items.billingDemand) { items.billingDemand = `${items.billingDemand}`; }
          // if (typeof items.billingTime !== 'string' && items.billingTime) { items.billingTime = `${items.billingTime}`; }
          // if (typeof items.demand !== 'string' && items.demand) { items.demand = `${items.demand}`; }


          // 删除不用传的字段
          delete items.clueLevel;
          delete items.vehicleModelId;
          delete items.appearance;
          delete items.interior;
          delete items.guidancePrice;
          delete items.shoppingWay;

          // todo add and edit
          if (this.form.type === 'add') {
            console.log(items, '==>add');
            addInquiryInfo(items)
              .then(res=>{
                console.log(this.params, '==>params');
                console.log(res);
                // debugger;
                if (res) {
                  // todo 跳转询价详情
                  this.params.onSuccess && this.params.onSuccess();
                  this.$RouteUtil.commonDetail({module: 'enquiryPrices', id: res, BACK_ACTION: this.params.BACK_ACTION});
                }
              })
              .catch(err=>console.log(err));
          } else if (this.form.type === 'edit') {
            items.id = this.id;
            editInquiryInfo(items)
              .then(()=>{
                this.params.onSuccess && this.params.onSuccess();
                this.$router.go(-1);
              })
              .catch(err=>console.log(err));

          }
        }

      });
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
    // 线索回调
    selClue(obj) {
      console.log(obj, ' 123 ');

      this.form.data.forEach((item, index)=>{

        // 线索id
        if (item.attr === 'clueId') {
          this.form.data[index].text = obj.clueNo || obj.id;
          this.form.data[index].value = obj.id;
        }
        // 线索等级
        if (item.attr === 'clueLevel') {
          this.form.data[index].text = obj.intentionGrade.name;
          this.form.data[index].value = obj.intentionGrade.code;
        }

        // 车型
        if (item.attr === 'vehicleModelId') {
          this.form.data[index].text = obj.carName;
          this.form.data[index].value = obj.vehicleModelId;
        }
        // 外观
        if (item.attr === 'appearance') {
          let outColor = null;
          try {
            outColor = JSON.parse(obj.appearance);
          } catch (e) {
            outColor = null;
          }
          this.form.data[index].text = outColor && outColor.name || null;
          this.form.data[index].value = outColor || null;
        }

        // 内饰
        if (item.attr === 'interior') {
          let innerColor = null;
          let name = null;
          try {
            innerColor = JSON.parse(obj.interior);
            name = innerColor && innerColor.colors && innerColor.colors[0].name;
            if (innerColor.colors && innerColor.colors[1]) {
              name += `/${innerColor.colors[1].name}`;
            }
          } catch (e) {
            innerColor = null;
          }
          this.form.data[index].text = name || null;
          this.form.data[index].value = innerColor || null;
        }

        // 指导价
        if (item.attr === 'indicativePrice') {
          this.form.data[index].text = obj.indicativePrice && Numeral(obj.indicativePrice * 10000).format('0,0.00');
          this.form.data[index].value = obj.indicativePrice && Numeral(obj.indicativePrice * 10000).format('0,0.00');
        }

        // 购车方式
        if (item.attr === 'shoppingWay') {
          this.form.data[index].text = obj.shoppingWay.name;
          this.form.data[index].value = obj.shoppingWay.code;
        }
      });

      // obj.vehicleModelId && getModelDetail(obj.vehicleModelId)
      //   .then((res1)=>{
      //     console.log(res1, 'res1');
      //     this.onCarModel({data: res1}, true);
      //   })
      //   .catch((err)=>console.log(err));
    },
    // 获取模版
    getPage(edit) {
      console.log(edit, 'edit----->>>>>');
      // 获取枚举类别
      let form = this.menu;
      let clueAdditionalConfiguration = form.clueAdditionalConfiguration; // 车型信息
      let outerColor = null; // 外观
      let innerColor = null; // 内饰
      let clueIntentionType = form.clueIntentionType; // 意向类型
      let clueLevel = form.clueIntentionGrade; // 线索等级
      let clueShoppingWay = form.clueShoppingWay; // 购买方式
      let genderData = form.gender; // 性别
      let customerOrigin = form.customerOrigin; // 客户来源
      // let customer = form.customerType; // 客户类型
      let enquiryCustomerType = form.enquiryCustomerType; // 客户类型

      // 获取添加模版
      getAddInquiryModule()
        .then((res)=>{
          console.log(res, '==>module');
          let data = [];
          res.forEach((item) => {
            if (item.code === 'create-inquiry' && this.form.type === 'add') {
              data = item.fields;
            }
            if (item.code === 'edit-inquiry' && this.form.type === 'edit') {
              data = item.fields;
            }
          });
          // 升序
          data.sort((a, b) => a.sort - b.sort);

          let formData = [];
          data.forEach((item)=>{
            let obj = {
              attr: item.attr,
              type: inputType[item.configsObj.type],
              title: item.name,
              text: null,
              value: null,
              placeholder: item.configsObj.placeholder,
              indent: true,
              columnWidth: item.columnWidth,
              selData: {'source': [], 'selectedKey': ''}
            };

            if (item.attr === 'clueId') {
              obj.params = this.params;
              if (this.params.module === 'clues') {
                obj.disable = true;
              }

              if (this.params.module === 'enquiryPrices') {
                obj.type = 'selClueOfAll';
              }
            }

            // 线索等级
            if (obj.attr === 'clueLevel') {
              obj.disable = true;
            }

            // 车型
            if (obj.attr === 'vehicleModelId') {
              obj.singleChoose = true;
              obj.disable = true;
            }

            // 外观
            if (obj.attr === 'appearance') {
              obj.disable = true;
            }

            // 内饰
            if (obj.attr === 'interior') {
              obj.disable = true;
            }

            // 指导价
            if (obj.attr === 'indicativePrice') {
              obj.disable = true;
            }

            // 购车方式
            if (obj.attr === 'shoppingWay') {
              obj.disable = true;
            }

            // 编辑 数据绑定
            if (edit[obj.attr]) {
              obj.value = edit[obj.attr];
              obj.text = edit[obj.attr];

              console.log(obj.attr, 'attr');

              // 线索关联
              if (obj.attr === 'clueId') {
                obj.text = edit.clueNo;
                obj.value = edit[obj.attr];
              }

              // 线索等级
              if (obj.attr === 'clueLevel') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 车型名称
              if (obj.attr === 'vehicleModelId') {
                obj.text = edit.vehicleModel;
                obj.value = edit[obj.attr];
              }

              // 外观
              if (obj.attr === 'appearance') {
                console.log(edit[obj.attr], 'dddddd');
                obj.text = edit[obj.attr] && JSON.parse(edit[obj.attr]) && JSON.parse(edit[obj.attr]).name;
                obj.value = edit[obj.attr] ? JSON.parse(edit[obj.attr]) : null; // edit[obj.attr] ? JSON.parse(edit[obj.attr]) : null;
              }
              //
              // // 内饰
              if (obj.attr === 'interior') {
                // console.log('-----------------------');
                // console.log(edit[obj.attr]);
                let name = edit[obj.attr] && JSON.parse(edit[obj.attr]).colors && JSON.parse(edit[obj.attr]).colors[0].name;
                if (JSON.parse(edit[obj.attr]).colors && JSON.parse(edit[obj.attr]).colors[1]) {
                  name += `/${JSON.parse(edit[obj.attr]).colors[1].name}`;
                }
                obj.text = name;
                obj.value = edit[obj.attr] ? JSON.parse(edit[obj.attr]) : null;
              }

              // 指导价
              if (item.attr === 'indicativePrice') {
                obj.text = edit.indicativePrice && Numeral(edit.indicativePrice * 10000).format('0,0.00');
                obj.value = edit.indicativePrice && Numeral(edit.indicativePrice * 10000).format('0,0.00');
              }

              // 购车方式
              if (obj.attr === 'shoppingWay') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 客户类型
              if (obj.attr === 'customerType') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 上牌地
              if (obj.attr === 'areaId') {
                obj.text = edit.area;
                obj.value = edit[obj.attr];
              }

              // 台数
              if (obj.attr === 'number') {
                obj.text = edit.number;
                obj.value = edit[obj.attr];
              }

              // 资金成本
              if (obj.attr === 'capitalCost') {
                obj.text = edit.capitalCost;
                obj.value = edit[obj.attr];
              }

              // 预计提车时间
              if (obj.attr === 'estimateObtainTime') {
                obj.text = edit[obj.attr] && removeSecond(edit[obj.attr]);
                obj.value = edit[obj.attr] && removeSecond(edit[obj.attr]);
              }

              // 开票价要求价格
              if (obj.attr === 'billingDemand') {
                obj.text = edit[obj.attr];
                obj.value = edit[obj.attr];
              }

              // 开票时间要求
              if (obj.attr === 'billingTime') {
                obj.text = edit[obj.attr] && removeSecond(edit[obj.attr]);
                obj.value = edit[obj.attr] && removeSecond(edit[obj.attr]);
              }

              // 其他需求
              if (obj.attr === 'demand') {
                obj.text = enterFomart(edit[obj.attr]);
                obj.value = enterFomart(edit[obj.attr]);
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
              case 'clueLevel':
                obj.selData.source = clueLevel.map((item1)=>{ return {key: item1.name, value: item1.code}; });
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
              case 'customerType':
                obj.selData.source = enquiryCustomerType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              default:

            }

            formData.push(obj);
          });
          this.form.data = formData;

          // 当线索详情进来时，默认有线索数据
          if (this.params.module === 'clues') {
            this.selClue(this.params.params);
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
        .self{
          width 48%
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
