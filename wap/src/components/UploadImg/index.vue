<template>
  <div class="upload-box" :class="{'bottomLine':!bottomLine}">
    <cube-upload
      ref="upload"
      :action="action"
      v-model="files"
      :process-file="processFile"
      @files-added="filesAdded"
      @file-success="filesSuccess"
      @file-click="fileClick"
      @file-error="errHandler"
    />
  </div>
</template>

<script>
import ImageCompressor from 'image-compressor.js';
// import QiniuUtils from '../../utils/qiniuUtil';
import {ddApi} from '../../api/dingding';
// import {getQiNiu} from '../../api/common';

export default {
  name: 'upload-img',
  props: {
    value: {
      type: [Object, Array, String]
    },
    bottomLine: {
      type: Boolean,
      default: true
    }
  },
  // mounted() {
  //   this.onHandle();
  // },
  data() {
    return {
      files: this.value || [],
      action: {
        // target: 'http://up.qiniu.com/',
        target: window.location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://up.qiniu.com/',
        data: {token: this.$store.state.user.QINIU_TOKEN}
      },
      imgFomart: true, // 图片格式
      QINIU_URL: this.$store.state.user.QINIU_HOST
    };
  },
  watch: {
    newData(vl) {
      console.log(vl, '=========>我是新数据');
    },
    value(vl) {
      this.files = vl;
    },
    files(vl) {
      this.$emit('input', vl);
    }
  },
  methods: {
    // 图片压缩
    processFile(file, next) {

      if (file.size < 200 * 1024) {
        next(file);
        return;
      }
      // eslint-disable-next-line no-new
      new ImageCompressor(file, {
        quality: 0.5,
        maxWidth: 1600,
        maxHeight: 1600,
        checkOrientation: file.size <= 5000 * 1024,
        success(result) {
          next(result);
        },
        error(e) {
          console.log(e.message);
          next(file);
        }
      });
    },
    filesAdded(files) {

      console.log(files, 'files--------------');
      let hasIgnore = false;
      const maxSize = 10 * 1024 * 1024; // 10M
      for (let k in files) {
        const file = files[k];
        if (file.size > maxSize) {
          file.ignore = true;
          hasIgnore = true;
        }

        let type = file.type;
        console.log(type, 'type');
        let status = type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg' || type === 'image/gif' || type === 'image/bmp';
        if (status) {
          this.imgFomart = false;
        }
      }

      console.log(this.imgFomart, '---------->>state');

      if (this.imgFomart) {
        this.$createToast({
          type: 'warn',
          time: 1000,
          txt: '上传格式(jpeg/png/jpg/gif/bmp)'
        }).show();
        for (let q in files) {
          const file1 = files[q];
          file1.ignore = true;
        }
      }

      hasIgnore && this.$createToast({
        type: 'warn',
        time: 1000,
        txt: '请上传小于10M的图片'
      }).show();

      // 显示图片正在上传中
      // (this.files || []).map(v=>{
      //   v.status = 'uploading';
      // })

    },
    filesSuccess() {
      this.files && this.files.forEach((item, index) => {
        if (item.response && item.response.key) {
          let url = this.QINIU_URL;
          if (url.substring(0, 7) !== 'http://') {
            url = `http://${this.QINIU_URL}`;
          }
          this.files[index].url = `${url}/${item.response.key}`;
        }
      });
      console.log('<<<<<', this.files);
      this.$emit('onImgsSuccess', this.files);
    },
    errHandler(err) {
      console.log(err);
    },
    fileClick(data) {
      console.log(data, 'data==>img');
      // 处理格式问题
      let nowUrl = '';
      if (data && data.urlFrom) {
        nowUrl = data.urlFrom;
      } else if (data.url) {
        nowUrl = data.url;
      }
      data && data.url && ddApi.previewImage({urls: [nowUrl], current: nowUrl});
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl";
  .upload-box {
    display flex
    flex-direction column
    align-items flex-start
    padding px2rem(10) px2rem(15)
    border-bottom px2rem(10) solid #f3f3f3

    &.bottomLine {
      border-bottom none
      padding-left 0
      padding-bottom 0
    }

    >>> .cubeic-wrong {
      background-image url('../../assets/images/all/ico_close_r.png')
      width 16px;
      height 16px;
      background-size contain;
      font-size 0;
      top -6px;
      right -4px;

      &:before {
        content ''
      }
    }
    >>> .cube-upload-btn {
      width px2rem(70)
      height px2rem(70)
      border-radius px2rem(4)
      border-width 1px
      border-style dashed
      border-color #c9c9c9
    }
    >>> .cube-upload-btn-def,
    >>> .cube-upload-file-def {
      width px2rem(70)
      height px2rem(70)
    }
    >>> .cube-upload-file_stat {
      width px2rem(70)
      height px2rem(70)
      border-radius px2rem(4)
    }
    >>> .cube-upload-btn-def > i::before {
      top 52%
      content '+'
      height 0
      margin-top px2rem(-24)
      color #c9c9c9
      font-size px2rem(24)
    }
    >>> .cube-upload-btn-def > i::after {
      top 52%
      width px2rem(50)
      margin-left px2rem(-25)
      content '添加'
      transform none
      height 0
      font-size px2rem(12)
      color #c9c9c9
      medium()
    }

  }

  .upload-box .title {
    font-size px2rem(14)
    color $deepBlack
    line-height px2rem(50)
    medium()
  }

  .upload-box >>> .cubeic-wrong {
    font-size px2rem(8)
    color #EF465B
  }

  .upload-box >>> .cube-upload-file-status.cubeic-right {
    color $themeColor
  }
</style>
