<template>
  <div class="container app-init">
    <div class="input-box2">
      <cube-scroll>
        <Card
          :avatar="$store.state.user.avatar"
          :name="$store.state.user.name"
          :career="$store.state.user.position || '--'"
          :mobile="$store.state.user.mobile || '--'"
          :email="$store.state.user.email || '--'"
          :department="$store.state.user.departments[0].name || '--'"
        />
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
            />
          </div>
        </template>
      </cube-scroll>
    </div>
    <yi-btn-box
      name="确认修改银行卡信息"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import {
  getAddClientEditInfoModule,
  getClientEditInfo,
  getClientCardsById,
  addClientCard,
  editClientCard
} from '../../../api/client';
import {inputType} from '../../../config/module';
import Page from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import {validate} from '../../../config/validate';
import {getOrigin} from '../../../api/types';
import {enterFomart, isEmptyObject} from '../../../utils/commonUtil';
import Card from './components/Card';

export default {
  name: 'client-edit',
  components: {
    Card
  },
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
      },
      // 银行卡 id
      cardId: ''
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
          console.log(items);

          let newItems = {};
          newItems.cardholder = items.cardholder;
          newItems.cardNo = items.cardNo;
          newItems.bankOfDeposit = items.bankOfDeposit;

          newItems.cardId = this.cardId;
          newItems.userId = this.$store.state.user.id;

          if (!this.cardId) {
            addClientCard({...newItems})
              .then(() => {
                this.params.onSuccess && this.params.onSuccess();
                this.$router.go(-1);
              })
              .catch(err => console.log(err));
          } else {
            editClientCard({...newItems})
              .then(() => {
                this.params.onSuccess && this.params.onSuccess();
                this.$router.go(-1);
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

      const carInfo = await getClientCardsById({userId: this.$store.state.user.id});
      // debugger;

      // 获取添加模版
      getAddClientEditInfoModule()
        .then((res) => {
          console.log(res, '=========================>success');
          let data = [];
          res.forEach((item) => {
            if (item.code === 'work-edit-info') {
              data = item.fields;
            }
          });
          // 升序
          data.sort((a, b) => a.sort - b.sort);
          console.log(data, '=========================>data');
          let formData = [];
          let formMoreData = [];
          data.forEach((item) => {

            let obj = {
              attr: item.attr,
              type: inputType[item.configsObj.type],
              title: item.name,
              text: null,
              value: null,
              placeholder: item.configsObj.placeholder,
              indent: true,
              selData: {
                'source': [],
                'selectedKey': ''
              }
            };

            // 存在银行卡
            if (carInfo && carInfo.length > 0) {
              if (item.attr === 'cardholder') {
                obj.text = carInfo[0].cardholder;
                obj.value = carInfo[0].cardholder;
              }
              if (item.attr === 'cardNo') {
                obj.text = carInfo[0].encryptCardNo;
                obj.value = carInfo[0].encryptCardNo;
              }
              if (item.attr === 'bankOfDeposit') {
                obj.text = carInfo[0].bankOfDeposit;
                obj.value = carInfo[0].bankOfDeposit;
              }
              this.cardId = carInfo[0].id;
            }

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

            formData.push(obj);
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
