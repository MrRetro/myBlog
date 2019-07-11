<template>
  <yi-container class="contain" :show-loading="isLoading">
    <div class="content">
      <div class="header-contain">
        <div class="item">
          <div class="header-title">已向客户收款</div>
          <div class="header-content" style="color:#31363B">{{12321321}}</div>
        </div>
        <div class="item">
          <div class="header-title">此次申请金额</div>
          <div class="header-content">{{12321321}}</div>
        </div>
        <div class="item">
          <div class="header-title">可支配金额</div>
          <div class="header-content" style="color:#FDA926">{{12321321}}</div>
        </div>
      </div>
      <cube-scroll>
        <div class="margin-top">
          <single-form ref="form" v-for="(key,index) in formList" :key="key" class="table" :index="index"
                       @del="handleDel(index)"/>
        </div>
        <yi-touch class="add-btn" @click="add">
          <img :src="$images.delivery.ic_theme_add"/>
          <span>添加付款指令</span>
        </yi-touch>
      </cube-scroll>
    </div>
    <yi-btn-box
      class="btn"
      name="确认申请"
      :icon="$images.delivery.ic_car"
      @onBtnClick="onBtnClick"
    />
  </yi-container>
</template>

<script>
import ListInfo from '../../../views/ListInfo';
import SingleForm from './Form';
import {delayeringValue} from '../../../utils/paramsUtil';
import {createSoleID} from '../../../utils/commonUtil';
import Page from '../../../components/Mixins/EditPage';
import {submitOtherFee} from '../../../api/delivery';

export default {
  components: {
    ListInfo,
    SingleForm
  },
  name: 'extraApplyForm',
  extends: Page,
  data() {
    return {
      id: this.$route.params.id,
      isLoading: false,
      data: [],
      formList: [createSoleID()]
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.isLoading = false;
    },
    onBtnClick() {
      const arr = this.$refs.form.map((item) => {
        return item.validate();
      });
      Promise.all(arr).then(async data => {
        let state = data.every(item => item);
        if (state) {
          let a = [];
          this.$refs.form.forEach(t => a.push(t.getFormParams()));
          await submitOtherFee({deliveryId: this.params.id, addSpecList: a});
          this.params.onSuccess && this.params.onSuccess();
          this.$router.go(-1);
        } else {
          console.log('校验失败数据');
        }
      });
    },
    add() {
      this.formList.push(createSoleID());
    },
    handleDel(index) {
      if (this.formList.length === 1) return;
      this.formList.splice(index, 1);
    }
  },
  computed: {
    defaultData() {
      return this.data.map(delayeringValue);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .contain {
    .content {
      display flex
      height calc(100% - 50px)
      flex-direction column
      flex 1
      overflow-y auto
    }
  }

  .header-contain {
    box-shadow: 0 px2rem(4) px2rem(4) 0 rgba(0, 0, 0, 0.05);
    height px2rem(84)
    margin-bottom px2rem(24)
    display flex
    position: fixed;
    width: 100%;
    background: white;
    z-index 1000
    .item {
      flex 1;
      display flex;
      flex-direction column;
      align-items center
      justify-content center
    }
    .header-title {
      color #8D8D8D
      font-size px2rem(14)
    }
    .header-content {
      margin-top px2rem(8)
      font-size px2rem(20)
      color #348EED
      medium()
    }
  }

  .margin-top {
    margin-top px2rem(108)
  }

  .add-btn {
    width px2rem(170)
    height px2rem(40)
    border-color $themeColor
    border-width 1px
    border-style solid
    border-radius px2rem(4)
    display flex
    align-items center
    justify-content center
    margin-left px2rem(102)
    margin-bottom px2rem(38)
    img {
      width px2rem(11)
      height px2rem(11)
      margin-right px2rem(4)
    }
    span {
      color $themeColor
      font-size px2rem(14)
    }
  }

  .table {
    margin-bottom px2rem(24) !important
  }
</style>
