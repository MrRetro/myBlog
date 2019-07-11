<template>
  <yi-container>
    <cube-scroll>
      <div class="section-header"/>
      <template v-for="(item2, index2) in form">
        <div :key="index2">
          <div
            v-if="item2.title"
            class="section-title"
            :class="index2>0?'section-margin-top':null"
          >
            {{item2.title}}
          </div>
          <div class="div-box">
            <template v-if="item2.data" v-for="(item, index) in item2.data">
              <div
                :key="'space'+index"
                v-if="item.type==='space'"
                class="space-view">
              </div>
              <div
                v-else-if="item.columnWidth === 50"
                class="self"
                :key="'index'+index"
              >
                <yi-input
                  ref="va"
                  :key="'index'+index"
                  v-bind="item"
                  v-model="item.text"
                  :value.sync="item.value"
                  :selData="item.selData || null"
                />
              </div>
              <yi-input
                v-else
                ref="va"
                :key="'index'+index"
                v-bind="item"
                v-model="item.text"
                :value.sync="item.value"
                :selData="item.selData || null"
              />
            </template>
          </div>
        </div>
      </template>

      <div class="section-title section-margin-top">额外配置</div>

      <div class="check-box-group">
        <yi-touch v-for="(item,index) in otherConfig"
             class="check-box"
             :class="{selected:item.isSelected}"
             :key="index"
             @click="item.isSelected = !item.isSelected"
        >
          {{item.text}}
        </yi-touch>
      </div>

      <div class="section-title section-margin-top">国别</div>

      <div class="check-box-group">
        <yi-touch v-for="(item,index) in countryList"
             class="check-box"
             :class="{selected:item.isSelected}"
             :key="index"
             @click="item.isSelected = !item.isSelected"
        >
          {{item.text}}
        </yi-touch>
      </div>
      <div class="space-box"></div>
    </cube-scroll>
    <yi-btn-box
      name="确认提交"
      @onBtnClick="onBtnClick"
    />
  </yi-container>
</template>

<script>

