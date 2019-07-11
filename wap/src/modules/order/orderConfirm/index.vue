<template>
  <yi-container>
    <cube-scroll>
      <yi-touch component-name="img"
                v-for="(item,index) in contractUrl"
                @click="handleImgClick(item)"
                :key="index+item" :src="item"
                style="width: 100%"/>
      <div v-for="(item,index) in orderInfo" :key="index" class="item-contain">
        <div class="section-text">{{item.title}}</div>
        <div v-if="!item.isFileInfo" class="info-contain">
          <div>
            <div v-for="(t,index) in item.data" :key="index" class="item">{{t.title}}：</div>
          </div>
          <div>
            <div v-for="(t,index) in item.data" :key="index" class="item value">{{t.value}}</div>
          </div>
        </div>
        <div v-else class="file-contain">
          <MoreImages v-for="(t,index) in item.data" :key="index" :all-data="item.data" :title="t.title"
                      :images="t.images"/>
        </div>
        <div v-if="index !== orderInfo.length-1" class="line-space"></div>
      </div>
    </cube-scroll>
    <yi-btn-box :name="btnTitle" @onBtnClick="handleSureClick"/>
  </yi-container>
</template>

<script>

import CommonTab from '../../../commons/TabBox/components/CommonTab/index';
import MoreImages from '../../../commons/MoreImages/index';
import {affirmOrder, completeSigning, getSignature, sendMsg} from '../../../api/order';
import Page from '../../../components/Mixins/BasePage';
import {ddApi} from '../../../api/dingding';
import {AlertUtil} from '../../../utils/AlertUtil';

export default {
  name: 'OrderConfirm',
  extends: Page,
  components: {MoreImages, CommonTab},
  data() {
    const {orderFileCabinetList}
        = this.$route.params.params;
    return {
      state: this.$route.params.state,
      signUrl: '',
      orderInfo: [
        {
          title: '附件信息',
          isFileInfo: true,
          data: orderFileCabinetList.filter(item => item.title !== '委托订购合同')
        }]
    };
  },
  computed: {
    btnTitle() {
      switch (this.state) {
        case 1:
          return '重新签约';
        case 2:
          return '完成签约';
        case 3:
          return '确认合同';
        default:
          return '';
      }
    },
    contractUrl() {
      let url = [];
      if (this.state === 2) {
        url = [...this.params.params.contractUrl, this.signUrl];
      } else {
        url = [...this.params.params.contractUrl];
      }
      return url;
    }
  },
  mounted() {
    if (this.state === 2) {
      getSignature(this.params.params.orderContractId).then(res=>this.signUrl = `data:image/png;base64,${res}`);
    }
  },
  activated() {
    ddApi.setRight({
      text: '编辑',
      onSuccess: () => {
        this.$RouteUtil.orderEdit({
          BACK_ACTION: {path: this.ROUTE_PATH},
          id: this.params.id,
          onSuccess: () => {
            this.params.onSuccess && this.params.onSuccess();
            this.$router.go(-1);
          }
        });
      }
    });
  },
  methods: {
    async handleSureClick() {
      const {params, onSuccess} = this.params;
      switch (this.state) {
        case 1:
          await sendMsg(params.orderContractId);
          AlertUtil.showToast({txt: '发送成功'});
          break;
        case 2:
          await completeSigning(params.orderContractId);
          break;
        case 3:
          await affirmOrder(params.orderContractId);
          break;
        default:
          break;
      }
      onSuccess && onSuccess();
      this.$router.go(-1);
    },
    handleImgClick(item) {
      ddApi.previewImage({urls: this.contractUrl, current: item});
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .line-space {
    height px2rem(10)
    background-color #f3f3f3
  }

  .item-contain {
    margin px2rem(16) 0
  }

  .section-text {
    line-height px2rem(22)
    margin-top px2rem(4)
    color $deepBlack
    font-size px2rem(16)
    padding-left px2rem(14)
    text-align left
    medium()
  }

  .info-contain {
    margin px2rem(8) px2rem(14)
    display flex
    .item {
      color $darkBlack
      font-size px2rem(14)
      line-height px2rem(20)
      text-align left
      padding px2rem(8) 0
    }

    .value {
      color $deepBlack
    }
  }

  .file-contain {
    margin-top px2rem(16)
    padding-bottom px2rem(20)
  }

</style>
