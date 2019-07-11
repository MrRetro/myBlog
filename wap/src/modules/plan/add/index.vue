<template>
  <div class="container">
    <div class="input-box2">
      <cube-scroll>
        <template v-for="(item, index) in form.data">
          <div :attr="item.attr" class="title" :key="index" v-if="item.type==='groupHeader' && hasValue">{{item.title}}</div>
          <yi-check
            v-if="item.type==='checkbox'"
            :key="index"
            ref="check"
            v-bind="item"
            :checkList.sync="item.text"
            :options="[]"
          />
          <div
            v-else-if="item.attr === 'purpose' && (params.type ==='clue' || params.type==='agent')"
            style="display: none"
            :key="index"
          ></div>
          <yi-input
            v-else-if="item.type !=='groupHeader'"
            :ref="item.rules.required ? 'va' : null"
            :key="index"
            v-bind="item"
            v-model="item.text"
            :indent="true"
            :value.sync="item.value"
            :selData="item.selData || null"
            :line="index===form.data.length-1"
            :lineTop="index!=0"
            :params="item.params"
            @selClue="selClue"
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
import {
  addFollowUpPlan,
  getFollowUpInfo,
  getAddFollowUpModule,
  getExecutorList,
  editFollowUpPlan,
  getFollowUpPurpose
} from '../../../api/followUpPlan';
import {inputType} from '../../../config/module';
import Page from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import {validate} from '../../../config/validate';
import {formatDateTime} from '../../../utils/TimeUtil';
import {enterFomart} from '../../../utils/commonUtil';

