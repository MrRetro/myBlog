<template>
  <div class="retro">
    <h2 id="artID" vl="20" class="h2">{{detail[0].ArticleName}}</h2>
    <div class="postmetadata">
      <small>这篇文章发布于 {{parseDate(detail[0].AddDate)}}，阅读 {{detail[0].ViewCount}} 次</small>
    </div>
    <!--<p class="link">by-->
      <!--<a href="#">retro</a> from-->
      <!--<a href="http://2tro.com/article_detail.aspx?TypeID=2&amp;art=20">http://2tro.com/article_detail.aspx?TypeID=2&amp;art=20</a><br> 本文可全文转载，但需得到原作者书面许可，同时保留原作者和出处，摘要引流则随意。-->
    <!--</p>-->
    <!--文章内容-->
    <div class="content-txts" v-html="decodeURI(detail[0].ArticleContent)"></div>

    <!--<p class="link bottom">本文为原创文章，会经常更新知识点以及修正一些错误，因此转载请保留原出处，方便溯源，避免陈旧错误知识的误导，同时有更好的阅读体验。<br> 本文地址：-->
      <!--<a href="http://2tro.com/article_detail.aspx?TypeID=2&amp;art=20">http://2tro.com/article_detail.aspx?TypeID=2&amp;art=20</a>-->
    <!--</p>-->

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import {Component, Prop} from 'vue-property-decorator'
import * as ArticleServer from '../../../api/article'

@Component
export default class Detail extends Vue {
  @Prop()
  id:any
  @Prop()
  type:any

  detail:any = {}

  // 时间格式转换
  parseDate (date:any) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }
  async created () {
    console.log(this.id)
    this.detail = await ArticleServer.getArticleById({id: this.id})
  }
}
</script>
<style lang="less" scoped>
.retro{
  float: left;
  position: relative;
  z-index: 1;
  top: 10px;
  width: 100%;
  text-align: left;
  animation: action .5s;
  margin-bottom: 60px;
}
@keyframes action
{
  from {opacity: 0; transform: translateX(10px)}
  to {opacity: 1; transform: translateX(0px)}
}
.retro .head{float: left; width: 100%; height: 0.074*1000px;}
.retro .head .p-logo{float: left; margin-top: 0.017*1000px;}
.retro .head .p-logo .sp-txt{float: left; font-size: 0.028*1000px; height: 0.04*1000px; line-height: 0.04*1000px; color: #323232; font-weight: bold; display: inline-block; margin-left: 0.03*1000px;}
.retro .head .p-word{float: right; font-size: 0.012*1000px; line-height: 0.02*1000px; color: #323232; margin-top: 0.05*1000px;}
.postmetadata{clear: both; font-size: 87.5%;}
.postmetadata small{font-size: 100%; color: #777; line-height: 0.036*1000px;}
.link{background: #f5f5f5; background-color: rgba(0, 0, 0, 0.05); border-left: 0.005*1000px solid #ccc; font-size: 0.014*1000px; padding: 0.006*1000px 0.008*1000px; font-family: 'Microsoft JhengHei';}
.link.bottom{margin-bottom: 10px;}
.content-txts{padding: 0.01*1000px 0*1000px;line-height:0.03*1000px;}
pre{padding: 10px;margin: 5px 0;font-size: 13px;background-color: #fff;border: 1px dashed #ccc;color: #00F;white-space: pre-wrap;word-break: break-all;font-family: "Lucida Console", Consolas, Monaco;}
</style>
