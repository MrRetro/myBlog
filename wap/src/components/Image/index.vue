<template>
  <div class="icon" :style="{backgroundImage:`url(${src})`}"></div>
</template>

<script>
export default {
  name: 'index',
  props: ['src']
};
</script>

<style scoped>
  .icon {
    background: no-repeat center;
    background-size: contain;
  }
</style>
