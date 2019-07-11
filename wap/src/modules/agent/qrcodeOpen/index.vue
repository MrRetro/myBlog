<template>
  <QRCode :webUrl="webUrl" />
</template>

<script>
import QRCode from '../../../views/QRCode';
import BasePage from '../../../components/Mixins/BasePage';
import {ddApi} from '../../../api/dingding';

export default {
  name: 'qrcode-open',
  extends: BasePage,
  components: {
    QRCode
  },
  data() {
    return {
      webUrl: 'http://event.itsmycar.cn/share-user/index.html?page=reg&username=13428288717'
    };
  },
  activated() {
    ddApi.setRight();
  }
};
</script>

<style scoped>

</style>
