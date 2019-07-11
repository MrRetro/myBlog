<template>
    <div
      class="user-box"
      :class="{line}"
    >
      <p class="left">
        <img v-if="form.img" class="img" :src="form.img" alt="ico">
        <span v-else class="img-name">{{form.name && form.name.length>2?form.name.substring(1,3):form.name}}</span>
        <span class="name">{{form.name}}</span>
      </p>
      <yi-touch class="right" @click="$emit('onUser')">
        <img class="img" :src="$images.all.ico_man" alt="img" />
        <span>个人中心</span>
      </yi-touch>
    </div>
</template>

<script>
export default {
  name: 'user',
  props: {
    form: {
      type: Object,
      default: ()=>{
        return {
          img: '',
          name: '',
          career: '职位:',
          careerName: ''
        };
      }
    },
    line: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.user-box{
  display flex
  flex-direction row
  justify-content space-between
  align-items center
  padding px2rem(16) px2rem(14)
  font-size px2rem(14)
  color #2E3443

  &.line{
    border-bottom px2rem(10) solid $lightGray
  }

  .left{
    display flex
    flex-direction row
    align-items center

    .img{
      width px2rem(34)
      margin-right px2rem(8)
      border-radius 50%
    }
    .img-name{
      width px2rem(34)
      height px2rem(34)
      line-height px2rem(34)
      border-radius 50%
      margin-right px2rem(8)
      background-color #348eed
      color white
      font-size px2rem(12)
      font-weight bold
    }
    .name{
      font-weight bold
    }
  }
  .right{
    display flex
    flex-direction row
    align-items center

    .img{
      width px2rem(17)
      margin-right px2rem(4)
    }
  }
}
</style>