export default {
  name: 'plan-add',
  extends: Page,
  created() {

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
      getFollowUpInfo(this.id)
        .then((res)=>{
          this.getPage(res);
        })
        .catch(err=>{ console.log(err); });
    }

  },
  data() {
    return {
      initData: null,
      id: null, // 编辑id
      params: this.$route.params,
      form: {
        type: 'add',
        data: []
      },
      hasValue: false // 执行人是否展示
    };
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    onBtnClick() {
      const arr = this.$refs.va.map((item)=>{
        return item.changeV();
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
              console.log(val, 'item');
              items[item.attr] = val;
            }
            if (item.attr === 'remark') {
              items[item.attr] = item.text;
            }

            if (item.attr === 'responsibleId') {
              if (item.text.length <= 0) {
                items[item.attr] = '';
              } else {
                items[item.attr] = item.text && item.text[item.text.length - 1];
              }
            }

            if (item.attr === 'teamworkIds') {
              if (item.text === '') {
                items[item.attr] = [];
              } else {
                items[item.attr] = item.text;
              }
            }
          });

          // items.responsibleId = items.responsibleId ? items.responsibleId[0] : '';
          // items.teamworkIds = items.teamworkIds === '' ? null : items.teamworkIds;
          let time = items.plannedTime; // items.plannedTime.replace('-', '/');
          items.plannedTime = formatDateTime(time); // new Date(time) && new Date(time).format('yyyy-MM-dd hh:mm:ss');
          const emus = {
            customer: 0,
            clue: 1,
            agent: 2
          };
          items.target = emus[this.params.type] || 0; // items.target.toString(); // 字段格式有问题====****=====

          console.log(items, '校验成功并提交数据--01');
          console.log(this.form);

          if (this.form.type === 'add') {
            addFollowUpPlan(items).then((res) => {
              console.log(res);
              console.log('要直接跳详情');
              this.$RouteUtil.commonDetail({
                ...this.params,
                id: res
              });
              console.log(res, '--------01---------');

            }).catch((err) => {
              console.log(err, '--------02---------');
            });
          } else if (this.form.type === 'edit') {
            items.id = this.id;
            console.log(items);
            editFollowUpPlan(items)
              .then(res=>{
                console.log(res, '');
                // if (res) {
                this.params.onSuccess && this.params.onSuccess();
                this.$router.go(-1);
                // this.$RouteUtil.commonDetail({
                //   ...this.params
                // });
                // }
              })
              .catch(err=>console.log(err));
          }
        }
      });
    },
    // 获取模版
    async getPage(edit) {
      // 获取枚举类别
      let form = this.menu;
      let followUpTarget = form.followUpTarget; // 跟进线索
      let followPurpose = []; // 跟进目的
      let clueAdditionalConfiguration = form.clueAdditionalConfiguration; // 车型信息
      let outerColor = null; // 外观
      let innerColor = null;// 内饰
      let clueIntentionType = form.clueIntentionType; // 意向类型
      let clueShoppingWay = form.clueShoppingWay; // 购买方式
      let genderData = form.gender; // 性别
      let customerOrigin = form.customerOrigin; // 客户来源
      let customer = form.customerType; // 客户类型

      // 获取跟进目的列表
      if (this.params.type !== 'clue' && this.params.type !== 'agent') {
        const res1 = await getFollowUpPurpose(`${this.params.type}`);
        followPurpose = res1.map(item => ({'key': item.description, 'value': item.value}));
      }


      // 获取添加模版
      const res = await getAddFollowUpModule();
      console.log(res, '=========================>success');
      let data1 = [];
      res.forEach((item)=>{
        console.log(item);
        if (item.code === 'create-follow-up' && this.form.type === 'add') {
          data1 = item.fields;
        }
        if (item.code === 'edit-follow-up' && this.form.type === 'edit') {
          data1 = item.fields;
        }
      });
      // 升序
      data1.sort((a, b)=>a.sort - b.sort);

      let data = [];
      data1.forEach((item)=>{
        let obj = {
          attr: item.attr,
          type: inputType[item.configsObj.type],
          title: item.name,
          text: '',
          value: null,
          placeholder: item.configsObj.placeholder,
          indent: false,
          selData: {'source': [{'key': '下单客户1', 'value': 1}, {'key': '下单客户2', 'value': 2}], 'selectedKey': '下单客户1'}
        };

        if (item.attr === 'targetId') {
          if (this.params.type === 'agent') {
            obj.title = '跟进经纪人';
            obj.placeholder = '请选择跟进经纪人';
          }
          if (this.params.type === 'customer') {
            obj.title = '跟进客户';
            obj.placeholder = '请选择跟进客户';
          }
          obj.params = this.params;
        }

        // 编辑 数据绑定
        if (edit[obj.attr]) {
          obj.value = edit[obj.attr];
          obj.text = edit[obj.attr];
          //
          if (obj.attr === 'targetId') {
            if (this.params.type === 'agent') {
              obj.title = '跟进经纪人';
              obj.placeholder = '请选择跟进经纪人';
            }
            obj.text = edit.targetId.targetName;
            obj.value = edit.targetId.targetId;
            obj.disable = true;

            this.getExecutor(obj.value, this.params.type);
          }
          // 计划时间
          if (obj.attr === 'plannedTime') {
            let time = edit.plannedTime;
            if (time.length > 10) {
              time = time.substring(0, 10);
            }
            obj.text = time;
            obj.value = time;
          }
          if (obj.attr === 'purpose') {
            let txt = '';
            followPurpose.forEach((item2)=>{
              if (item2.value === edit[obj.attr]) {
                txt = item2.key;
              }
            });
            obj.text = txt;
            obj.value = edit[obj.attr];
          }
          // 负责人
          if (obj.attr === 'responsibleId') {
            obj.text = [edit.responsibleId];
          }
          // 协同人
          if (obj.attr === 'teamworkIds') {
            obj.text = edit.teamworkIds;
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
        if (required) { obj.required = required; }
        if (rules) { obj.rules = rules; }

        // 类别
        switch (item.attr) {
          case 'target':
            obj.selData.source = followUpTarget.map((item1)=>{ return {key: item1.name, value: item1.code}; });
            break;
          case 'purpose':
            obj.selData.source = followPurpose;
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

        data.push(obj);
      });
      this.form.data = data;
      console.log(this.form.data, '-----031');

      // 初始数据保留
      this.initData = JSON.stringify(this.form);


      // 获取负责人和协同人列表
      // let id = '40288a486416c055016416e87cea0004';
      // this.getExecutor(id)
    },
    // 获取负责人列表
    getExecutor(id, type) {
      // if (type) {
      type = type || this.params.type;
      // } else {
      //   type = this.params.type;
      //   type = type.substring(0, type.length - 1);
      // }
      console.log(this.params);
      getExecutorList({id, type})
        .then((res) => {
          console.log(res, '负责人');

          // todo
          console.log(this.$refs.check);
          console.log(this.$refs.check[1].$attrs.attr);
          if (this.$refs.check) {
            this.$refs.check.forEach((item) => {
              if (item.$attrs && item.$attrs.attr && item.$attrs.attr === 'responsibleId') {
                // 负责人选项
                item.newOptions = res.responsibleMans.map((item1) => {
                  return {label: item1.userName, value: item1.userId};
                });
                console.log(item.newOptions, '==>负责');
              }
              if (item.$attrs && item.$attrs.attr && item.$attrs.attr === 'teamworkIds') {
                // 协同人选项
                item.newOptions = res.teamworkMans.map((item1) => {
                  return {label: item1.userName, value: item1.userId};
                });
                console.log(item.newOptions, '==>协同');
              }
            });
            this.hasValue = true;
          }
        })
        .catch((err) => {
          console.log(err, '负责人错误');
        });
    },
    // 线索回调
    selClue(data) {
      this.getExecutor(data.id);
    }
  },
  activated() {
    ddApi.setRight();
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

    .input-box2 {
      display flex
      height calc(100% - 50px)
      flex-direction column
      flex 1
      overflow-y auto

      .title{
        margin-left px2rem(14)
        padding-left px2rem(10)
        margin-right px2rem(14)
        line-height px2rem(24)
        font-size px2rem(14)
        text-align left
        medium()
        color $darkBlack
        padding-top px2rem(16)
        border-top 1px solid $lightGray
      }
    }
  }
  .hideName{
    display none;
  }
</style>
