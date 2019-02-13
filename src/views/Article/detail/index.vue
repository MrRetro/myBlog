<template>
  <div class="retro">
    <h2 id="artID" vl="20" class="h2">两个变量的值如何快速交换~假设要交换的值都为数字 </h2>
    <div class="postmetadata">
      <small>这篇文章发布于 2018-02-26 10:38，阅读 55 次</small>
    </div>
    <p class="link">by
      <a href="#">retro</a> from
      <a href="http://2tro.com/article_detail.aspx?TypeID=2&amp;art=20">http://2tro.com/article_detail.aspx?TypeID=2&amp;art=20</a><br> 本文可全文转载，但需得到原作者书面许可，同时保留原作者和出处，摘要引流则随意。
    </p>
    <!--文章内容-->
    <div class="content-txts">
      <h2><br></h2><h3>方法一</h3><pre>var&nbsp;a&nbsp;=&nbsp;10,&nbsp;b&nbsp;=&nbsp;11,&nbsp;temp;
temp&nbsp;=&nbsp;a;
a&nbsp;=&nbsp;b;
b&nbsp;=&nbsp;temp;</pre><p><br></p><h3>方法二</h3><pre>var&nbsp;a&nbsp;=&nbsp;10,&nbsp;b&nbsp;=&nbsp;11;
a&nbsp;=&nbsp;b&nbsp;-&nbsp;a;
b&nbsp;=&nbsp;b&nbsp;-&nbsp;a;
a&nbsp;=&nbsp;a&nbsp;+&nbsp;b;</pre><p><br></p><h3>方法三</h3><pre>var&nbsp;a&nbsp;=&nbsp;10,&nbsp;b&nbsp;=&nbsp;11;
a&nbsp;=&nbsp;a&nbsp;^&nbsp;b;
b&nbsp;=&nbsp;a&nbsp;^&nbsp;b;
a&nbsp;=&nbsp;a&nbsp;^&nbsp;b;</pre><p><br></p>
    </div>

    <p class="link bottom">本文为原创文章，会经常更新知识点以及修正一些错误，因此转载请保留原出处，方便溯源，避免陈旧错误知识的误导，同时有更好的阅读体验。<br> 本文地址：
      <a href="http://2tro.com/article_detail.aspx?TypeID=2&amp;art=20">http://2tro.com/article_detail.aspx?TypeID=2&amp;art=20</a>
    </p>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  props: {
    type: { type: String, default: 'front' }
  }
})
export default class Detail extends Vue {
}
</script>
<style lang="less" scoped>
.retro{
  float: left;
  position: relative;
  z-index: 1;
  top: 40px;
  width: 100%;
  text-align: left;
  animation: action .5s;
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
