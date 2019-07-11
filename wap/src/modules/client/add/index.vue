<template>
  <div class="container app-init">
    <div class="input-box2">
      <cube-scroll>
        <template v-for="(item, index) in form.data">
          <yi-input
            ref="va"
            :key="index"
            v-bind="item"
            v-model="item.text"
            :value.sync="item.value"
            :selData="item.selData || null"
            @onGetName="onGetName"
          />
        </template>
        <template>
          <div v-show="form.more && more" class="more-box">
            <template v-for="(item, index) in form2">
              <yi-input
                :ref="item.rules.required?'va1':null"
                :key="index"
                v-bind="item"
                v-model="item.text"
                :value.sync="item.value"
                :selData="item.selData || null"
              />
            </template>
          </div>
        </template>
        <yi-touch component-name="p" v-if="form2" class="p-more" @click="onMoreClick">
          {{ more?'收起更多资料':'完善更多资料'}}
          <img v-if="more" class="ico-more" :src="$images.follow.angle_top" alt="img">
          <img v-else class="ico-more" :src="$images.follow.angle_bottom" alt="img">
        </yi-touch>
      </cube-scroll>
    </div>
    <yi-btn-box
      name="确认提交"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import {addCustomersInfo, getAddClientModule, getClientEditInfo, editClientInfo} from '../../../api/client';
import {inputType} from '../../../config/module';
import Page from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import {validate} from '../../../config/validate';
import {getOrigin} from '../../../api/types';
import {enterFomart, isEmptyObject} from '../../../utils/commonUtil';

