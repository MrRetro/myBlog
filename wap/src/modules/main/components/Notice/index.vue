<template>
    <div class="notice-box" @click="onAdClick(form.id)">
      <div class="p-title">
        <img class="img-ad" :src="$images.work.ico_ad" alt="ico">
        <p class="sp-word">
          <marquee
            behavior="scroll"
            direction="left"
            @onmouseover="this.stop();"
            @onmouseout="this.start();">
            {{form.title}}
          </marquee>
        </p>
      </div>
      <p class="p-next">
        <img class="img-next" :src="$images.work.ico_next" alt="ico">
      </p>
    </div>
</template>

<script>
export default {
  name: 'notice-box',
  props: {
    form: {
      type: Object,
      default: ()=>{
        return {
          id: '',
          title: ''
        };
      }
    }
  },
  methods: {
    // 点击回调
    onAdClick(id) {
      this.$emit('onAdClick', id);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.notice-box{
  display flex
  flex-direction row
  justify-content space-between
  align-items center
  height px2rem(40)
  background-color #FEFCEC
  color #F76E29
  font-size px2rem(14)
  padding 0 px2rem(14)

  .p-title{
    display flex
    flex-direction row
    align-items center

    .img-ad{
      display flex
      width px2rem(14)
      margin-right px2rem(6)
    }
    .sp-word{
      display flex
      flex 1
      padding-right px2rem(4)
    }
  }
  .p-next{
    display flex
    flex-direction row
    align-items center

    .img-next{
      width px2rem(8)
    }
  }
}
</style>
