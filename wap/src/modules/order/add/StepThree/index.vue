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
                :clearMR="item.columnWidth===50"
                @onCarModel="onCarModel"
                @onGetMan="onGetMan"
                @onStore="onStore"
                @onSelect="onSelect"
              />
            </div>
            <!--{{item}}-->
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
import {
  getAddOrderModule,
  getStoresByUserId,
  getOrderNo,
  getOrderSourse
} from '../../../../api/order';
import {inputType} from '../../../../config/module';
import Page from '../../../../components/Mixins/EditPage';
import {ddApi} from '../../../../api/dingding';
import {validate} from '../../../../config/validate';
import {isEmptyObject} from '../../../../utils/commonUtil';
import {isValidate} from '../../../../api/clue';

export default {
  name: 'order-add-three',
  extends: Page,
  created() {
    this.$nextTick(()=>{

      // 路由参数 判断是否为编辑状态或新增状态
      this.params = this.$route.params;

      // 设置线索id
      if (this.params && this.params.oldData && this.params.oldData.clueId) {
        this.clueId = this.params.oldData.clueId;
      }
      if (this.params && this.params.clueInfo && this.params.clueInfo.id) {
        this.clueId = this.params.clueInfo.id;
      }

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
      ddApi.setTitle({title: '业务信息'});
    }
  },
  data() {
    return {
      initData: null,
      clueId: '', // 线索id
      id: '',
      form: {
        type: 'add',
        info: [
          {
            attr: 'name',
            type: 'text',
            title: '客户名称',
            text: null,
            placeholder: '请选择客户名称1',
            rules: {required: true},
            required: false,
            indent: false,
            disable: true
          },
          {
            attr: 'mobile',
            type: 'text',
            title: '联系电话',
            text: null,
            placeholder: '客户联系电话',
            rules: {required: true},
            required: false,
            indent: false,
            disable: true
          },
          {
            attr: 'gender',
            type: 'text',
            title: '性别',
            text: null,
            placeholder: '请选择性别',
            rules: {required: true},
            required: false,
            indent: false,
            disable: true
          }
        ],
        data: []
      },
      params: {},
      stores: {} // 地面店数据
    };
  },
  methods: {
    isEdit() {
      // 设置data2
      this.$store.dispatch('order/getData2', this.form.data);
      return false;
    },
    onBtnClick() {
      console.log('新建订单2');
      const arr = [];
      this.$refs.va.forEach((item)=>{
        if (item.rules && !isEmptyObject(item)) {
          arr.push(item.changeV());
        }
      });
      Promise.all(arr).then(data => {
        console.log('新建线索2', this.$refs.va);
        let state = data.every(item => item);
        console.log(state);
        if (state) {
          console.log(this.form, '校验成功并提交数据');
          // let businessCode
          // todo
          // 设置业务类型选中
          this.form.data.forEach((item)=>{
            if (item.attr === 'orderType') {
              this.$store.dispatch('order/getOrderType', item.value);
            }
          });

          this.$RouteUtil.orderAddFour({
            ...this.params,
            storeId: this.$store.state.order.storeId,
            storeAddress: this.$store.state.order.storeAddress,
            data2: this.form.data
          });
        }
      });
    },
    // 通过负责人联动地面店
    async onGetMan(id, initial) {
      if (id) {
        const res = await getStoresByUserId(id);
        console.log(res, 'res111');
        // let isUser = true; // 是否是当前负责人 如果不是的话清空地面店和省市区
        this.form.data.forEach((item, index) => {
          if (item.attr === 'belongStoreId') {
            this.stores = {};
            res.stores.map((item1) => {
              this.stores[item1.id] = item1.no;
              return false;
            });

            this.form.data[index].selData = {source: res.stores.map((item1, index2) => {
              return {key: item1.name, value: {id: item1.id, areas: res.areas[index2], stores: res.stores[index2]}};
            })};
          }
        });

        // 清空联动内容数据
        // if (isUser && !initial) {
        //   this.form.data.forEach((item, index) => {
        //     if (item.attr === 'belongStoreId' || item.attr === 'storeAddress' || item.attr === 'belongPlaceId') {
        //       this.form.data[index].text = '';
        //       this.form.data[index].value = '';
        //     }
        //   });
        // }

        // 初始数据保留
        if (initial) {
          this.initData = JSON.stringify(this.form);
        }
      }
    },
    // 选择地面店联动地址
    onStore(obj, initial = false) {
      if (obj) {
        console.log(typeof obj, '==>000');
        if (typeof obj === 'string') {
          obj = JSON.parse(obj);
        }
        if (typeof obj === 'string') {
          obj = JSON.parse(obj);
        }
        console.log(typeof obj, '==>000==>000');

        // 判断业务类型逻辑开始
        let status = true;
        let vl = -1;
        this.form.data.forEach((item) => {
          if (item.attr === 'orderType') {
            let value = this.$ChangeType.xToType(item.value, 'string');
            vl = value;
          }
        });
        if (['3', '4', '5', '6', '7'].indexOf(vl) > -1) {
          status = false;
        }
        // 判断业务类型逻辑结束

        this.form.data.forEach((item, index) => {
          // 所属地面地址联动
          if (item.attr === 'storeAddress') {
            status && this.$store.dispatch('order/getStoreAddress', obj.stores.address);
            status && this.$store.dispatch('order/getStoreId', obj.stores.id);
            if (!initial) {
              console.log(obj, '==>666');
              this.form.data[index].text = obj.stores.address;
              this.form.data[index].value = obj.stores.address;
              // this.form.data[index].value = obj.codes && `${obj.codes[obj.codes.length - 1]}`;
            }
          }
          // 所属区域联动
          if (item.attr === 'belongPlaceId') {
            if (!initial) {
              this.form.data[index].text = obj.areas.address;
              this.form.data[index].value = obj.areas.codes && `${obj.areas.codes[obj.areas.codes.length - 1]}`;
            }
          }
        });
      }
    },
    // 选择业务类型时候判断提示是否给予选择
    async onSelect(obj, initial) {
      console.log(obj, '==>orderType');
      obj.value = this.$ChangeType.xToType(obj.value, 'string');
      if (
        obj.type === 'orderType' && (
          obj.value === '0' ||
          obj.value === '1' ||
          obj.value === '3'
        )
      ) {
        // 签约前判断是否为业务类型错误
        this.params.clueInfo && isValidate({clueId: this.params.clueInfo.id})
          .then((res)=> {
            if (
              res.code === 1005010017 ||
              res.code === 1005010018 ||
              res.code === 1005010019
            ) {
              console.log(res, '==>res123');
              this.$AlertUtil.showToast({txt: res.message, type: 'error'});
              // 先清空业务类别选择 待确认是否弹框回退哪里
              this.form.data.forEach((item, index)=>{
                if (item.attr === 'orderType') {
                  this.form.data[index].text = null;
                  this.form.data[index].value = null;
                }
              });

            }
          });
      }
      // if (obj.type === 'orderType') {
      //   this.params.orderType = obj.value;
      // }

      // 选择门店零售时逻辑处理
      if (obj.type === 'orderType') {
        // 联动动订单来源枚举列表
        const orderSource = await getOrderSourse({clueId: this.clueId || '', orderType: obj.value});

        console.log('==>orderSource', orderSource);
        this.form.data.forEach((item, index)=>{
          if (item.attr === 'orderSource') {
            let state = true;
            if (!initial) {
              orderSource.forEach((res) => {
                if (res.code === this.form.data[index].value) {
                  state = false;
                }
              });
              if (state) {
                this.form.data[index].text = null;
                this.form.data[index].value = null;
              }
            }
            this.form.data[index].selData = {
              source:
                JSON.parse(JSON.stringify(orderSource.map((item1) => ({key: item1.name, value: item1.code}))))
            };
          }
        });

        let orderSource1 = this.menu.orderSource;
        console.log('==>', orderSource1);
        if (obj.value === '0') {
          if (this.params.clueInfo && this.params.clueInfo.groundPromotionId) {
            // 线索为有绑定地推经纪人提交--订单来源为地推提交
            this.form.data.forEach((item, index) => {
              if (item.attr === 'orderSource') {
                this.form.data[index].disable = true;
                this.form.data[index].text = orderSource1[2].name;
                this.form.data[index].value = orderSource1[2].code;
              }
            });
          } else if (this.params.clueInfo && this.params.clueInfo.brokerId) {
            // 线索为无绑定地推经纪人提交--订单来源为经纪人提交
            this.form.data.forEach((item, index) => {
              if (item.attr === 'orderSource') {
                this.form.data[index].disable = true;
                this.form.data[index].text = orderSource1[1].name;
                this.form.data[index].value = orderSource1[1].code;
              }
            });
          } else {
            this.form.data.forEach((item, index) => {
              if (item.attr === 'orderSource') {
                this.form.data[index].disable = false;
              }
            });
          }
        }

        // 当业务类型为
        // 渠道批售、渠道垫资、大客户部批售、房车部销售、夏宜销售
        // 门店信息置空，禁用
        // 联动网点及所属区域置空
        if (['3', '4', '5', '6', '7'].indexOf(obj.value) > -1) {
          this.form.data.forEach((item, index) => {
            if (item.attr === 'belongStoreId') {
              if (!initial) {
                this.form.data[index].text = null;
                this.form.data[index].value = null;
              }
              this.form.data[index].disable = true;
              this.form.data[index].hide = true;
              this.form.data[index].rules.required = false;
              this.$store.dispatch('order/getStoreId', '');

            }
            if (item.attr === 'storeAddress') {
              if (!initial) {
                this.form.data[index].text = null;
                this.form.data[index].value = null;
                this.form.data[index].hide = true;
              }
              this.$store.dispatch('order/getStoreAddress', '');
            }
            if (item.attr === 'belongPlaceId') {
              // if (!initial) {
              //   this.form.data[index].text = null;
              //   this.form.data[index].value = null;
              // }
              this.form.data[index].disable = false;
              this.form.data[index].type = 'address';
              this.form.data[index].addressType = true;
            }
          });
        } else {
          // 在联动情况下，网点无值，所属区域也无值
          let isAddress = false;
          this.form.data.forEach((item, index) => {
            if (item.attr === 'belongStoreId') {
              this.form.data[index].disable = false;
              this.form.data[index].hide = false;
              this.form.data[index].rules.required = true;
            }
            if (item.attr === 'storeAddress') {
              this.form.data[index].hide = false;
              if (!this.form.data[index].value) {
                isAddress = true;
              }
            }
            if (item.attr === 'belongPlaceId') {
              this.form.data[index].addressType = true;
              this.form.data[index].disable = true;
              this.form.data[index].type = 'text';
              if (isAddress && !initial) {
                this.form.data[index].text = null;
                this.form.data[index].value = null;
              }
            }
          });
        }
      } else {
        // this.form.data.forEach((item, index)=>{
        //   if (item.attr === 'orderSource') {
        //     this.form.data[index].disable = false;
        //     this.form.data[index].text = '内部创建';
        //     this.form.data[index].value = 0;
        //     this.form.data[index].selData.source = this.form.data[index].selData.source.filter((item1)=>{
        //       return item1.value !== 1 && item1.value !== 2;
        //     });
        //   }
        // });
        // }
      }
    },
    // 车信息回调
    onCarModel(obj) {
      console.log(obj, '2233344');
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
      let orderType = form.orderType; // 业务类型
      let orderSource = form.orderSource; // 订单来源
      console.log(form.orderType, 'OrderType');
      console.log(form.orderSource, 'OrderSource');

      // 保留操作痕迹
      if (this.$store.state.order.data2) {
        this.form.data = this.$store.state.order.data2;
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
            } else if (item.code === 'edit-order' && this.form.type === 'edit') {
              data1 = item.fields;
            }
          });
          // 升序
          data1.sort((a, b)=>a.sort - b.sort);
          this.allData = data1;

          console.log(data1, '=========================>data2');
          let data = data1.filter((item)=>{
            return item.description === 'step2';
          });
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
              selData: {'source': [], 'selectedKey': '无'}
            };

            // 合同编号
            if (obj.attr === 'receiptsNo') {
              obj.disable = true;
              getOrderNo()
                .then(res1=>{
                  console.log(res1, '==>getOrderNo');
                  obj.text = res1;
                  obj.value = res1;
                });
            }

            // 网点地址
            if (obj.attr === 'storeAddress') {
              obj.disable = true;
              item.rulesObj = null;
            }
            if (obj.attr === 'responsibleId') {
              console.log(this.$store.state.user.users);
              obj.selData = {source: this.$store.state.user.users.map((item1)=>{
                return {key: item1.name, value: item1.dingUserId};
              })};
            }
            // 所属区域
            if (obj.attr === 'belongPlaceId') {
              obj.disable = true;
            }

            // 编辑 数据绑定
            if (this.form.type === 'edit') {
              obj.value = edit[obj.attr];
              obj.text = edit[obj.attr];

              try {
                // 业务类型
                if (obj.attr === 'orderType') {
                  obj.text = edit[obj.attr].name;
                  obj.value = edit[obj.attr].code;
                  obj.disable = true;

                  this.onSelect({type: 'orderType', value: obj.value}, true);
                }
                // 订单来源
                if (obj.attr === 'orderSource') {
                  obj.text = edit[obj.attr].name;
                  obj.value = edit[obj.attr].code;
                }
                // 负责人
                if (obj.attr === 'responsibleId') {
                  obj.text = edit.responsible.name;
                  obj.value = edit.responsible.id;

                  obj.value && this.onGetMan(edit.responsible.dingUserId, true);
                }
                // 乙方服务网点
                if (obj.attr === 'belongStoreId') {
                  obj.text = edit.groundStoreDTO.storeName;
                  obj.value = edit.groundStoreDTO;
                  obj.selData.selectedKey = typeof obj.value === 'object' && JSON.stringify(data.value);

                  this.$store.dispatch('order/getStoreAddress', obj.text);
                  this.$store.dispatch('order/getStoreId', edit.groundStoreDTO.id);
                  this.onStore(obj.value, true);
                }
                // 网点地址
                if (obj.attr === 'storeAddress') {
                  obj.text = edit.storeAddress;
                  obj.value = edit.storeAddress;
                }

                // 所属区域
                if (obj.attr === 'belongPlaceId') {
                  obj.text = edit.area && edit.area.name || '';
                  obj.value = edit.area && edit.area.id || '';
                }
              } catch (e) {
                console.log(e);
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
                obj.selData = {source: clueAdditionalConfiguration.map((item1)=>{ return {key: item1.name, value: item1.code}; })};
                break;
              case 'intentionType':
                obj.selData = {source: clueIntentionType.map((item1)=>{ return {key: item1.name, value: item1.code}; })};
                break;
              case 'intentionGrade':
                obj.selData = {source: clueIntentionType.map((item1)=>{ return {key: item1.name, value: item1.code}; })};
                break;
              case 'shoppingWay':
                obj.selData = {source: clueShoppingWay.map((item1)=>{ return {key: item1.name, value: item1.code}; })};
                break;
              case 'appearance':
                obj.selData = outerColor;
                break;
              case 'interior':
                obj.selData = innerColor;
                break;
              case 'gender':
                obj.selData = {source: genderData.map((item1)=>{ return {key: item1.name, value: item1.code}; })};
                break;
              case 'origin':
                obj.selData = {source: customerOrigin.map((item1)=>{ return {key: item1.name, value: item1.code}; })};
                break;
              case 'type':
                obj.selData = {source: customer.map((item1)=>{ return {key: item1.name, value: item1.code}; })};
                break;
              case 'orderType':
                obj.selData = {source: orderType && orderType.map((item1)=>{ return {key: item1.name, value: item1.code}; })};
                break;
              case 'orderSource':
                obj.selData = {source: orderSource && orderSource.map((item1)=>{ return {key: item1.name, value: item1.code}; })};
                break;
              default:

            }

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
