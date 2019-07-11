<template>
  <div class="procedure-box margin">
    <div class="procedure">
      <div class="names-box">
        <p class="title">
          <span v-if="require">*</span>
          <span>{{form.title}}</span>
        </p>
        <template v-for="(item,index) in data.names">
          <Select
            :key="'select'+index"
            :value="item.key"
            @onSelect="onSelect(index)"
          />
        </template>
      </div>
      <div class="count-box">
        <p class="title">
          <span>{{form.countName}}</span>
        </p>
        <template v-for="(item,index) in data.names">
          <Count
            :key="index"
            :index="index"
            v-model="item.value"
            @onDel="onDel"
          />
        </template>
      </div>
    </div>
    <div class="add-box">
      <yi-touch @click="addItem" class="add-box2">
        <img class="add" :src="$images.all.ico_add" alt="ico" />
        <span>添加{{form.title}}</span>
      </yi-touch>
    </div>
  </div>
</template>

<script>
import {Select, Count} from './components';
import {ddApi} from '../../api/dingding';

export default {
  name: 'procedure',
  components: {
    Select,
    Count
  },
  props: {
    form: {
      type: Object,
      default: ()=>{
        return {
          title: '手续详情',
          countName: '数量',
          names: [{key: '', value: 1}],
          counts: [],
          selData: []
        };
      }
    },
    require: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    form(vl) { this.data = vl; },
    data(vl) { this.$emit('input', vl); }
  },
  computed: {
    selectList() {
      let newList = JSON.parse(JSON.stringify(this.data.selData));
      this.data.names.forEach((item)=>{
        let state = false;
        let order = -1;
        newList.forEach((item1, index1)=>{
          if (item.key === item1.key) {
            state = true;
            order = index1;
          }
        });
        if (state) newList.splice(order, 1);
      });
      // 去除已选中
      return newList;
    }
  },
  data() {
    return {
      data: this.form
    };
  },
  methods: {
    // 删除对应的行
    onDel(index) {
      console.log(index);
      this.data.names.splice(index, 1);
    },
    // 添加字段
    addItem() {
      // 判断新增字段是否还有值
      if (this.selectList && this.selectList.length > 0 && this.data.names.length < this.data.selData.length) {
        this.data.names.push({key: '', value: 1});
      } else {
        this.$AlertUtil.showToast({txt: '无数据', type: 'warn'});
      }
    },
    // 选择手续弹框
    onSelect(index) {
      console.log(index);
      this.data.selData.forEach((item, order)=>{
        this.data.selData[index].value = order;
      });
      if (this.selectList && this.selectList.length > 0) {
        ddApi.chosen({
          'source': this.selectList,
          onSuccess: (data) => {
            console.log(data, '---------------');
            this.data.names[index].key = data.key;
          },
          onFail(err) {
            console.log(err);
          }
        });
      } else {
        this.$AlertUtil.showToast({txt: '无数据', type: 'warn'});
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.procedure-box{
  width 100%
  display flex
  flex-direction column
  line-height px2rem(20)
  font-size px2rem(14)

  &.margin{
    margin px2rem(18) 0
  }

  .procedure{
    display flex
    flex-direction row
    flex 1
    justify-content space-between
    margin-left px2rem(14)
    margin-right px2rem(14)

    .names-box{
      display flex
      flex-direction column
      align-items flex-start
      margin-right px2rem(24)
      flex 1

      .title{
        color $darkBlack
      }
    }
    .count-box{
      display flex
      flex-direction column
      align-items flex-start
      flex 2

      .title{
        color $darkBlack
      }
    }
  }
  .add-box{
    display flex
    flex-direction row
    justify-content flex-start
    align-items center
    margin-left px2rem(14)
    margin-right px2rem(14)
    line-height px2rem(20)
    color $themeColor
    margin-top px2rem(16)

    .add-box2{
      display flex
      flex-direction row
      align-items center
    }
    .add{
      width px2rem(11)
      height px2rem(11)
      margin-right px2rem(4)
      position relative
      top -1px
    }
  }
}
</style>
