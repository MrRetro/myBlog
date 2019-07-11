<template>
  <cube-popup :visible="visible">
    <div class="pop-content">
      <div class="title">{{title}}</div>
      <yi-list style="height:400px;" :data="personList" :enabled-pull-up="false" :enabled-pull-down="false">
        <div slot-scope="{item,index}" class="item touch-highlight" @click="handleItemClick(index)">
          <div class="check" :class="{checked:item.check}"></div>
          <img class="img"/>
          <div class="text">{{item.name}}</div>
        </div>
      </yi-list>
      <div class="bottom">
        <yi-touch class="button cancel" @click="handleCancelClick">取消</yi-touch>
        <div class="line"></div>
        <yi-touch class="button sure" @click="handleSureClick">确定{{personList.filter(item=>item.check).length}}</yi-touch>
      </div>
    </div>
  </cube-popup>
</template>

<script>
import {AlertUtil} from '../../utils/AlertUtil';

const resultList = [
  {name: '张三', mobile: '15759219999', mediaId: ''},
  {name: '李四', mobile: '15755219999', mediaId: ''},
  {name: '万物', mobile: '13859219999', mediaId: ''},
  {name: '张三1', mobile: '15860219999', mediaId: ''},
  {name: '张三2', mobile: '15759219199', mediaId: ''},
  {name: '张三3', mobile: '15759219939', mediaId: ''},
  {name: '张三4', mobile: '15759211999', mediaId: ''},
  {name: '张三5', mobile: '15759213999', mediaId: ''},
  {name: '哈哈', mobile: '15759219949', mediaId: ''}
];

export default {
  name: 'ChooseMobilePop',
  data() {
    return {
      personList: resultList.map(item=>({check: false, ...item})),
      multiple: false,
      disabledUsers: [],
      max: 30,
      title: '标题',
      pickTips: '提示',
      visible: false,
      onSuccess: null
    };
  },
  methods: {
    handleSureClick() {
      this.onSuccess && this.onSuccess(JSON.parse(JSON.stringify(this.personList.filter(item=>item.check))));
      this.hide();
    },
    handleCancelClick() {
      this.hide();
    },
    handleItemClick(index) {
      if (this.multiple) {
        this.personList[index].check = !this.personList[index].check;
      } else {
        this.personList.forEach((item, i)=>item.check = i === index);
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
    show({multiple, personList = resultList, max, title, pickTips, disabledUsers, onSuccess}) {
      this.multiple = multiple;
      this.personList = personList.map(item=>({check: false, ...item}));
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
    AlertUtil.saveInstance('chooseMobile', this);
  },
  beforeDestroy() {
    AlertUtil.removeInstance('chooseMobile');
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
      border-bottom-style double
    }

    .item{
      display flex
      align-items center
      height px2rem(35)
      padding 0 px2rem(10)
      border-bottom-style double
      border-bottom-color $lightGray
      border-bottom-width 1px
      .check{
        border-radius px2rem(8)
        width px2rem(16)
        height px2rem(16)
        background-color #eee
      }
      .checked{
        background-color $themeColor
      }
      .img{
        width px2rem(26)
        height px2rem(26)
        border-radius px2rem(13)
        margin-left px2rem(10)
        background-color $themeColor
      }
      .text{
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
