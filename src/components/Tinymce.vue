<template>
  <textarea :id="id" :value="value"></textarea>
</template>
<script>
// Import TinyMCE
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
const INIT = 0
// const CHANGED = 2
// let EDITOR = null
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    setting: {}
  },
  watch: {
    value: function (val) {
      tinymce.activeEditor.setContent(val)
      // console.log('init ' + val)
      // if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
      //   tinymce.activeEditor.setContent(val)
      // }
      // this.status = CHANGED
    }
  },
  data: function () {
    return {
      status: INIT,
      id: 'editor-' + new Date().getMilliseconds()
    }
  },
  methods: {
    // changeValue (vl) {
    //   console.log('retro03111750==>', vl)
    // }
  },
  mounted: function () {
    const _this = this
    const setting =
        {
          selector: '#' + _this.id,
          language_url: '/static/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/lightgray',
          init_instance_callback: function (editor) {
            // let EDITOR = editor
            console.log('Editor: ' + editor.id + ' is now initialized.')
            editor.on('input change undo redo', () => {
              var content = editor.getContent()
              _this.$emit('input', content)
            })
          },
          setup: function (editor) {
            editor.on('click', function (e) {
              console.log('Editor was clicked')
            })
          },
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
          toolbar:
        'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat'
        }
    Object.assign(setting, _this.setting)
    tinymce.init(setting)
  },
  beforeDestroy: function () {
    tinymce.get(this.id).destroy()
  }
}

</script>
