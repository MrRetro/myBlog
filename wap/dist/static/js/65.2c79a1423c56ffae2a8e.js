webpackJsonp([65],{LN9T:function(t,s){},Qw5E:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=e("I9E5"),l={name:"ChooseOutColor",mounted:function(){this.$AlertUtil.saveInstance("chooseOutColor",this)},beforeDestroy:function(){this.$AlertUtil.removeInstance("chooseOutColor")},watch:{visible:function(t){var s=this;t||setTimeout(function(){s.visible2=!1},800)}},data:function(){return{initial:!0,isScroll:!0,visible:!0,visible2:!1,selectIndex:0,isOther:!1,colorList:[{name:"摩登灰",hex:"#404040"}],onSuccess:null}},methods:{handleSureClick:function(){this.isScroll?(this.onSuccess&&this.onSuccess({key:this.selectIndex,value:this.colorList[this.selectIndex]}),this.hide()):o.a.showToast({txt:"您点太快了",type:"warn"})},cancel:function(){this.hide()},selectColor:function(t,s){this.selectIndex=s;var e;e=document.querySelectorAll(".ul-box .li")[0].clientHeight*s*-1,this.$refs.scroll.scrollTo(0,e,1e3),console.log(this.selectIndex)},show:function(t){var s=this,e=t.selKey,l=t.colorList,i=t.onSuccess,c=t.isOther;if(l&&l!==[]||c){if(this.visible=!0,this.visible2=!0,this.colorList=l,this.onSuccess=i,c){"object"===this.colorList||this.colorList||(this.colorList=[]);var n=!0;this.colorList.forEach(function(t){"其他颜色"===t.name&&(n=!1)}),n&&this.colorList.push({name:"其他颜色",hex:""})}var r=setTimeout(function(){var t=document.querySelectorAll(".outBox .list-box"),o=document.querySelectorAll(".outBox .ul-box"),l=document.querySelectorAll(".outBox .ul-box .li"),i=document.querySelectorAll(".outBox .top"),c=document.querySelectorAll(".outBox .line.bottom"),n=l[0].clientHeight;t[0].style.height=4*n+"px",o[0].style.paddingTop=n+"px",o[0].style.paddingBottom=2*n+10+"px",i[0].style.top=n+"px",c[0].style.top=2*n+"px",e&&s.colorList[e]&&s.selNowItem(e),-1===e&&s.colorList[s.colorList.length-1]&&s.selNowItem(s.colorList.length-1),console.log(s.selectIndex,"10"),clearTimeout(r)},200)}else o.a.showToast({txt:"无颜色可选",type:"warn"})},hide:function(){this.onSuccess=null,this.visible=!1},scroll:function(){this.isScroll=!1},beforeScroll:function(t){console.log(t,"beforeScroll")},scrollEnd:function(t){console.log("end");var s=0,e=document.querySelectorAll(".ul-box .li")[0].clientHeight,o=-100;o=(s=parseInt(t.y/e))*e,Math.abs(t.y)-Math.abs(o)>e/2&&(s-=1,o=parseInt(s)*e),this.selectIndex=Math.abs(s),console.log(this.selectIndex),t.y%e!=0&&this.$refs.scroll.scrollTo(0,o,10),this.isScroll=!0},selNowItem:function(t){if(this.colorList[t]){var s=t*document.querySelectorAll(".ul-box .li")[0].clientHeight*-1;this.$refs.scroll.scrollTo(0,s,0),console.log(t,"initail"),this.selectIndex=t,console.log(this.selectIndex)}}}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{directives:[{name:"show",rawName:"v-show",value:t.visible2,expression:"visible2"}],staticClass:"color-box outBox",class:{show:t.visible,hide:!t.visible},on:{click:t.hide}},[e("div",{staticClass:"content",on:{click:function(t){t.stopPropagation()}}},[e("p",{staticClass:"p-btns"},[e("yi-touch",{staticClass:"left",attrs:{"component-name":"span"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),e("yi-touch",{staticClass:"right",attrs:{"component-name":"span"},on:{click:t.handleSureClick}},[t._v("确认")])],1),t._v(" "),e("div",{staticClass:"list-box"},[e("span",{staticClass:"line top"}),t._v(" "),e("span",{staticClass:"line bottom"}),t._v(" "),t.visible2?e("cube-scroll",{ref:"scroll",staticClass:"list-scroll",attrs:{"scroll-events":["scroll","before-scroll-start","scroll-end"]},on:{scroll:t.scroll,"scroll-end":t.scrollEnd}},[e("ul",{staticClass:"ul-box"},t._l(t.colorList,function(s,o){return e("yi-touch",{key:o,staticClass:"li",class:{over:t.selectIndex===o},attrs:{"component-name":"li"},on:{click:function(e){t.selectColor(s,o)}}},[e("p",{staticClass:"p-box"},[e("yi-out-color",{attrs:{colors:s}}),t._v(" "),e("span",{staticClass:"name"},[t._v(t._s(s.name))])],1)])}))]):t._e()],1)])])},staticRenderFns:[]};var c=e("VU/8")(l,i,!1,function(t){e("LN9T")},"data-v-2f823f8c",null);s.default=c.exports}});