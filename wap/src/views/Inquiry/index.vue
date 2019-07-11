<template>
  <div class="inquiry-box app-init">
    <div class="input-box">
      <cube-scroll>
        <template v-for="(item, index) in form">
          <div v-if="item.type==='car'" class="car-model" :key="index">
            <div v-show="item.title" class="title">{{item.title}}</div>
            <div class="types">
              <p>外观:{{item.outColor || '无'}}</p>
              <p>内饰:{{item.inColor || '无'}}</p>
              <p class="rate-box">
                <span>线索等级:{{item.level || '无'}}</span>
              </p>
            </div>
          </div>
          <yi-input
            v-else
            :ref="!!item.rules?'va':null"
            v-bind="item"
            :key="index"
            v-model="item.text"
            :value.sync="item.value"
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
import {isEmptyObject} from '../../utils/commonUtil';

export default {
  name: 'inquiry',
  props: ['form'],
  methods: {
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
          this.$emit('commit', this.form);
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl"
.inquiry-box{

  .input-box{
    display flex
    flex-direction column
    flex 1
    height calc(100% - 50px)

    .car-model{
      padding-top px2rem(15)
      padding-bottom px2rem(15)
      border-bottom px2rem(10) solid #f3f3f3

      .title{
        text-align left
        font-size px2rem(14)
        line-height px2rem(20)
        padding px2rem(5) px2rem(14)
        color $deepBlack
      }

      .types{
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        padding px2rem(16) px2rem(14) 0
        line-height px2rem(20)
        font-size px2rem(14)
        color $deepBlack

        .rate-box{
          display flex
          flex-direction row
          align-items center

          .rate {
            margin-left px2rem(5)

            >>> .cube-rate-item {
              width px2rem(14)
              margin-right px2rem(3)
            }
          }
        }
      }
    }
  }

  .btn-box{
    display flex
    flex-direction row
    justify-content center
    align-items center
    width 100%
    height 50px
    background-color #348EED

    .btn{
      font-size px2rem(16)
      font-weight bold
      color white
    }
  }
}
</style>
