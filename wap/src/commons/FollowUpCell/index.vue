<template>
  <yi-touch class="cell-contain touch-highlight box-shadow" :class="{'box-shadow':hasShadow}" @click="handleClick">
    <img class="level-icon"  :src="getLevelIcon(level)"/>
    <div class="cell-item first">
      <span class="cell-name">{{item.targetName || '无'}}</span>
    </div>
    <div class="cell-item second">
      <span>负责人:{{item.responsible? item.responsible.name : '暂无数据'}}</span>
      <span>{{showTimeText}}</span>
    </div>
    <div class="line"></div>
    <yi-more-text class="content" :length="43" :content="`变更内容:${content}`"/>
  </yi-touch>
</template>

<script>
import CommonCell from '../../components/Mixins/CommonCell';

export default {
  name: 'FollowUpCell',
  mixins: [CommonCell],
  computed: {
    labels() {
      const list = [];
      list.push(this.item.origin);
      list.push(this.item.type);
      if (this.item.follow) {
        list.push({code: this.item.follow, name: '重点客户', support: true});
      }
      return list;
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/cell.styl"
</style>

