webpackJsonp([28],{NoQm:function(t,e){},ftRB:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("OPJW"),a=n("Gtft"),i={name:"error",mixins:[s.a],computed:{message:function(){return this.params.message||"发生错误"},hideBtn:function(){return this.params.hideBtn},btnParams:function(){var t=this;return this.params.btnParams||{title:"重试",click:function(){return t.retry()}}}},methods:{retry:function(){$eventBus.$emit("reInit")}},activated:function(){a.a.setRight()}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-init contain"},[n("img",{staticClass:"icon",attrs:{src:t.$images.error.ic_blank}}),t._v(" "),n("div",{staticClass:"error-text"},[t._v(t._s(t.message))]),t._v(" "),t.hideBtn?t._e():n("yi-touch",{staticClass:"btn",on:{click:t.btnParams.click}},[t._v(t._s(t.btnParams.title)+"\n  ")])],1)},staticRenderFns:[]};var c=n("VU/8")(i,r,!1,function(t){n("NoQm")},"data-v-fb27bcf0",null);e.default=c.exports}});