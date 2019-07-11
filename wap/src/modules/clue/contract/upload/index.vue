<template>
  <div class="container app-init">
    <div class="input-box2">
      <cube-scroll>
        <template v-for="(item, index) in form.data">
          <yi-input
            ref="va"
            :class="{'hide':item.attr==='orderNo'}"
            :key="index"
            v-bind="item"
            v-model="item.text"
            :value.sync="item.value"
            :indent="true"
            :selData="item.selData || null"
          />
        </template>
      </cube-scroll>
    </div>
    <yi-btn-box
      name="确认提交"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import {ddApi} from '../../../../api/dingding';
import {getContactDataModule, clueToOrder} from '../../../../api/clue';
import {getOrderNo} from '../../../../api/common';
import {inputType} from '../../../../config/module';
import Page from '../../../../components/Mixins/EditPage';
import {AlertUtil} from '../../../../utils/AlertUtil';

export default {
  name: 'upload',
  extends: Page,
  created() {
    this.$nextTick(()=>{

      // 路由参数 判断是否为编辑状态或新增状态
      // this.params = this.$route.params;
      // console.log(this.params, '---------------8888');
      // let params = this.params;
      // if (params && params.id) {
      //   this.id = params.id;
      //   this.clueId = params.clueId;
      //   this.form.type = 'edit';
      // } else {
      //   this.form.type = 'add';
      // }
      // if (this.form.type === 'add') {
      this.getPage({});
      // } else {
      //   // 编辑赋初值
      //   getEditOrderInfo(this.id)
      //     .then((res)=>{
      //       this.edit = res;
      //       console.log(res, '--------------------0203');
      //       this.getPage(res);
      //     })
      //     .catch(err=>{ console.log(err); });
      // }
    });
  },
  mounted() {
    // 设置标题
    ddApi.setTitle({'title': '合同资料'});
  },
  activated() {
    ddApi.setRight();
  },
  data() {
    return {
      initData: null,
      form: {
        type: 'add',
        data: []
      }
    };

  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    cancelHandle() {

    },
    // 上传图片
    onImgsSuccess() {

    },
    onBtnClick() {
      const arr = [];
      this.$refs.va.forEach((item)=>{
        if (item.rules && item.rules.required) {
          arr.push(item.changeV());
        }
      });
      Promise.all(arr).then(data => {
        let state = data.every(item => item);
        if (state) {
          console.log(this.form, '校验成功并提交数据');

          console.log(this.params);
          console.log(this.form);

          let items = {};
          items.clueId = this.params.clueId;
          this.params.data.data.forEach((item)=>{
            let val = '';
            if (item.value) {
              val = item.value;
            } else {
              val = item.value === 0 ? 0 : item.text;
            }
            items[item.attr] = val;
          });
          this.form.data.forEach((item)=>{
            let val = '';
            if (item.value) {
              val = item.value;
            } else {
              val = item.value === 0 ? 0 : item.text;
            }

            // 上传格式默认为数组
            if (
              item.attr === 'contractUrl' ||
              item.attr === 'certificateUrl' ||
              item.attr === 'depositVoucherUrl'
            ) {
              val = val || [];
            }

            // 订单编号重新组装
            if (item.attr === 'orderNo') {
              val = item.text + item.value;
            }

            items[item.attr] = val;
          });
          // 判断图片是否传了正确格式
          let status = true;
          items.contractUrl && items.contractUrl.forEach((item)=>{
            if (item && typeof item !== 'string') {
              status = false;
            }
          });
          items.certificateUrl && items.certificateUrl.forEach((item)=>{
            if (item && typeof item !== 'string') {
              status = false;
            }
          });
          items.depositVoucherUrl && items.depositVoucherUrl.forEach((item)=>{
            if (item && typeof item !== 'string') {
              status = false;
            }
          });
          !status && this.$AlertUtil.showToast({txt: '您传的图片未成功，请重新选择图片', type: 'warn'});
          status && clueToOrder(items)
            .then((res)=>{
              console.log(res);
              if (res) {
                AlertUtil.showToast({txt: '签约成功'});
                this.params.onSuccess && this.params.onSuccess();
                this.$router.go(-3);
              }
              // this.$RouteUtil.contractSuccess({
              //
              //   onSuccess: ()=>{
              //
              // }});
            })
            .catch(err=>console.log(err, '==>err'));
        }
      });
    },
    // 获取模版
    getPage(edit) {
      console.log(edit);
      // 获取枚举类别
      let form = this.menu;
      let clueAdditionalConfiguration = form.clueAdditionalConfiguration; // 车型信息
      let outerColor = {selKey: 1, colorList: [{name: '无', colors: {size: 1, color: ['', '']}}]}; // 外观
      let innerColor = {selKey: 1, colorList: [{name: '无', colors: {size: 1, color: ['', '']}}]};// 内饰
      let clueIntentionType = form.clueIntentionType; // 意向类型
      let clueShoppingWay = form.clueShoppingWay; // 购买方式
      let genderData = form.gender; // 性别
      let customerOrigin = form.customerOrigin; // 客户来源
      let customer = form.customerType; // 客户类型


      // 获取添加模版
      getContactDataModule()
        .then((res)=>{

          console.log(res, '=========================>success2');
          let data1 = [];
          res.forEach((item)=>{
            console.log(item);
            if (item.code === 'contact-add' && this.form.type === 'add') {
              data1 = item.fields;
            }
            if (item.code === 'contact-edit' && this.form.type === 'edit') {
              data1 = item.fields;
            }
          });
          // 升序
          data1.sort((a, b)=>a.sort - b.sort);
          this.allData = data1;

          console.log(data1, '=========================>data2');

          let data = [];
          data = data1.filter((item)=>{
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
              selData: {'source': [{'key': '选项一', 'value': 1}, {'key': '选项二', 'value': 2}], 'selectedKey': '下单客户1'}
            };

            // 订单编号自动生产
            if (item.attr === 'orderNo') {
              console.log(this.params);
              this.params.storeSimpleDTO && getOrderNo({
                code: this.params.storeSimpleDTO.storeNo
              }).then((res1)=>{
                console.log(res1, 'res');
                this.form.data.forEach((item3, index) =>{
                  if (item3.attr === 'orderNo') {
                    this.form.data[index].text = res1.substring(0, 8);
                    this.form.data[index].value = res1.substring(8, res1.length);
                    this.form.data[index].disable = true;
                  }
                });
              }).catch((err)=>{
                console.log(err, 'err');
              });
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

            // 编辑 数据绑定
            if (edit[obj.attr]) {
              obj.value = edit[obj.attr];
              obj.text = edit[obj.attr];

              //  性别
              if (obj.attr === 'gender') {
                obj.text = genderData[edit[obj.attr].code] && genderData[edit[obj.attr].code].name;
                obj.value = edit[obj.attr].code;
              }

              // 车型名称
              if (obj.attr === 'vehicleModelId') {
                obj.text = edit[obj.attr].carName;
                obj.value = edit[obj.attr].vehicleModelId;

                getModelDetail(edit[obj.attr].vehicleModelId)
                  .then((res1)=>this.onCarModel({data: res1}))
                  .catch((err)=>console.log(err));
              }

              // 外观
              if (obj.attr === 'appearance') {
                obj.text = JSON.parse(edit[obj.attr]) && JSON.parse(edit[obj.attr]).name;
                obj.value = edit[obj.attr] ? tranformColorsComponent(JSON.parse(edit[obj.attr])) : null;
              }

              // 内饰
              if (obj.attr === 'interior') {
                obj.text = JSON.parse(edit[obj.attr]).colors && JSON.parse(edit[obj.attr]).colors[0].name;
                obj.value = edit[obj.attr] ? tranformColorsComponent(JSON.parse(edit[obj.attr])) : null;
              }

              // 购车方式
              if (obj.attr === 'shoppingWay') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 委托订单合同
              if (obj.attr === 'contractUrl') {
                let vl = obj.value || [];
                obj.value = vl.map(item1=>({url: item1}));
              }

              // 身份证/企业执照
              if (obj.attr === 'certificateUrl') {
                let vl = obj.value || [];
                obj.value = vl.map(item1=>({url: item1}));
              }

              // 订单付款凭证
              if (obj.attr === 'depositVoucherUrl') {
                let vl = obj.value || [];
                obj.value = vl.map(item1=>({url: item1}));
              }

            }


            let required = item.rulesObj[0] && item.rulesObj[0].value;
            let objs = {};
            if (item.rulesObj.length > 0) {
              item.rulesObj.forEach((item2)=>{
                if (item2.type === 'required') {
                  objs[item2.type] = item2.value;
                } else if (item2.type === 'pattern') {
                  objs[item2.value] = true;
                }
              });
            }
            let rules = objs;
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
  @import "~styles/global.styl"
  .hide{
    display none
  }
  .container {
    display flex
    flex-direction column
    flex 1
    overflow-y auto
    height 100%

    .input-box2 {
      display flex
      height calc(100% - 50px)
      flex-direction column
      flex 1
      overflow-y auto
    }
  }
</style>
