<template>
  <textarea :id="id" :value="value"></textarea>
</template>
<script>
import $ from 'jquery'
// Import TinyMCE
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/print'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/media'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/paste'
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    setting: {}
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
          // EDITOR = editor
          console.log('Editor: ' + editor.id + ' is now initialized.')
          editor.on('input change undo redo', () => {
            var content = editor.getContent()
            _this.$emit('input', content)
          })
        },
        plugins: 'uploadimage link lists image code table colorpicker textcolor wordcount contextmenu print preview media fullpage fullscreen emoticons imagetools paste',
        toolbar: [
          'undo redo fontselect fontsizeselect removeformat imagetools paste uploadimage',
          'bold italic underline strikethrough backcolor forecolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent blockquote link unlink image code print preview media fullpage fullscreen emoticons'],
        font_formats: '微软雅黑=\'微软雅黑\',microsoft yahei;Arial=\'Arial\',Helvetica,Arial,sans-serif;Times New Roman=\'Times New Roman\',Helvetica,Arial,sans-serif;宋体=\'宋体\',Helvetica,Arial,sans-serif;仿宋=\'仿宋\',Helvetica,Arial,sans-serif;仿宋GB2312=\'仿宋GB2312\',Helvetica,Arial,sans-serif;楷体=\'楷体\',Helvetica,Arial,sans-serif;黑体=\'黑体\',Helvetica,Arial,sans-serif;华文新魏=\'华文新魏\',Helvetica,Arial,sans-serif;隶书=\'隶书\',Helvetica,Arial,sans-serif',
        automatic_uploads: true,
        image_advtab: true,
        table_default_styles: {
          width: '100%',
          borderCollapse: 'collapse'
        },
        image_title: false, // 是否开启图片标题设置的选择，这里设置否
        fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
        branding: false,
        setup (editor) {
          editor.on('Change', function (e) {
            // console.log(e.level.content)
            _this.$emit('onContent', e.level.content)
          })
          editor.on('Redo', function (e) {
            console.log('User has pressed redo')
          })
        }
      }
    Object.assign(setting, _this.setting)

    // 图片上传
    this.addUploadImage()

    tinymce.init(setting)
  },
  data: function () {
    return {
      id: 'editor-' + new Date().getMilliseconds()
    }
  },
  methods: {
    clear () {
      tinymce.activeEditor.setContent('')
    },
    addUploadImage () {
      tinymce.PluginManager.add('uploadimage', function (editor) {
        function selectLocalImages () {
          var dom = editor.dom
          var input = $('<input type="file" id="file" name="file" accept="image/jpg,image/jpeg,image/png,image/gif" multiple="multiple">')
          input.on('change', function () {
            var form = $('<form id="form"/>',
              {
                action: editor.settings.upload_image_url, // 设置上传图片的路由，配置在初始化时
                style: 'display:none',
                method: 'post',
                enctype: 'multipart/form-data'
              }
            )
            form.append(input)
            $('body').append(form)

            var data = new FormData($('#form')[0])
            $.ajax({
              type: 'post',
              url: editor.settings.upload_image_url,
              data: data,
              processData: false,
              contentType: false,
              success: function (res) {
                console.log('success------------')
                console.log(res)
              }
            })

            // ajax提交表单
            // form.ajaxSubmit({
            //   beforeSubmit: function () {
            //     return true
            //   },
            //   success: function (data) {
            //     if (data && data.file_path) {
            //       editor.focus()
            //       data.file_path.forEach(function (src) {
            //         editor.selection.setContent(dom.createHTML('img', {src: src}))
            //       })
            //     }
            //   }
            // })
          })

          input.click()
        }

        editor.addCommand('mceUploadImageEditor', selectLocalImages)

        editor.addButton('uploadimage', {
          icon: 'image',
          tooltip: '上传图片',
          onclick: selectLocalImages
        })

        editor.addMenuItem('uploadimage', {
          icon: 'image',
          text: '上传图片',
          context: 'tools',
          onclick: selectLocalImages
        })
      })
    }
  },
  beforeDestroy: function () {
    tinymce.get(this.id).destroy()
  }
}

</script>
