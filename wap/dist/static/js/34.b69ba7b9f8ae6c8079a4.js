webpackJsonp([34],{hhto:function(t,e){},"wl/N":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("Xxa5"),a=n.n(r),i=n("Gu7T"),l=n.n(i),s=n("exGp"),u=n.n(s),o=n("//Fk"),c=n.n(o),d=n("mvHQ"),f=n.n(d),v=n("3r8y"),p=n("Gtft"),m=n("kIQj"),h=n("Zqov"),x={name:"arrivalStoreForm",extends:v.a,data:function(){return{initData:null,form:[{title:"车辆详情",form:[{attr:"storageTime",type:"date",title:"车辆入库时间",text:"",placeholder:"请选择车辆入库时间",rules:{required:!0},required:!0,indent:!1},{attr:"stockId",type:"text",title:"车辆入库仓库",rules:{required:!1},required:!1,text:null,value:null,placeholder:"请选择车辆入库仓库",indent:!1},{attr:"storageImg",type:"fileUpload",title:"车辆入库图片",value:null,line:!1,placeholder:"请选择车辆入库图片",rules:{required:!0},required:!0,indent:!1}]},{title:"车辆手续",form:[{attr:"carProcedures",type:"carProcedures",title:"手续详情",line:!1,rules:{required:!0},text:null,required:!0,value:null,placeholder:"请选择手续详情",indent:!1}]}]}},methods:{isEdit:function(){return this.initData!==f()(this.form)},onBtnClick:function(){var t,e=this,n=this.$refs.va.map(function(t){return t.changeV()});c.a.all(n).then((t=u()(a.a.mark(function t(n){var r;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.every(function(t){return t})){t.next=8;break}return r=[],e.form.forEach(function(t){return r.push.apply(r,l()(t.form))}),t.next=6,Object(m.a)(Object(h.c)(r,{deliveryId:e.params.id}));case 6:e.params.onSuccess&&e.params.onSuccess(),e.$router.go(-1);case 8:case"end":return t.stop()}},t,e)})),function(e){return t.apply(this,arguments)}))}},activated:function(){p.a.setRight()}},y={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"input-box2"},[n("cube-scroll",[t._l(t.form,function(e,r){return n("div",{key:r,staticClass:"content"},[n("div",{staticClass:"section-title section-margin-top"},[t._v("\n          "+t._s(e.title)+"\n        ")]),t._v(" "),t._l(e.form,function(e,r){return n("div",{key:"index2"+r,staticClass:"in-box",class:{self:50===e.columnWidth}},[n("yi-input",t._b({ref:"va",refInFor:!0,attrs:{value:e.value,indent:!0,selData:e.selData||null},on:{"update:value":function(n){t.$set(e,"value",n)}},model:{value:e.text,callback:function(n){t.$set(e,"text",n)},expression:"item1.text"}},"yi-input",e,!1))],1)})],2)}),t._v(" "),n("div",{staticClass:"space-box"})],2)],1),t._v(" "),n("yi-btn-box",{attrs:{name:"车辆到店",icon:t.$images.delivery.ic_car},on:{onBtnClick:t.onBtnClick}})],1)},staticRenderFns:[]};var b=n("VU/8")(x,y,!1,function(t){n("hhto")},"data-v-b749d004",null);e.default=b.exports}});