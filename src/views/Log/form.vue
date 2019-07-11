<template>
    <div class="form-box" :class="{cur:pageShow}">
      <el-form ref="form" :rules="rules" :model="form" label-width="52px">
        <el-form-item label="标题" size="medium" prop="title">
          <el-input ref="title" v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="类型" size="medium" prop="type">
          <el-select style="width: 100%;" v-model="form.type">
            <el-option v-for="(item, i) in options.type" :key="'type' + i" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <editor
        ref="edit"
        v-model="content"
        @on-upload-complete="onEditorUploadComplete" />
      <p class="btn-box">
        <el-button type="info" plain @click="clear">清 空</el-button>
        <el-button type="primary" @click="submit">{{id?'编 辑':'提 交'}}</el-button>
      </p>
    </div>
</template>

<script>
import editor from '../../components/TinyMce/index.vue'
import * as ArticleServer from '../../api/article'
window.tinymce.baseURL = '/static/tinymce' // 需要调用tinymce的组件中得加入这，不然会报错
export default {
  name: 'logForm',
  components: {
    editor
  },
  mounted () {
    let div = document.querySelector('.spinner')
    div && div.classList.remove('hide')

    this.$nextTick(async () => {
      console.log('retro0415', this.$route)
      let id = this.$route.params.id
      this.id = id
      id && ArticleServer.getArticleById({id}).then(res => {
        const detail = res
        this.form.title = detail[0].ArticleName
        this.form.type = detail[0].TypeID
        this.content = decodeURI(detail[0].ArticleContent)
      })
      let fn = setTimeout(() => {
        this.pageShow = true
        let fn2 = setTimeout(() => {
          div && div.classList.add('hide')
          clearTimeout(fn2)
        }, 2000)
        clearTimeout(fn)
      }, 500)
    })
  },
  activated () {
    console.log('retro', this.$route)
  },
  data: function () {
    return {
      pageShow: false,
      id: '', // 如果id存在则编辑,否则新建
      form: {
        title: '',
        type: 1
      },
      content: '',
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      options: {
        type: [
          { label: '前端', value: 1 },
          { label: '学习', value: 2 },
          { label: '日志', value: 3 },
          { label: '娱乐', value: 4 }
        ]
      },
      // tinymce的配置信息 参考官方文档 https://www.tinymce.com/docs/configure/integration-and-setup/
      editorSetting: {
        height: 600
      }
    }
  },
  methods: {
    submit () {
      if (!this.form.title) {
        this.$message.error('请输入标题！')
        this.$refs.title.focus()
        return false
      }
      if (!this.content) {
        this.$message.error('请输入内容！')
        this.$refs.edit.focus()
        return false
      }

      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.id) {
            ArticleServer.editArticle({
              ArticleID: this.id,
              TypeID: this.form.type,
              ArticleName: this.form.title,
              ArticleContent: encodeURI(this.content)
            }).then(res => {
              this.$message.success('编辑成功')
              this.form.title = ''
              this.$router.push({name: 'Main'})
              this.$refs.edit.clear()
            })
          } else {
            ArticleServer.addArticle({
              ArticleName: this.form.title,
              TypeID: this.form.type,
              ArticleContent: encodeURI(this.content)
            }).then(res => {
              this.$message.success('添加成功')
              this.form.title = ''
              this.$router.push({name: 'Main'})
              this.$refs.edit.clear()
            })
          }
        }
      })
    },
    clear () {
      this.$refs.edit.clear()
    },
    onContent (txt) {
      this.content = txt
    },

    onEditorUploadComplete (res) {
      console.log('success==>', res)
      if (res) {
        console.log('上传成功==>', res)
      } else {
        console.log('上传失败==>', res)
      }
    },
    set () {
      this.$refs.richText.setContent('设置内容')
    },
    get () {
      console.log(this.$refs.richText.getContent())
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
    opacity: 0;
    transition: opacity .2s linear;
  }
  .form-box.cur{
    opacity: 1;
  }
  .btn-box{
    margin-top: 20px;
  }
</style>