export default {
  name: 'ObscureTab',
  data() {
    return {
      countryList: this.$store.state.menu.clueNationality.map(item=>({text: item.name, isSelected: false, ...item})),
      otherConfig: this.$store.state.menu.clueAdditionalConfiguration.map(item=>({text: item.name, isSelected: false, ...item})),
      form: [
        {
          title: '价格区间',
          data: [
            {
              type: 'range',
              tag: 'priceRange',
              value: [0, 100],
              rules: {required: false},
              selData: {'source': []},
              indent: false,
              clearMR: false
            }
            // {
            //   type: 'select',
            //   title: '价格上限',
            //   text: '',
            //   value: '1',
            //   placeholder: '选择最高金额',
            //   rules: {required: true},
            //   selData: {'source': [{'key': '100万', 'value': 1}, {'key': '200万', 'value': 2}]},
            //   indent: false
            // }
          ]
        },
        {
          title: '外观配置',
          data: [
            {
              tag: 'carStructure',
              type: 'select',
              title: '车身类别',
              text: '',
              value: null,
              placeholder: '选择车身类别',
              rules: {required: false},
              selData: {'source': this.transformData('clueCarStructure')},
              indent: false,
              clearMR: true,
              columnWidth: 50
            },
            {
              tag: 'carDoorNumber',
              type: 'select',
              title: '车门数',
              text: '',
              value: null,
              placeholder: '选择车门数',
              rules: {required: false},
              selData: {'source': this.transformData('clueCarDoorNumber')},
              indent: false,
              columnWidth: 50
            }
          ]
        },
        {
          data: [
            {
              tag: 'carDoorNumber',
              type: 'select',
              title: '座位数',
              text: '',
              value: null,
              placeholder: '选择座位数',
              rules: {required: false},
              selData: {'source': this.transformData('clueSeating')},
              indent: false,
              clearMR: true,
              columnWidth: 50
            },
            {
              type: 'space'
            }
          ]
        },
        {
          title: '动力配置',
          data: [
            {
              tag: 'speedChangingBox',
              type: 'select',
              title: '变速箱类别',
              text: '',
              value: null,
              placeholder: '选择变速箱类别',
              rules: {required: false},
              selData: {'source': this.transformData('clueSpeedChangingBox')},
              indent: false,
              clearMR: true,
              columnWidth: 50
            },
            {
              tag: 'displacement',
              type: 'select',
              title: '排量范围',
              text: '',
              value: null,
              placeholder: '选择排量范围',
              rules: {required: false},
              selData: {'source': this.transformData('clueDisplacement')},
              indent: false,
              columnWidth: 50
            }
          ]
        },
        {
          data: [
            {
              tag: 'driveMode',
              type: 'select',
              title: '驱动方式',
              text: '',
              value: null,
              placeholder: '选择驱动方式',
              rules: {required: false},
              selData: {'source': this.transformData('clueDriveMode')},
              indent: false,
              clearMR: true,
              columnWidth: 50
            },
            {
              tag: 'fuel',
              type: 'select',
              title: '燃料类别',
              text: '',
              value: null,
              placeholder: '选择燃料类别',
              rules: {required: false},
              selData: {'source': this.transformData('clueFuel')},
              indent: false,
              columnWidth: 50
            }
          ]
        }
      ]
    };
  },
  methods: {
    transformData(tag) {
      return this.$store.state.menu[tag].map(item=>({key: item.name, value: item.code}));
    },
    // 提交
    onBtnClick() {
      const arr = this.$refs.va.map((item)=>{
        return item.changeV();
      });
      Promise.all(arr).then(data => {
        let state = data.every(item => item);
        if (state) {
          const countryList = this.countryList.filter(item=>item.isSelected);
          const otherConfig = this.otherConfig.filter(item=>item.isSelected);
          let selParams = {};
          this.form.forEach(item=>{
            item.data.forEach(t=> {
              if (t.tag) {
                if (Array.isArray(t.value)) {
                  selParams[t.tag] = t.value.join(',');
                } else {
                  selParams[t.tag] = t.value;
                }
              }
            });
          });
          this.clear();
          let args = {...selParams,
            additionalConfiguration: otherConfig.map(item=>item.code).join(','),
            nationality: countryList.map(item=>item.code).join(',')};
          this.$emit('onSelectedValueSuccess', args);
        }
      });
    },

    clear() {
      this.$refs.va.forEach(item=>{
        item.setText(null);
        item.setVal(null);
      });
      this.otherConfig.forEach(item=>item.isSelected = false);
      this.countryList.forEach(item=>item.isSelected = false);
    },
    cancelHandle() {

    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .section-title {
    font-size: px2rem(16);
    color: $deepBlack
    text-align left
    margin 0 px2rem(14)
  }

  .section-margin-top {
    margin-top px2rem(28)
  }

  .section-header {
    height px2rem(20)
  }

  .p-warm {
    width 100%
    background-color #FDFCEA
    height px2rem(28);
    line-height px2rem(28)
    font-size px2rem(12)
    color #EF465B
  }
  .div-box{
    display flex

    .self{
      width 50%

      .input-box{
        margin-right 0
      }
      &:nth-child(even) .input-box{
        margin-right px2rem(14)
      }
      >>> .input-box .input .angle-right{
        margin-left 0 !important
      }
    }
  }
  .space-view {
    width 50%
  }

  .p-more {
    display flex
    flex-direction row
    align-items center
    justify-content center
    width 100%
    font-size px2rem(14)
    line-height px2rem(60)
    color #348EED

    .ico-more {
      width px2rem(10)
      margin-left px2rem(6)
    }
  }

  .check-box {
    width px2rem(78)
    height px2rem(35)
    display flex
    margin px2rem(5) px2rem(4)
    align-items center
    justify-content center
    border-width 1px
    border-style double
    border-radius px2rem(5)
    font-size px2rem(12)
    color $deepBlack
    border-color #eaeaea
    regular()
  }

  .selected {
    color $themeColor
    border-color $themeColor
    background-color #eff6fe
  }

  .check-box-group {
    display: flex;
    flex-wrap: wrap;
    padding px2rem(9) px2rem(11) 0 px2rem(11)
  }

  .space-box{
    display flex
    height px2rem(40)
  }
</style>
