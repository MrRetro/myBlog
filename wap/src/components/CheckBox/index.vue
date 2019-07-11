<template>
   <div class="check-box" v-show="newOptions.length>0">
     <div class="input wrap">
       <div class="p-cks">
         <span class="name1">{{ title }}:</span>
         <cube-checkbox-group
           v-model="newCheckList"
           :options="newOptions"
         />
       </div>
     </div>
   </div>
</template>

<script>
export default {
  name: 'check-box',
  model: {
    prop: 'checkList',
    event: 'onTxt'
  },
  props: {
    title: {
      type: String
    },
    checkList: {
      type: [Object, Array, String]
    },
    options: {
      type: [Object, Array]
    }
  },
  data() {
    return {
      newOptions: this.options,
      newCheckList: this.checkList || []
    };
  },
  watch: {
    newCheckList(vl) {
      this.$emit('update:checkList', vl);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl"
.check-box{
  margin px2rem(2) px2rem(12) px2rem(14)

  .p-cks{
    display flex
    flex-direction row
    width 100%
    justify-content flex-start
    align-items flex-start

    >>> .cube-checkbox-wrap{
      padding-top 11px
      padding-bottom 0px
    }
    >>> .cube-checkbox_checked .cube-checkbox-ui i{
      color #348EED
    }
    >>> .border-top-1px:before{
      display none !important
    }
    >>> .border-top-1px:after{
      display none !important
    }
    >>> .cube-checkbox-wrap:before{
      display none !important
    }
    >>> .cube-checkbox-wrap:after{
      display none !important
    }

    .name1{
      display flex
      padding-top px2rem(13)
      margin-left px2rem(10)
      font-size px2rem(14)
      line-height 1.5
      color $deepBlack
    }

    >>> .cube-checkbox-group{
      display flex
      flex-direction row
      flex 1
      flex-wrap wrap
      justify-content flex-start
      align-items center
    }

  }
}

</style>
