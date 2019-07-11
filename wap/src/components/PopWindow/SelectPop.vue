<template>
  <cube-popup :visible="visible">
    <div class="pop-content">
      <div class="title">{{title}}</div>
      <div v-if="search" class="search-bar">
        <img :src="$images.all.small_search" class="search-icon"/>
        <input type="text" ref="input" v-model="searchText" :placeholder="placeholder"
               class="search-input"/>
      </div>
      <yi-list class="list" :data="list" :enabled-pull-up="false" :enabled-pull-down="false">
        <div slot-scope="{item,index}" class="item touch-highlight" @click="handleItemClick(index)">
          <div class="check" :class="{checked:item.check}"></div>
          <div class="text">{{item.title}}</div>
        </div>
      </yi-list>
      <div class="bottom">
        <yi-touch class="button cancel" @click="handleCancelClick">取消</yi-touch>
        <div class="line"></div>
        <yi-touch class="button sure" @click="handleSureClick">确定{{ showNumber}}
        </yi-touch>
      </div>
    </div>
  </cube-popup>
</template>

<script>
import {AlertUtil} from '../../utils/AlertUtil';

const resultList = [
  {name: '邓博', avatar: '', emplId: 'manager5373'},
  {name: '郭伟鹏', avatar: '', emplId: '012922666536322493'},
  {name: '建嘉', avatar: '', emplId: '0234106038775759'},
  {name: '谢国权', avatar: '', emplId: '181008074935191688'},
  {
    name: '强哥',
    avatar: 'http://static.dingtalk.com/media/lADPBbCc1TrpHYnNAV_NAWk_361_351.jpg',
    emplId: '0432273931777451'
  }, {
    name: '庄俊平',
    avatar: 'http://static.dingtalk.com/media/lADPBbCc1dnj6EDNAt7NAu4_750_734.jpg',
    emplId: '013439225123909741'
  }, {name: '陈燕东', avatar: '', emplId: '160152352437894959'}, {
    name: '陈志坚',
    avatar: '',
    emplId: '054943552337754539'
  }, {
    name: '肖腾',
    avatar: 'http://static.dingtalk.com/media/lADPBbCc1QX7HiLNBLnNBNc_1239_1209.jpg',
    emplId: '01400657281053608'
  }, {
    name: '叶培雄',
    avatar: 'http://static.dingtalk.com/media/lADPBbCc1amr7vLNAhzNAhY_534_540.jpg',
    emplId: '070064304721392481'
  }, {
    name: '贾瑞星',
    avatar: 'http://static.dingtalk.com/media/lADORWX83cypzKk_169_169.jpg',
    emplId: '046025330635697471'
  }, {
    name: '刘晓英',
    avatar: 'http://static.dingtalk.com/media/lADPBbCc1T5Tp1bNAk_NAkw_588_591.jpg',
    emplId: '034922163321041942'
  }, {name: '李昊', avatar: '', emplId: '0806273847845948'}, {
    name: '林满泉',
    avatar: 'http://static.dingtalk.com/media/lADPBbCc1dBy6JjNAffNAfc_503_503.jpg',
    emplId: '154827434026392543'
  }, {
    name: '陈秋桦',
    avatar: 'http://static.dingtalk.com/media/lADPBbCc1Tp06xnNAsLNAu4_750_706.jpg',
    emplId: '052256302237964867'
  }];

export default {
  name: 'SelectPop',
  data() {
    return {
      selectList: resultList.map(item => ({check: false, ...item, title: item.name})),
      multiple: false,
      search: true,
      searchText: '',
      placeholder: '搜索关键字',
      disabledUsers: [],
      max: 30,
      title: '标题',
      pickTips: '提示',
      visible: false,
      onSuccess: null
    };
  },
  computed: {
    list() {
      if (this.search) {
        return this.selectList.filter(item => item.title.search(RegExp(`${this.searchText}`, 'i')) !== -1);
      }
      return this.selectList;
    },
    showNumber() {
      if (this.multiple) {
        return `(${this.list.filter(item => item.check).length})`;
      }
      return '';
    }
  },
  methods: {
    handleSureClick() {
      this.onSuccess && this.onSuccess(JSON.parse(JSON.stringify(this.list.filter(item => item.check))));
      this.searchText = '';
      this.hide();
    },
    handleCancelClick() {
      this.hide();
    },
    handleItemClick(index) {
      if (this.multiple) {
        if (this.list.filter(item => item.check).length >= this.max) {
          return;
        }
        this.list[index].check = !this.list[index].check;
      } else {
        this.list.forEach((item, i) => item.check = i === index);
      }
    },
    /**
       * 显示选人弹窗
       * @param multiple
       * @param personList
       * @param max
       * @param title
       * @param pickTips
       * @param disabledUsers
       * @param onSuccess
       */
    show({multiple, selectList = resultList, max, title, pickTips, disabledUsers = [], onSuccess}) {
      this.multiple = multiple;
      this.selectList = selectList.map(item => ({check: false, ...item})).filter(item => disabledUsers.findIndex(t => t.title === item.title) === -1);
      this.max = max;
      this.title = title;
      this.pickTips = pickTips;
      this.disabledUsers = disabledUsers;
      this.onSuccess = onSuccess;
      this.visible = true;
    },
    hide() {
      this.onSuccess = null;
      this.visible = false;
    }
  },
  mounted() {
    AlertUtil.saveInstance('select', this);
  },
  beforeDestroy() {
    AlertUtil.removeInstance('select');
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .pop-content {
    width px2rem(360)
    border-radius px2rem(4)
    background-color white
    display flex
    overflow hidden
    flex-direction column
    .title {
      line-height px2rem(50)
      font-size px2rem(16)
      color $deepBlack
      medium()
      border-bottom-width 1px;
      border-bottom-color $lightGray
      border-bottom-style solid
    }
    .list {
      height px2rem(300)
    }

    .search-bar {
      height: px2rem(40);
      margin: px2rem(12)
      background-color: #F8F8F8;
      border-radius: px2rem(4);
      align-items: center;
      justify-content center
      display flex
      flex: 1;
      .search-icon {
        height: px2rem(12)
        width: px2rem(13)
        margin-left px2rem(19)
        margin-right px2rem(5)
      }
      .search-input {
        font-size px2rem(12)
        color $deepBlack
        flex: 1
        background-color transparent
        regular()
      }
    }

    .item {
      display flex
      align-items center
      height px2rem(35)
      padding 0 px2rem(10)
      border-bottom-style double
      border-bottom-color $lightGray
      border-bottom-width 1px
      .check {
        border-radius px2rem(8)
        width px2rem(16)
        height px2rem(16)
        background-color #eee
      }
      .checked {
        background-color $themeColor
      }
      .img {
        width px2rem(26)
        height px2rem(26)
        border-radius px2rem(13)
        margin-left px2rem(10)
        background-color $themeColor
      }
      .text {
        font-size px2rem(14)
        color $deepBlack
        margin-left px2rem(20)
      }
    }
    .bottom {
      height px2rem(46)
      width 100%
      border-top-style double
      border-top-width 1px
      border-top-color $lightGray
      display flex
      regular()
      .line {
        width 1px;
        background-color $lightGray
      }
      .button {
        flex 1
        font-size px2rem(14)
        line-height px2rem(46)
      }
      .cancel {
        color $darkBlack
      }
      .sure {
        color $themeColor
      }
    }
  }
</style>
