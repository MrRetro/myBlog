<template>
    <yi-result
      :form="form"
      @onSelDetail="onSelDetail"
    />
</template>

<script>
import Page from '../../../../components/Mixins/BasePage';
import {ddApi} from '../../../../api/dingding';

export default {
  name: 'success',
  extends: Page,
  activated() {
    ddApi.setRight();
  },
  data() {
    return {
      id: 'TBK129903',
      form: {
        type: 'success',
        title: '创建成功',
        content: '合同订单(编号：TBK129903)'
      }
    };
  },
  methods: {
    // 回调
    onSelDetail() {
      alert(this.id);
    }
  }
};
</script>

<style scoped>

</style>
