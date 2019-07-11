<template>
  <div class="common-tab" v-show="titles.length !== 0">
    <cube-scroll
      class="tab-scroll"
      direction="horizontal">
      <ul class="list-wrapper">
        <li v-for="(item,index) in titles" :key="index" class="list-item">
          <yi-touch class="title-item" :class="{selected:selectedIndex === index}" @click="onItemClick(index)">
            {{ item }}
          </yi-touch>
        </li>
      </ul>
      <div class="bar-line" :style="{width:lineWidth,left:lineLeft}"></div>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    index: {
      type: Number,
      default: 0
    },
    titles: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      selectedIndex: -1
    };
  },
  watch: {
    titleLength() {
      setTimeout(() => this.selectedIndex = this.index, 300);
    }
  },
  computed: {
    lineWidth() {
      return this.selectedItem ? `${this.selectedItem.clientWidth}px` : '0px';
    },
    selectedItem() {
      let elementNodeListOfElement = document.querySelectorAll('.title-item')[this.selectedIndex];
      return this.titles.length !== 0 && elementNodeListOfElement ? elementNodeListOfElement : null;
    },
    lineLeft() {
      return this.selectedItem ? `${this.selectedItem.offsetLeft}px` : '0px';
    },
    titleLength() {
      return this.titles.length;
    }
  },
  mounted() {
    if (this.titles.length > 0) {
      this.selectedIndex = this.index;
    }
  },
  methods: {
    onItemClick(index) {
      this.selectedIndex = index;
      this.$emit('onTabChange', index);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .common-tab {
    display flex
    border-bottom-color #f2f2f2
    border-bottom-width 1px
    height px2rem(45)
    border-bottom-style double
  }

  .tab-scroll >>> .cube-scroll-content {
    height 100%
    overflow hidden
    transform: rotate(0deg)
    display: inline-block
  }

  >>> .cube-scroll-list-wrapper {
    height 100%
  }

  >>> .list-wrapper {
    height 100%
  }

  .list-wrapper {
    display: inline-block
    white-space: nowrap
  }

  .list-item {
    display: inline-block
  }

  .title-item {
    line-height px2rem(34)
    margin px2rem(5) px2rem(12) 0 px2rem(12)
    font-size px2rem(14)
    regular()
    color $darkBlack
  }

  .bar-line {
    height px2rem(2)
    background-color $themeColor
    position relative
    bottom px2rem(2)
    transition left 0.2s linear
  }

  .selected {
    color $themeColor
    border-bottom-width px2rem(2)
    border-bottom-style double
    border-bottom-color white
    medium()
  }

</style>
