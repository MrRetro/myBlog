<template>
  <yi-list
    ref="list"
    :data="data"
    :no-more-data="noMoreData"
    v-bind="$props"
    @scroll="scroll"
    @before-scroll-start="beforeScrollStart"
    @scroll-end="scrollEnd"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp"
  >
    <slot name="header" slot="header">
      <div class="margin-top"></div>
    </slot>
    <template slot-scope="props">
      <slot :item="props.item" :index="props.index"/>
    </template>
    <slot name="empty" slot="empty"/>
    <slot name="footer" slot="footer"/>
  </yi-list>
</template>

<script>

export default {
  name: 'AutoList',
  props: {
    fetchData: {
      type: Function,
      required: true
    },
    enabledPullDown: {
      type: Boolean,
      default: true
    },
    noMoreData: {
      type: Boolean,
      default: false
    },
    enabledPullUp: {
      type: Boolean,
      default: true
    },
    showEmptyView: {
      type: Boolean,
      default: true
    },
    emptyText: {
      type: String,
      default: '数据为空'
    },
    emptyIcon: {
      type: String,
      default: require('../../assets/images/base/img_record.png')
    },
    scrollEvents: Array// 三个选择 ['scroll','before-scroll-start','scroll-end']
  },
  data() {
    return {
      page: 1,
      data: []
    };
  },
  computed: {
    isArrayEmpty() {
      return this.data.length === 0;
    }
  },
  methods: {
    async onPullingDown() {
      this.$emit('pulling-down');
      this.page = 1;
      try {
        const arr = await this.fetchData(this.page);
        this.data = arr;
      } catch (e) {
        this.data = [];
      }
    },
    async onPullingUp() {
      this.page += 1;
      try {
        const arr = await this.fetchData(this.page);
        this.data.push(...arr);
      } catch (e) {
        this.data.push(...[]);
      }
    },
    scroll(event) {
      this.$emit('scroll', event);
    },
    beforeScrollStart() {
      this.$emit('before-scroll-start');
    },
    scrollEnd(event) {
      this.$emit('scroll-end', event);
    },
    /**
       * 滑动到具体位置
       * @param x
       * @param y
       * @param time   时间
       * @param easing 缓动函数
       */
    scrollTo(x, y, time, easing) {
      this.$refs.list.scrollTo(x, y, time, easing);
    },
    forceUpdate() {
      this.$refs.list.forceUpdate();
    },
    enable() {
      this.$refs.list.enable();
    },
    disable() {
      this.$refs.list.disable();
    }
  },
  mounted() {
    this.onPullingDown();
  }
};
</script>
<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .margin-top {
    height px2rem(16)
  }

</style>
