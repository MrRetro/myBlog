<template>
  <div class="container">
    <div class="input-box2">
      <cube-scroll>
        <div class="content">
          <yi-input
            v-if="params.type !=='all'"
            ref="va1"
            v-bind="selQuoted"
            v-model="selQuoted.text"
            :value.sync="selQuoted.value"
            @selClue="onPriceOrder"
          />
          <template v-if="params.type !=='all'" v-for="(item2,index2) in form.inquiryData">
            <div id="inquiry" style="flex:1;transition: all .2s linear;overflow: hidden;" :key="'in'+index2">
              <div class="section-title title-box inquiry-title">
                <p>询价信息</p>
                <!--<yi-touch class="up-box" :class="{more}" @click="handleMore">-->
                  <!--<p>收起</p>-->
                <!--</yi-touch>-->
              </div>
              <template v-for="(item,index) in item2">
                  <yi-input
                    v-if="item.attr!=='group'"
                    class="inputInfo"
                    :key="'inquiry'+index"
                    v-bind="item"
                    v-model="item.text"
                    :title="item.title+'：'"
                    :value.sync="item.value"
                    :indent="false"
                    :disable="true"
                    :direction="true"
                    :rules="{}"
                    @onLink="onlink"
                  />
              </template>
            </div>
          </template>

          <div class="p-more" v-if="params.type !=='all'">
            <yi-touch
              class="show-more"
              component-name="p"
              @click="handleMore"
            >
              {{ more?'收起询价详情':'展开询价详情'}}
              <img v-if="more" class="ico-more" :src="$images.follow.angle_top" alt="img">
              <img v-else class="ico-more" :src="$images.follow.angle_bottom" alt="img">
            </yi-touch>
          </div>

          <template v-for="(item2,index2) in form.data">
            <div class="inputBox" :key="index2">
              <div class="section-title title-box">
                <p>报价内容-{{index2+1}}</p>
                <yi-touch class="del-box" @click="onBtnDel(index2)">
                  <p>删除</p>
                </yi-touch>
              </div>
              <template v-for="(item,index) in item2">
                <div v-if="item.attr === 'customerId'" :key="'index'+index" class="id-box" >
                  <div
                    :key="'index2'+index1"
                    class="in-box"
                    :class="{'self':item1.columnWidth===50}"
                    v-for="(item1,index1) in form.info"
                  >
                    <yi-input
                      ref="info"
                      v-bind="item1"
                      v-model="item1.text"
                      :value.sync="item1.value"
                      :indent="true"
                      :selData="item1.selData || null"
                      :clearMR="item1.columnWidth===50"
                      :disable="true"
                    />
                  </div>
                </div>
                <div
                  v-else-if="item.type==='groupHeader'"
                  class="section-title section-margin-top"
                  :key="'index'+index">
                  {{item.title}}
                </div>
                <div
                  v-else
                  :key="'index'+index"
                  class="in-box"
                  :class="{'self':item.columnWidth===50}"
                >
                  <yi-input
                    :ref="'va'"
                    v-bind="item"
                    v-model="item.text"
                    :value.sync="item.value"
                    :indent="true"
                    :selData="item.selData || null"
                    :clearMR="item.columnWidth===50"
                    @onCarModel="onCarModel"
                    @selClue="selClue"
                  />
                </div>
              </template>
            </div>
          </template>
          <div class="btn-content" v-if="params.type !=='all'">
            <yi-btn-box
              class="btnBox"
              :add="true"
              name="添加报价"
              @onBtnClick="onBtnAddTmp"
            />
          </div>
        </div>
      </cube-scroll>
    </div>
    <yi-btn-box
      v-if="params.type !=='all'"
      :name="btnName"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import {
  getAddInquiryModule,
  getAddQuetedModule,
  addQuotedInfo
} from '../../../../api/inquiry';
  // import {getModelDetail} from '../../../api/carModel';
import {inputType} from '../../../../config/module';
import Page from '../../../../components/Mixins/EditPage';
import {ddApi} from '../../../../api/dingding';
import {validate} from '../../../../config/validate';
import {isEmptyObject} from '../../../../utils/commonUtil';
import {formatDateTime} from '../../../../utils/TimeUtil';
import {getDetail} from '../../../../api/common';
import {RouteUtil} from '../../../../utils/routeUtil';

