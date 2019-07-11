<template>
  <div>

    <div
      v-if="!hide"
      class="input-box"
      :class="{
    'line':line,
    'lineTop': lineTop,
    'select':type==='select' && !disable,
    'focus': focus2 || focusValue,
    'indent': indent,
    'clearMR': clearMR,
    'row': direction,
    'link': link,
    'warnInfo': warnInfo
    }"
      @click.stop.capture="onInputClick"
    >
      <p class="name">
        <span v-if="indent" class="req">{{required?'*':null}}</span>
        <span class="title" @click.stop="onInputClick" >{{ title }}</span>
        <span class="warn" v-if="!disable">
        <cube-validator ref="vali" :model="validate" :rules="rules"/>
      </span>
      </p>

      <p v-if="type=='text'" class="input">
        <input
          ref="text"
          type="text"
          :class="{'disable':disable}"
          :placeholder="placeholder"
          :value="text"
          :readonly="disable"
          @input="onTextAndValue"
          @focus="inputFocus"
          @blur="inputBlur"
        />
        <span
          v-if="unit"
          class="unit"
          :class="{'disable':disable}"
        >
        {{unit}}
      </span>
      </p>
      <p v-else-if="type=='order'" class="input clearIndent">
        <span class="rdNum">{{text}}</span>
        <input
          ref="order"
          type="text"
          :class="{'disable':disable}"
          :placeholder="placeholder"
          :value="value"
          :readonly="disable"
          @input="$emit('update:value', $event.target.value)"
          @focus="inputFocus"
          @blur="inputBlur"
        />
      </p>
      <div v-else-if="type=='batch'" class="input batch">
        <cube-checkbox :value="text.cks">
          {{ text.key }}
        </cube-checkbox>
        <p class="p-vl-box">
          <input
            ref="text"
            type="text"
            :class="{'disable':disable}"
            :placeholder="placeholder"
            :value="text"
            :readonly="disable"
            @input="$emit('input', $event.target.value)"
            @focus="inputFocus"
            @blur="inputBlur"
          />
        </p>
      </div>
      <div v-else-if="type=='money'" class="input clearIndent">
      <span
        class="sp-mark"
        :class="{'disable':disable}"
      >¥</span>
        <input
          ref="money"
          type="text"
          :class="{'disable':disable}"
          pattern="[1-9\.]*"
          :placeholder="placeholder"
          :value="text"
          :readonly="disable"
          @input="onTextAndValue"
          @focus="inputFocus"
          @blur="inputBlur"
        />
        <div v-if="detail" class="detail-contain">
          <span v-for="(d,i) in detail" :key="i">{{d.title}}：
            <span :style="{color:d.color || '#348EED',fontWeight:500}">{{d.value}}</span>
          </span>
        </div>
      </div>
      <p v-else-if="type=='tel'" class="input">
        <input
          ref="tel"
          type="text"
          :class="{'disable':disable}"
          :placeholder="placeholder"
          :value="text"
          :readonly="disable"
          @input="onTextAndValue"
          @focus="inputFocus"
          @blur="inputBlur"
        />
        <img @click="selContact" class="tel" :src="$images.all.ico_tel" alt="ico"/>
      </p>
      <p v-else-if="type=='sel'" class="input">
        <input
          ref="sel"
          type="text"
          :class="{'disable':disable}"
          :placeholder="placeholder"
          :value="text"
          readonly
          @input="$emit('input', $event.target.value)"
          @focus="inputFocus"
          @blur="inputBlur"
        />
        <img class="sel" :src="$images.all.ico_file" alt="ico"/>
      </p>
      <div
        v-else-if="type=='textarea'"
        id="area1"
        class="input"
      >
        <!--<div-->
        <!--ref="area"-->
        <!--class="area-box area"-->
        <!--:class="!indent?'indent':null"-->
        <!--&gt;-->
        <!--{{text}}-->
        <!--</div>-->
        <textarea
          ref="area"
          class="area-box area"
          :class="{'disable':disable, 'indent':!indent}"
          :value="text"
          :readonly="disable"
          :placeholder="placeholder"
          @input="onTextAndValue"
          @focus="inputFocus"
          @blur="inputBlur"
        ></textarea>
        <textarea
          ref="area1"
          class="area-box main area1"
          :value="text"
          @input="$emit('input', $event.target.value)"
        ></textarea>
      </div>
      <!--车型库选择框-->
      <p v-else-if="type=='carModel'" class="input">
        <span v-if="name" class="sp-name"
              @click.stop="onInputClick">{{ name }}</span>
        <input
          :ref="type"
          class="clearPR"
          :class="{'ellipsis':true,'disable':disable}"
          type="text"
          :placeholder="placeholder"
          :value="text"
          readonly
          @input="$emit('input', $event.target.value)"
          @blur="inputBlur"
          @click.stop="onInputClick"
        />
        <img v-if="!disable" class="angle-right" :src="$images.base.ic_next_grey" alt="ico"/>
      </p>
      <p v-else-if="type=='grade'" class="input">
        <yi-star
          class="rate"
          :value="text"
          @input="input"
        ></yi-star>
      </p>
      <div v-else-if="type=='check'" class="input wrap">
        <div class="p-cks">
          <span class="name1">{{ text.title1 }}:</span>
          <cube-checkbox-group :value="text.checkList1" :options="text.options1"/>
        </div>
        <div v-if="text.title2" class="p-cks">
          <span class="name1">{{ text.title2 }}:</span>
          <cube-checkbox-group :value="text.checkList2" :options="text.options2"/>
        </div>
      </div>
      <p v-else-if="type=='message'" class="input">
        <input
          :ref="type"
          type="text"
          :class="{'disable':disable}"
          :placeholder="placeholder"
          :value="text"
          @input="$emit('input', $event.target.value)"
          @focus="inputFocus"
          @blur="inputBlur"
        />

        <span v-if="time >= 60" @click.once="getMessage" class="sp-message">获取验证码</span>
        <span v-else class="sp-message-ot">获取验证码({{ time }}s)</span>
      </p>
      <!--下拉内饰颜色选择框-->
      <div v-else-if="type=='innerColor'" class="input clearIndent">
        <span v-if="name" class="sp-name"
              @click.stop="onInputClick">{{ name }}</span>
        <p class="p-color-box">
          <yi-inner-color
            :colors="vl"
          />
          <input
            :ref="type"
            type="text"
            class="clearPR"
            :class="{'ellipsis':true,'disable':disable}"
            :placeholder="placeholder"
            :value="text"
            readonly
            @input="$emit('input', $event.target.value)"
            @focus="inputFocus"
            @blur="inputBlur"
            @click.stop="onInputClick"
          />
          <img :class="{'disable':disable}" class="angle-right" :src="$images.base.ic_next_grey" alt="ico"/>
        </p>
      </div>
      <!--下拉外观颜色选择框-->
      <div v-else-if="type=='outColor'" class="input clearIndent">
        <span v-if="name" class="sp-name"
              @click.stop="onInputClick">{{ name }}</span>
        <p class="p-color-box">
          <yi-out-color
            :colors="vl"
          />
          <input
            :ref="type"
            type="text"
            class="clearPR"
            :class="{'ellipsis':true,'disable':disable}"
            :placeholder="placeholder"
            :value="text"
            readonly
            @input="$emit('input', $event.target.value)"
            @focus="inputFocus"
            @blur="inputBlur"
            @click.stop="onInputClick"
          />
          <img :class="{'disable':disable}" class="angle-right" :src="$images.base.ic_next_grey" alt="ico"/>
        </p>
      </div>
      <!--文件选择-->
      <div v-else-if="type=='fileUpload'" ref="fileUpload" class="input clearIndent upload">
        <span v-if="name" class="sp-name">{{ name }}</span>
        <yi-upload-img
          v-model="vl"
          :bottomLine="false"
          @onImgsSuccess="onImgsSuccess"
        />
      </div>
      <!--价格区间-->
      <div v-else-if="type=='range'" class="input">
        <span v-if="name" class="sp-name">{{ name }}</span>
        <yi-price-range
          :ref="type"
          v-model="vl"
        />
      </div>
      <!--开关-->
      <div v-else-if="type=='switch'" class="input">
        <span v-if="name" class="sp-name">{{ name }}</span>
        <yi-switch
          :ref="type"
          :disabled="disable"
          v-model="vl"
        />
      </div>
      <!--手续详情-->
      <div v-else-if="type=='carProcedures'" class="input">
        <span v-if="name" class="sp-name">{{ name }}</span>
        <car-procedures
          :ref="type"
          v-model="vl"
        />
      </div>
      <!--下拉选择框-->
      <p v-else class="input">
        <span v-if="name" class="sp-name" @click.stop="onInputClick">{{ name }}</span>
        <input
          :ref="type"
          type="text"
          :class="{'disable':disable}"
          :placeholder="placeholder"
          readonly
          :value="txt || newText"
          @input="$emit('input', $event.target.value)"
          @focus="inputFocus"
          @blur="inputBlur"
          @click.stop="onInputClick"
        />
        <img v-if="!disable" class="angle-right" :src="$images.base.ic_next_grey" alt="ico"/>
      </p>
      <p v-if="warnInfo" class="warn">{{warnInfo}}</p>
    </div>
    <div v-if="hint" class="hint">{{hint}}</div>
  </div>
