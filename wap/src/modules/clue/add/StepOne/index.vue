<template>
  <div class="container">
    <div class="input-box2">
      <cube-scroll>
        <div class="content">
          <div class="section-title section-margin-top">
            客户信息
          </div>
            <div
              :key="'index2'+index1"
              class="in-box"
              :class="{'self':item1.columnWidth===50}"
              v-for="(item1,index1) in form.info"
            >
              <yi-input
                ref="va"
                v-bind="item1"
                v-model="item1.text"
                :value.sync="item1.value"
                :indent="true"
                :selData="item1.selData || null"
              />
            </div>
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
import {addUserInfo} from '../../../../api/clue';
import EditPage from '../../../../components/Mixins/EditPage';
import {ddApi} from '../../../../api/dingding';

export default {
  name: 'clue-add',
  extends: EditPage,
  created() {
    this.$nextTick(()=>{
      let form = this.menu;
      let genderData = form.gender; // 性别
      this.form.info.forEach((item)=>{
        // 类别
        switch (item.attr) {
          case 'gender':
            item.selData.source = genderData.map((item1)=>{ return {key: item1.name, value: item1.code}; });
            break;
          default:
        }
      });

      // 初始数据保留
      this.initData = JSON.stringify(this.form);
    });
  },
  data() {
    return {
      initData: null,
      form: {
        type: 'add-step1',
        info: [
          {
            attr: 'name',
            type: 'text',
            title: '客户名称',
            text: '',
            placeholder: '请选择客户名称',
            rules: {required: true},
            required: true,
            indent: false
          },
          {
            attr: 'mobile',
            type: 'text',
            title: '联系电话',
            text: null,
            value: null,
            placeholder: '客户联系电话',
            rules: {required: true, mobile: true},
            required: true,
            indent: false
          },
          {
            attr: 'gender',
            type: 'select',
            title: '性别',
            value: null,
            placeholder: '请选择性别',
            rules: {required: true},
            required: true,
            indent: false,
            selData: {'source': [{'key': '男', 'value': 1}, {'key': '女', 'value': 2}], 'selectedKey': '男'}
          }
        ]
      }
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
          this.form.info.forEach((item)=>{
            let val = '';
            if (item.value) {
              val = item.value;
            } else {
              val = item.value === 0 ? 0 : item.text;
            }
            console.log(val, 'item1');
            items[item.attr] = val;
          });
          console.log(items, '222');
          if (items.gender) {
            items.gender = parseInt(items.gender);
          }
          addUserInfo(items)
            .then((res)=>{
              console.log(res, 222);
              if (res.isExist) {
                // 下一步
                this.$RouteUtil.clueAddTwo({
                  ...this.params,
                  info: items,
                  data: res
                });
              } else {
                let obj = {
                  userId: res.id,
                  name: res.name,
                  mobile: res.mobile,
                  gender: res.gender.code
                };
                this.$RouteUtil.clueAddThree({
                  ...this.params,
                  obj
                });
              }
            })
            .catch((err)=>{ console.log(err, '888'); });

        }
      });
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
