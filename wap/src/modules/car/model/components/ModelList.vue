<template>
  <yi-container :show-loading="isLoading" :show-error="isError" :error-message="errorMesage">
    <cube-index-list
      :data="data"
      class="scroll-content"
    >
      <cube-index-list-group class="list-group" v-for="(group, index) in data" :key="index" :group="group">
        <div class="section-header">{{group.name}}</div>
        <cube-index-list-item v-for="(item, index) in group.items" :key="index" :item="item" @select="selectItem">
          <div>
            <div class="custom-item"  @click.stop="selectItem(item)">
              <img class="item-icon" :src="item.avatar"  @click.native="selectItem(item)" />
              <div class="item-name"  @click.stop="selectItem(item)">{{item.name}}</div>
            </div>
          </div>
        </cube-index-list-item>
      </cube-index-list-group>
      <span slot="nav-item" class="nav-text" slot-scope="props">{{props.item}}</span>
    </cube-index-list>
  </yi-container>
</template>

<script>
import {getBrandList} from '../../../../api/carModel';


export default {
  data() {
    return {
      data: [],
      isLoading: true,
      isError: false,
      errorMesage: '',
      params: this.$route.params
    };
  },
  methods: {
    selectItem(item) {
      console.log(item);
      this.$RouteUtil.carSeriesChoose({...item, onSuccess: this.params.onSuccess});
    },
    fetchData() {
      getBrandList().then((res) => {
        this.isLoading = false;
        this.isError = false;
        let data = [];
        for (let key in res) {
          data.push({name: key, items: res[key]});
        }
        setTimeout(() => this.data = data, 200);
      }).catch(e=>{
        this.isLoading = false;
        this.isError = true;
        this.errorMesage = e.message;
      });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  >>> .cube-scroll-content {
    width 100%;
  }

  .scroll-content >>> .cube-index-list-anchor {
    text-align left
    color $themeColor
    height 0
    overflow: hidden;
    background-color white
    border-color $lightGray
    border-width 1px
    border-style double
    display none
  }

  .scroll-content {
    position absolute
    top 0;
    bottom 0;
    left 0;
    right 0;
  }

  .section-header {
    padding-left px2rem(15)
    text-align left
    font-size px2rem(14)
    color $darkBlack
    height px2rem(30)
    line-height px2rem(30)
    border-color $lightGray
    border-width 1px
    border-style double
  }

  .custom-item {
    height px2rem(47)
    width 100%
    display flex
    align-items center
  }

  .list-group {
    height auto;
  }

  .item-icon {
    width px2rem(30)
    height px2rem(30)
    margin-left px2rem(15)
    margin-right px2rem(15)
  }

  .nav-text {
    color $themeColor
    font-size px2rem(13)
    margin-right px2rem(-10)
  }

  .item-name {
    font-size px2rem(14)
    color $deepBlack
    medium()
    flex: 1
    height 100%
    text-align left
    line-height px2rem(47)
  }

  .index-list-wrapper
    height: 98%
    width: 94%
    margin: 0 auto
    overflow: hidden
</style>
