<template>
    <yi-touch class="board-box"  @click="onType(type)">
      <p
        class="name"
        :class="{
          'lightPink' : color === 'lightPink',
          'gray' : color === 'gray',
          'lightBlue' : color === 'lightBlue',
          'green' : color === 'green',
          'blue' : color === 'blue',
          'red' : color === 'red',
          'pink' : color === 'pink',
          'deepBlue' : color === 'deepBlue',
          'yellow' : color === 'yellow',
          'orange' : color === 'orange',
          'voilet' : color === 'voilet'
        }"
      >{{title}}</p>
      <p class="p-box">
        <img v-if="color === 'lightPink'" class="img" :src="$images.work.card_bg01" alt="imgs">
        <img v-if="color === 'gray'" class="img" :src="$images.work.card_bg02" alt="imgs">
        <img v-if="color === 'lightBlue'" class="img" :src="$images.work.card_bg03" alt="imgs">
        <img v-if="color === 'green'" class="img" :src="$images.work.card_bg04" alt="imgs">
        <img v-if="color === 'blue'" class="img" :src="$images.work.card_bg05" alt="imgs">
        <img v-if="color === 'red'" class="img" :src="$images.work.card_bg06" alt="imgs">
        <img v-if="color === 'pink'" class="img" :src="$images.work.card_bg07" alt="imgs">
        <img v-if="color === 'deepBlue'" class="img" :src="$images.work.card_bg08" alt="imgs">
        <img v-if="color === 'yellow'" class="img" :src="$images.work.card_bg09" alt="imgs">
        <img v-if="color === 'orange'" class="img" :src="$images.work.card_bg10" alt="imgs">
        <img v-if="color === 'voilet'" class="img" :src="$images.work.card_bg11" alt="imgs">
      </p>
      <p class="p-count"><span class="sp-number">{{count}}</span>条</p>
    </yi-touch>
</template>

<script>
export default {
  name: 'board',
  props: {
    type: [String],
    color: [String],
    title: [String],
    count: [String, Number]
  },
  methods: {
    // 选择类别
    onType(type) {
      this.$emit('onType', type);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.board-box{
  width px2rem(167)
  height px2rem(106)
  background: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.15);
  border-radius: 8px;
  margin-top px2rem(14)
  margin-left px2rem(14)
  text-align left
  position relative

  .name{
    font-size px2rem(14)
    color $deepBlack
    line-height px2rem(20)
    margin-left px2rem(12)
    margin-top px2rem(13)
    position relative
    padding-left px2rem(12)
    height px2rem(40)
    overflow hidden

    &:before{
      content ''
      width px2rem(2)
      height px2rem(2)
      background-color white
      border px2rem(3) solid #FF6B9B
      border-radius 50%
      position absolute
      left 0
      top px2rem(5)
    }

    &.lightPink:before{
      border-color #FF6B9B
    }
    &.gray:before{
      border-color #B5B5B5
    }
    &.lightBlue:before{
      border-color #6BBBFF
    }
    &.green:before{
      border-color #77C06D
    }
    &.blue:before{
      border-color #55DEEB
    }
    &.red:before{
      border-color #EA4E4E
    }
    &.pink:before{
      border-color #F553FC
    }
    &.deepBlue:before{
      border-color #4C5EFE
    }
    &.yellow:before{
      border-color #FFD25F
    }
    &.orange:before{
      border-color #FCAF55
    }
    &.voilet:before{
      border-color #8273D7
    }
  }
  .p-box{
    text-align right
    position absolute
    top px2rem(33)
    right 0

    .img{
      width px2rem(40)
      height px2rem(40)
      margin-top px2rem(5)
      margin-right px2rem(14)
    }
  }
  .p-count{
    margin-left px2rem(14)
    text-align left
    font-size px2rem(16)
    color $deepBlack
    margin-top px2rem(20)
    position relative
    top px2rem(-8)

    .sp-number{
      font-size px2rem(24)
    }
  }

}
</style>
