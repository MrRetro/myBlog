<template>
  <div v-if="menuLength !== 0" class="dragging-box" :class="'show'">
    <cube-scroll>
      <div class="drag-content" :class="'show'">
        <div class="menu-list">
          <template v-for="(item,i) in menus">
            <div :key="item.id" v-if="item.menus.length !== 0" class="menu-li">
              <p class="title">{{item.name}}</p>
              <ul class="item-box">
                <yi-touch
                  component-name="li"
                  v-for="(subItem,index) in item.menus"
                  :key="subItem.id"
                  class="item-li"
                  rel="subItem.id"
                  type="highLight"
                  @click.native="selectById(i,index)"
                >
                  <div>
                    <p class="p-word">
                      <yi-image class="img" :src="subItem.icon" @click.native="selectById(i,index)" />
                      <span class="name" @click.stop="selectById(i,index)" >{{subItem.name}}</span>
                    </p>
                  </div>
                </yi-touch>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </cube-scroll>
  </div>
  <div v-else class="app-init">
    <yi-error-view message="您还未配置权限,请联系大区负责人开通" :btn-params="btnParams" :src="$images.base.ic_key" :hide-btn="false"/>
  </div>
</template>

<script>

import Menus from '../../components/Mixins/Menus';
import {BackHandler} from '../../utils/handleBack';

