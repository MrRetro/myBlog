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
                  :indent="false"
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
                :ref="item.rules.required ? 'va' : null"
                v-bind="item"
                v-model="item.text"
                :value.sync="item.value"
                :indent="false"
                :selData="item.selData || null"
                :clearMR="item.columnWidth===50"
                @onCarModel="onCarModel"
                @onGetName="onGetName"
              />
            </div>
          </template>
          <div class="space-box"></div>
        </div>
      </cube-scroll>
    </div>
    <yi-btn-box
      name="创建订单"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
// import {inputType} from '../../../config/module';
import EditPage from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';

export default {
  name: 'order-add',
  extends: EditPage,
  created() {
    this.$nextTick(()=>{

      // 路由参数 判断是否为编辑状态或新增状态
      // this.params = this.$route.params;
      // let params = this.params;
      // if (params && params.id) {
      //   this.id = params.id;
      //   this.form.type = 'edit';
      // } else {
      //   this.form.type = 'add';
      // }
      //
      // // 获取枚举类别
      // let form = this.$store.state.menu;
      // let clueAdditionalConfiguration = form.clueAdditionalConfiguration; // 车型信息
      // let outerColor = {selKey: 1, colorList: [{name: '无', colors: {size: 1, color: ['', '']}}]}; // 外观
      // let innerColor = {selKey: 1, colorList: [{name: '无', colors: {size: 1, color: ['', '']}}]};// 内饰
      // let clueIntentionType = form.clueIntentionType; // 意向类型
      // let clueShoppingWay = form.clueShoppingWay; // 购买方式
      // let genderData = form.gender; // 性别
      // let customerOrigin = form.customerOrigin; // 客户来源
      // let customer = form.customerType; // 客户类型
      //
      //
      // // 获取添加模版
      // getAddOrderModule()
      //   .then((res)=>{
      //     console.log(res, '=========================>success2');
      //     let data1 = [];
      //     res.forEach((item)=>{
      //       console.log(item);
      //       if (item.code === 'create-order' && this.form.type === 'add') {
      //         data1 = item.fields;
      //       }
      //       if (item.code === 'edit-order' && this.form.type === 'edit') {
      //         data1 = item.fields;
      //       }
      //     });
      //     // 升序
      //     data1.sort((a, b)=>a.sort - b.sort);
      //     this.allData = data1;
      //
      //     console.log(data1, '=========================>data2');
      //
      //     let data = [];
      //     if (this.form.type === 'add') {
      //       data = data1.filter((item)=>{
      //         return item.description === 'step5';
      //       });
      //     } else {
      //       data = data1;
      //     }
      //     console.log(data, '=========================>data2');
      //
      //     let formData = [];
      //     data.forEach((item)=>{
      //       let obj = {
      //         attr: item.attr,
      //         type: inputType[item.configsObj.type],
      //         title: item.name,
      //         text: null,
      //         value: null,
      //         placeholder: item.configsObj.placeholder,
      //         indent: true,
      //         columnWidth: item.columnWidth,
      //         selData: {'source': [{'key': '选项一', 'value': 1}, {'key': '选项二', 'value': 2}], 'selectedKey': '下单客户1'}
      //       };
      //       let required = item.rulesObj[0] && item.rulesObj[0].value;
      //       let objs = {};
      //       if (item.rulesObj.length > 0) {
      //         item.rulesObj.forEach((item2)=>{
      //           if (item2.type === 'required') {
      //             objs[item2.type] = item2.value;
      //           } else if (item2.type === 'pattern') {
      //             objs[item2.value] = true;
      //           }
      //         });
      //       }
      //       let rules = objs;
      //       if (required) { obj.required = required; }
      //       if (rules) { obj.rules = rules; }
      //
      //       // 类别
      //       switch (item.attr) {
      //         case 'vehicleModelId':
      //           obj.selData.source = clueAdditionalConfiguration.map((item1)=>{ return {key: item1.name, value: item1.code}; });
      //           break;
      //         case 'intentionType':
      //           obj.selData.source = clueIntentionType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
      //           break;
      //         case 'intentionGrade':
      //           obj.selData.source = clueIntentionType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
      //           break;
      //         case 'shoppingWay':
      //           obj.selData.source = clueShoppingWay.map((item1)=>{ return {key: item1.name, value: item1.code}; });
      //           break;
      //         case 'appearance':
      //           obj.selData = outerColor;
      //           break;
      //         case 'interior':
      //           obj.selData = innerColor;
      //           break;
      //         case 'gender':
      //           obj.selData.source = genderData.map((item1)=>{ return {key: item1.name, value: item1.code}; });
      //           break;
      //         case 'origin':
      //           obj.selData.source = customerOrigin.map((item1)=>{ return {key: item1.name, value: item1.code}; });
      //           break;
      //         case 'type':
      //           obj.selData.source = customer.map((item1)=>{ return {key: item1.name, value: item1.code}; });
      //           break;
      //         default:
      //
      //       }
      //
      //       formData.push(obj);
      //     });
      //     this.form.data = formData;
      //     console.log(this.form.data, '---------->>>>>>>>>>');
      //   })
      //   .catch((err)=>{ console.log(err, '==============================>err'); });
    });
  },
  activated() {
    // 获取路由参数
    // let data = this.$route.params;
    // this.params = data;
    ddApi.setRight();
  },
  data() {
    return {
      params: null, // 路由参数
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
      }
    };
  },
  methods: {
    onBtnClick() {
      console.log(this.form);
      const arr = this.$refs.va.map((item)=>{
        return item.changeV();
      });
      Promise.all(arr).then(data => {
        console.log('新建线索2', this.$refs.va);
        let state = data.every(item => item);
        console.log(state);
        if (state) {
          console.log(this.form, '校验成功并提交数据');

          // todo
          if (this.form.type === 'add') {
            this.params.data5 = this.form.data;

            console.log(this.params, '4444');
            // 整理参数
            let nowData = this.params;
            let list = [];
            if (nowData.data3 instanceof Array) {
              list = list.concat(nowData.data3);
            }
            if (nowData.data4 instanceof Array) {
              list = list.concat(nowData.data4);
            }
            if (nowData.data5 instanceof Array) {
              list = list.concat(nowData.data5);
            }

            console.log(list);

            let items = list.filter((item) => {
              return item.attr !== 'group' && item.attr !== 'files';
            }).map((item) => {
              return {
                [item.attr]: item.value || item.text
              };
            });

            let lastItems = {};
            items.forEach((items1) => {
              for (let item in items1) {
                lastItems[item] = items1[item];
              }
            });

            addOrderInfo(lastItems).then((res) => {
              this.$RouteUtil.orderAddSuccess({
                name: '新建订单',
                customerNo: res.customerNo || 'FJQZLS18030701S',
                id: res && res[0]
              });
              console.log(res, '--------01---------');

            }).catch((err) => {
              console.log(err, '--------02---------');
            });
          } else if (this.form.type === 'edit') {
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

                // 转换外观和内饰格式
                if (item.attr === 'appearance') {
                  val = tranformColorsApi(val, 'outerColors');
                }
                if (item.attr === 'interior') {
                  val = tranformColorsApi(val, 'innerColors');
                }

                items[item.attr] = val;

                if (item.attr === 'vehicleModelId') {
                  items.carName = item.text;
                }
              }
            });
            console.log(this.form.data, '==>edit info');
            console.log(items, '==>edit info');
            // // 手动将车型信息赋值
            // this.form.data.forEach((item)=>{
            //   if (item.attr === 'vehicleModelId') {
            //     this.carName.text = item.text;
            //   }
            // });
            editOrderInfo({orderId: this.id, ...items})
              .then(res=>console.log(res, '==>edit success'))
              .catch(err=>console.log(err, '==>edit err'));
          }
        }
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
    // 车信息回调
    onCarModel(obj) {
      console.log(obj, 'data');
      // 设置外观和内饰
      let innerColors = obj.data.innerColors;
      let outerColors = obj.data.outerColors;
      this.form.data.forEach((item, index)=>{
        if (item.attr === 'appearance') {
          if (innerColors) {
            this.form.data[index].selData = {
              colorList: tranformColors(innerColors)
            };
          } else {
            this.form.data[index].selData = {
              selKey: 1,
              colorList: [
                {
                  name: '无',
                  colors: {size: 1, color: ['', '']}
                }
              ]
            };
          }
        }
        if (item.attr === 'interior') {
          if (outerColors) {
            this.form.data[index].selData = {
              colorList: tranformColors(outerColors)
            };
          } else {
            this.form.data[index].selData = {
              selKey: 1,
              colorList: [
                {
                  name: '无',
                  colors: {size: 1, color: ['', '']}
                }
              ]
            };
          }
        }
      });
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
