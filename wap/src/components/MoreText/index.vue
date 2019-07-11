<template>
  <span class="more-content">
    <span>
      {{showContent}}
      <yi-touch component-name="span" class="more-button" v-show="needShowMore" @click="showMore=!showMore">
        {{showMore ? '更多':'收起'}}
      </yi-touch>
    </span>
  </span>
</template>

<script>
export default {
  name: 'index',
  props: {
    content: String, // 传入内容
    length: Number // 传入限制长度
  },
  data() {
    return {
      showMore: true
    };
  },
  computed: {
    needShowMore() {
      return this.content && (this.content.length > this.length);
    },
    showContent() {
      return this.showMore && this.needShowMore ? `${this.content.slice(0, this.length)}...` : this.content;
    }
  },
  methods: {
    resetShow() {
      this.showMore = !this.showMore;
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .more-content {
    font-size px2rem(14)
    color $darkBlack
    line-height px2rem(20)
    text-align left
    overflow hidden
    display flex
    flex 1
    margin-right px2rem(14)
  }

  .more-button {
    color $themeColor
  }
</style>