export default {
  name: 'main-menu',
  mixins: [Menus],
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    menuData: {
      type: Array
    }
  },
  methods: {
    // 获取浏览器当前版本
    getVersion(){
      let _broswer = {};
      var sUserAgent = navigator.userAgent;
      var isOpera = sUserAgent.indexOf("Opera") > -1;
      if (isOpera) {
        //首先检测Opera是否进行了伪装
        if (navigator.appName == 'Opera') {
          //如果没有进行伪装，则直接后去版本号
          _broswer.version = parseFloat(navigator.appVersion);
        } else {
          var reOperaVersion = new RegExp("Opera (\\d+.\\d+)");
          //使用正则表达式的test方法测试并将版本号保存在RegExp.$1中
          reOperaVersion.test(sUserAgent);
          _broswer.version = parseFloat(RegExp['$1']);
        }
        _broswer.opera = true;
        _broswer.name = 'opera';
      }
      var isChrome = sUserAgent.indexOf("Chrome") > -1;
      if (isChrome) {
        var reChorme = new RegExp("Chrome/(\\d+\\.\\d+(?:\\.\\d+\\.\\d+))?");
        reChorme.test(sUserAgent);
        _broswer.version = parseFloat(RegExp['$1']);
        _broswer.chrome = true;
        _broswer.name = 'chrome';
      }
      //排除Chrome信息，因为在Chrome的user-agent字符串中会出现Konqueror/Safari的关键字
      var isKHTML = (sUserAgent.indexOf("KHTML") > -1
        || sUserAgent.indexOf("Konqueror") > -1 || sUserAgent
          .indexOf("AppleWebKit") > -1)
        && !isChrome;
      if (isKHTML) {//判断是否基于KHTML，如果时的话在继续判断属于何种KHTML浏览器
        var isSafari = sUserAgent.indexOf("AppleWebKit") > -1;
        var isKonq = sUserAgent.indexOf("Konqueror") > -1;
        if (isSafari) {
          var reAppleWebKit = new RegExp("Version/(\\d+(?:\\.\\d*)?)");
          reAppleWebKit.test(sUserAgent);
          var fAppleWebKitVersion = parseFloat(RegExp["$1"]);
          _broswer.version = parseFloat(RegExp['$1']);
          _broswer.safari = true;
          _broswer.name = 'safari';
        } else if (isKonq) {
          var reKong = new RegExp(
            "Konqueror/(\\d+(?:\\.\\d+(?\\.\\d)?)?)");
          reKong.test(sUserAgent);
          _broswer.version = parseFloat(RegExp['$1']);
          _broswer.konqueror = true;
          _broswer.name = 'konqueror';
        }
      }
      // !isOpera 避免是由Opera伪装成的IE
      var isIE = sUserAgent.indexOf("compatible") > -1
        && sUserAgent.indexOf("MSIE") > -1 && !isOpera;
      if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(sUserAgent);
        _broswer.version = parseFloat(RegExp['$1']);
        _broswer.msie = true;
        _broswer.name = 'msie';
      }
      // 排除Chrome 及 Konqueror/Safari 的伪装
      var isMoz = sUserAgent.indexOf("Gecko") > -1 && !isChrome && !isKHTML;
      if (isMoz) {
        var reMoz = new RegExp("rv:(\\d+\\.\\d+(?:\\.\\d+)?)");
        reMoz.test(sUserAgent);
        _broswer.version = parseFloat(RegExp['$1']);
        _broswer.mozilla = true;
        _broswer.name = 'mozilla';
      }
      console.log('retro03162201==>',_broswer)
      if(typeof _broswer === 'object'){
        _broswer.data = sUserAgent;
        alert(JSON.stringify(_broswer))
      }else{
        alert(_broswer)
      }
    },
    selectById(section, index) {
      // alert(section)
      console.log('retro03151845==>',section, index);
      this.menus[section].menus[index].route();
      // alert('点击');
    }
  },
  data() {
    return {
      btnParams: {
        title: '重试',
        click: ()=>$eventBus.$emit('reInit', this.$store.state.user.dingUserId)
      }
    };
  },
  mounted() {
    console.log('页面显示时间', Date.now());
    // this.getVersion();
  },
  computed: {
    menuLength() {
      return this.menus.filter(item=>item.menus.length !== 0).length;
    }
  },
  activated() {
    BackHandler.addBackListener(() => {
    });
  },
  deactivated() {
    BackHandler.remove();
  },
  destroyed() {
    BackHandler.remove();
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .dragging-box {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: white;
    z-index: 1001;

    animation-duration: .5s;
    animation-fill-mode: both;

    .drag-content {
      display flex
      flex 1
      flex-direction column
      animation-duration: .3s;
      animation-fill-mode: both;

      .zhezhao {
        position: absolute;
        width: 100%
        height: 40px;
        top: 0px;
        left: 0px;
      }
    }
    .drag-content.show {
      /*animation-name: fadeInUp;*/
    }
    .drag-content.hide {
      /*animation-name: fadeOutDown;*/
    }
  }

  .dragging-box.show {
    animation-name: fadeIn;
  }

  .dragging-box.hide {
    animation-name: fadeOut;
  }

  .dragging-box .p-info {
    background-color: white;
    font-size: 14px;
    color: #c1c1c1;
    line-height: 20px;
    margin-bottom 12px
  }

  .dragging-box .menu-list {
    display: block;
    flex-direction: column;
    flex: 1;
    width: 100%;
    margin-top: 0px;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow-y: auto;
  }

  .dragging-box .menu-li {
    width: 100%;
    padding-bottom 20px
    border-top: 10px solid #f3f3f3;

    &:nth-child(1) {
      border: none;
    }
  }

  .dragging-box .menu-li .title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 15px;
    font-size: 16px;
    color: #31363B;
    margin-top 20px
    padding-bottom 20px
    medium()
  }

  .dragging-box .menu-li .item-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 12px;
    color: #8D8D8D;
    /*border-bottom: 1px solid #f3f3f3;*/
  }

  .dragging-box .menu-li .item-box .p-word {
    display flex
    flex-direction column
    align-items center
    padding 10px 0px
  }

  .dragging-box .menu-li .item-box .item-li {
    display: flex;
    width: 20%;
    min-height: 60px;
    flex-direction: column;
    justify-content: center;
    /*padding-top: 20px;*/
    /*padding-bottom: 10px;*/
  }

  .dragging-box .menu-li .item-box .item-li .img {
    width: px2rem(28);
    height: px2rem(28);
    display: inline-block;
    border-radius: 4px;
    margin-bottom: 4px;
  }

  .dragging-box .menu-li .item-box .item-li .name {
    line-height 17px
  }

  @keyframes fadeIn {
    from {
      opacity 0
    }

    to {
      z-index 1000
      opacity 1
    }
  }

  @keyframes fadeOut {
    from {
      opacity 1
    }

    to {
      z-index -1
      opacity 0
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }
</style>

