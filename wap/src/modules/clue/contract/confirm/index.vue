<template>
  <div class="container app-init">
    <div class="input-box2">
      <cube-scroll>
        <p class="title">客户信息</p>
        <list-box
          :form="form1"
        />
        <!--<p class="bord"></p>-->
        <p class="title">线索信息</p>
        <list-box
          :form="form2"
        />
      </cube-scroll>
    </div>
    <yi-btn-box
      name="确认签约"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import ListBox from '../../../../views/ListBox/index';
import {ddApi} from '../../../../api/dingding';
import Page from '../../../../components/Mixins/BasePage';
import {getDetail} from '../../../../api/common';
import {transformColorName} from '../../../../utils/commonUtil';
import {AlertUtil} from '../../../../utils/AlertUtil';

export default {
  name: 'Confirm',
  extends: Page,
  components: {
    ListBox
  },
  data() {
    const {customerName, customerGender, customerMobile, carName, intentionGrade, inColor, outColor, shoppingWay} = this.$route.params;
    return {
      form1: [
        {title: '姓名', value: customerName},
        {title: '性别', value: customerGender && customerGender.name},
        {title: '电话', value: customerMobile}
      ],
      form2: [
        {title: '车型信息', value: carName},
        {title: '外观', value: outColor},
        {title: '内饰', value: inColor},
        {title: '意向等级', value: intentionGrade && intentionGrade.name},
        {title: '购车方式', value: shoppingWay && shoppingWay.name}
      ]
    };
  },
  methods: {
    onBtnClick() {
      if (this.params.intentionType.code === 2) {
        AlertUtil.showToast({txt: '线索为模糊意向无法签约，请编辑修改后再做操作。'});
        return;
      }
      this.$RouteUtil.orderAddOne({
        clueInfo: this.params,
        BACK_ACTION: {
          path: this.ROUTE_PATH
        },
        onSuccess: this.params.onSuccess
      });
    }
  },
  activated() {
    ddApi.setRight({
      text: '修改',
      onSuccess: () => {
        this.$RouteUtil.clueEdit({
          id: this.params.id,
          onSuccess: async () => {
            this.params.onSuccess && this.params.onSuccess();
            const data = await getDetail({module: 'clues', id: this.params.id});
            this.params = {...this.params, ...data};
            const {carName, appearance, interior, intentionGrade, shoppingWay} = data;
            this.form2[0].value = carName;
            this.form2[1].value = transformColorName(appearance);
            this.form2[2].value = transformColorName(interior);
            this.form2[3].value = intentionGrade && intentionGrade.name;
            this.form2[4].value = shoppingWay && shoppingWay.name;
          }
        });
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl";
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

    .title {
      text-align left
      font-size px2rem(16)
      color $deepBlack
      padding-left px2rem(15)
      margin-top px2rem(20)
      line-height px2rem(20)
      semibold()
    }
    .bord {
      display flex
      width 100%
      height px2rem(10)
      background-color #f3f3f3
      margin-top px2rem(24)
      margin-bottom px2rem(20)
    }
  }
</style>
