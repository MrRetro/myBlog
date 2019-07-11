<template>
  <div v-if="data && data.length > 0">
    <slot name="header"/>
    <ul class="ul-over">
      <li
        v-for="(item, index) in data"
        :key="'item01'+index"
        class="li-over"
        :class="['active',{deactive:item.deactive}]"
      >
        <div class="item-contain">
          <div class="words">
            <span v-if="item.title" class="name name2">{{ item.title }}</span>
            <span class="date" :class="{'deactive-color':item.deactive}">{{ removeSecond(item.date) }}</span>
          </div>
          <slot name="item" :item="item" :index="index">
            <p class="words txts" v-for="(item1, index1) in item.data" :key="'item02'+index1">
              <span class="name">{{ item1.title }}:</span>
              <yi-more-text
                class="more"
                :content="item1.value || '无变更内容'"
                :length="86"
              />
            </p>
            <yi-touch component-name="p" v-if="showDetail" class="words"><span class="name detail" @click="onGetDetail">查看详情</span></yi-touch>
          </slot>
        </div>
      </li>
      <yi-touch v-if="showMore" class="more-bottom" @click="handleMoreClick">{{bottomParams.text}} ></yi-touch>
    </ul>
  </div>
  <div v-else class="data-none">
    <yi-image class="img" :src="emptyIcon"/>
    <span class="word">{{emptyText}}</span>
  </div>
</template>

<script>
import {images} from '../../../../assets';
import {removeSecond} from '../../../../utils/TimeUtil';

export default {
  name: 'CommonTab',
  props: {
    data: Array,
    showDetail: Boolean,
    bottomParams: {
      type: Object,
      default: () => ({
        show: false,
        length: 0,
        text: '查看更多',
        click: () => {
        }
      })
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    emptyIcon: {
      type: String,
      default: images.all.data_none
    }
  },
  data() {
    return {
      module: this.$route.params.module,
      type: this.$route.params.type
    };
  },
  computed: {
    // 显示更多
    showMore() {
      return this.bottomParams.show;
    }
  },
  methods: {
    // 查看详情
    onGetDetail() {
      console.log('查看详情');
    },
    removeSecond(date) {
      return removeSecond(date);
    },
    handleMoreClick() {
      this.bottomParams.click && this.bottomParams.click();
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .more {
    color $deepBlack !important
  }

  .deactive-color {
    color $darkBlack !important
  }

  .ul-over {
    position relative
    width: 100%;
    display flex
    flex-direction column
    transition: opacity 0.2s linear;
    margin-top px2rem(20)

    .deactive:before {
      content: '';
      position: absolute;
      top: px2rem(-2);
      left: px2rem(-7) !important;
      width: px2rem(4) !important;
      height: px2rem(4) !important;
      background-color: #BDBDBD !important;
      border-color white !important;
      border-radius: 50%;
    }

    .li-over {
      list-style: none;
      text-align: left;
      margin: 0 px2rem(10);
      margin-right: px2rem(4);
      margin-left px2rem(15)
      padding-left: px2rem(16);
      border-left: 2px dashed #eee;
      font-size: px2rem(14);
      float: left;
      padding-bottom: px2rem(20);
      position: relative;

      .item-contain {
        display flex
        flex-direction column;
      }

      &:before {
        content: '';
        position: absolute;
        top: px2rem(-2);
        left: px2rem(-7);
        width: px2rem(4);
        height: px2rem(4);
        background-color: white;
        border: px2rem(10) solid #dedfdc;
        border-radius: 50%;
      }
      &.active {
        border-left-style: solid;
      }
      &.active:before {
        border-color: #1990ff;
        border-width: px2rem(4);
      }
      .words {
        font-size px2rem(14)
        color $deepBlack
        float: left;
        width: 100%;
        line-height px2rem(20)
        position: relative;
        margin-bottom px2rem(8);
        display flex
        top: px2rem(-6);

        &.txts {
          display flex
          flex-direction row
          justify-content flex-start
          align-items flex-start
          flex-wrap wrap
        }

        .name {
          color: rgba(0, 0, 0, 0.447058823529412);
          margin-right: px2rem(4);

          &.detail {
            color $themeColor
          }
          &.name2 {
            flex 1
            color $deepBlack
          }
        }
        .date {
          color $deepBlack
          float right
          margin-right px2rem(15)
        }
      }
    }
  }

  .more-bottom {
    color $themeColor
    font-size px2rem(14)
    height px2rem(50)
    line-height px2rem(50)
    text-align center
  }

  .data-none {
    display flex
    flex-direction column
    align-items center
    padding px2rem(60) px2rem(0)

    .img {
      width px2rem(92)
      height px2rem(70)
    }
    .word {
      color $darkBlack
      regular()
      font-size px2rem(12)
      margin-top px2rem(15)
    }
  }
</style>
