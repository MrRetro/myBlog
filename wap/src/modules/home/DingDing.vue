<template>
    <div style="display: flex;flex:1;flex-direction: column;">
      <div>钉钉接口测试</div>
      <div>
        <cube-button @click="onAlert" :primary="true">弹框alert</cube-button>
        <cube-button @click="setTitle" :primary="false">设置标题</cube-button>
        <cube-button @click="onConfirm" :primary="true">弹框confirm</cube-button>

        <cube-button @click="prompt" :primary="false">弹框prompt</cube-button>
        <cube-button @click="vibrate" :primary="true">震动vibrate</cube-button>

        <cube-button @click="watchShake" :primary="false">摇一摇watchShake</cube-button>
        <cube-button @click="clearShake" :primary="true">停止clearShake</cube-button>

        <cube-button @click="open" :primary="false">打开附件open</cube-button>
        <cube-button @click="openLink" :primary="true">打开外部URL</cube-button>

        <cube-button @click="share" :primary="false">分享</cube-button>
        <cube-button @click="ut" :primary="true">UT打点</cube-button>

        <cube-button @click="datepicker" :primary="false">日历选择</cube-button>
        <cube-button @click="timepicker" :primary="true">时间选择</cube-button>

        <cube-button @click="setLeft" :primary="false">设置左侧导航 仅支持ios</cube-button>
        <cube-button @click="setRight" :primary="true">设置右侧导航</cube-button>

        <cube-button @click="back" :primary="false">页面后退</cube-button>
        <cube-button @click="toast" :primary="true">toast</cube-button>

        <cube-button @click="showPreloader" :primary="false">显示loading</cube-button>
        <cube-button @click="hidePreloader" :primary="true">隐藏loading</cube-button>

        <cube-button @click="get" :primary="false">获取经纬度</cube-button>
        <cube-button @click="uploadImage" :primary="true">上传图片(单图)</cube-button>

        <cube-button @click="previewImage" :primary="false">浏览图片</cube-button>
        <cube-button @click="plain" :primary="true">自动调用输入框并输入文字</cube-button>

        <cube-button @click="actionSheet" :primary="false">选择框</cube-button>
        <cube-button @click="getNetworkType" :primary="true">获取网络类型</cube-button>

        <cube-button @click="post" :primary="false">发钉</cube-button>
        <cube-button @click="call" :primary="true">打电话</cube-button>

        <cube-button @click="createGroup" :primary="false">创建企业群聊天</cube-button>
        <cube-button @click="datetimepicker" :primary="true">日期+时间选择器</cube-button>

        <cube-button @click="chosen" :primary="false">下拉组件</cube-button>
        <cube-button @click="launchApp" :primary="true">启动第三方库</cube-button>
      </div>
    </div>
</template>

<script>
import {ddApi} from '../../api/dingding';

