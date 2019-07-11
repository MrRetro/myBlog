<template>
  <div class="container">
    <div class="input-box2">
      <cube-scroll>
        <div class="content">
          <template v-for="(item,index) in form.data">
            <div
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
                :clearMR="item.columnWidth===50 && item.attr!=='gender'"
                @onLabelSuccess="onLabelSuccess"
              />
              <!--{{item}}-->
            </div>
          </template>
          <div class="space-box"></div>
        </div>
      </cube-scroll>
    </div>
    <yi-btn-box
      name="确认提交"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>

import {getAddAgentModule, changeAgent, getEditAgentInfo} from '../../../api/agent';
import {getAgentsLabel} from '../../../api/clue';
import {inputType} from '../../../config/module';
import EditPage from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import {validate} from '../../../config/validate';
import {enterFomart, isEmptyObject} from '../../../utils/commonUtil';

export default {
  name: 'edit-info',
  extends: EditPage,
  created() {
    this.$nextTick(()=>{

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
        getEditAgentInfo(params.id)
          .then((res)=>{
            this.edit = res;
            console.log(res, '--------------------0203');
            this.getPage(res);
          })
          .catch(err=>{ console.log(err); });
      }
    });
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     console.log('--------11111');
  //     console.log(this.menu);
  //
  //     let form = this.menu;
  //     let gender = form.gender;// 性别
  //
  //     let agentCategory = form.agentCategory;// 经纪人分类
  //     // 经纪人标签
  //     let agentType = form.agentType;// 经纪人类型
  //     // 地面店铺
  //
  //     // 获取添加模版
  //     getAddAgentModule()
  //       .then((res) => {
  //         console.log(res, '=========================>success');
  //         let data = [];
  //         res.forEach((item) => {
  //           if (item.code === 'edit-agents') {
  //             data = item.fields;
  //           }
  //         });
  //         // 升序
  //         data.sort((a, b) => a.sort - b.sort);
  //         console.log(data, '=========================>data');
  //         let formData = [];
  //         data.forEach((item) => {
  //           let obj = {
  //             attr: item.attr,
  //             type: inputType[item.configsObj.type],
  //             title: item.name,
  //             text: null,
  //             value: null,
  //             placeholder: item.configsObj.placeholder,
  //             indent: true,
  //             columnWidth: item.columnWidth,
  //             selData: {'source': [{'key': '选项一', 'value': 1}, {'key': '选项二', 'value': 2}], 'selectedKey': '下单客户1'}
  //           };
  //
  //           // 是否必填
  //           let required = false;
  //           item.rulesObj && item.rulesObj.forEach((item2)=>{
  //             if (item2.type === 'required') {
  //               required = true;
  //             }
  //           });
  //
  //           // 校验规则
  //           let rules = validate(item);
  //           if (required) {
  //             obj.required = required;
  //           }
  //           if (rules) {
  //             obj.rules = rules;
  //           }
  //
  //           // 类别
  //           switch (item.attr) {
  //             case 'gender':
  //               obj.selData.source = gender.map((item1) => {
  //                 return {key: item1.name, value: item1.code};
  //               });
  //               break;
  //             case 'category':
  //               obj.selData.source = agentCategory.map((item1) => {
  //                 return {key: item1.name, value: item1.code};
  //               });
  //               break;
  //             case 'type':
  //               obj.selData.source = agentType.map((item1) => {
  //                 return {key: item1.name, value: item1.code};
  //               });
  //               break;
  //             default:
  //
  //           }
  //
  //           formData.push(obj);
  //         });
  //         this.form.data = formData;
  //         console.log(this.form.data, '---------->>>>>>>>>>');
  //
  //         // 初始数据保留
  //         this.initData = JSON.stringify(this.form);
  //       })
  //       .catch((err) => {
  //         console.log(err, '==============================>err');
  //       });
  //   });
  // },
  activated() {
    ddApi.setRight();
  },
  data() {
    return {
      initData: null,
      id: '',
      form: {
        type: 'edit',
        data: []
      }
    };
  },
  computed: {

  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    onBtnClick() {
      const arr = [];
      this.$refs.va.forEach((item)=>{
        if (item.rules && !isEmptyObject(item)) {
          arr.push(item.changeV());
        }
      });
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
              if (item.attr === 'area') {
                items.area = val;
              } else {
                items[item.attr] = val;
              }

              // 标签独自处理
              if (item.attr === 'label') {
                items[item.attr] = item.text;
              }
            }
          });
          items.id = this.id;
          if (typeof items.label === 'string') {
            items.label = [items.label];
          }
          console.log(items, '==>items');
          changeAgent(items).then(() => {
            this.params.onSuccess && this.params.onSuccess();
            this.$router.go(-1);
          }).catch((err) => {
            console.log(err);
          });
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
      let agentCategory = form.agentCategory;// 经纪人分类
      let agentType = form.agentType;// 经纪人类型
      let agentLevel = form.agentLevel; // 等级

      let ageRange = form.ageRange; // 年龄段
      let experience = form.experience; // 从业经验
      let identity = form.identity; // 身份
      let livingTime = form.livingTime; // 本地居住时间
      let agentCommunication = form.agentCommunication; // 是否愿意积极沟通
      let beingConsulted = form.beingConsulted; // 平时是否有人咨询买车
      let interestedly = form.interestedly; // 对经纪人模式是否感兴趣
      let advantage = form.advantage; // 认为宜买车是否有优势
      let business = form.business; // 对卖车的了解程序
      let valueJudgment = form.valueJudgment; // 对经纪人的价值判断

      // 获取添加模版
      getAddAgentModule()
        .then((res) => {
          console.log(res, '=========================>success');
          let data = [];
          res.forEach((item) => {
            if (item.code === 'edit-agents') {
              data = item.fields;
            }
          });
          // 升序
          data.sort((a, b) => a.sort - b.sort);
          console.log(data, '=========================>data');
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
              selData: {'source': [], 'selectedKey': ''}
            };

            // 只读
            if (['name', 'mobile', 'wechatAccount'].includes(item.attr)) {
              obj.disable = true;
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

              // 经纪人分类
              if (obj.attr === 'category') {
                obj.text = agentCategory[edit[obj.attr].code] && agentCategory[edit[obj.attr].code].name;
                obj.value = edit[obj.attr].code;
              }

              // 经纪人标签
              if (obj.attr === 'label') {
                obj.text = edit.label;
                obj.value = edit.label;
              }

              // 经纪人类型
              if (obj.attr === 'type') {
                obj.text = agentType[edit[obj.attr].code] && agentType[edit[obj.attr].code].name;
                obj.value = edit[obj.attr].code;
              }

              // 经纪人负责人
              if (obj.attr === 'responsible') {
                obj.text = edit.responsible.name;
                obj.value = edit.responsible.dingUserId;
              }

              // 经纪人地区
              if (obj.attr === 'area') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 备注
              if (obj.attr === 'remark') {
                obj.text = enterFomart(edit[obj.attr]);
                obj.value = enterFomart(edit[obj.attr]);
              }

              if ([
                'storeAddress',
                'wechatAccount'
              ].includes(obj.attr)) {
                obj.text = edit[obj.attr];
                obj.value = edit[obj.attr];
              }

              if ([
                'ageRange',
                'experience',
                'identity',
                'livingTime',
                'communication',
                'beingConsulted',
                'interestedly',
                'advantage',
                'business',
                'valueJudgment',
                'level'
              ].includes(obj.attr)) {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
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
              case 'category':
                obj.selData.source = agentCategory.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'type':
                obj.selData.source = agentType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
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
              case 'ageRange':
                obj.selData.source = ageRange.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'experience':
                obj.selData.source = experience.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'identity':
                obj.selData.source = identity.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'livingTime':
                obj.selData.source = livingTime.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'communication':
                obj.selData.source = agentCommunication.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'beingConsulted':
                obj.selData.source = beingConsulted.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'interestedly':
                obj.selData.source = interestedly.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'advantage':
                obj.selData.source = advantage.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'business':
                obj.selData.source = business.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'valueJudgment':
                obj.selData.source = valueJudgment.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'level':
                obj.selData.source = agentLevel.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              default:

            }
            formData.push(obj);
          });
          this.form.data = formData;
          console.log(this.form.data, '---------->>>>>>>>>>');

          // 获取标签列表
          getAgentsLabel({type: 'agent', category: 'agentLabel'})
            .then((res1)=>{
              // console.log(res1);
              // this.labels = res1;
              // console.log(this.labels, '==>001');

              let labels = res1.map(item2=>({key: item2.description, value: item2.description}));
              this.form.data.forEach((item3, index3)=>{
                if (item3.attr === 'label') {
                  this.form.data[index3].selData.source = labels;
                }
              });

              // 初始数据保留
              this.initData = JSON.stringify(this.form);
            })
            .catch(err=>console.log(err));
        })
        .catch((err) => {
          console.log(err, '==============================>err');
        });
    },
    // 标签选中回调
    onLabelSuccess(data) {
      // let newArr = [];
      // for (let i = 0, len = indexs.length; i < len; i++) {
      //   newArr.push(this.labels[indexs[i]].description);
      // }

      this.form.data.forEach((item, index)=>{
        if (item.attr === 'label') {
          this.form.data[index].text = data;
          this.form.data[index].value = data;
        }
      });

      // 初始数据保留
      this.initData = JSON.stringify(this.form);
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
    height 100%

    .section-title {
      font-size: px2rem(16);
      color: $deepBlack
      text-align left
      margin 0 px2rem(14)
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

      .content {
        display flex
        flex-direction row
        flex-wrap wrap
        .id-box {
          width 100%
          display flex
          flex-direction row
          flex-wrap wrap
        }
        .in-box {
          width 100%
        }
        .self {
          width 48%
        }

      }

      .space-box {
        display flex
        height px2rem(40)
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
  }
</style>
