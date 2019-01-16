<template>
  <div class="modal-box" :class="{'cur':show}">
    <div class="modal-content">
      <div class="close" @click="closeModal">x</div>
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
// import Vue from 'vue'
// import Component from 'vue-class-component'
//   @Component({
//     props: {
//       isShow: {
//         type: Boolean,
//         default: false
//       }
//     }
//   })
// export default class Modal extends Vue {
//   show: Boolean = false
//   set isShow (vl:Boolean) {
//     this.show = vl
//   }
//   closeModal () {
//     this.show = false
//   }
//   }
</script>

<style scoped>
.modal-box {
  position: absolute;
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
  background-color: white;
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
  cursor: pointer;
}
</style>