export default {
  name: 'quotedRecord-add',
  extends: Page,
  created() {
    this.$nextTick(()=>{

      // 路由参数 判断是否为编辑状态或新增状态
      this.params = this.$route.params;
      let params = this.params;
      if (params && params.id) {
        this.id = params.id;
        this.form.type = 'edit';
      } else {
        this.form.type = 'add';
      }
      if (this.form.type === 'add') {
        this.getPage({});
      } else if (this.params.type === 'all') {
        this.getPage({});
      } else {
        // 编辑赋初值
        // getEditInquiryInfo(this.id)
        //   .then((res) => {
        //     this.id = res.id;
        //     this.edit = res;
        //     this.getPage(res);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      }
    });
  },
  activated() {
    ddApi.setRight();
  },
  updated() {
    // 初始化询价信息 高度
    if (!this.inquiryInfoHeight) {
      let div = document.getElementById('inquiry');
      if (div) {
        let height = div.offsetHeight;
        div.style.height = `${height}px`;
        this.inquiryInfoHeight = height;
      }
    }
    // 询价信息 等宽
    let div = document.querySelectorAll('#inquiry .name');
    if (div) {
      let w = div && div[0] && div[0].offsetWidth;
      div && div.forEach((item) => {
        if (item.offsetWidth > w) {
          w = item.offsetWidth;
        }
      });
      div && div.forEach((item) => {
        item.style.width = `${w}px`;
      });
    }
  },
  computed: {
    btnName() {
      let type = this.params.type;
      return type !== 'add' ? '编辑报价记录' : '新建报价记录';
    }
  },
  data() {
    return {
      initData: null,
      clueId: '', // 线索id
      id: '',
      template: null, // 内容模版
      selQuoted: {
        attr: 'selClue',
        type: 'selClue',
        title: '选择报价单',
        text: null,
        value: null,
        placeholder: '请选择报价单',
        indent: true,
        rules: {'required': true},
        required: true,
        line: false,
        params: {type: 'quotedPrice', condition: {isSelect: ['1']}}
      }, // 报价人
      form: {
        type: 'add',
        inquiryData: [], // 询价信息
        data: []
      },
      edit: null,
      more: true, // 展开
      inquiryInfoHeight: 0 // 询价高度
    };
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    onBtnClick() {
      console.log(this.form);
      console.log(this.$refs.va, '==>va');
      const arr = [];

      // 报价单为必填
      arr.push(this.$refs.va1.changeV());

      this.$refs.va.forEach((item)=>{
        if (item.rules && !isEmptyObject(item)) {
          arr.push(item.changeV());
        }
      });
      console.log(arr, '--------');
      Promise.all(arr).then(data => {

        let state = data.every(item => item);
        if (state) {
          console.log(this.form, '校验成功并提交数据');
          // todo
          let arrData = [];
          this.form.data.forEach((item1)=>{
            let items = {};
            item1.forEach((item) => {
              if (item.attr !== 'group') {
                let val = '';
                if (item.value) {
                  val = item.value;
                } else {
                  val = item.value === 0 ? 0 : item.text;
                }
                console.log(val, 'item');

                // 转换外观和内饰格式
                if (item.attr === 'appearance') {
                  val = val && JSON.stringify(val);
                }
                if (item.attr === 'interior') {
                  val = val && JSON.stringify(val);
                }

                // 转换时间格式
                if (item.attr === 'estimateObtainTime' && item.text) {
                  val = formatDateTime(item.text);
                }
                if (item.attr === 'billingTime' && item.text) {
                  val = formatDateTime(item.text);
                }
                if (item.attr === 'productionTime' && item.text) {
                  val = formatDateTime(item.text);
                }

                items[item.attr] = val;
              }
            });

            // 处理参数格式
            items.resourceLocation = this.$ChangeType.xToType(items.resourceLocation, 'number');
            items.quotedPrice = this.$ChangeType.xToType(items.quotedPrice, 'float');
            items.trafficPrice = this.$ChangeType.xToType(items.trafficPrice, 'float');
            items.procedureTracks = this.$ChangeType.xToType(items.procedureTracks, 'number');
            items.deliveryTime = this.$ChangeType.xToType(items.deliveryTime, 'float');
            items.productionTime = this.$ChangeType.xToType(items.productionTime, 'string');
            items.insuranceType = this.$ChangeType.xToType(items.insuranceType, 'number');
            items.invoicePrice = this.$ChangeType.xToType(items.invoicePrice, 'float');
            items.invoiceType = this.$ChangeType.xToType(items.invoiceType, 'number');
            items.resourceAreaCode = this.$ChangeType.xToType(items.resourceAreaCode, 'string');
            items.remarks = this.$ChangeType.xToType(items.remarks, 'string');

            // if (typeof items.resourceLocation !== 'number' && items.resourceLocation) { items.resourceLocation = parseInt(items.resourceLocation); }
            // if (typeof items.quotedPrice !== 'number' && items.quotedPrice) { items.quotedPrice = parseFloat(items.quotedPrice); }
            // if (typeof items.trafficPrice !== 'number' && items.trafficPrice) { items.trafficPrice = parseFloat(items.trafficPrice); }
            // if (typeof items.procedureTracks !== 'number' && items.procedureTracks) { items.procedureTracks = parseInt(items.procedureTracks); }
            // if (typeof items.deliveryTime !== 'number' && items.deliveryTime) { items.deliveryTime = parseFloat(items.deliveryTime); }
            // if (typeof items.productionTime !== 'string' && items.productionTime) { items.productionTime = `${items.productionTime}`; }
            // if (typeof items.insuranceType !== 'number' && items.insuranceType) { items.insuranceType = parseInt(items.insuranceType); }
            // if (typeof items.invoicePrice !== 'number' && items.invoicePrice) { items.invoicePrice = parseFloat(items.invoicePrice); }
            // if (typeof items.invoiceType !== 'number' && items.invoiceType) { items.invoiceType = parseInt(items.invoiceType); }
            // if (typeof items.resourceAreaCode !== 'string' && items.resourceAreaCode) { items.resourceAreaCode = `${items.resourceAreaCode}`; }
            // if (typeof items.remarks !== 'string' && items.remarks) { items.remarks = `${items.remarks}`; }

            arrData.push(items);
          });

          if (arrData.length <= 0) {
            this.$AlertUtil.showToast({txt: '请添加报价', icon: 'warn'});
          } else {
            // todo add and edit
            if (this.form.type === 'add') {
              console.log(this.form.data);
              console.log(arrData, '==>add');
              addQuotedInfo({id: this.id, obj: arrData})
                .then((res) => {
                  console.log(res, '==>success');
                  if (res) {
                    // todo 跳转询价详情
                    this.params.onSuccess && this.params.onSuccess();
                    this.$RouteUtil.commonDetail({module: 'quotedRecords', id: res, BACK_ACTION: this.params.BACK_ACTION});

                  }
                })
                .catch(err => console.log(err));
            } else if (this.form.type === 'edit') {
              // items.id = this.id;
              // editInquiryInfo(items)
              //   .then(res=>console.log(res, 'edit ==> success'))
              //   .catch(err=>console.log(err));

            }
          }
        }

      });
    },
    // 回调 根据询价id进入详情
    onlink(id) {
      // 进入询价详情
      if (id) {
        RouteUtil.commonDetail({module: 'clues', id});
      }
    },
    // 添加报价模版
    onBtnAddTmp() {
      let tmp = this.template && JSON.parse(this.template);
      this.form.data.push(tmp);
    },
    // 询价展开更多
    handleMore() {

      this.more = !this.more;
      let div = document.getElementById('inquiry');
      let p = document.getElementsByClassName('inputInfo');
      let h = p[p.length - 1].offsetHeight;
      let height = div.offsetHeight - (h * 4) + 2;
      div.style.height = `${this.more ? this.inquiryInfoHeight : height}px`;
    },
    // 删除模版
    onBtnDel(index) {
      this.form.data.splice(index, 1);
    },
    // 车信息回调
    onCarModel(obj, initial) {
      console.log(obj, 'data');
      // 设置外观和内饰
      let innerColors = obj.data.innerColors;
      let outerColors = obj.data.outerColors;
      this.form.data.forEach((item, index)=>{
        if (item.attr === 'appearance') {
          if (!initial) {
            this.form.data[index].text = '';
            this.form.data[index].value = null;
          }
          if (outerColors) {
            this.form.data[index].selData = outerColors;
          }
        }
        if (item.attr === 'interior') {
          if (!initial) {
            this.form.data[index].text = '';
            this.form.data[index].value = null;
          }
          if (innerColors) {
            this.form.data[index].selData = innerColors;
          }
        }
      });

      // 初始数据保留
      if (initial) {
        this.initData = JSON.stringify(this.form);
      }
    },
    // 报价单回调
    onPriceOrder(obj) {
      console.log(obj, '==>ooooo');
      // 报价单回调
      this.selQuoted.text = obj.quotedNo || obj.id;
      this.selQuoted.value = obj.id;
      this.id = obj.id;

      // 获取询价信息根据询价/报价id
      getDetail({
        module: 'quotedPrices',
        id: obj.id
      }).then((res)=>{
        console.log(res);
        // console.log(this.form.inquiryData);
        this.form.inquiryData.forEach((item, index)=>{
          item.forEach((item1, index1)=>{
            if (res[item1.attr]) {
              this.form.inquiryData[index][index1].text = res[item1.attr];
              this.form.inquiryData[index][index1].value = res[item1.attr];
            }

            // 线索编号
            if (item1.attr === 'clueNo') {
              this.form.inquiryData[index][index1].text = res.clueNo;
              this.form.inquiryData[index][index1].value = res.clueId;
              this.form.inquiryData[index][index1].link = true;
            }

            // 线索状态
            if (item1.attr === 'clueStatus') {
              this.form.inquiryData[index][index1].text = res.clueStatus.name;
              this.form.inquiryData[index][index1].value = res.clueStatus.code;
            }

            // 线索等级
            if (item1.attr === 'clueLevel') {
              this.form.inquiryData[index][index1].text = res.clueLevel.name;
              this.form.inquiryData[index][index1].value = res.clueLevel.code;
            }

            // 车型信息
            if (item1.attr === 'vehicleModelId') {
              this.form.inquiryData[index][index1].text = res.vehicleModel;
              this.form.inquiryData[index][index1].value = res.vehicleModelId;
            }
            // 外观
            if (item1.attr === 'appearance') {
              this.form.inquiryData[index][index1].text = res.appearance && JSON.parse(res.appearance) && JSON.parse(res.appearance).name;
              this.form.inquiryData[index][index1].value = null;
            }
            // 内饰
            if (item1.attr === 'interior') {
              this.form.inquiryData[index][index1].text = res.interior && JSON.parse(res.interior) && JSON.parse(res.interior).colors[0].name;
              this.form.inquiryData[index][index1].value = res.interior;
            }
            // 指导价
            if (item1.attr === 'guidingPrice') {
              this.form.inquiryData[index][index1].text = res.guidingPrice;
              this.form.inquiryData[index][index1].value = res.guidingPrice;
            }
            // 购车方式
            if (item1.attr === 'shoppingWay') {
              this.form.inquiryData[index][index1].text = res.shoppingWay.name;
              this.form.inquiryData[index][index1].value = res.shoppingWay.code;
            }
            // 客户类型
            if (item1.attr === 'customerType') {
              this.form.inquiryData[index][index1].text = res.customerType.name;
              this.form.inquiryData[index][index1].value = res.customerType.code;
            }
            // 上牌地区
            if (item1.attr === 'areaId') {
              this.form.inquiryData[index][index1].text = res.area;
              this.form.inquiryData[index][index1].value = res.areaId;
            }
            // 预计提车时间
            if (item1.attr === 'estimateObtainTime') {
              this.form.inquiryData[index][index1].text = res.estimateObtainTime;
              this.form.inquiryData[index][index1].value = res.estimateObtainTime;
            }
            // 开票价要求
            if (item1.attr === 'billingDemand') {
              this.form.inquiryData[index][index1].text = res.billingDemand;
              this.form.inquiryData[index][index1].value = res.billingDemand;
            }
            // 开票时间要求
            if (item1.attr === 'billingTime') {
              this.form.inquiryData[index][index1].text = res.billingTime;
              this.form.inquiryData[index][index1].value = res.billingTime;
            }
            // 其他需求
            if (item1.attr === 'demand') {
              this.form.inquiryData[index][index1].type = 'text';
              this.form.inquiryData[index][index1].text = res.demand;
              this.form.inquiryData[index][index1].value = res.demand;
            }
            // 其他备注
            if (item1.attr === 'remarks') {
              this.form.inquiryData[index][index1].type = 'text';
              this.form.inquiryData[index][index1].text = res.remarks;
              this.form.inquiryData[index][index1].value = res.remarks;
            }


          });
        });
      }).catch((err)=>{
        console.log(err);
      });

    },
    // 线索回调
    selClue(obj) {
      console.log(obj, ' 123 ');

      this.form.data.forEach((item, index)=>{

        // 线索等级
        if (item.attr === 'clueLevel') {
          this.form.data[index].text = obj.intentionGrade.name;
          this.form.data[index].value = obj.intentionGrade.code;
        }

        // 车型
        if (item.attr === 'vehicleModelId') {
          this.form.data[index].text = obj.carName;
          this.form.data[index].value = obj.vehicleModelId;
        }
        // 外观
        if (item.attr === 'appearance') {
          let outColor = JSON.parse(obj.appearance);
          this.form.data[index].text = outColor && outColor.name;
          this.form.data[index].value = outColor || null;
        }

        // 内饰
        if (item.attr === 'interior') {
          let innerColor = JSON.parse(obj.interior);
          let name = innerColor && innerColor.colors && innerColor.colors[0].name;
          if (innerColor.colors && innerColor.colors[1]) {
            name += `/${innerColor.colors[1].name}`;
          }
          this.form.data[index].text = name;
          this.form.data[index].value = innerColor || null;
        }

        // 购车方式
        if (item.attr === 'shoppingWay') {
          this.form.data[index].text = obj.shoppingWay.name;
          this.form.data[index].value = obj.shoppingWay.code;
        }
      });

      // obj.vehicleModelId && getModelDetail(obj.vehicleModelId)
      //   .then((res1)=>{
      //     console.log(res1, 'res1');
      //     this.onCarModel({data: res1}, true);
      //   })
      //   .catch((err)=>console.log(err));
    },
    // 获取模版
    getPage(edit) {
      console.log(edit, 'edit----->>>>>');
      // 获取枚举类别
      let form = this.menu;
      let clueAdditionalConfiguration = form.clueAdditionalConfiguration; // 车型信息
      let outerColor = null; // 外观
      let innerColor = null; // 内饰
      let clueIntentionType = form.clueIntentionType; // 意向类型
      let clueLevel = form.clueIntentionType; // 线索等级
      let clueShoppingWay = form.clueShoppingWay; // 购买方式
      let genderData = form.gender; // 性别
      let customerOrigin = form.customerOrigin; // 客户来源
      let customer = form.customerType; // 客户类型
      let resourceLocation = form.resourceLocation; // 车源所在地
      let insuranceType = form.insuranceType; // 保险要求
      let invoiceType = form.invoiceType; // 发票类型

      // 获取询价添加模版
      getAddInquiryModule()
        .then((res)=>{
          console.log(res, '==>module');
          let data = [];
          res.forEach((item) => {
            if (item.code === 'info-inquiry') {
              data = item.fields;
            }
          });
          // 升序
          data.sort((a, b) => a.sort - b.sort);

          let formData = [];
          data.forEach((item)=>{
            let obj = {
              attr: item.attr,
              type: inputType[item.configsObj.type],
              title: item.name,
              text: null,
              value: null,
              placeholder: '无',
              indent: true,
              columnWidth: item.columnWidth,
              selData: {'source': [], 'selectedKey': ''}
            };

            if (item.attr === 'clueId') {
              obj.params = this.params;
            }

            // 线索等级
            if (obj.attr === 'clueLevel') {
              obj.disable = true;
            }

            // 车型
            if (obj.attr === 'vehicleModelId') {
              obj.singleChoose = true;
              obj.disable = true;
            }

            // 外观
            if (obj.attr === 'appearance') {
              obj.disable = true;
            }

            // 内饰
            if (obj.attr === 'interior') {
              obj.disable = true;
            }

            // 指导价
            if (obj.attr === 'guidancePrice') {
              obj.disable = true;
            }

            // 购车方式
            if (obj.attr === 'shoppingWay') {
              obj.disable = true;
            }

            // 其他需求
            if (obj.attr === 'demand') {
              obj.type = 'text';
            }

            // 编辑 数据绑定
            if (edit[obj.attr]) {
              obj.value = edit[obj.attr];
              obj.text = edit[obj.attr];

              console.log(obj.attr, 'attr');

              // 线索关联
              if (obj.attr === 'clueId') {
                obj.text = edit.clueNo;
                obj.value = edit[obj.attr];
              }

              // 线索等级
              if (obj.attr === 'clueLevel') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 车型名称
              if (obj.attr === 'vehicleModelId') {
                obj.text = edit.vehicleModel;
                obj.value = edit[obj.attr];
              }

              // 外观
              if (obj.attr === 'appearance') {
                console.log(edit[obj.attr], 'dddddd');
                obj.text = edit[obj.attr].name; // edit[obj.attr] && JSON.parse(edit[obj.attr]) && JSON.parse(edit[obj.attr]).name;
                obj.value = edit[obj.attr] ? JSON.parse(edit[obj.attr].code) : null; // edit[obj.attr] ? JSON.parse(edit[obj.attr]) : null;
              }

              // 内饰
              if (obj.attr === 'interior') {
                // console.log('-----------------------');
                // console.log(edit[obj.attr]);
                let name = edit[obj.attr] && JSON.parse(edit[obj.attr]).colors && JSON.parse(edit[obj.attr]).colors[0].name;
                if (JSON.parse(edit[obj.attr]).colors && JSON.parse(edit[obj.attr]).colors[1]) {
                  name += `/${JSON.parse(edit[obj.attr]).colors[1].name}`;
                }
                obj.text = name;
                obj.value = edit[obj.attr] ? JSON.parse(edit[obj.attr].code) : null;
              }

              // 指导价

              // 购车方式
              if (obj.attr === 'shoppingWay') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 客户类型
              if (obj.attr === 'customerType') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 上牌地
              if (obj.attr === 'areaId') {
                obj.text = edit.area;
                obj.value = edit[obj.attr];
              }

              // 预计提车时间
              if (obj.attr === 'estimateObtainTime') {
                obj.text = edit[obj.attr];
                obj.value = edit[obj.attr];
              }

              // 开票价要求价格
              if (obj.attr === 'billingDemand') {
                obj.text = edit[obj.attr];
                obj.value = edit[obj.attr];
              }

              // 开票时间要求
              if (obj.attr === 'billingTime') {
                obj.text = edit[obj.attr];
                obj.value = edit[obj.attr];
              }

              // 其他需求
              if (obj.attr === 'demand') {
                obj.text = edit[obj.attr];
                obj.value = edit[obj.attr];
              }

              // 其他备注
              if (obj.attr === 'remarks') {
                obj.text = edit[obj.attr];
                obj.value = edit[obj.attr];
              }

            }

            // 是否必填
            let required = false;
            item.rulesObj && item.rulesObj.forEach((item2)=>{
              if (item2.type === 'required') {
                required = true;
              }
            });

            // 校验规则
            let rules = validate(item);
            if (required) { obj.required = required; }
            if (rules) { obj.rules = rules; }

            // 类别
            switch (item.attr) {
              case 'vehicleModelId':
                obj.selData.source = clueAdditionalConfiguration.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'intentionType':
                obj.selData.source = clueIntentionType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'clueLevel':
                obj.selData.source = clueLevel.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'intentionGrade':
                obj.selData.source = clueIntentionType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'shoppingWay':
                obj.selData.source = clueShoppingWay.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'appearance':
                obj.selData = outerColor;
                break;
              case 'interior':
                obj.selData = innerColor;
                break;
              case 'gender':
                obj.selData.source = genderData.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'origin':
                obj.selData.source = customerOrigin.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'customerType':
                obj.selData.source = customer.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'resourceLocation':
                obj.selData.source = resourceLocation.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'insuranceType':
                obj.selData.source = insuranceType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'invoiceType':
                obj.selData.source = invoiceType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              default:

            }

            formData.push(obj);
          });
          console.log(formData, '==>inquiryData');
          this.form.inquiryData.push(formData);
        })
        .catch((err)=>{ console.log(err, '==============================>err'); });
      // 获取报价添加模版
      getAddQuetedModule()
        .then((res)=>{
          console.log(res, '==>module123');
          let data = [];
          res.forEach((item) => {
            if (item.code === 'create-quoted' && this.form.type === 'add') {
              data = item.fields;
            } else if (item.code === 'edit-quoted' && this.form.type === 'edit') {
              data = item.fields;
            } else if (item.code === 'create-quoted' && this.params.type === 'all') {
              data = item.fields;
            }
          });
          // 升序
          data.sort((a, b) => a.sort - b.sort);

          let formData = [];
          let len = data.length;
          data.forEach((item, index)=>{
            let obj = {
              attr: item.attr,
              type: inputType[item.configsObj.type],
              title: item.name,
              text: null,
              value: null,
              placeholder: item.configsObj.placeholder,
              indent: true,
              columnWidth: item.columnWidth,
              selData: {'source': [],
                'selectedKey': ''
              },
              line: len - 1 !== index
            };

            if (item.attr === 'clueId') {
              obj.params = this.params;
            }

            // 线索等级
            if (obj.attr === 'clueLevel') {
              obj.disable = true;
            }

            // 车型
            if (obj.attr === 'vehicleModelId') {
              obj.singleChoose = true;
              obj.disable = true;
            }

            // 外观
            if (obj.attr === 'appearance') {
              obj.disable = true;
            }

            // 内饰
            if (obj.attr === 'interior') {
              obj.disable = true;
            }

            // 指导价
            if (obj.attr === 'guidancePrice') {
              obj.disable = true;
            }

            // 购车方式
            if (obj.attr === 'shoppingWay') {
              obj.disable = true;
            }

            // 手续时效
            if (obj.attr === 'procedureTracks') {
              obj.unit = '个工作日';
            }

            // 编辑 数据绑定
            if (edit[obj.attr]) {
              obj.value = edit[obj.attr];
              obj.text = edit[obj.attr];

              console.log(obj.attr, 'attr');

              // 线索关联
              if (obj.attr === 'clueId') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 线索等级
              if (obj.attr === 'clueLevel') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 车型名称
              if (obj.attr === 'vehicleModelId') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 外观
              if (obj.attr === 'appearance') {
                console.log(edit[obj.attr], 'dddddd');
                obj.text = edit[obj.attr].name; // edit[obj.attr] && JSON.parse(edit[obj.attr]) && JSON.parse(edit[obj.attr]).name;
                obj.value = edit[obj.attr] ? JSON.parse(edit[obj.attr].code) : null; // edit[obj.attr] ? JSON.parse(edit[obj.attr]) : null;
              }

              // 内饰
              if (obj.attr === 'interior') {
                // console.log('-----------------------');
                // console.log(edit[obj.attr]);
                // let name = edit[obj.attr] && JSON.parse(edit[obj.attr]).colors && JSON.parse(edit[obj.attr]).colors[0].name;
                // if (JSON.parse(edit[obj.attr]).colors && JSON.parse(edit[obj.attr]).colors[1]) {
                //   name += `/${JSON.parse(edit[obj.attr]).colors[1].name}`;
                // }
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr] ? JSON.parse(edit[obj.attr].code) : null;
              }

              // 指导价

              // 购车方式
              if (obj.attr === 'shoppingWay') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 客户类型
              if (obj.attr === 'customerType') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 上牌地
              if (obj.attr === 'areaId') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }

              // 预计提车时间
              if (obj.attr === 'estimateObtainTime') {
                obj.text = edit[obj.attr];
                obj.value = edit[obj.attr];
              }

              // 开票价要求价格
              if (obj.attr === 'billingDemand') {
                obj.text = edit[obj.attr];
                obj.value = edit[obj.attr];
              }

              // 开票时间要求
              if (obj.attr === 'billingTime') {
                obj.text = edit[obj.attr];
                obj.value = edit[obj.attr];
              }

              // 其他需求
              if (obj.attr === 'demand') {
                obj.text = edit[obj.attr];
                obj.value = edit[obj.attr];
              }

            }

            // 是否必填
            let required = false;
            item.rulesObj && item.rulesObj.forEach((item2)=>{
              if (item2.type === 'required') {
                required = true;
              }
            });

            // 校验规则
            let rules = validate(item);
            if (required) { obj.required = required; }
            if (rules) { obj.rules = rules; }

            // 类别
            switch (item.attr) {
              case 'vehicleModelId':
                obj.selData.source = clueAdditionalConfiguration.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'intentionType':
                obj.selData.source = clueIntentionType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'clueLevel':
                obj.selData.source = clueLevel.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'intentionGrade':
                obj.selData.source = clueIntentionType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'shoppingWay':
                obj.selData.source = clueShoppingWay.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'appearance':
                obj.selData = outerColor;
                break;
              case 'interior':
                obj.selData = innerColor;
                break;
              case 'gender':
                obj.selData.source = genderData.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'origin':
                obj.selData.source = customerOrigin.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'customerType':
                obj.selData.source = customer.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'resourceLocation':
                obj.selData.source = resourceLocation.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'insuranceType':
                obj.selData.source = insuranceType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              case 'invoiceType':
                obj.selData.source = invoiceType.map((item1)=>{ return {key: item1.name, value: item1.code}; });
                break;
              default:

            }
            formData.push(obj);
          });
          this.template = JSON.stringify(formData);
          this.form.data.push(formData);

          // 初始数据保留
          this.initData = JSON.stringify(this.form);
        })
        .catch((err)=>{ console.log(err, '==============================>err'); });
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl";
  .container {
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    display flex
    flex-direction column

    .section-title {
      font-size: px2rem(16);
      color: $deepBlack
      text-align left
      margin 0 px2rem(14)
      medium()
    }
    .title-box{
      display flex
      flex-direction row
      align-items center
      justify-content space-between
      background-color #f8f8f8
      font-size px2rem(14)
      color $deepBlack
      padding 0 px2rem(14)
      margin 0
      height px2rem(52)

      &.inquiry-title{
        height px2rem(30)
      }
    }
    .section-margin-top {
      margin-top px2rem(28)
    }
    .input-box2 {
      display flex
      height calc(100% - 50px)
      flex-direction column
      flex 1
      overflow-y auto

      .content{
        display flex
        flex-direction column
        flex-wrap wrap
        .id-box{
          width 100%
          display flex
          flex-direction row
          flex-wrap wrap
        }
        .in-box{
          width 100%
        }
        .self{
          width 48%
        }

      }
      .inputBox{
        flex 1
        border 1px solid $lightGray
        margin 0 px2rem(14)
        border-radius px2rem(4)
        margin-bottom px2rem(16)
      }
    }

    .p-warm {
      width 100%
      background-color #FDFCEA
      height px2rem(28);
      line-height px2rem(28)
      font-size px2rem(12)
      color #EF465B
    }

    .space-box{
      display flex
      width 100%
      height px2rem(78)
    }
    .btnBox{
      justify-content center
    }
    .btn-content{
      display flex
      direction row
      flex 1
      justify-content center
      margin-bottom px2rem(50)
    }
    .btnBox{
      width px2rem(143)
      height px2rem(60)
      background-color initial
    }
    .btnBox >>> .p-name{
      flex initial
      background-color white
      color #348EED
      border 1px solid #348EED
      border-radius px2rem(4)
      width px2rem(143)
      height px2rem(40)
      margin px2rem(10) 0 px2rem(30)
    }
    .del-box{
      font-size px2rem(14)
      border-radius px2rem(4)
      color $darkBlack
      padding px2rem(8)
    }
    .p-more{
      display flex
      flex-direction row
      justify-content center
    }
    .show-more{
      background-color white
      color #348EED
      border-radius px2rem(4)
      margin px2rem(16) 0 px2rem(30)
      height px2rem(20)
      line-height px2rem(20)
      width px2rem(143)
      display flex
      flex-direction row
      justify-content center
      align-items center
    }
    .ico-more {
      width px2rem(10)
      margin-left px2rem(4)
    }
    .up-box{
      color $themeColor
      padding px2rem(8)
      opacity 0
      transition opacity .3s ease-in-out

      &.more{
        opacity 1
      }
    }
  }
</style>
