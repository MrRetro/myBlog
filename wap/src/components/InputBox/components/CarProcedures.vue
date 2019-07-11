<template>
  <div class="contain">
    <div v-for="(list, index) in lists" :key="'procedures' + list.key" class="list">
      <yi-touch class="input-contain" :class="{require:!list.value && list.require}" @click="select(index)">
        <span class="value" :class="{placeholder:!list.value}">{{list.value || '选择手续详情'}}</span>
        <img class="angle-right" :src="$images.base.ic_next_grey"/>
      </yi-touch>
      <div v-if="list.value === '手续状态'">
        <yi-touch class="input-contain stepper" :class="{require:!list.remark && list.require}"
                  @click="selectStatus(index)">
          <span class="value" :class="{placeholder:!list.remark}">{{list.remark || '选择手续状态'}}</span>
          <img class="angle-right" :src="$images.base.ic_next_grey"/>
        </yi-touch>
      </div>
      <!--存放地址和发票类型是输入框-->
      <div v-else-if="list.value === '存放地址' || list.value === '发票'">
        <input
          class="input-contain stepper"
          :class="{require:!list.remark && list.require}"
          type="text"
          :placeholder="`输入${list.value}`"
          v-model="list.remark"
        />
      </div>
      <yi-stepper v-else class="stepper" :value="list.num" @input="(e)=>stepChange(e,index)"/>
      <yi-touch class="del-text" @click="del(index)">删除</yi-touch>
    </div>
    <yi-touch v-show="source.length !== 0" class="more-btn" @click="add"><img :src="$images.form.ic_btn_add"/>添加手续详情
    </yi-touch>
  </div>
</template>

<script>
import {ddApi} from '../../../api/dingding';

export default {
  name: 'CarProcedures',
  props: ['value'],
  data() {
    return {
      input: '',
      options: [
        {key: '车钥匙', value: '车钥匙'},
        {key: '合格证', value: '合格证'},
        {key: '一致性证书', value: '一致性证书'},
        {key: '货物进口说明书', value: '货物进口说明书'},
        {key: '商检单', value: '商检单'},
        {key: '电子信息单', value: '电子信息单'},
        {key: '保养手册三包凭证', value: '保养手册三包凭证'},
        {key: '首保卡', value: '首保卡'},
        {key: '机油几率', value: '机油几率'},
        {key: '备胎', value: '备胎'},
        {key: '三脚架', value: '三脚架'},
        {key: '随车工具', value: '随车工具'},
        {key: '手续状态', value: '手续状态'},
        {key: '存放地址', value: '存放地址'},
        {key: '发票', value: '发票'}
      ],
      lists: [{key: Date.now(), value: '', num: '1', remark: '', require: false}]
    };
  },
  computed: {
    source() {
      return this.options.filter(item => {
        return this.lists.findIndex(t => t.value === item.value) === -1;
      });
    }
  },
  watch: {
    lists() {
      let list = this.lists.filter(item => item.value)
        .map(item=>({type: item.value, num: item.num, remark: item.remark}));
      console.log('改变了', list);
      this.$emit('input', JSON.stringify(list));
    }
  },
  methods: {
    add() {
      let index = this.lists.findIndex(item => !item.value ||
          (item.value && !item.num && !item.remark));
      if (index !== -1) {
        this.lists[index].require = true;
        return;
      }
      this.lists.push({key: Date.now(), value: '', remark: '', num: '1', require: false});
    },
    del(index) {
      this.lists.splice(index, 1);
      if (this.lists.length === 0) {
        this.add();
      }
    },
    select(index) {
      ddApi.chosen({
        source: this.source,
        onSuccess: (data) => {
          if (['存放地址', '发票'].findIndex(item=>item === data.value) !== -1) {
            this.$set(this.lists, index, {...this.lists[index], value: data.value, num: ''});
          } else {
            this.$set(this.lists, index, {...this.lists[index], value: data.value, num: '1', remark: ''});
          }
        }
      });
    },
    selectStatus(index) {
      ddApi.chosen({
        source: [{key: '在库', value: '在库'}, {key: '出库', value: '出库'}],
        onSuccess: (data) => {
          this.$set(this.lists, index, {...this.lists[index], remark: data.value});
        }
      });
    },
    stepChange(value, index) {
      this.$set(this.lists, index, {...this.lists[index], num: value});
    }
  }
};
</script>
<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .contain {

  }

  .list {
    display flex;
    align-items center
    margin-top px2rem(8)

    .stepper {
      width px2rem(120)
      margin-left px2rem(25)
    }
    .del-text {
      color $red
      margin-left px2rem(12)
      font-size px2rem(14)
    }
  }

  .more-btn {
    margin-top px2rem(16)
    font-size px2rem(14)
    display flex
    align-items center
    color #348EED
    img {
      width px2rem(11)
      height px2rem(11)
      margin-right px2rem(4)
    }
  }

  .require {
    border-bottom-color $red !important;
  }

  .input-contain {
    display flex;
    border-bottom-width 1px;
    border-bottom-color #F2F2F2;
    border-bottom-style solid
    width px2rem(160)
    align-items center
    height px2rem(38)
    .value {
      flex 1
      text-align left
      font-size px2rem(14)
      color $deepBlack
      regular()
      line-height px2rem(20)
    }
    .placeholder {
      color $darkBlack
      medium()
    }
    .angle-right {
      width px2rem(10)
      height px2rem(10)
      margin 0 px2rem(14)
      margin-right px2rem(0)
      margin-left 0

    }
    .step-contain {
      width px2rem(120)
    }
  }
</style>
