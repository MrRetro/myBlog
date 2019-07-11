<template>
  <div class="container">
    <div class="input-box2">
      <cube-scroll>
        <yi-upload-img
          :form="form.form1"
          @onImgs="onImgs1"
        />
        <yi-upload-img
          :form="form.form2"
          @onImgs="onImgs2"
        />
        <yi-upload-img
          :form="form.form3"
          @onImgs="onImgs3"
        />
      </cube-scroll>
    </div>
    <yi-btn-box
      name="确认提交"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import {ddApi} from '../../api/dingding';

export default {
  name: 'upload-cell',
  mounted() {
    // 设置标题
    ddApi.setTitle({'title': '合同资料'});
  },
  activated() {
    console.log(this.form, '2222');
  },
  data() {
    return {
      form: {
        form1: {
          title: '委托订购合同图片',
          url: '//jsonplaceholder.typicode.com/photos/',
          count: 1,
          data: []
        },
        form2: {
          title: '身份证/企业营业执照',
          url: '//jsonplaceholder.typicode.com/photos/',
          count: 1,
          data: []
        },
        form3: {
          title: '定金定金凭证',
          url: '//jsonplaceholder.typicode.com/photos/',
          count: 1,
          data: []
        }
      },
      onSuccess: null
    };

  },
  methods: {
    onBtnClick() {
      console.log(this.form, '1112332');
      this.$route.params.onSuccess && this.$route.params.onSuccess({type: 'load', data: this.form});
      this.$router.go(-1);
    },
    onImgs1(val) {
      let obj = {};
      for (let item in val[0]) {
        obj[item] = val[0][item];
      }
      this.form.form1.data.push(obj);
    },
    onImgs2(val) {
      let obj = {};
      for (let item in val[0]) {
        obj[item] = val[0][item];
      }
      this.form.form2.data.push(obj);
    },
    onImgs3(val) {
      let obj = {};
      for (let item in val[0]) {
        obj[item] = val[0][item];
      }
      this.form.form3.data.push(obj);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .container {
    display flex
    flex-direction column
    flex 1
    overflow-y auto
    height 100%

    .input-box2 {
      display flex
      height calc(100% - 50px)
      flex-direction column
      flex 1
      overflow-y auto
    }
  }
</style>
