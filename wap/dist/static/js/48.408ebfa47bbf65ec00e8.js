webpackJsonp([48],{aAHi:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("acaT"),s=a("OPJW"),i=a("Gtft"),c={name:"index",extends:s.a,components:{AddSuccess:n.a},mounted:function(){this.params&&(this.name=this.params.name,this.id=this.params.id)},data:function(){return{id:"",name:""}},activated:function(){i.a.setRight()},methods:{canGoBack:function(){return!this.params.BACK_ACTION||(this.$RouteUtil.back(this.params.BACK_ACTION),!1)}}},r={render:function(){var t=this.$createElement;return(this._self._c||t)("AddSuccess",{attrs:{name:this.name,id:this.id}})},staticRenderFns:[]};var d=a("VU/8")(c,r,!1,function(t){a("eZ1n")},"data-v-74291397",null);e.default=d.exports},eZ1n:function(t,e){}});