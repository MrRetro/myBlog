<template>
  <div v-if="isSelected">
    <img class="sele-marker-bg" :src='$images.base.ic_map_bg'/>
    <span class="sele-marker-header img-box">
      <span v-if="src" class="img-name" style="background-color: transparent;">
        <img class="img" :src="src" alt="img"></span>
       <span v-else class="img-name sele">{{ name }}</span>
    </span>
  </div>
  <div v-else>
    <img class="marker-bg" :src='$images.base.ic_map_bg_white'/>
    <span class="marker-header img-box">
      <span v-if="src" class="img-name" style="background-color: transparent;">
        <img class="img" :src="src" alt="img"></span>
       <span v-else class="img-name">{{ name }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'HeaderMarker',
  props: {
    src: String,
    name: {
      type: String,
      default: '姓名21'
    },
    isSelected: Boolean
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .sele-marker-bg {
    width: px2rem(46);
    height: px2rem(53);
  }

  .sele-marker-header {
    width: px2rem(38);
    height: px2rem(38);
    position absolute;
    top: px2rem(4);
    left: px2rem(4)
    border-radius px2rem(19)
  }

  .marker-bg {
    width: px2rem(36);
    height: px2rem(41);
  }

  .img-box {
    .name {
      display flex
      flex-direction row
      align-items center
    }
    .name img {
      width 100%
      height 100%
    }
  }

  .img-name {
    text-align center
    width 100%
    height 100%
    overflow hidden
    line-height px2rem(30)
    border-radius 50%
    background-color #348EED
    color white
    font-size 10px
    font-weight bold
    display inline-block
    margin-left 0px !important

    img {
      float left
    }
  }

  .sele {
    line-height px2rem(40)
    font-size px2rem(14)

  }

  .marker-header {
    width: px2rem(30);
    height: px2rem(30);
    position absolute;
    top: px2rem(3);
    left: px2rem(3)
    border-radius px2rem(15)
  }
</style>
