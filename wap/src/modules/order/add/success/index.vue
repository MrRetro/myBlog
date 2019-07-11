<template>
  <AddSuccess
    v-bind="this.params"
    :name="name"
    :id="id"
    :customerNo="customerNo"
    module="order"
    type="all"
  />
</template>

<script>
import AddSuccess from '../../../../views/AddSuccess/index';
import Page from '../../../../components/Mixins/BasePage';
import {ddApi} from '../../../../api/dingding';

export default {
  name: 'index',
  extends: Page,
  components: {
    AddSuccess
  },
  mounted() {
    // 接收参数
    console.log(this.$route);
    if (this.params) {
      this.isBack = this.params.isBack || false;
      this.ico = this.params.ico;
      this.title = this.params.title;
      this.content = this.params.content;
      this.isContent = this.params.isContent;
      this.btnName = this.params.btnName;
      this.id = this.params.id;
      this.name = this.params.name;
      this.customerNo = this.params.customerNo;
      this.btns = this.params.btns;
    }
  },
  activated() {
    ddApi.setRight();
  },
  data() {
    return {
      isBack: null,
      ico: '',
      title: '',
      content: '',
      isContent: false,
      btnName: '',
      id: '',
      name: '',
      customerNo: '',
      btns: []
    };
  },
  methods: {
    canGoBack() {
      // 如果有传返回的控制参数,则拦截返回键
      if (this.params.BACK_ACTION && !this.isBack) {
        this.$RouteUtil.back(this.params.BACK_ACTION);
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>

</style>
