<template>
  <transition name="fade">
    <div class="contain" v-if="visible">
      <div v-for="(item,index) in route" :key="index" class="item">{{item}}</div>
    </div>
  </transition>
</template>

<script>

import {AlertUtil} from '../../utils/AlertUtil';

export default {
  name: 'RoutePop',
  data() {
    return {
      visible: true,
      route: []
    };
  },
  methods: {
    show(route) {
      this.route = route.map(item => item.name);
      this.visible = true;
    },
    hide() {

    }
  },
  mounted() {
    AlertUtil.saveInstance('route', this);
  },
  beforeDestroy() {
    AlertUtil.removeInstance('route');
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .contain {
    position absolute
    top 100px
    right 0
    z-index 9999
    background-color #0009
    display flex
    flex-direction column
  }

  .item {
    color white
    padding 2px 10px
  }
</style>
