<template>
  <yi-touch class="cell-contain touch-highlight box-shadow" :class="{'box-shadow':hasShadow}" @click="handleClick">
    <div class="cell-item first star-right">
      <span class="cell-name">{{item.name || '无'}}</span>
      <yi-star :disabled="true"  :value="item.level.code"/>
    </div>
    <div class="cell-item second">
      <span>负责人:{{item.responsible ? item.responsible.name : '无'}}</span>
      <span>客户编号:{{item.customerNo}}</span>
    </div>

    <div class="cell-item third">
      <span>{{showTimeText}}</span>
    </div>
    <div class="line"></div>
    <div  class="cell-label-contain">
      <div v-for="(subItem,i) in labels" :key="i" class="cell-label" :class="{'cell-label-support':subItem.support}">
        {{subItem.name}}
      </div>
      <yi-touch type="highLight" v-if="!item.responsible" underlay-color="#307ECF" class="btn" @click="$emit('obtainClick',{item,index})">
        捞取
      </yi-touch>
    </div>
  </yi-touch>
</template>

<script>
import CommonCell from '../../components/Mixins/CommonCell';

export default {
  name: 'ClientCell',
  mixins: [CommonCell],
  computed: {
    labels() {
      const list = [];
      list.push(this.item.origin);
      list.push(this.item.type);
      if (this.$route.params.type !== 'sea' && this.item.followUpStatus) {
        list.push(this.item.followUpStatus);
      }
      if (this.item.hasFollow) {
        list.push({id: 'follow', name: '重点客户', support: true});
      }
      return list;
    }
  }
};
</script>


<style lang="stylus" scoped>
  @import "~styles/cell.styl"
  @import "~styles/global.styl"

  .star-right{
    margin-right px2rem(13.5) !important
  }

</style>