export default {
  name: 'ding-ding',
  mounted() {
    this.$nextTick(()=>{
      console.log('页面初始化调用DD');
      dd.ready(() => {
        dd.device.notification.confirm({
          message: '你爱我吗',
          title: '提示',
          buttonLabels: ['爱', '不爱'],
          onSuccess(result) {
            console.log(result);
            // onSuccess将在点击button之后回调
            /*
            {
                buttonIndex: 0 //被点击按钮的索引值，Number类型，从0开始
            }
            */
          },
          onFail(err) {
            console.log(err);
          }
        });
      });
      console.log('页面初始化结束调用DD');
    });
  },
  methods: {
    // 弹框alert
    onAlert() {
      ddApi.alert({'message': '这个一个弹窗', 'title': '提示', 'buttonName': '收到'});
      // console.log('开始调用DD');
      // dd.ready(() => {
      //   dd.device.notification.alert({'message': '这个一个弹窗', 'title': '提示', 'buttonName': '收到'});
      // });
      // console.log('结束调用DD');
    },
    onConfirm() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.notification.confirm({'message': '这个是一个弹窗confirm', 'title': '提示', 'buttonLabels': ['知道了', '取消']});
      });
      console.log('结束调用DD');
    },
    prompt() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.notification.prompt({'message': '再说一遍？', 'title': '提示', 'buttonLabels': ['继续', '不玩了']});
      });
      console.log('结束调用DD');
    },
    vibrate() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.notification.vibrate({'duration': 300});
      });
      console.log('结束调用DD');
    },
    watchShake() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.accelerometer.watchShake({'sensitivity': 15, 'frequency': 150, 'callbackDelay': 1000});
      });
      console.log('结束调用DD');
    },
    clearShake() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.accelerometer.clearShake({});
      });
      console.log('结束调用DD');
    },
    open() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.util.open({'name': 'mailAttachment', 'params': {'mailId': '432423', 'attachmentId': '3432', 'title': 'test', 'size': '32131'}});
      });
      console.log('结束调用DD');
    },
    openLink() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.util.openLink({'url': 'http://h5.m.laiwang.com/home/ding.html', 'enableShare': true});
      });
      console.log('结束调用DD');
    },
    share() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.util.share({'type': 0,
          'url': 'http://m.laiwang.com',
          'title': '支付宝新春红包节目单',
          'content': '新春将至，支付宝现金拜年！每天整点现金大放送，欲知详情，猛戳起来！',
          'image': 'https://i01.lw.aliimg.com/tfs/TB1TUovHXXXXXbCXpXXNC1IYXXXLAIWANGi_1_120_120.jpg'});
      });
      console.log('结束调用DD');
    },
    ut() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.util.ut({'key': 'h5_ut_test_demo', 'value': {'a': 1, 'b': 2}});
      });
      console.log('结束调用DD');
    },
    datepicker() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.util.datepicker({
          'format': 'yyyy-MM-dd',
          onSuccess(result) {
            console.log(result);
          },
          onFail(err) {
            console.log(err);
          }
        });
      });
      console.log('结束调用DD');
    },
    timepicker() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.util.timepicker({
          'format': 'HH:mm',
          onSuccess(result) {
            console.log(result);
          },
          onFail(err) {
            console.log(err);
          }
        });
      });
      console.log('结束调用DD');
    },
    setLeft() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.navigation.setLeft({'control': true, 'text': '取消'});
      });
      console.log('结束调用DD');
    },
    setRight() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.navigation.setRight({'control': true, 'show': true, 'text': '发送', 'showRedDot': true, 'badge': 'xxx'});
      });
      console.log('结束调用DD');
    },
    setTitle() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.navigation.setTitle({'title': '邮箱正文', 'subTitle': '最安全的邮箱'});
      });
      console.log('结束调用DD');
    },
    back() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.navigation.back({});
      });
      console.log('结束调用DD');
    },
    toast() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.notification.toast({'text': '发送成功'});
      });
      console.log('结束调用DD');
    },
    showPreloader() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.notification.showPreloader({'text': '使劲加载中..', 'showIcon': true});
      });
      console.log('结束调用DD');
    },
    hidePreloader() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.notification.hidePreloader({});
      });
      console.log('结束调用DD');
    },
    get() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.geolocation.get({'targetAccuracy': '200'});
      });
      console.log('结束调用DD');
    },
    uploadImage() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.util.uploadImage({'stickers': {'time': '08:35', 'dateWeather': '2016.05.06 周六·晴转多云 16℃', 'username': '王晓', 'address': '龙章大厦·杭州'}});
      });
      console.log('结束调用DD');
    },
    previewImage() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.util.previewImage({
          'urls': ['http://gtms01.alicdn.com/tps/i1/TB12i5PHFXXXXaKXVXXY7J9SpXX-500-699.jpeg',
            'http://gtms04.alicdn.com/tps/i4/TB1E4yUHFXXXXboXFXXK0qsSpXX-500-750.jpeg',
            'http://gtms03.alicdn.com/tps/i3/TB1Eee0HFXXXXc_XpXXL.KX0VXX-440-586.jpeg',
            'http://gtms02.alicdn.com/tps/i2/TB1Nn1THFXXXXbKXFXX_SFfVFXX-658-658.jpeg'],
          'current': 'http://gtms04.alicdn.com/tps/i4/TB1E4yUHFXXXXboXFXXK0qsSpXX-500-750.jpeg'
        });
      });
      console.log('结束调用DD');
    },
    plain() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.ui.input.plain({'placeholder': '请输入评论...', 'text': '我是默认填充文本'});
      });
      console.log('结束调用DD');
    },
    actionSheet() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.notification.actionSheet({'title': '谁是最棒哒？', 'cancelButton': '取消', 'otherButtons': ['孙悟空', '猪八戒', '唐僧', '沙和尚']});
      });
      console.log('结束调用DD');
    },
    getNetworkType() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.connection.getNetworkType({
          onSuccess(result) {
            console.log(result);
          },
          onFail(err) {
            console.log(err);
          }
        });
      });
      console.log('结束调用DD');
    },
    post() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.ding.post({
          'corpId': 'ding585e64890f2dc598',
          'users': ['14823'],
          'type': 0,
          'alertType': 2,
          'alertDate': {'format': 'yyyy-MM-dd HH:mm',
            'value': '2015-05-09 08:00'}
        });
      });
      console.log('结束调用DD');
    },
    call() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.telephone.call({'corpId': 'ding585e64890f2dc598', 'users': ['11111111']});
      });
      console.log('结束调用DD');
    },
    createGroup() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.contact.createGroup({'corpId': 'ding585e64890f2dc598', 'users': ['14823', '67388', '26713232']});
      });
      console.log('结束调用DD');
    },
    datetimepicker() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.util.datetimepicker({'format': 'yyyy-MM-dd HH:mm', 'value': '2015-05-15 09:00'});
      });
      console.log('结束调用DD');
    },
    chosen() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.biz.util.chosen({
          'source': [{'key': '选项1', 'value': 1},
            {'key': '选项2', 'value': 2}],
          'selectedKey': '选项1',
          onSuccess(result) {
            console.log(result);
          },
          onFail(err) {
            console.log(err);
          }
        });
      });
      console.log('结束调用DD');
    },
    launchApp() {
      console.log('开始调用DD');
      dd.ready(() => {
        dd.device.launcher.launchApp({'app': 'taobao'});
      });
      console.log('结束调用DD');
    }
  }
};
</script>

<style scoped>

</style>