</template>

<script>
import Numeral from 'numeral';
import {ddApi} from '../../api/dingding';
import {AlertUtil} from '../../utils/AlertUtil';
import CarProcedures from './components/CarProcedures';

export default {
  name: 'InputBox',
  model: {
    prop: 'text'
  },
  components: {
    CarProcedures
  },
  props: {
    attr: {
      type: String
    },
    rules: {
      type: Object
    },
    type: {
      type: String
    },
    text: {
      type: [Object, String, Number, Array, Boolean],
      default: ''
    },
    value: {
      type: [Object, String, Number, Array, Boolean],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String
    },
    min: {
      type: [Object, Date, Number]
    },
    max: {
      type: [Object, Date, Number]
    },
    focus2: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: [Boolean, String],
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    line: {
      type: Boolean,
      default: true
    },
    lineTop: {
      type: Boolean,
      default: false
    },
    indent: {
      type: Boolean,
      default: true
    },
    selData: {
      type: [Object, Array]
    },
    onClick: {
      type: Function
    },
    clearMR: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object
    },
    singleChoose: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: ''
    },
    direction: {
      type: Boolean,
      default: false
    },
    // 是否有链接
    link: {
      type: Boolean,
      default: false
    },
    // 警告提示
    warnInfo: {
      type: String,
      default: ''
    },
    // 是否隐藏
    hide: {
      type: Boolean,
      default: false
    },
    // 颜色选择是否包含其他
    isOther: {
      type: Boolean,
      default: false
    },
    // 车型id
    carId: {
      type: String,
      default: ''
    },
    addressType: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String
    },
    detail: {
      type: [Object, Array]
    }
  },
  watch: {
    value(val) {
      this.vl = val;

      // 处理textarea自适应高度
      this.textareaAuto();
    },
    vl(val) {
      // 设置监听，如果改变就更新 text
      //   console.log(val, new Date());
      this.$emit('update:value', val);
    },
    slData(val) {
      // // 设置监听，如果改变就更新 selData
      this.$emit('update:selData', val);
    },
    text(val) {
      this.txt = val;
    },
    txt(val) {
      this.$emit('input', val);
    }
  },
  mounted() {
    // 处理textarea自适应高度
    this.textareaAuto();
    if (this.type === 'switch') this.$emit('update:value', Boolean(this.value));
  },
  computed: {
    // 验证字段
    validate() {
      let vi = this.text;
      if (
        this.type === 'fileUpload' ||
          this.type === 'money' || this.type === 'carProcedures'
      ) {
        vi = this.value;
      }
      if (vi === '无') {
        vi = false;
      }
      if (this.type === 'switch') return true;
      return vi;
    },
    // 下拉选择的值
    newText() {
      let txt = this.txt;
      // 当下拉列表只有一组数据是，就选择这组数据
      console.log('<<===', this.selData);
      try {
        if (this.selData.source.length === 1) {
          txt = this.selData.source[0].key;
          if (!this.vl && !this.txt) {
            this.setText(txt);
            this.setVal(this.selData.source[0].value);
          }
        }
      } catch (e) {
        console.log('err', e);
      }
      return txt;
    }
  },
  data() {
    return {
      txt: this.text,
      vl: this.type === 'switch' ? Boolean(this.value) : this.value,
      slData: this.selData,
      focusValue: false,
      time: 60, // 倒计时时间
      colors: null, // 颜色选择
      selInnerKey: 0,
      selOutKey: 0
    };
  },
  methods: {
    // 处理textarea自适应高度
    textareaAuto() {
      if (this.$refs.area1 && this.$refs.area1.scrollHeight) {
        let height = this.$refs.area1.scrollHeight > 20 ? this.$refs.area1.scrollHeight + 20 : 40;
        this.$refs.area.style.height = `${height}px`;
      }
    },
    onTextAndValue(vl) {
      this.$emit('input', vl.target.value);
      this.vl = vl.target.value;
    },
    input(vl) {
      console.log(vl);
      this.$emit('input', vl);
      this.vl = vl;
    },
    hanldleInputValue(vl) {
      console.log(vl);
      this.$emit('onInput', vl.target.value);
    },
    // 校验
    changeV() {
      // 不可变价全部通过
      if (this.disable) return Promise.resolve(true);
      if (this.type === 'switch') return Promise.resolve(true);
      return this.$refs.vali.validate();
    },
    // 输入框获取焦距
    inputFocus(e) {
      // 处理安卓键盘遮挡问题
      this.inputFocusAndroid();
      console.log('111');
      // 处理安卓键盘被遮挡问题
      this.inputFocusAndroid();
      if (!this.disable) {
        this.focusValue = true;
      }
      console.log(e, '222');

      // 判断如果金额为0 0.00 清空
      if (this.type === 'money' &&
          (this.value === 0 ||
            this.value === 0.00 ||
            this.value === '0' ||
            this.value === '0.00')) {
        this.setText('');
        this.setVal('');
      }

    },
    // 处理安卓键盘被遮挡问题
    inputFocusAndroid() {
      if (/Android [4-6]/.test(navigator.appVersion)) {
        window.addEventListener('resize', () => {
          if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            window.setTimeout(() => {
              document.activeElement.scrollIntoViewIfNeeded();
            }, 0);
          }
        });
      }
    },
    // 输入框焦点离开
    inputBlur() {
      this.focusValue = false;

      // 金额转换
      if (this.type === 'money' && this.txt) {
        this.txt = Numeral(this.txt).format('0,0.00');
        this.vl = Numeral(this.txt).format('0.00');
      }
      this.$emit('onChangeMoney', {type: this.attr});

      // 判断如果金额为空 焦点离开默认为0
      if (this.type === 'money' && (this.value === '' || !this.value)) {
        this.setText(0);
        this.setVal(0);
      }
    },
    // 请空数据事件
    onClearValue() {
      this.text = '';
    },
    // 选项被点击回调
    async onInputClick() {
      // alert(this.type)
      if (this.link) {
        this.$emit('onLink', this.vl);
      }
      if (this.type === 'text' && !this.disable) {
        this.$refs.text.focus();
        console.log('text');
        return;
      }
      if (this.type === 'range' && !this.disable) {
        console.log('range');
        return;
      }
      if (this.type === 'label' && !this.disable) {
        // this.$refs.label.focus();
        console.log('label');
        console.log(this.text);
        console.log(this.value);
        console.log(this.selData);
        dd && ddApi.multiSelect({
          options: this.selData.source.map(item2 => item2.value) || [],
          selectOption: this.value,
          onSuccess: (result) => {
            let list = [];
            result = result || [];
            result.forEach((item) => {
              list.push(this.selData.source.map(item2 => item2.value)[item]);
            });
            this.$emit('onLabelSuccess', list);
          },
          onFail: (err) => {
            console.log(err, 'err');
          }
        });
        return;
      }
      if (this.type === 'order' && !this.disable) {
        this.$refs.order.focus();
        console.log('order');
        return;
      }
      if (this.type === 'batch' && !this.disable) {
        console.log('batch');
        return;
      }
      if (this.type === 'money' && !this.disable) {
        this.$refs.money.focus();
        console.log('money');
        return;
      }
      if (this.type === 'grade' && !this.disable) {
        console.log('grade');
        return;
      }
      if (this.type === 'textarea' && !this.disable) {
        this.textareaAuto();
        this.$refs.area.focus();
        console.log('textarea');
        window.addEventListener('resize', () => {
          let h = `${window.screen.availHeight - window.innerHeight}px`;
          document.body.style.height = h;
        });
        return;
      }
      if (this.type === 'contact' && !this.disable) {
        this.$refs.contact.focus();
        console.log('contact');
        this.selContactId();
        return;
      }
      if (this.type === 'employeeSelectWithDccAndSales' && !this.disable) {
        this.$refs.employeeSelectWithDccAndSales.focus();
        this.selEmployeeSelectWithDccAndSales();
        return;
      }
      if (this.type === 'fileUpload' && !this.disable) {
        this.$refs.fileUpload.focus();
        console.log('fileUpload');
        // this.$RouteUtil.orderContactUpload({
        //   onSuccess: (item)=>{
        //     console.log(item, '--11--');
        //   }
        // });
        return;
      }
      if (this.type === 'carModel' && !this.disable) {
        // this.$refs.carModel.focus();
        console.log('carModel');
        this.$RouteUtil.carModel({
          singleChoose: this.singleChoose,
          onSuccess: (item) => {
            console.log(item, '--22--');
            let text = item.type === 'dim' ? '模糊意向' : item.data.name;
            this.vl = item.data.id;
            this.txt = text;
            this.$emit('onCarModel', item);
          }
        });
        return;
      }
      if (this.type === 'color' && !this.disable) {
        this.$refs.color.focus();
        console.log('chooseColor');
        console.log(this.selData);
        this.$AlertUtil.show('chooseColor', {
          ...this.selData,
          // selKey: 2,
          // colorList: [
          //   {
          //     name: '批次黑色',
          //     colors: {size: 1, color: ['#fff', '#eedcdc']}
          //   }
          // ],
          onSuccess: (data) => {
            console.log(data);
            this.$emit('input', data.value.name);
            this.vl = data.value;
            console.log(data.value);
            this.$refs.color2 && this.$refs.color2.setColor(data.value.colors);
          }
        });
        return;
      }
      if (this.type === 'innerColor' && !this.disable) {
        this.$refs.innerColor.focus();
        console.log('innerColor');
        console.log(this.selData, 'selData');
        this.$AlertUtil.show('chooseInnerColor', {
          selKey: this.selInnerKey,
          colorList: this.selData,
          isOther: this.isOther,
          onSuccess: (data) => {
            if (data.value.colors[0].name === '其他颜色') {
              this.$RouteUtil.colorSelect1({
                carId: this.carId,
                singleChoose: false,
                onSuccess: (item) => {
                  this.selInnerKey = item.key;
                  let name = item.value.colors[0].name;
                  if (item.value.colors[1]) {
                    name += `/${item.value.colors[1].name}`;
                  }
                  this.$emit('input', name);
                  this.vl = item.value;
                }
              });
            } else {
              this.selInnerKey = data.key;
              let name = data.value.colors[0].name;
              if (data.value.colors[1]) {
                name += `/${data.value.colors[1].name}`;
              }
              this.$emit('input', name);
              this.vl = data.value;
            }
          }
        });
        return;
      }
      if (this.type === 'outColor' && !this.disable) {
        this.$refs.outColor.focus();
        console.log('outColor');
        console.log(this.selData, 'selData');
        this.$AlertUtil.show('chooseOutColor', {
          selKey: this.selOutKey,
          colorList: this.selData,
          isOther: this.isOther,
          onSuccess: (data) => {
            console.log(data);
            if (data.value.name === '其他颜色') {
              this.$RouteUtil.colorSelect2({
                carId: this.carId,
                singleChoose: true,
                onSuccess: (item) => {
                  this.selOutKey = item.key;
                  this.$emit('input', item.value.name);
                  this.vl = item.value;
                }
              });
            } else {
              this.selOutKey = data.key;
              this.$emit('input', data.value.name);
              this.vl = data.value;
            }
          }
        });
        return;
      }
      // 选择客户 / 选择线索 / 选择经纪人
      if (this.type === 'selClue' && !this.disable) {
        this.$refs.selClue.focus();
        console.log('selClue');
        console.log(this.selData);
        console.log(this.params);
        this.$RouteUtil.searchList({
          module: `${this.params.type}s`,
          type: 'all',
          choose: true,
          condition: this.params.condition,
          onSuccess: (data) => {
            console.log('线索选择成功', data);
            this.$emit('input', data.clueNo || data.quotedNo);
            this.vl = data.id;
            this.$emit('selClue', data);
          }
        });
        return;
      }
      // 选择线索 通过所有线索列表
      if (this.type === 'selClueOfAll' && !this.disable) {
        // this.$refs.selClue.focus();
        this.$RouteUtil.searchList({
          module: 'clues',
          type: 'all',
          choose: true,
          onSuccess: (data) => {
            console.log('线索选择成功', data);
            this.$emit('input', data.clueNo);
            this.vl = data.id;
            this.$emit('selClue', data);
          }
        });
        return;
      }
      if (this.type === 'selClueByClueUser' && !this.disable) {
        // this.$refs.selClueByUser.focus();
        console.log('selClueByUser');
        // console.log(this.selData);
        // console.log(this.params);
        this.$RouteUtil.clueList({
          module: 'clues',
          id: this.params.id,
          type: 'choose',
          choose: true,
          onSuccess: (data) => {
            console.log('线索选择成功', data);
            this.$emit('input', data.customerName);
            this.vl = data.id;
            this.$emit('selClue', data);
          }
        });
        return;
      }
      if (this.type === 'selClueByUser' && !this.disable) {
        this.$refs.selClueByUser.focus();
        console.log('selClueByUser');
        // console.log(this.selData);
        // console.log(this.params);
        this.$RouteUtil.clueList({
          module: 'customers',
          id: this.vl,
          type: 'choose',
          choose: true,
          onSuccess: (data) => {
            console.log('线索选择成功', data);
            this.$emit('input', data.customerName);
            this.vl = data.id;
            this.$emit('selClue', data);
          }
        });
        return;
      }

      if (this.type === 'selCustomer' && !this.disable) {
        this.$refs[this.type].focus();
        this.$RouteUtil.searchList({
          module: 'customers',
          type: 'all',
          choose: true,
          onSuccess: (data) => {
            console.log('客户选择成功', data);
            this.$emit('input', data.name);
            this.vl = data.id;
          }
        });
        return;
      }
      if (this.type === 'selAgent' && !this.disable) {
        this.$refs[this.type].focus();
        this.$RouteUtil.searchList({
          module: 'agents',
          type: 'all',
          choose: true,
          onSuccess: (data) => {
            console.log('经纪人选择成功', data);
            this.$emit('input', data.name);
            this.vl = data.id;
          }
        });
        return;
      }
      if (this.type === 'date' && !this.disable) {
        this.$refs.date.focus();
        console.log('date');
        // 选择date
        this.datePicker = ddApi.datepicker({
          min: this.min,
          max: this.max,
          onSuccess: (data) => {
            console.log(data);
            this.$emit('input', data.value);
            this.vl = data.value;
          }
        });
        return;
      }
      if (this.type === 'check' && !this.disable) {
        console.log('check');
        return;
      }
      if (this.type === 'click' && !this.disable) {
        this.onClick && this.onClick();
        return;
      }
      if (this.type === 'address' && !this.disable) {
        this.$refs.address.focus();
        console.log('address');
        this.adressPicker = ddApi.getAdress({
          onSuccess: (selectedVal, selectedIndex, selectedText) => {
            this.address = selectedIndex;
            console.log(this.address, '=====');
            console.log(selectedVal);
            console.log(selectedIndex);
            console.log(selectedText);
            this.$emit('input', selectedText.join('/'));
            this.vl = selectedVal[selectedVal.length - 1];
          },
          all: true //this.addressType
        });
        return;
      }
      if (this.type === 'tel' && !this.disable) {
        this.$refs.tel.focus();
        console.log('tel');
        return;
      }
      if (this.type === 'message' && !this.disable) {
        this.$refs.message.focus();
        console.log('message');
        return;
      }
      if (this.type === 'ajaxSelect' && !this.disable) {
        if (!this.selData.source) {
          this.selData.source = await this.selData.resource();
        }
        dd && ddApi.chosen({
          'source': this.selData.source,
          'selectedKey': this.vl,
          onSuccess: (data) => {
            console.log(data, '---');
            this.$emit('input', data.value);
            this.vl = data.key;
          },
          onFail(err) {
            console.log(err);
          }
        });
        return;
      }
      if (this.type === 'select' && !this.disable) {
        this.$refs.select.focus();
        console.log('select');
      }
      if (this.type === 'sel' && !this.disable) {
        // this.$refs.sel.focus();
        console.log('sel');
      }
      if (this.type === 'switch' && !this.disable) {
        // this.$refs.sel.focus();
        return;
      }
      // 选择数量
      if (this.type === 'selAmount' && !this.disable) {
        this.$refs.selAmount.focus();
        console.log('选择数量');
        this.$AlertUtil.show('chooseCustomize', {
          type: 'amount',
          title: '订购数量',
          value: this.vl || 1,
          btnCancel: '取消',
          btnSure: '确认提交',
          onSuccess: (data) => {
            console.log(data, 'ddd');
            this.$emit('input', data.key);
            this.vl = data.value;
          }
        });
        return;
      }
      // 选择保险公司名
      if (this.type === 'selInsurer' && !this.disable) {
        this.$refs.selInsurer.focus();
        console.log('选择保险公司名');
        dd && ddApi.chosen({
          'source': this.selData.source,
          'selectedKey': this.vl,
          onSuccess: (data) => {
            if (data.value === '其他') {
              console.log('其他');
              this.$AlertUtil.show('chooseCustomize', {
                type: 'insurer',
                title: '保险公司',
                value: '',
                btnCancel: '取消',
                btnSure: '确认',
                onSuccess: (data1) => {
                  console.log(data1, 'ddd');
                  this.$emit('input', data1.key);
                  this.vl = data1.value;
                }
              });

            } else {
              this.$emit('input', data.key);
              this.vl = data.value;

              // 选择回调方法onSelect
              this.$emit('onSelect', {type: this.attr, value: data.value});
            }
          },
          onFail(err) {
            console.log(err);
          }
        });
        return;
      }
      if (!this.disable) {
        // 选择弹框
        console.log(this.type, '--->type');
        if (this.selData.source && this.selData.source.length <= 0) {
          let txt = '无数据';
          console.log(this.type, 'llll');
          if (this.type === 'selStore') {
            txt = '请先选择负责人';
          }
          AlertUtil.showToast({txt, type: 'warn'});
          return;
        }
        dd && ddApi.chosen({
          'source': this.selData.source,
          'selectedKey': this.vl,
          onSuccess: (data) => {
            console.log('TEST', this, data, '---');
            this.$emit('input', data.key);
            this.vl = data.value;

            // 选择回调方法onSelect
            this.$emit('onSelect', {type: this.attr, value: data.value});

            // 选择地面点
            if (this.type === 'selStore') {
              this.$emit('onStore', JSON.stringify(data.value));
            }
          },
          onFail(err) {
            console.log(err);
          }
        });
      } else {
        this.$AlertUtil.showToast({txt: '此项不可编辑', type: 'warn'});
      }
    },
    // 图片选择回调
    onImgsSuccess(data) {
      this.vl = data;
      // this.vl = data.map(item => ({url: item.urlFrom || item.url}));
      // // console.log(data[0], '123123123');
      // console.log();
      // console.log(this.vl, '123123123=--------------=---------');
    },
    // 选择联系人电话
    selContact() {
      console.log('调用通讯录');
      dd && ddApi.chooseMobileContacts({
        multiple: false, // 是否多选： true多选 false单选； 默认true
        maxUsers: 5, // 人数限制，当multiple为true才生效，可选范围1-1500
        limitTips: '限制1人', // 超过人数限制的提示语可以用这个字段自定义
        title: '联系人', // 如果你需要修改选人页面的title，可以在这里赋值
        onSuccess: (data) => {
          console.log('-----******------');
          console.log(data);
          if (data) {
            let tel = data[0].mobile.substr(-11, 11);
            // this.text = tel;

            this.$emit('input', tel);
            // 设置姓名回调
            this.$emit('onGetName', data[0].name);
          }
        },
        onFail(err) {
          console.log(err);
        }
      });
    },
    // 选择联系人id
    selContactId() {
      ddApi.customContact.choose({
        onSuccess: (data) => {
          console.log('-----******------');
          console.log(data);
          if (data) {
            let name = data[0].name;
            let id = data[0].emplId;
            // this.text = name;
            this.$emit('input', name);
            this.$emit('onGetMan', id);
            this.vl = id;
            // console.log(this.vl);
          }
        },
        onFail(err) {
          console.log(err);
        }
      });

      // config.corpId && ddApi.choose({
      //   'startWithDepartmentId': 0,
      //   'isNeedSearch': true,
      //   'multiple': false,
      //   'max': 30,
      //   'corpId': config.corpId,
      //   'users': [],
      //   // TODO 传入已存在的id
      //   'disabledUsers': [],
      //   'title': '人员选择',
      //   'limitTips': '',
      //   'pickTips': '',
      //   onSuccess: (data) => {
      //     console.log('-----******------');
      //     console.log(data);
      //     if (data) {
      //       let name = data[0].name;
      //       let id = data[0].emplId;
      //       // this.text = name;
      //       this.$emit('input', name);
      //       this.$emit('onGetMan', id);
      //       this.vl = id;
      //       // console.log(this.vl);
      //     }
      //   },
      //   onFail(err) {
      //     console.log(err);
      //   }
      // });
    },
    // 选择联系人id
    async selEmployeeSelectWithDccAndSales() {
      const list = await this.$store.dispatch('user/getDccAndSalesUsers');
      ddApi.customContact.choose({
        users: list,
        onSuccess: (data) => {
          console.log('-----******------');
          console.log(data);
          if (data) {
            let name = data[0].name;
            let id = data[0].emplId;
            // this.text = name;
            this.$emit('input', name);
            this.$emit('onGetMan', id);
            this.vl = id;
            // console.log(this.vl);
          }
        },
        onFail(err) {
          console.log(err);
        }
      });
    },
    // 获取手机验证码
    getMessage() {
      console.log('getMessage');
      // todo

      // 时间倒计时
      let fn = setInterval(() => {
        this.time -= 1;
        if (this.time < 0) {
          this.time = 60;
          clearInterval(fn);
        }
      }, 1000);

    },

    // 设置text
    setText(text) {
      this.txt = text;
    },
    // 设置vl
    setVal(vl) {
      this.vl = vl;
      if (this.type === 'contact') {
        this.$emit('onGetMan', vl);
      }
      if (this.type === 'selStore') {
        this.$emit('onStore', vl);
      }
    },
    // 设置颜色
    setColor(data) {
      console.log(data, '222');
      this.$refs.color2 && this.$refs.color2.setColor(data);
    }
  },
  destroyed() {
    this.datePicker && this.datePicker.hide();
    this.adressPicker && this.adressPicker.hide();
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .hint {
    color $darkBlack
    font-size px2rem(14)
    line-height px2rem(20)
    margin-top px2rem(8)
    text-align left
    margin-left px2rem(14)
  }

  .input-box {
    display flex
    flex 1
    flex-direction column
    justify-content center
    align-items flex-start
    min-height px2rem(78)
    margin-left px2rem(14)
    margin-right px2rem(14)
    font-size px2rem(14)
    color $darkBlack
    transition border-color .2s linear
    position relative

    &.warnInfo {
      margin-bottom px2rem(20)
    }

    .warnInfo {
      position absolute
      left 0
      bottom px2rem(-26)
      text-align left
      padding-left px2rem(10)
      line-height px2rem(17)
      font-size px2rem(12)
      color $darkBlack
    }

    &.row {
      flex-direction row
      min-height px2rem(40)
      align-items center

      .name, .area-box.area {
        margin-top 0
      }
    }
    &.link .input input {
      color $themeColor !important
      font-weight 400 !important;
    }
    .unit {
      color $deepBlack
    }
    &.clearMR {
      margin-right px2rem(0) !important
    }
    &.indent .input input {
      padding-left px2rem(10)
      padding-right px2rem(10)
      letter-spacing: 1px;
    }
    &.indent .input.upload {
      padding 0 px2rem(10)
    }
    &.indent .input.clearIndent input {
      padding-left 0
    }
    &.indent .input.clearIndent .p-color-box {
      padding-left px2rem(8)
    }
    &.indent .input.clearIndent .p-color-box input {
      padding 0
      display flex
      flex 1
      padding 0 px2rem(4)
    }
    &.indent .input .clearPR {
      padding-right 0 !important
    }
    input {
      caret-color: $themeColor;
    }

    &.focus {
      border-bottom-color $themeColor !important
    }
    &.select:active {
      opacity .5
    }
    &.line {
      border-bottom 1px solid $lightGray
    }
    &.lineTop {
      border-top 1px solid $lightGray
    }

    .name {
      margin-top px2rem(20)
      display flex
      flex-direction row

      .title {
        margin-right px2rem(6)
        line-height px2rem(20)
        semibold()
      }
      .req {
        display inline-block
        width px2rem(10)
        text-align center
        line-height px2rem(20)
        font-weight bold
      }
      .warn {
        font-size px2rem(10)
        line-height px2rem(20)
      }
    }
    .warm {
      color #EF465B;
    }
    .input {
      display flex
      flex 1
      width 100%
      align-items center
      position relative
      left 0
      top 0

      .disable {
        color $deepGray !important
        font-weight bold !important
      }
      .rdNum {
        padding-right px2rem(6)
        margin-right px2rem(6)
        border-right 1px solid $deepGray
      }
      .p-color-box {
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        flex 1

        input {
          width 66%
          flex initial
        }
      }

      .sp-name {
        font-size px2rem(14)
        color $deepBlack
        margin-right px2rem(4)
      }
      .sp-message {
        display flex
        flex-wrap nowrap
        color #348EED
        font-size px2rem(14)
        margin-right px2rem(24)
      }
      .sp-message-ot {
        display flex
        flex-wrap nowrap
        color $deepGray
        font-size px2rem(14)
        margin-right px2rem(24)
      }

      &.batch {
        flex-direction column
        align-items flex-start

        >>> .cube-checkbox {
          padding-left 0
        }
        >>> .cube-checkbox_checked .cube-checkbox-ui i {
          color $themeColor
        }
        .p-vl-box {
          display flex
          height px2rem(30)
          width 100%
          flex-direction row
        }
      }

      .sp-mark {
        font-size px2rem(14)
        color $deepBlack
        margin-right px2rem(4)
        height px2rem(40)
        line-height px2rem(40)

        &.disable {
          color $deepGray
        }
      }
      &.wrap {
        flex-wrap wrap
        padding-bottom 11px
      }

      .p-cks {
        display flex
        flex-direction row
        width 100%
        justify-content flex-start
        align-items flex-start

        >>> .cube-checkbox-wrap {
          padding-top 11px
          padding-bottom 0px
        }
        >>> .cube-checkbox_checked .cube-checkbox-ui i {
          color #348EED
        }
        >>> .border-top-1px:before {
          display none !important
        }
        >>> .border-top-1px:after {
          display none !important
        }
        >>> .cube-checkbox-wrap:before {
          display none !important
        }
        >>> .cube-checkbox-wrap:after {
          display none !important
        }

        .name1 {
          display flex
          padding-top 11px
          line-height 1.5
          color $deepBlack
        }

        >>> .cube-checkbox-group {
          display flex
          flex-direction row
          flex 1
          flex-wrap wrap
          justify-content flex-start
          align-items center
        }
      }

      >>> .cube-rate-item .cube-rate-item-def {
        background-image url("../../assets/images/base/star_normal.png")
      }
      >>> .cube-rate-item_active .cube-rate-item-def {
        background-image url("../../assets/images/base/star_active.png")
      }
      & >>> .cube-rate-item {
        width px2rem(24)
        margin-bottom px2rem(2)
      }
      input {
        flex 1
        height px2rem(40)
        line-height px2rem(40)
        display flex
      }
      .close {
        width px2rem(14)
        height px2rem(14)
        margin 0 px2rem(14)
        margin-right px2rem(24)
        position relative
        top 0
        left 0

        img {
          width px2rem(14)
          height px2rem(14)
          position absolute
          top 0
          left 0
        }
      }
      .tel {
        width px2rem(22)
      }
      .sel {
        width px2rem(12)
      }
      .rate {
        margin-left px2rem(10)
      }
      .angle-right {
        width px2rem(10)
        height px2rem(10)
        margin 0 px2rem(14)
        margin-right px2rem(0)
        margin-left 0

        &.disable {
          visibility hidden
        }
      }
      .area-box {
        color $deepBlack
        text-align left
        width 95%
        height px2rem(20)
        border none
        outline none
        line-height px2rem(20)
        min-height px2rem(20)
        resize none
        padding px2rem(0) px2rem(10)
        margin px2rem(10) px2rem(0)
        margin-bottom 0
        position: relative
        overflow-y hidden
        transition height .1s linear

        &.indent {
          padding-left 0
        }

        &.main {
          position absolute
          lef 0
          top 0
        }
        &.area1 {
          visibility hidden
        }
      }
    }
  }

  .detail-contain {
    display flex
    flex-direction column
    span {
      color #a8a8a8
      font-size px2rem(12)
      line-height px2rem(20)
    }
  }

  >>> .cube-validator-msg-def {
    font-size px2rem(12)
  }
</style>
