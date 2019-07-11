<template>
  <div class="suc-box">
    <img v-if="ico" class="img" :src="ico" alt="img">
    <img v-else class="img" :src="$images.all.ico_ok" alt="img">
    <p class="p-name">{{title}}</p>
    <p v-if="!isContent" class="p-word"><span v-if="name">{{ name }} </span><span v-if="customerNo">(客户编号:{{ customerNo }})</span></p>
    <p v-else class="p-word" v-html="content"></p>
    <yi-touch
      v-if="!btns"
      component-name="p"
      class="p-btn"
      @click="onBtnClick">
      <span>{{btnName}}</span>
    </yi-touch>

    <div v-else class="btn-box">
      <div
        class="p-btn"
        :class="{'odd': index % 2 === 1}"
        v-for="(item, index) in btns"
        :key="index">
        <yi-touch
          component-name="p"
          class="sp-btn"
          @click="item.event"
        >
          {{ item.name }}
        </yi-touch>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'add-success',
  props: {
    ico: {
      type: Object
    },
    title: {
      type: String,
      default: '创建成功'
    },
    name: {
      type: String
    },
    content: {
      type: String
    },
    isContent: {
      type: Boolean,
      default: false
    },
    customerNo: {
      type: String
    },
    id: {
      type: String
    },
    module: String,
    type: {
      type: String,
      default: 'all'
    },
    btnName: {
      type: String,
      default: '查看详情'
    },
    btns: {
      type: [Array, Object]
      // default: ()=>[
      //   {
      //     name: '确认',
      //     event: ()=>{}
      //   }
      // ]
    }
  },
  data() {
    return {
      params: this.$route.params
    };
  },
  methods: {
    onBtnClick() {
      this.$RouteUtil.commonDetail({...this.params, id: this.id, module: this.module, type: this.type});
      console.log('订单id:', this.id);

      // 路由后退
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .suc-box {
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    display flex
    flex 1
    overflow-y auto
    flex-direction column
    align-items center

    .img {
      width px2rem(60)
      margin-top px2rem(60)
    }
    .p-name {
      font-size px2rem(20)
      color #31363B
      margin-top px2rem(30)
    }
    .p-word {
      font-size px2rem(14)
      color $darkBlack
      margin-top px2rem(10)
    }
    .p-btn {
      display flex
      flex-direction row
      justify-content center
      width calc(100% - 30px)
      margin px2rem(0) px2rem(15)
      border-radius px2rem(4)
      height px2rem(50)
      line-height px2rem(50)
      text-align center
      background-color #348EED
      color white
      font-size px2rem(16)
      margin-top px2rem(60)

      &:active {
        opacity .8
      }
    }

    .btn-box {
      display flex
      flex-direction row
      justify-content space-between
      margin-top px2rem(20)
      width 100%

      .p-btn {
        display flex
        flex 1
        flex-direction row
        justify-content center
        margin-left px2rem(10)
        border-radius px2rem(4)
        height px2rem(50)
        line-height px2rem(50)
        text-align center
        font-size px2rem(16)
        margin-top px2rem(10)
        border 1px solid #348EED
        color #348EED
        background-color #F6FBFF

        &.odd {
          color #fff
          background-color #348EED
          margin-right px2rem(10)

          span {
            color white
          }
        }
        &:active {
          opacity .8
        }
        .sp-btn {
          width 100%
          height 100%
          display inline-block
        }
      }
    }
  }
</style>
