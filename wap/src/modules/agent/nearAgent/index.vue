<template>
  <near :fetchData="fetchData"/>
</template>

<script>
import Near from '../../../views/Near';
import Page from '../../../components/Mixins/BasePage';
import {getNearAgent} from '../../../api/common';
import {ddApi} from '../../../api/dingding';

export default {
  name: 'NearAgent',
  mixins: [Page],
  components: {
    Near
  },
  methods: {
    fetchData(params) {
      return getNearAgent(params);
    }
  },
  activated() {
    ddApi.setRight();
  },
  mounted() {
  }
};
</script>