export default {
  name: 'client-add',
  extends: Page,
  created() {
    this.$nextTick(() => {

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
        getClientEditInfo(this.id)
          .then((res) => {
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
  data() {
    return {
      initData: null,
      more: false,
      form: {
        type: 'add',
        data: [],
        more: {
          data: []
        }
      }
    };
  },
  computed: {
    form2() {
      let data = this.form;
      if (data.more && data.more.data) {
        return data.more.data;
      }
      return null;
    }
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    onBtnClick() {
      let arr = [];
      console.log('---------------------========================');
      console.log(this.$refs.va);
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
            let val = '';
            if (item.value) {
              val = item.value;
            } else {
              val = item.value === 0 ? 0 : item.text;
            }
            items[item.attr] = val;
          });
          this.form.more.data.forEach((item) => {
            let val = '';
            if (item.value) {
              val = item.value;
            } else {
              val = item.value === 0 ? 0 : item.text;
            }
            items[item.attr] = val;
          });
          console.log(items);
          // 处理android隐式转换格式
          for (let item in items) {
            switch (item) {
              case 'gender':
                items[item] = parseInt(items[item]);
                break;
              case 'area':
                items[item] = `${items[item]}`;
                break;
              case 'origin':
                items[item] = parseInt(items[item]);
                break;
              case 'type':
                items[item] = parseInt(items[item]);
                break;
              default:
                break;
            }
            console.log(typeof items[item], items[item]);
          }
          if (this.form.type === 'add') {
            addCustomersInfo(items).then((res) => {
              this.$RouteUtil.clientAddSuccess({
                ...this.params,
                name: res.name,
                customerNo: res.customerNo,
                id: res.id
              });
              this.params.onSuccess && this.params.onSuccess();
              console.log(res, '--------01---------');

            }).catch((err) => {
              console.log(err, '--------02---------');
            });
          } else if (this.form.type === 'edit') {
            items.id = this.id;
            console.log(items, 'items');
            editClientInfo(items)
              .then(res => {
                console.log(res, '');
                // if (res) {
                this.params.onSuccess && this.params.onSuccess();
                this.$router.go(-1);
                // }
              })
              .catch(err => console.log(err));
          }
        }
      });
    },
    // 回到获取姓名
    onGetName(name) {
      console.log('--------------555555');
      console.log(name);
      console.log(this.form);
      this.form.data.forEach((item, index) => {
        console.log(item);
        if (item.attr === 'name') {
          this.form.data[index].value = name;
          this.form.data[index].text = name;
        }
      });
      // this.$refs.va[0].setText(name);
    },
    // 更多
    onMoreClick() {
      let more = !this.more;
      this.more = more;
      console.log(this.form.data[6].line);
      this.form.data[this.form.data.length - 1].line = !more;
    },
    // 获取模版
    async getPage(edit) {
      console.log(edit);
      // 获取枚举类别
      let form = this.menu;
      let followUpTarget = form.followUpTarget; // 跟进线索
      let followPurpose = []; // 跟进目的
      let clueAdditionalConfiguration = form.clueAdditionalConfiguration; // 车型信息
      let outerColor = {selKey: 1, colorList: [{name: '无', colors: {size: 1, color: ['', '']}}]}; // 外观
      let innerColor = {selKey: 1, colorList: [{name: '无', colors: {size: 1, color: ['', '']}}]};// 内饰
      let clueIntentionType = form.clueIntentionType; // 意向类型
      let clueShoppingWay = form.clueShoppingWay; // 购买方式
      let genderData = form.gender; // 性别
      // let customerOrigin = form.customerOrigin; // 客户来源
      let customer = form.customerType; // 客户类型

      const OriginList = await getOrigin(); // 客户来源

      // 获取添加模版
      getAddClientModule()
        .then((res) => {
          console.log(res, '=========================>success');
          let data = [];
          res.forEach((item) => {
            if (item.code === 'create-customers' && this.form.type === 'add') {
              data = item.fields;
            }
            if (item.code === 'edit-customers' && this.form.type === 'edit') {
              data = item.fields;
            }
          });
          // 升序
          data.sort((a, b) => a.sort - b.sort);
          console.log(data, '=========================>data');
          let formData = [];
          let formMoreData = [];
          let count = 0; // 必填项个数
          data.forEach((item, index) => {

            item.rulesObj && item.rulesObj[0] && item.rulesObj[0].type && count++;

            let obj = {
              attr: item.attr,
              type: inputType[item.configsObj.type],
              title: item.name,
              text: null,
              value: null,
              placeholder: item.configsObj.placeholder,
              indent: true,
              selData: {
                'source': [{'key': '下单客户1', 'value': 1}, {'key': '下单客户2', 'value': 2}],
                'selectedKey': '下单客户1'
              }
            };

              // 编辑 数据绑定
            if (edit[obj.attr]) {
              obj.text = edit[obj.attr];
              obj.value = edit[obj.attr];

              // 性别
              if (obj.attr === 'gender') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 负责人
              if (obj.attr === 'responsible') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].dingUserId;
              }

              // 客户来源
              if (obj.attr === 'origin') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 客户类型
              if (obj.attr === 'type') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 客户等级
              if (obj.attr === 'level') {
                obj.text = edit[obj.attr].code;
                obj.value = edit[obj.attr].code;
              }

              // 客户行业
              if (obj.attr === 'industry') {
                obj.text = edit[obj.attr];
              }

              // 客户地区
              if (obj.attr === 'area') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 地址
              if (obj.attr === 'address') {
                obj.text = enterFomart(edit[obj.attr]);
                obj.value = enterFomart(edit[obj.attr]);
              }

              // 备注
              if (obj.attr === 'remark') {
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
            if (required) {
              obj.required = required;
            }
            if (rules) {
              obj.rules = rules;
            }

            // 类别
            switch (item.attr) {
              case 'target':
                obj.selData.source = followUpTarget.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'purpose':
                obj.selData.source = followPurpose;
                break;
              case 'vehicleModelId':
                obj.selData.source = clueAdditionalConfiguration.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'intentionType':
                obj.selData.source = clueIntentionType.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'intentionGrade':
                obj.selData.source = clueIntentionType.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'shoppingWay':
                obj.selData.source = clueShoppingWay.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'appearance':
                obj.selData = outerColor;
                break;
              case 'interior':
                obj.selData = innerColor;
                break;
              case 'gender':
                obj.selData.source = genderData.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'origin':
                obj.selData.source = OriginList.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'type':
                obj.selData.source = customer.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              default:
            }

            if (index < count) {
              formData.push(obj);
            } else {
              formMoreData.push(obj);
            }
          });
          this.form.data = formData;
          this.form.more.data = formMoreData;
          console.log(this.form.data, '---------->>>>>>>>>>');

          // 初始数据保留
          this.initData = JSON.stringify(this.form);
        })
        .catch((err) => {
          console.log(err, '==============================>err');
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
  @import "~styles/global.styl";
  .container {
    display flex
    flex-direction column
    flex 1
    overflow-y auto
    min-height 100%

    .input-box2 {
      display flex
      height calc(100% - 50px)
      flex-direction column
      flex 1
      overflow-y auto
    }

    .p-warm {
      width 100%
      background-color #FDFCEA
      height px2rem(28);
      line-height px2rem(28)
      font-size px2rem(12)
      color #EF465B
    }
    .more-box {
      border-top px2rem(10) solid #F3F3F3
      margin-top px2rem(6)
    }
    .p-more {
      display flex
      flex-direction row
      align-items center
      justify-content center
      width 100%
      font-size px2rem(14)
      line-height px2rem(60)
      color #348EED

      .ico-more {
        width px2rem(10)
        margin-left px2rem(6)
      }
    }
  }
</style>
