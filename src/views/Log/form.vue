<template>
    <div class="form-box">
      <div class="title-box">
        <p class="title">标题</p>
        <input class="input" type="text" />
      </div>
      <editor
        class="editor"
        ref="edit"
        :setting="editorSetting"
        @onContent="onContent">

      </editor>
      <p class="btn-sub clear" @click="clear">清 空</p>
      <p class="btn-sub" @click="submit">提 交</p>
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
      content: '',
      // tinymce的配置信息 参考官方文档 https://www.tinymce.com/docs/configure/integration-and-setup/
      editorSetting: {
        height: 600
      }
    }
  },
  methods: {
    submit () {
      console.log(this.content)
    },
    clear () {
      this.$refs.edit.clear()
    },
    onContent (txt) {
      this.content = txt
    }
  }
}
</script>

<style scoped>
  .title-box{
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
  }
  .title{
    font-size: 20px;
    font-weight: bold;
  }
  .input{
    flex: 1;
    margin-left: 12px;
    border-radius: 4px;
    line-height: 32px;
    outline: none;
    padding: 0px 10px;
    border-style: solid;
    border-width: 1px;
    border-color: #a8a8a8;
  }
  .form-box{
    padding: 60px;
  }
  .btn-sub{
    display: inline-block;
    font-size: 16px;
    padding: 10px 30px;
    background-color: #348eed;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    margin-top: 20px;
    transition: opacity .3s linear;
    opacity: 1;
  }
  .btn-sub:hover{
    opacity: .8;
  }
  .btn-sub:active{
    position: relative;
    left:1px;
    top:1px;
  }
  .btn-sub.clear{
    margin-right: 20px;
    background-color: gainsboro;
  }
</style>
