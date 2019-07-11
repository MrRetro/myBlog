<template>

  <div class="item-contain">
    <yi-touch :opacity="(item.click || showMore) ? 0.7 : 1" class="input-box"
              @click="handleClick(item)">
      <span class="title">{{ item.title}}：</span>
      <span class="txt">
        <yi-star v-if="item.type === 'rate'" v-model="item.value" :disabled="true"></yi-star>
        <div v-else-if="item.click" class="ellipsis link">{{item.value || '无'}}</div>
        <div v-else-if="item.type === 'images'" class="more-image">
          <yi-touch v-for="(image,i) in item.value" @click="handleImageClick(item.value,i)" :key="i">
                <yi-image style="background-size: cover" :src="image"
                          class="image"/>
               </yi-touch>
        </div>
        <yi-switch v-else-if="item.type === 'switch'" :disabled="true" :value="item.value"/>
        <span style="text-align: left" v-else v-html="handleHtml(item.value)"></span>
      </span>
      <img v-if="item.click || showMore" class="row-img"
           :src="$images.all.arrows_down"
           :style="rowStyle"
      />
    </yi-touch>
    <transition name="fade">
      <div class="content-contain" v-show="showMore && show">
        <div v-for="(t,i) in item.values" :key="i" class="input-box item">
          <span class="content-title">{{t.title}}：</span>
          <span class="content" v-html="handleHtml(t.value)"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import {ddApi} from '../../../api/dingding';

export default {
  name: 'ListInfo',
  props: {
    item: Object
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    showMore() {
      return this.item.values && this.item.values.length !== 0;
    },
    rowStyle() {
      let deg = 0;
      if (this.item.click) deg = -90;
      if (this.showMore && this.show) deg = -180;
      if (this.showMore && !this.show) deg = 0;
      return {
        transform: `rotate(${deg}deg)`
      };
    }
  },
  methods: {
    handleClick(item) {
      this.showMore && (this.show = !this.show);
      item.click && item.click(item);
    },
    handleMoreClick() {
      this.show = !this.show;
    },
    handleHtml(value) {
      if (!value) return '无';
      return String(value).replace(/\\n|\\r|(\\r\\n)|(\u0085)|(\u2028)|(\u2029)/g, '<br/>');
    },
    handleImageClick(images, index) {
      ddApi.previewImage({urls: images, current: images[index]});
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .item-contain {
    display flex
    flex-direction column
  }

  .bottom-space {
    margin-bottom px2rem(16)
  }

  .more-bottom {
    color $themeColor
    font-size px2rem(14)
    height px2rem(60)
    line-height px2rem(60)
    padding 0 px2rem(16)
    text-align center
    display flex
    align-items center
    justify-content center
  }

  .hide-left {
    margin-left 0 !important
  }

  .arrow-img {
    width px2rem(10)
    height px2rem(6)
    margin-left px2rem(2)
  }

  .content-contain {
    background-color #F8F8F8
    border-top-style solid
    border-top-width 1px;
    border-top-color #F2F2F2
    .content-title {
      text-align left
      font-size px2rem(12)
      color $darkBlack
      width px2rem(70)
    }
    .content {
      font-weight 500
      font-size px2rem(12)
      color $darkBlack
    }
    .item {
      min-height px2rem(34)
    }
  }

  .row-img {
    width px2rem(10)
    height px2rem(6)
    margin-left px2rem(2)
    margin-right px2rem(16)
    transform rotate(-90deg)
  }

  .input-box {
    display flex
    line-height px2rem(20)
    flex-direction row
    justify-content flex-start
    align-items center
    min-height px2rem(55)
    border-bottom-style solid
    border-bottom-color #F2F2F2
    border-bottom-width 1px
    margin-left px2rem(16)

    .title {
      text-align left
      font-size px2rem(14)
      color $darkBlack
      width px2rem(75)
    }

    .link {
      color $themeColor
      font-weight bold
    }

    .txt {
      font-size px2rem(14)
      color $deepBlack
      display flex
      flex-wrap wrap
      padding-right px2rem(10)
      flex 1

      .more-image {
        display flex;
        flex-wrap wrap;
        padding px2rem(8) 0
        .image {
          width px2rem(70)
          height px2rem(70)
          border-radius px2rem(4)
          margin px2rem(4)
        }
      }
      input {
        display flex
        flex 1
      }

      >>> .cube-rate-item {
        width px2rem(14)
      }
    }
  }

  .section-header {
    height px2rem(52)
    background-color #F8F8F8
    display flex
    align-items center
    padding-left px2rem(16)
    justify-content space-between
    regular()
    font-size px2rem(14)
    color #31363B
  }
</style>
