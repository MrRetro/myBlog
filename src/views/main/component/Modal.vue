<template>
  <div class="modal-box" :class="{'cur':show}" @scroll.prevent>
    <div class="modal-content">
      <div class="close">
        <span class="word-close" @click="closeModal">x</span>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow (vl) {
      this.show = vl
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    closeModal () {
      this.$emit('event-change', false)
    }
  }
}
</script>

<style scoped>
.modal-box {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 10%;
  right: 10%;
  z-index: -100;
  -webkit-transform: scale(0.7);
  -moz-transform: scale(0.7);
  -ms-transform: scale(0.7);
  transform: scale(0.7);
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  background-color: rgba(0,0,0,.9);
  overflow-y: auto;
}
.modal-box.cur,
.modal-box.cur .modal-content {
  z-index: 99999;
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  opacity: 1;
}
.modal-box .close{
  position: absolute;
  top: 0px;
  right: 0px;
  text-align: right;
  z-index: 99998;
}
.modal-box .close .word-close{
  cursor: pointer;
  font-size: 46px;
  color: rgba(255,255,255,0.8);
  padding: 30px;
}
</style>
