webpackJsonp([10],{"9amP":function(e,t){},Gfol:function(e,t){},Kz1T:function(e,t){},MY8H:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("Dd8w"),i=o.n(r),n=o("lRRR"),a=o("Gtft"),s=o("z7xf"),l=o("OPJW"),c={name:"CommonSearchResult",components:{SearchList:n.a},extends:l.a,data:function(){return{module:this.$route.params.module,type:this.$route.params.type,condition:this.$route.params.condition,key:this.$route.params.key,totalText:""}},methods:{fetchData:function(e){var t=this.params,o=t.type,r=t.module,n=t.key;return e.condition=i()({},e.condition,this.condition),e.condition.key=[n],Object(s.a)(this.module,this.type,"fetchData")(i()({},e,{type:o,module:r}))},onItemClick:function(e){var t=this.params,o=t.type,r=t.module,i=t.choose,n=t.onSuccess,a=t.needBack;if(i)return n&&n(e),void(a&&this.$router.go(-3));Object(s.a)(this.module,this.type,"onItemClick")({id:e.id,module:r,type:o,item:e,instance:this})}},computed:{filterArray:function(){return Object(s.a)(this.module,this.type,"filterArray")}},mounted:function(){this.totalText=Object(s.a)(this.module,this.type,"totalText")},activated:function(){a.a.setTitle({title:"搜索："+this.key}),a.a.setRight()}},u={render:function(){var e=this.$createElement;return(this._self._c||e)("search-list",{attrs:{filterArray:this.filterArray,"fetch-data":this.fetchData,totalText:this.totalText,hideSearchBar:!0},on:{onItemClick:this.onItemClick}})},staticRenderFns:[]},m=o("VU/8")(c,u,!1,null,null,null);t.default=m.exports},PE5V:function(e,t){},"c/v/":function(e,t){},lRRR:function(e,t,o){"use strict";var r=o("Xxa5"),i=o.n(r),n=o("exGp"),a=o.n(n),s=o("1J8U"),l={name:"ClientCell",mixins:[s.a],computed:{labels:function(){var e=[];return e.push(this.item.origin),e.push(this.item.type),"sea"!==this.$route.params.type&&this.item.followUpStatus&&e.push(this.item.followUpStatus),this.item.hasFollow&&e.push({id:"follow",name:"重点客户",support:!0}),e}}},c={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("yi-touch",{staticClass:"cell-contain touch-highlight box-shadow",class:{"box-shadow":e.hasShadow},on:{click:e.handleClick}},[o("div",{staticClass:"cell-item first star-right"},[o("span",{staticClass:"cell-name"},[e._v(e._s(e.item.name||"无"))]),e._v(" "),o("yi-star",{attrs:{disabled:!0,value:e.item.level.code}})],1),e._v(" "),o("div",{staticClass:"cell-item second"},[o("span",[e._v("负责人:"+e._s(e.item.responsible?e.item.responsible.name:"无"))]),e._v(" "),o("span",[e._v("客户编号:"+e._s(e.item.customerNo))])]),e._v(" "),o("div",{staticClass:"cell-item third"},[o("span",[e._v(e._s(e.showTimeText))])]),e._v(" "),o("div",{staticClass:"line"}),e._v(" "),o("div",{staticClass:"cell-label-contain"},[e._l(e.labels,function(t,r){return o("div",{key:r,staticClass:"cell-label",class:{"cell-label-support":t.support}},[e._v("\n      "+e._s(t.name)+"\n    ")])}),e._v(" "),e.item.responsible?e._e():o("yi-touch",{staticClass:"btn",attrs:{type:"highLight","underlay-color":"#307ECF"},on:{click:function(t){e.$emit("obtainClick",{item:e.item,index:e.index})}}},[e._v("\n      捞取\n    ")])],2)])},staticRenderFns:[]};var u=o("VU/8")(l,c,!1,function(e){o("Kz1T")},"data-v-fca8ca7e",null).exports,m=o("6+t6"),d=o("FOjm"),h={name:"EnquiryCell",mixins:[s.a],data:function(){return{module:this.$route.params.module}},computed:{no:function(){switch(this.module){case"enquiryPrices":return this.item.enquiryNo;case"quotedPrices":return this.item.quotedNo;default:return this.item.enquiryNo}},tagColor:function(){switch(this.item.status.code){case 0:return"#FBA839";case 1:return"#7EC685";case 2:case 3:return"#EF465B";default:return"#FBA839"}}}},p={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("yi-touch",{staticClass:"cell-contain touch-highlight box-shadow",class:{"box-shadow":e.hasShadow},on:{click:e.handleClick}},[o("div",{staticClass:"top"},[o("span",{staticClass:"tag",style:{backgroundColor:e.tagColor}},[e._v(e._s(e.item.status.name))]),e._v(" "),o("span",[e._v("归属门店："+e._s(e.item.belongStore||"无"))])]),e._v(" "),o("div",{staticClass:"cell-title"},[e._v(e._s(e.item.vehicleModel||"无"))]),e._v(" "),o("div",{staticClass:"middle"},[o("span",[e._v("归属省份："+e._s(e.item.belongPlace||"无"))]),e._v(" "),o("span",[e._v(e._s(e.no))])]),e._v(" "),o("div",{staticClass:"line"}),e._v(" "),o("div",{staticClass:"bottom"},[o("span",[e._v("询价人："+e._s(e.item.enquiryName||"无"))]),e._v(" "),o("span",[e._v(e._s(e.showTimeText))])])])},staticRenderFns:[]};var f=o("VU/8")(h,p,!1,function(e){o("c/v/")},"data-v-761d4ad3",null).exports,v=o("6JT5"),T={name:"FollowUpRecordCell",mixins:[s.a],computed:{labels:function(){var e=[];return e.push(this.item.way),this.item.isImportant&&e.push({code:this.item.followId,name:this.getTargetText(this.type),support:!0}),e},showCarName:function(){return"clue"===this.type},responiableName:function(){return this.item.operatorName}},methods:{resetShow:function(){this.$refs.more.resetShow()},getTargetText:function(e){switch(e){case"clue":return"重点线索";case"customer":return"重点客户 ";case"agent":return"重点经纪人 ";default:return"重点用户"}}}},C={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("yi-touch",{staticClass:"cell-contain touch-highlight box-shadow",class:{"box-shadow":e.hasShadow},on:{click:e.handleClick}},["customer"!==e.type?o("img",{staticClass:"level-icon",attrs:{src:e.getLevelIcon(e.item.targetLevel?e.item.targetLevel.name:"")}}):e._e(),e._v(" "),o("div",{staticClass:"cell-item first"},[o("span",{staticClass:"cell-name"},[e._v(e._s(e.item.targetName||"无"))]),e._v(" "),"customer"===e.type?o("yi-star",{attrs:{disabled:!0,value:parseInt(e.item.targetLevel.code)}}):e._e()],1),e._v(" "),o("div",{staticClass:"cell-item second"},[o("span",[e._v("执行人:"+e._s(e.responiableName||"无"))]),e._v(" "),e.showCarName?e._e():o("span",[e._v("备注名称:"+e._s(e.item.targetNickname||"无"))])]),e._v(" "),e.showCarName?o("div",{staticClass:"cell-item second ellipsis",staticStyle:{"text-align":"left"}},[o("span",[e._v("车型信息:"+e._s(e.item.carName||"无"))])]):e._e(),e._v(" "),o("div",{staticClass:"mix-column"},[o("div",{staticClass:"cell-label-contain"},e._l(e.labels,function(t,r){return o("div",{key:r,staticClass:"cell-label",class:{"cell-label-support":t.support}},[e._v("\n        "+e._s(t.name)+"\n      ")])})),e._v(" "),o("span",[e._v("跟进时间:"+e._s(e.removeSecond(e.item.executionTime,"yyyy-MM-dd hh:mm")||"无"))])]),e._v(" "),o("div",{staticClass:"line"}),e._v(" "),o("yi-more-text",{ref:"more",staticClass:"content",attrs:{length:39,content:"跟进内容:"+(e.item.record||"无")}})],1)},staticRenderFns:[]};var y=o("VU/8")(T,C,!1,function(e){o("9amP")},"data-v-6ebd0b78",null).exports,_={name:"QuotedRecordCell",mixins:[s.a],data:function(){return{module:this.$route.params.module}},computed:{no:function(){switch(this.module){case"enquiryPrices":return this.item.enquiryNo;case"quotedPrices":return this.item.quotedNo;default:return this.item.enquiryNo}}}},g={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("yi-touch",{staticClass:"cell-contain touch-highlight box-shadow",class:{"box-shadow":e.hasShadow},on:{click:e.handleClick}},[o("div",{staticClass:"cell-title top"},[e._v(e._s(e.item.vehicleModel||"无"))]),e._v(" "),o("div",{staticClass:"middle"},[o("yi-image",{staticClass:"icon",attrs:{src:e.$images.base.ic_eq_price}}),e._v(" "),o("span",[e._v("报价单："+e._s(e.item.quotedNo))])],1),e._v(" "),o("div",{staticClass:"line"}),e._v(" "),o("div",{staticClass:"bottom"},[o("span",[e._v("询价单："+e._s(e.item.enquiryNo))]),e._v(" "),o("span",[e._v(e._s(e.showTimeText))])])])},staticRenderFns:[]};var x=o("VU/8")(_,g,!1,function(e){o("PE5V")},"data-v-5c7f5ae7",null).exports,w=o("zo6m"),b=o("t5DY"),S=o("I9E5"),k={name:"SearchList",components:{FilterList:w.a,ClientCell:u,AgentCell:m.a,ClueCell:d.a,FollowUpRecordCell:y,OrderCell:v.a,EnquiryCell:f,QuotedRecordCell:x},props:{fetchData:Function,hideSearchBar:Boolean,searchText:String,totalText:String,filterArray:Array},data:function(){return{showLoading:!0,module:this.$route.params.module,showError:!0,errorMessage:"",barTop:"0px",totalNumber:0,sort:""}},methods:{refreshData:function(){this.$refs.list.refreshData()},mFetchData:function(e){var t=this;return a()(i.a.mark(function o(){var r;return i.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,t.sort=e.orders&&e.orders[0]&&e.orders[0].name,e.loading=!t.showLoading,o.next=5,t.fetchData(e);case 5:return r=o.sent,t.totalNumber=r.totalElements,o.abrupt("return",r);case 10:throw o.prev=10,o.t0=o.catch(0),o.t0;case 13:case"end":return o.stop()}},o,t,[[0,10]])}))()},onValueChange:function(e){this.$emit("onValueChange",e)},handleSearchClick:function(){this.$emit("searchClick")},handleObtainClick:function(e){var t=this,o=e.item;return a()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.v)({id:o.id,module:t.module});case 2:t.refreshData(),S.a.showToast({txt:"捞取成功",type:"correct"});case 4:case"end":return e.stop()}},e,t)}))()},handleItemClick:function(e,t){console.log(e,t)}}},A={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("FilterList",{ref:"list",attrs:{"fetch-data":e.mFetchData,filterArray:e.filterArray},on:{valueChange:e.onValueChange},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.item,i=t.index;return["customers"===e.module?o("ClientCell",{attrs:{item:r,sort:e.sort,index:i},on:{obtainClick:e.handleObtainClick,onItemClick:function(t){return e.$emit("onItemClick",t)}}}):e._e(),e._v(" "),"agents"===e.module?o("AgentCell",{attrs:{item:r,sort:e.sort,index:i},on:{obtainClick:e.handleObtainClick,onItemClick:function(t){return e.$emit("onItemClick",t)}}}):e._e(),e._v(" "),"clues"===e.module?o("ClueCell",{attrs:{item:r,sort:e.sort},on:{onItemClick:function(t){return e.$emit("onItemClick",t)}}}):e._e(),e._v(" "),"followUpRecords"===e.module?o("FollowUpRecordCell",{attrs:{item:r,sort:e.sort},on:{onItemClick:function(t,o){return e.$emit("onItemClick",t,o)}}}):e._e(),e._v(" "),"order"===e.module?o("OrderCell",{attrs:{item:r,sort:e.sort},on:{onItemClick:function(t){return e.$emit("onItemClick",t)}}}):e._e(),e._v(" "),"enquiryPrices"===e.module?o("EnquiryCell",{attrs:{item:r,sort:e.sort},on:{onItemClick:function(t){return e.$emit("onItemClick",t)}}}):e._e(),e._v(" "),"quotedPrices"===e.module?o("EnquiryCell",{attrs:{item:r,sort:e.sort},on:{onItemClick:function(t){return e.$emit("onItemClick",t)}}}):e._e(),e._v(" "),"quotedRecords"===e.module?o("QuotedRecordCell",{attrs:{item:r,sort:e.sort},on:{onItemClick:function(t){return e.$emit("onItemClick",t)}}}):e._e(),e._v(" "),"delivery"===e.module?o("OrderCell",{attrs:{item:r,sort:e.sort},on:{onItemClick:function(t){return e.$emit("onItemClick",t)}}}):e._e()]}}])},[e.hideSearchBar?e._e():o("div",{attrs:{slot:"header"},slot:"header"},[o("yi-search-bar",{attrs:{text:e.searchText},on:{click:e.handleSearchClick}})],1),e._v(" "),o("div",{attrs:{slot:"header-bottom"},slot:"header-bottom"},[o("div",{staticStyle:{height:"9px","background-color":"#F3F3F3"}}),e._v(" "),o("div",{staticClass:"header-text"},[e._v("共 "),o("span",{staticClass:"header-text-number"},[e._v(e._s(e.totalNumber))]),e._v(" "+e._s(e.totalText))])])])},staticRenderFns:[]};var I=o("VU/8")(k,A,!1,function(e){o("Gfol")},"data-v-167bfbec",null);t.a=I.exports},z7xf:function(e,t,o){"use strict";var r=o("laDb"),i=o("t5DY"),n={rightTitleParams:function(e){return{auth:"wap-crm-clue-add",text:"新建",onSuccess:function(){r.a.clueAdd({BACK_ACTION:{path:e.ROUTE_PATH},onSuccess:function(){e.refreshData()}})}}},chooseTitle:"选择线索",totalText:"条线索",searchText:"搜索姓名/手机/备注名称/线索编号",all:{title:"全部线索",filterArray:["sort","clueIntentionGrade",["clueStatus","clueOrigin","onLineClue","clueStore","groundPromotion","toStoreClue","clueType","lastFollowUpTime","nextFollowUpTime","clueCreateTime","clueObtainTime","clueResponsible","isActivity","clueTeamwork"]]},follow:{rightTitleParams:function(){return{}},title:"重点线索",filterArray:["sort","clueIntentionGrade",["clueStatus","clueOrigin","onLineClue","toStoreClue","clueType","lastFollowUpTime","nextFollowUpTime","clueCreateTime","clueObtainTime","clueResponsible","isActivity","clueTeamwork"]]},sea:{rightTitleParams:function(){return{}},title:"线索公海",filterArray:[["clueOrigin","onLineClue","clueType","isActivity","clueCreateTime"]]},invalid:{rightTitleParams:function(){return{}},title:"无效线索",filterArray:["clueFailSort","clueIntentionGrade",["clueOrigin","onLineClue","toStoreClue","clueType","lastFollowUpTime","clueFailTime","clueCreateTime","clueResponsible","isActivity","clueTeamwork"]]}},a={rightTitleParams:function(e){return{auth:"wap-crm-customer-add",text:"新建",onSuccess:function(){r.a.clientAdd({params:e.params,BACK_ACTION:{path:e.ROUTE_PATH}})}}},chooseTitle:"选择客户",totalText:"名客户",searchText:"搜索姓名/手机/备注名称/客户编号",filterArray:["sort","customerLevel",["customerOrigin","customerType","lastFollowUpTime","nextFollowUpTime","customerCreateTime","customerObtainTime","customerResponsible","customerTeamwork"]],all:{title:"全部客户",filterArray:["sort","customerLevel",["customerOrigin","customerType","lastFollowUpTime","nextFollowUpTime","customerCreateTime","customerObtainTime","customerResponsible","customerTeamwork"]]},follow:{rightTitleParams:function(){return{}},title:"重点客户",filterArray:["sort","customerLevel",["customerOrigin","customerType","lastFollowUpTime","nextFollowUpTime","customerCreateTime","customerObtainTime","customerResponsible","customerTeamwork"]]},sea:{rightTitleParams:function(){return{}},title:"客户公海",filterArray:[["customerOrigin","customerType","customerCreateTime"]]}},s={rightTitleParams:function(e){return{text:"新建",auth:"wap-inquiry-add",onSuccess:function(){r.a.commonInquiry({BACK_ACTION:{path:e.ROUTE_PATH},id:e.userId,module:e.module,params:e.allData,type:"add",onSuccess:function(){console.log("==>inquiry add success"),e.refreshData()}})}}},title:"询价单",onItemClick:function(e){var t=e.id,o=e.module,i=e.type;return r.a.commonDetail({id:t,module:o,type:i})},chooseTitle:"选择询价单",totalText:"条询价单",searchText:"搜索车型名称/订单编号",filterArray:["enquirySort",["enquiryStatus","acceptStatus","isQuoted","clueStatusByEnquriy","clueLevel","store","enquiryCreateTime","enquiryBelongPlaceId","enquiryArea","enquiryUpdateTime","quotedTime","clueShoppingWay"]]},l={rightTitleParams:function(e){return{text:"新建",onSuccess:function(){r.a.commonFollowUp({onSuccess:function(){e.refreshData()}})}}},fetchData:i.m,chooseTitle:"选择跟进记录",totalText:"条记录",searchText:"搜索姓名/手机/备注名称",onItemClick:function(e){return e.cell.resetShow()},customer:{title:"客户跟进记录",searchText:"搜索姓名/手机/备注名称/客户编号",rightTitleParams:function(e){return{text:"新建",onSuccess:function(){r.a.commonFollowUp({module:"customers",onSuccess:function(){e.refreshData()}})}}},filterArray:["customerLevel",["responsible"]]},clue:{title:"线索跟进记录",searchText:"搜索姓名/手机/备注名称/线索编号",rightTitleParams:function(e){return{text:"新建",auth:"wap-crm-clue-followRecord-add",onSuccess:function(){r.a.commonFollowUp({module:"clues",onSuccess:function(){e.refreshData()}})}}},filterArray:["clueIntentionGrade",["responsible"]]},agent:{title:"经纪人跟进记录",auth:"wap-crm-agent-followRecord-add",searchText:"搜索姓名/手机/备注名称/经纪人编号",rightTitleParams:function(e){return{text:"新建",onSuccess:function(){r.a.commonFollowUp({module:"agents",onSuccess:function(){e.refreshData()}})}}},filterArray:["agentLevel",["responsible"]]}},c=o("Dd8w"),u=o.n(c),m=o("Gtft"),d={rightTitleParams:function(e){return{text:"新建",onSuccess:function(){m.a.actionSheet({title:"选择",cancelButton:"取消",otherButtons:["直接创建","选择线索"],onSuccess:function(t){console.log(t,"---");var o=t.buttonIndex||t.value;switch(0===t.buttonIndex&&(o=0),console.log(o,"---"),o){case 0:console.log("直接创建"),r.a.orderAddOne(u()({},e.$route.params,{BACK_ACTION:{path:e.ROUTE_PATH}}));break;case 1:console.log("选取线索"),e.$RouteUtil.searchList({module:"clues",type:"all",needBack:!1,choose:!0,condition:{fastScreening:["1"],status:[1,3]},onSuccess:function(t){r.a.orderAddOne(u()({},e.params,{BACK_ACTION:{path:e.ROUTE_PATH},clueInfo:t}))}})}}})}}},title:"合同",chooseTitle:"选择合同订单",totalText:"条合同订单",searchText:"搜索姓名/手机/备注名称",filterArray:["orderSort",["orderType","orderContractStatus","orderBelongPlaceId","orderBelongStoreId","orderCreateTime","orderResponsible","orderTeamwork"]]},h={rightTitleParams:function(){return{}},title:"报价单",onItemClick:function(e){var t=e.id,o=e.module,i=e.type;return r.a.commonDetail({id:t,module:o,type:i})},chooseTitle:"选择报价单",totalText:"条报价单",searchText:"搜索车型名称/询价人姓名/单据编号",filterArray:["enquirySort",["enquiryStatus","acceptStatus","isQuoted","clueStatusByEnquriy","clueLevel","responsibleArea","store","enquiryCreateTime","enquiryBelongPlaceId","enquiryArea","enquiryUpdateTime","quotedTime","clueShoppingWay"]]},p={rightTitleParams:function(){return{}},title:"报价记录",onItemClick:function(e){var t=e.item,o=e.module,i=e.type;return r.a.offerDetail(u()({},t,{module:o,type:i}))},chooseTitle:"选择报价记录",totalText:"条报价记录",searchText:"搜索车型名称/询价人姓名/报价人姓名",filterArray:["quotedRecordsSort",["acceptStatus","clueStatusByEnquriy","clueLevel","store","enquiryCreateTime","enquiryBelongPlaceId","enquiryArea","enquiryUpdateTime","quotedTime","clueShoppingWay","invoiceType","insuranceType"]]},f={rightTitleParams:function(e){return{text:"新建",onSuccess:function(){m.a.actionSheet({title:"选择",cancelButton:"取消",otherButtons:["直接创建","选择线索"],onSuccess:function(t){console.log(t,"---");var o=t.buttonIndex||t.value;switch(0===t.buttonIndex&&(o=0),console.log(o,"---"),o){case 0:console.log("直接创建"),r.a.orderAddOne(u()({},e.$route.params,{BACK_ACTION:{path:e.ROUTE_PATH}}));break;case 1:console.log("选取线索"),e.$RouteUtil.searchList({module:"clues",type:"all",needBack:!1,choose:!0,condition:{fastScreening:["1"],status:[1,3]},onSuccess:function(t){r.a.orderAddOne(u()({},e.params,{BACK_ACTION:{path:e.ROUTE_PATH},clueInfo:t}))}})}}})}}},title:"交车单",chooseTitle:"选择交车单",totalText:"条交车单",searchText:"搜索姓名/手机/备注名称",filterArray:["orderSort",["orderType","orderContractStatus","orderBelongPlaceId","orderBelongStoreId","orderCreateTime","orderResponsible","orderTeamwork"]]};o.d(t,"a",function(){return v});var v=function(e,t,o){return T[e][t]&&T[e][t][o]||T[e][o]||T[o]},T={fetchData:i.u,onItemClick:function(e){var t=e.id,o=e.module,i=e.type,n=e.instance;return r.a.commonDetail({id:t,module:o,type:i,onSuccess:function(){return n.refreshData()}})},customers:a,agents:{rightTitleParams:function(){return{}},totalText:"名经纪人",searchText:"搜索姓名/手机/备注名称/经纪人编号",chooseTitle:"选择经纪人",all:{title:"全部经纪人",filterArray:["agentSort","agentLevel",["agentFollowUpStatus","onLineAgent","agentType","lastFollowUpTime","nextFollowUpTime","agentObtainTime","agentCreateTime","agentResponsible","agentTeamwork"]]},follow:{title:"重点经纪人",filterArray:["agentSort","agentLevel",["agentFollowUpStatus","onLineAgent","agentType","lastFollowUpTime","nextFollowUpTime","agentObtainTime","agentCreateTime","agentResponsible","agentTeamwork"]]},sea:{title:"经纪人公海",filterArray:[["agentOrigin","onLineAgent","agentType","agentCreateTime"]]}},clues:n,followUpRecords:l,order:d,enquiryPrices:s,quotedPrices:h,quotedRecords:p,delivery:f}}});