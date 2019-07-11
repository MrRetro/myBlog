<template>
  <yi-touch class="cell-contain box-shadow" :class="{'box-shadow':hasShadow}" @click="handleClick">
    <img class="level-icon"  :src="getLevelIcon(item.level.name)"/>
    <div class="cell-item first">
      <span class="cell-name">{{item.nickname || item.wechatAccount || '无'}}</span>
    </div>
    <div class="cell-item second">
      <span>关联地推:{{item.responsible? item.responsible.name : '无'}}</span>
      <span>经纪人编号:{{item.agentNo}}</span>
    </div>
    <div class="cell-item second">
      <span>关联销售:{{item.sales? item.sales.name : '无'}}</span>
      <span></span>
    </div>

    <div class="cell-item second">
      <span>{{showTimeText}}</span>
      <div v-if="distance" class="location-contain">
        <img class="small-icon" :src="$images.base.ic_map"/>
        <span class="location-text">距离你<span class="location-distance">{{distance}}</span></span>
      </div>
    </div>
    <div class="line"></div>
    <div  class="cell-label-contain">
      <div v-for="(subItem,i) in labels" :key="i" class="cell-label" :class="{'cell-label-support':subItem.support}">
        {{subItem.name}}
      </div>
      <!--<yi-touch type="highLight" v-if="!item.responsible" class="btn" @click="$emit('obtainClick',{item,index})">-->
        <!--捞取-->
      <!--</yi-touch>-->
    </div>
  </yi-touch>
</template>
<script>
import {getDistance} from '../../utils/commonUtil';
import CommonCell from '../../components/Mixins/CommonCell';

export default {
  name: 'AgentCell',
  mixins: [CommonCell],
  computed: {
    labels() {
      const list = [];
      if (this.$route.params.type !== 'sea' && this.item.followUpStatus) {
        list.push(this.item.followUpStatus);
      }
      // list.push(this.item.type);
      // list.push(this.item.origin);
      if (this.item.hasFollow) {
        list.push({code: 'follow', name: '重点经纪人', support: true});
      }
      return list;
    },
    distance() {
      if (this.item.longitude && this.item.latitude) {
        const userLocation = this.$store.state.user.location;
        const l = getDistance(this.item.latitude, this.item.longitude, userLocation.latitude, userLocation.longitude);
        if (l / 1000 > 1) {
          return `${(l / 1000).toFixed(2)}km`;
        }
        return `${l}m`;
      }
      return null;
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/cell.styl"
</style>

