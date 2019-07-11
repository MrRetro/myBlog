<template>
  <yi-touch class="cell-contain touch-highlight box-shadow" :class="{'box-shadow':hasShadow}" @click="handleClick">
    <img v-if="showLevel" class="level-icon"  :src="getLevelIcon(item.targetLevel ? item.targetLevel.name : '')"/>
    <div class="cell-item first">
      <span class="cell-name">{{item.targetName || '无'}}</span>
      <yi-star v-if="!showLevel" :disabled="true"  :value="item.targetLevel.code"/>
    </div>
    <div class="cell-item second">
      <span>负责人:{{item.userName || '无'}}</span>
      <span>{{type === 'clue'?'线索编号':'客户编号'}}:{{item.targetNo}}</span>
    </div>
    <div v-if="showCarName" class="cell-item second ellipsis" style="text-align: left">
      <span>车型信息:{{item.carName || '无'}}</span>
    </div>
    <div class="mix-column tag-margin-left">
      <div v-for="(subItem,i) in labels" :key="i" class="cell-label" :class="{'cell-label-support':subItem.support}">
        {{subItem.name}}
      </div>
      <span>计划跟进时间:{{item.plannedTime.split(' ')[0] || '无'}}</span>
    </div>
    <div class="line"></div>
    <div  class="cell-label-contain">
      <span class="third">跟进目的:{{item.purpose || '无'}}</span>
    </div>
  </yi-touch>
</template>

<script>
import CommonCell from '../../components/Mixins/CommonCell';

export default {
  name: 'FollowUpPlanCell',
  mixins: [CommonCell],
  computed: {
    labels() {
      const list = [];
      list.push(this.item.status);
      return list;
    },
    showLevel() {
      return this.$route.params.type !== 'customer';
    },
    showCarName() {
      return this.$route.params.type === 'clue';
    }
  }
};
</script>


<style lang="stylus" scoped>
  @import "~styles/cell.styl"
  .tag-margin-left{
    margin-left px2rem(18)
  }

</style>

