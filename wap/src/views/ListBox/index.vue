<template>
  <div>
    <div class="input-box" v-for="(item, index) in showData"
         :class="{'bottom-space':index === form.length -1,'hide-left':hideMarginLeft}"
         :key="'item-form'+index">
      <more-images class="more" :title="item.title" :images="item.value" v-if="item.type === 'images'"/>
      <template v-else>
        <span class="title" :style="{minWidth:minWidth}">{{ item.title}}：</span>
        <span class="txt">
        <yi-star v-if="item.type === 'rate'" v-model="item.value" :disabled="true"></yi-star>
        <yi-touch v-else-if="item.click" class="ellipsis link"
                  @click="handleClick(item)">{{item.value || '无'}}</yi-touch>
        <span style="text-align: left" v-else-if="item.type === 'money'">{{handleMoney(item.value) || '无'}}</span>
        <span style="text-align: left" v-else-if="item.type === 'color'">{{handleColor(item.value) || '无'}}</span>
          <!--<span style="text-align: left" v-else-if="item.type === 'html'" v-html="handleHtml(item.value)"></span>-->
        <span style="text-align: left" v-else v-html="handleHtml(item.value)"></span>
      </span>
      </template>
    </div>
    <yi-touch v-if="showMore" class="more-bottom" @click="handleMoreClick">{{text}}
      <yi-image class="arrow-img" :style="{transform:`rotate(${!show ?  180 : 0}deg)`}"
                :src="$images.all.arrows_up"></yi-image>
    </yi-touch>
  </div>
</template>

<script>
import Numeral from 'numeral';
import {transformColorName} from '../../utils/commonUtil';
import MoreImages from '../../commons/MoreImages';

export default {
  name: 'list-box',
  components: {
    MoreImages
  },
  props: {
    form: Array,
    showMore: {
      type: Boolean,
      default: false
    },
    moreIndex: {
      type: Number,
      default: 5
    },
    moreText: {
      type: String,
      default: '详情'
    },
    hideMarginLeft: Boolean
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    handleClick(item) {
      item.click && item.click(item);
    },
    handleMoney(value) {
      if (!value) value = 0;
      return `￥${Numeral(value).format('0,0.00')}`;
    },
    handleColor(value) {
      if (!value) return value;
      return transformColorName(value);
    },
    handleMoreClick() {
      this.show = !this.show;
    },
    handleHtml(value) {
      if (!value) return '无';
      return String(value).replace(/\\n|\\r|(\\r\\n)|(\u0085)|(\u2028)|(\u2029)/g, '<br/>');
    }
  },
  computed: {
    showData() {
      if (this.showMore && !this.show) {
        return this.form.slice(0, this.moreIndex);
      }
      return this.form;

    },
    text() {
      return this.show ? `收起${this.moreText}` : `展开${this.moreText}`;
    },
    // 通过title长度动态计算最小宽度
    minWidth() {
      if (this.form.length === 0) {
        return 0;
      }
      let list = [...this.form];
      list.sort((a, b) => -a.title.length + b.title.length);
      let number = (list[0].title.length + 1) * 14;
      return `${window.px2realPx(number)}px`;
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .bottom-space {
    margin-bottom px2rem(16)
  }

  .more >>> .title {
    padding-left 0
  }

  .more >>> .image-contain {
    margin-left 0
  }

  .more-bottom {
    color $themeColor
    font-size px2rem(14)
    height px2rem(60)
    line-height px2rem(60)
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

  .input-box {
    display flex
    line-height px2rem(20)
    flex-direction row
    justify-content flex-start
    align-items flex-start
    margin-left px2rem(14)
    margin-top px2rem(16)

    &:last-child {
      border-bottom none
    }

    .title {
      text-align left
      font-size px2rem(14)
      color $darkBlack
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

      input {
        display flex
        flex 1
      }

      >>> .cube-rate-item {
        width px2rem(14)
      }
    }
  }
</style>
