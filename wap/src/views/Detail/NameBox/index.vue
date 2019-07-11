<template>
  <div class="name-box">
    <div v-if="showCarName" class="car-model">
      <span class="tag" :style="{backgroundColor:tagColor}" v-if="status">
        {{status.name}}
      </span>
      <span >{{carName || '无'}}</span>
    </div>
    <p v-else class="left">
      <span class="name">{{ name || '无' }}</span>
      <span class="remark">{{module === 'agents'?'微信名':'姓名备注'}}：{{ remark || '无'}}</span>
    </p>
    <img v-if="showImport" class="import" :src="$images.follow.heart_02"/>
    <yi-touch v-if="showFollow" class="right" @click="handleFocusClick">
      <img v-if="follow" class="heart" :src="$images.all.ico_heart_hover" alt="">
      <img v-else class="heart" :src="$images.all.ico_heart" alt="">
      <span class="focus" :class="follow?'active':null">{{focusTitle}}</span>
    </yi-touch>
  </div>
</template>

<script>
export default {
  name: 'NameBox',
  props: {
    carName: String,
    name: {
      type: String
    },
    remark: {
      type: String,
      default: '无'
    },
    module: {
      type: String
    },
    follow: {
      type: Boolean,
      default: false
    },
    showFollow: {
      type: Boolean,
      default: true
    },
    status: {
      type: Object
    }
  },
  data() {
    return {
      module: this.$route.params.module,
      type: this.$route.params.type
    };
  },
  computed: {
    focusTitle() {
      switch (this.module) {
        case 'agents':
          return '重点经纪人';
        case 'clues':
          return '重点线索';
        default:
          return '重点关注';
      }
    },
    showCarName() {
      return this.module === 'clues' || this.module === 'order' || (this.module === 'followUpPlans' && (this.type === 'clue'))
          || this.module === 'enquiryPrices' || this.module === 'quotedPrices';
    },
    showImport() {
      return this.module === 'followUpPlans' && this.follow;
    },
    tagColor() {
      switch (this.status.code) {
        case 0:
          return '#FBA839';
        case 1:
          return '#7EC685';
        case 2:
          return '#EF465B';
        case 3:
          return '#EF465B';
        default:
          return '#FBA839';
      }
    }
  },
  watch: {
    focusLoc(val) {
      // 设置监听，如果改变就更新 focus
      this.$emit('update:focus', val);
    }
  },
  methods: {
    // 点击关注
    handleFocusClick() {
      this.$emit('focusClick');
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .name-box {
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    padding px2rem(0) px2rem(10)
    min-height px2rem(96)
    border-bottom 1px solid #f5f5f5
    .car-model {
      font-size px2rem(18)
      color $deepBlack
      flex 1
      align-items center
      text-align left
      line-height px2rem(30)
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-align: start;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient vertical
      -webkit-line-clamp: 2;
      medium()
    }
    .tag {
      display inline-block
      height px2rem(20)
      line-height px2rem(20)
      background-color $orange
      padding 0 px2rem(4)
      font-size px2rem(12)
      color white
      border-radius px2rem(4)
      margin-right px2rem(2)
      regular()
      position relative
      top px2rem(-2)
    }

    .left {
      display flex
      flex-direction column
      align-items flex-start

      .name {
        color $deepBlack
        font-weight bold
        font-size px2rem(20)
      }
      .remark {
        color $darkBlack
        font-size px2rem(14)
        margin-top px2rem(8)
      }
    }
    .right {
      display flex
      flex-direction column
      align-items center
      min-width px2rem(60)

      .heart {
        width px2rem(22)
      }
      .focus {
        color $darkBlack
        font-size px2rem(12)
        margin-top px2rem(8)

        &.active {
          color red
        }
      }
    }
    .import {
      width px2rem(26)
      height px2rem(36)
      margin-left px2rem(15)
    }
  }
</style>
