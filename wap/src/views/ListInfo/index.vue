<template>
  <div class="contain">
    <div class="section-header">
        <span style="flex:1;text-align: left;">
          <span>{{form.title}}</span>
          <span v-if="form.tag" class="tag" :style="tagStyle">{{form.tag}}</span>
        </span>
      <yi-touch v-if="form.rightBtnText" class="right-btn" @click="$emit('rightClick')">
        {{form.rightBtnText}}
      </yi-touch>
      <yi-touch v-if="showMore" class="more-bottom" @click="handleMoreClick">
        <yi-image class="arrow-img" :style="{transform:`rotate(${show ?  180 : 0}deg)`}"
                  :src="$images.all.arrows_down"></yi-image>
      </yi-touch>
    </div>
    <slot :list="form.data" :moreIndex="showIndex">
      <template v-for="(item, index) in form.data">
        <item v-show="index <= showIndex" :item="item" :key="index"/>
      </template>
    </slot>
  </div>
</template>

<script>

import {ddApi} from '../../api/dingding';
import Item from './item';

export default {
  name: 'ListInfo',
  components: {
    Item
  },
  props: {
    form: Object,
    moreIndex: {
      type: Number,
      default: 1
    },
    hideMarginLeft: Boolean
  },
  data() {
    return {
      show: this.form.defaultShow || false
    };
  },
  methods: {
    handleClick(item) {
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
  },
  computed: {
    showMore() {
      return this.form.showMore;
    },
    tagStyle() {
      let borderColor = {
        付款中: '#348eee',
        已取消: '#E94F62',
        已完成: '#9bd4a0'
      }[this.form.tag];
      let bgColor = {
        付款中: '#f2f8ff',
        已取消: '#FFE4E7',
        已完成: '#f7fff5'
      }[this.form.tag];
      return `border: 1px solid ${borderColor}; backgroundColor: ${bgColor}; color: ${borderColor}`;
    },
    showIndex() {
      if (this.showMore && !this.show) {
        return this.moreIndex;
      }
      return this.form.data.length;
    },
    showData() {
      if (this.showMore && !this.show) {
        return this.form.data.slice(0, this.moreIndex);
      }
      return this.form.data;
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .contain {
    border-radius px2rem(4)
    border-color #F2F2F2;
    border-width 1px;
    border-style solid
    margin 0 px2rem(14)
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

  .right-btn {
    color $darkBlack
    margin-right px2rem(10)
  }

  .hide-left {
    margin-left 0 !important
  }

  .arrow-img {
    width px2rem(10)
    height px2rem(6)
    margin-left px2rem(2)
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

    &:last-child {
      border-bottom none
    }

    .title {
      text-align left
      font-size px2rem(14)
      color $darkBlack
      width px2rem(70)
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
    regular()
    font-size px2rem(14)
    color #31363B
  }

  .tag {
    font-size: px2rem(13);
    height px2rem(22)
    font-weight: normal;
    padding: 0 px2rem(9);
    border-radius: px2rem(4);
    margin-left px2rem(10)

  }
</style>
