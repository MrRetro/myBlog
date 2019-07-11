<template>
  <div :style="{width:w,height:h}">
    <canvas :id="uid" class="canvas" :data-uid="uid"></canvas>
  </div>

</template>

<script>
/* eslint-disable no-underscore-dangle */

import SignaturePad from 'signature_pad';

export default {
  name: 'Signature',
  props: {
    sigOption: {
      type: Object,
      default: ()=>{
        return {
          backgroundColor: 'rgb(255,255,255)',
          penColor: 'rgb(0, 0, 0)'
        };
      }
    },
    w: {
      type: String,
      default: '100%'
    },
    h: {
      type: String,
      default: '100%'
    },
    clearOnResize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sig: {},
      option: {
        backgroundColor: 'rgb(255,255,255)',
        penColor: 'rgb(0, 0, 0)'
      },
      uid: ''
    };
  },
  created() {
    this.uid = `canvas${this._uid}`;
    let sigOptions = Object.keys(this.sigOption);
    for (let item of sigOptions) {
      this.option[item] = this.sigOption[item];
    }
  },
  methods: {
    draw() {
      let canvas = document.getElementById(this.uid);
      this.sig = new SignaturePad(canvas, this.option);
      const resizeCanvas = ()=> {
        let url;
        if (!this.isEmpty()) {
          url = this.save();
        }
        let ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        this.clear();
        !this.clearOnResize && url !== undefined && this.fromDataURL(url);
      };
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
    },
    clear() {
      this.sig.clear();
    },
    save(format) {
      return format ? this.sig.toDataURL(format) : this.sig.toDataURL();
      // signaturePad.toDataURL(); // save image as PNG
      // signaturePad.toDataURL("image/jpeg"); // save image as JPEG
      // signaturePad.toDataURL("image/svg+xml"); // save image as SVG
    },
    fromDataURL(url) {
      this.sig.fromDataURL(url);
    },
    isEmpty() {
      return this.sig._isEmpty;
    },
    undo() {
      let data = this.sig.toData();
      if (data) {
        data.pop();
        this.sig.fromData(data);
      }
    },
    addWaterMark(data) {
      if (!(Object.prototype.toString.call(data) === '[object Object]')) {
        throw new Error(`Expected Object, got ${typeof data}.`);
      } else {
        let vCanvas = document.getElementById(this.uid);
        let textData = {
          text: data.text || '',
          x: data.x || 20,
          y: data.y || 20,
          sx: data.sx || 40,
          sy: data.sy || 40
        };

        let ctx = vCanvas.getContext('2d');
        ctx.font = data.font || '20px sans-serif';
        ctx.fillStyle = data.fillStyle || '#333';
        ctx.strokeStyle = data.strokeStyle || '#333';
        if (data.style === 'all') {
          ctx.fillText(textData.text, textData.x, textData.y);
          ctx.strokeText(textData.text, textData.sx, textData.sx);
        } else if (data.style === 'stroke') {
          ctx.strokeText(textData.text, textData.sx, textData.sx);
        } else {
          ctx.fillText(textData.text, textData.x, textData.y);
        }
        this.sig._isEmpty = false;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.draw();
    });
  }
};
</script>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
