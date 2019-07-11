<template>
  <yi-touch class="cell-contain touch-highlight box-shadow" :class="{'box-shadow':hasShadow}" @click="handleClick">
    <img class="level-icon" :src="getLevelIcon(item.intentionGrade ? item.intentionGrade.name :'')"/>
    <div class="cell-item first" style="justify-content: flex-start">
      <span class="cell-name">{{item.customerName || item.name || '无'}}</span>
      <yi-image v-if="item.coupon" class="coupon" :src="$images.clue.ic_hongbao"/>
    </div>
    <div class="cell-item second">
      <span>负责人:{{item.responsibleName || '无'}}</span>
      <span>线索编号:{{item.clueNo || '无'}}</span>
    </div>
    <div class="cell-item second">
      <span class="ellipsis" style="text-align: left">车型信息:{{showCarInfo || '无'}}</span>
    </div>
    <div class="cell-item third">
      <span>{{showTimeText}}</span>
    </div>
    <div class="line"></div>
    <div class="cell-label-contain">
      <div v-for="(subItem,i) in labels" :key="i" class="cell-label" :class="{'cell-label-support':subItem.support}">
        {{subItem.name}}
      </div>
    </div>
  </yi-touch>
</template>
<script>
import CommonCell from '../../components/Mixins/CommonCell';

export default {
  name: 'ClueCell',
  mixins: [CommonCell],
  computed: {
    labels() {
      const list = [];
      if (this.item.status.code !== 5 && this.item.status.code !== 6 && this.item.responsibleId) {
        this.item.status && list.push(this.item.status);
      }
      // this.item.type && list.push(this.item.type);
      this.item.source && list.push(this.item.source);
      if (this.item.hasFollow) {
        list.push({code: '', name: '重点线索', support: true});
      }
      return list;
    },
    showCarInfo() {
      if (this.item.coupon && !this.item.carName) {
        return '无车型信息';
      }
      return this.item.carName;
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/cell.styl"
  .coupon{
    width px2rem(18)
    height px2rem(18)
    margin-left px2rem(8)
  }
</style>
