<template>
  <div class="next-box">
    <div class="sel-box">
      <yi-touch v-for="(item,index) in listRowData" :key="index" class="sel" @click="handleItemClick(item)">
        <span class="left">
          <img class="line" :src="item.icon" alt="">
          <span class="name">{{item.title}}</span>
        </span>
        <span class="right">
          <span class="word">{{item.count || '0'}}条</span>
          <img class="angle_r" :src="$images.base.ic_next_grey" alt="">
        </span>
      </yi-touch>
    </div>
  </div>
</template>

<script>

export default {
  name: 'next-box',
  props: {
    listRowData: Array
  },
  methods: {
    handleItemClick(item) {
      item.click && item.click();
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .next-box {
    border-top px2rem(10) solid #f3f3f3
    display flex

    .sel-box {
      display flex
      flex-direction column
      width 100%
      padding-left px2rem(15)

      .sel {
        font-size px2rem(12)
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        width 100%
        height px2rem(50)
        border-bottom 1px solid $lightGray

        &:last-child {
          border-bottom none
        }

        .left {
          display flex
          flex-direction row
          align-items center

          .line {
            width px2rem(14)
          }
          .name {
            font-size px2rem(14)
            color $deepBlack
            margin-left px2rem(10)
          }
        }
        .right {
          display flex
          flex-direction row
          align-items center

          .word {
            color $deepGray
            margin-right px2rem(10)
            position relative

            &.active:before {
              content ''
              position absolute
              top px2rem(-4)
              right px2rem(-4)
              width px2rem(4)
              height px2rem(4)
              border-radius 50%
              background-color red
            }
          }
          .angle_r {
            height px2rem(10)
            margin-right px2rem(15)
          }
        }
      }
    }
  }
</style>
