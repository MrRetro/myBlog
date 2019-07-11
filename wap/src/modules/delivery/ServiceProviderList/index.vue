<template>
  <yi-auto-list ref="list" :fetch-data="fetchData" :enabled-pull-up="false">
    <div slot="header">
      <div class="flex-center contain">
        <div class="search-bar">
          <img :src="$images.all.small_search" class="search-icon"/>
          <input type="text" ref="input" v-model="searchText" placeholder="搜索服务商名称/简称" @keydown="keydown"
                 class="search-input"/>
        </div>
        <yi-touch v-if="!isValueEmpty" class="search-button" :class="{search:!isValueEmpty}" @click="handleSearchClick">
          搜索
        </yi-touch>
      </div>
    </div>
    <ServiceProviderCell slot-scope="{item,index}" :item="item" @onItemClick="itemClick"/>
  </yi-auto-list>
</template>

<script>
import ServiceProviderCell from '../../../commons/ServiceProviderCell';
import Page from '../../../components/Mixins/BasePage';
import {getDeliveryService} from '../../../api/delivery';

/**
 * todo 服务商列表,接口未提供
 */
export default {
  name: 'ServiceProviderList',
  extends: Page,
  components: {
    ServiceProviderCell
  },
  data() {
    return {
      searchText: ''
    };
  },
  computed: {
    isValueEmpty() {
      return !this.searchText.trim();
    }
  },
  methods: {
    fetchData(params) {
      console.log('提交的数据', params);
      params = this.searchText.trim() ? {key: this.searchText.trim()} : {};
      return getDeliveryService(params);
    },
    search(key) {
      console.log(key);
      // 根据key重新刷新数据
      this.$refs.list.onPullingDown();
    },
    keydown(event) {
      if (event.keyCode === 13) {
        this.search(this.searchText.trim());
      }
    },
    itemClick(item) {
      if (this.params.onSuccess) {
        this.params.onSuccess(item);
        this.$router.go(-1);
      }
    },
    handleSearchClick() {
      this.search(this.searchText.trim());
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .contain {
    padding 0 px2rem(13)
  }

  .search-bar {
    height: px2rem(40);
    margin: px2rem(12) 0 px2rem(24) 0
    background-color: #F8F8F8;
    border-radius: px2rem(4);
    align-items: center;
    display flex
    flex: 1;
  }

  .search-icon {
    height: px2rem(12)
    width: px2rem(13)
    margin-left px2rem(19)
    margin-right px2rem(5)
  }

  .title {
    color $darkBlack
    font-size px2rem(14)
    text-align left
    medium()
    flex: 1
  }

  .search-input {
    font-size px2rem(12)
    color $deepBlack
    flex: 1
    background-color transparent
    regular()
  }

  .search-button {
    color $darkBlack
    font-size px2rem(16)
    margin-left px2rem(14)
    margin-bottom px2rem(14)
  }

</style>
