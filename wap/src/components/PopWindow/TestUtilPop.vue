<template>
  <div class="contain" v-if="visible">
    <div>调试工具</div>
    <div class="item">当前用户:{{user.name}}</div>
    <yi-touch class="btn" @click="handleChangeClick">切换</yi-touch>
  </div>
</template>

<script>

import {AlertUtil} from '../../utils/AlertUtil';
import {ddApi} from '../../api/dingding';

export default {
  name: 'TestUtilPop',
  data() {
    return {
      visible: true,
      route: []
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    show(route) {
      this.route = route.map(item => item.name);
      this.visible = true;
    },
    hide() {

    },
    handleChangeClick() {
      ddApi.choose({
        multiple: false,
        isNeedSearch: true,
        title: '切换用户',
        onSuccess: (data) => {
          $eventBus.$emit('reInit', data[0].emplId);
        }
      });
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
    right 0
    bottom 0
    z-index 9999
    color white
    background-color #0009
    display flex
    flex-direction column
    padding 10px 5px
    border-radius 5px
  }

  .item {
    color white
    padding 2px 10px
  }
  .btn{
    width px2rem(50)
    height px2rem(50)
    border white solid 1px
    align-items center
    border-radius 50%
    align-self center
    line-height px2rem(50)
  }
</style>
