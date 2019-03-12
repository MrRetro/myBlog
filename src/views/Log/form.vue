<template>
    <div>
      <editor
        class="editor"
        ref="edit"
        :value="content"
        :setting="editorSetting"
        @input="(content)=> content = content">

      </editor>
      <p @click="submit">提交</p>
    </div>
</template>

<script>
import editor from '../../components/tinymce'
export default {
  name: 'logForm',
  components: {
    editor
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$refs.edit)
    })
  },
  data: function () {
    return {
      content: '我是富文本编辑器的内容',
      // tinymce的配置信息 参考官方文档 https://www.tinymce.com/docs/configure/integration-and-setup/
      editorSetting: {
        height: 400
      }
    }
  },
  methods: {
    submit () {
      console.log(this.$refs.edit)
    }
  }
}
</script>

<style scoped>

</style>
