<template>
  <cube-popup :visible="visible">
    <div class="pop-content">
      <div class="title">{{title}}</div>
      <yi-list style="height:400px;" :data="personList" :enabled-pull-up="false" :enabled-pull-down="false">
        <div slot-scope="{item,index}" class="item touch-highlight" @click="handleItemClick(index)">
          <div class="check" :class="{checked:item.check}"></div>
          <img class="img" :src="item.avatar"/>
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
  {name: '邓博', avatar: '', emplId: 'manager5373'},
  {name: '郭伟鹏', avatar: '', emplId: '012922666536322493'},
  {name: '陈琼玺', avatar: '', emplId: '206950283437923654'},
  {name: 'zhuo', avatar: '', emplId: '120961392221407635'},
  {name: '建嘉', avatar: '', emplId: '0234106038775759'},
  {name: '谢国权', avatar: '', emplId: '181008074935191688'},
  {name: '吴智伟', avatar: '', emplId: '055047383221557398'},
  {name: '强哥', avatar: 'http://static.dingtalk.com/media/lADPBbCc1TrpHYnNAV_NAWk_361_351.jpg', emplId: '0432273931777451'
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
  }, {name: '李昊', avatar: '', emplId: '0806273847845948'},
  {
    name: '林满泉',
    avatar: 'http://static.dingtalk.com/media/lADPBbCc1dBy6JjNAffNAfc_503_503.jpg',
    emplId: '154827434026392543'
  }, {
    name: '陈秋桦',
    avatar: 'http://static.dingtalk.com/media/lADPBbCc1Tp06xnNAsLNAu4_750_706.jpg',
    emplId: '052256302237964867'
  }];

export default {
  name: 'ChoosePop',
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
        if (this.personList.filter(item=>item.check).length >= this.max) {
          return;
        }
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
    show({multiple, personList = resultList, max, title, pickTips, disabledUsers = [], onSuccess}) {
      this.multiple = multiple;
      this.personList = personList.map(item=>({check: false, ...item})).filter(item=> disabledUsers.findIndex(id=>id === item.emplId) === -1);
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
    AlertUtil.saveInstance('choose', this);
  },
  beforeDestroy() {
    AlertUtil.removeInstance('choose');
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
