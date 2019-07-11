<template>
  <yi-container>
    <div class="container">
      <div class="flex-center">
        <div class="search-bar">
          <img :src="$images.all.small_search" class="search-icon"/>
          <input type="text" ref="input" v-model="searchText" :placeholder="placeholder" @keydown="keydown"
                 class="search-input"/>
        </div>
        <yi-touch class="search-button" :class="{search:!isValueEmpty}" @click="handleSearchClick">
          {{isValueEmpty ? '取消' :'搜索'}}
        </yi-touch>
      </div>
      <div class="flex-center margin">
        <div class="title">历史搜索</div>
        <yi-touch class="flex-center touch-opacity" @click="handleClear">
          <img class="icon" :src="$images.filter.small_del"/>
          <div class="button-text">清空</div>
        </yi-touch>
      </div>
      <div v-if="!isArrayEmpty" class="search-history">
        <yi-touch v-for="(item,index) in searchList" :key="index" class="search-item" @click="search(item)">
          {{item}}
        </yi-touch>
      </div>
      <div v-else class="empty-contain">
        <img class="empty-icon" :src="$images.base.img_seach"/>
        <div class="empty-text">暂无历史搜索记录</div>
      </div>
    </div>
  </yi-container>
</template>

<script>
const SEARCH_KEY = 'LOCAL_SEARCH_KEY';
export default {
  name: 'index',
  props: {
    // 模块名，根据模块保存不同搜索数据
    moduleName: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: '搜索姓名/手机/备注名称'
    }
  },
  data() {
    return {
      searchList: [],
      searchText: ''
    };
  },
  computed: {
    isArrayEmpty() {
      return this.searchList.length === 0;
    },
    isValueEmpty() {
      return !this.searchText.trim();
    }
  },
  methods: {
    handleClear() {
      this.searchList = [];
      localStorage.removeItem(SEARCH_KEY + this.moduleName);
    },
    keydown(event) {
      if (event.keyCode === 13) {
        this.search(this.searchText);
      }
    },
    search(value) {
      let text = value.trim();
      if (!text) return;
      let list = this.getHistory();
      let findIndex = list.findIndex(data => text === data);
      if (findIndex !== -1) {
        list.splice(findIndex, 1);
      }
      list.unshift(text);
      localStorage.setItem(SEARCH_KEY + this.moduleName, JSON.stringify(list));
      this.searchList = this.getHistory();
      this.searchText = '';
      this.$emit('search', text);
    },
    getHistory() {
      const res = localStorage.getItem(SEARCH_KEY + this.moduleName);
      if (res) {
        return JSON.parse(res);
      }
      return [];
    },
    handleSearchClick() {
      if (this.isValueEmpty) {
        this.$router.back();
      } else {
        this.search(this.searchText);
      }
    }
  },
  mounted() {
    this.searchList = this.getHistory();
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .container {
    padding 0 px2rem(14)

  }

  .empty-contain {
    display flex
    flex-direction column
    align-items center
    margin-top px2rem(153)

  }
  .empty-icon {
    width px2rem(106)
    height px2rem(80)
  }
  .empty-text{
    margin-top px2rem(10)
    font-size px2rem(14)
    color $darkBlack
    regular()
  }

  .search-bar {
    height: px2rem(40);
    margin: px2rem(12) px2rem(14) px2rem(12) 0
    background-color: #F8F8F8;
    border-radius: px2rem(4);
    align-items: center;
    display flex
    flex: 1;
  }

  .margin {
    margin-top px2rem(12)
    margin-bottom px2rem(4)
  }

  .icon {
    width px2rem(9)
    height px2rem(10)
    margin-right px2rem(2)
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

  .search-history {
    display flex
    flex-wrap wrap
  }

  .search-button {
    color $darkBlack
    font-size px2rem(16)
  }

  .search {
    color $themeColor
  }

  .search-item {
    height px2rem(35)
    margin-top px2rem(8)
    border-radius px2rem(4)
    border-style double
    text-align center
    line-height px2rem(35)
    padding 0 px2rem(16)
    border-width 1px
    border-color $lightGray
    font-size px2rem(12)
    margin-right px2rem(7)
    color $deepBlack
  }

  .button-text {
    color $themeColor
    font-size px2rem(14)
    regular()
  }
</style>
