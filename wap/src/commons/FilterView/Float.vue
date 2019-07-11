<template>
  <div :style="{top:`${top}px`}" @click="mHideMenu(false)" id="filter-float" class="model">
    <div class="float" :style="{height:menuHeight}">
      <div v-if="!isChooseAll" @click.stop="">
        <yi-touch
          type="highLight"
          class="menu-item"
          v-for="(item,i) in selectedMenuData"
          :key="i"
          @click="handleMenuClick(i)">
          <div class="menu-text"
               :style="{color:data[selectedIndex].selectedIndex === i ? '#348EED':'#31363B'}">
            {{item.name}}
          </div>
          <img
            v-show="data[selectedIndex].selectedIndex === i"
            :src="$images.all.small_check"
            class="menu-icon"
          />
        </yi-touch>
      </div>
      <div v-else
           class="filter-contain"
           :style="{height:scrollHeight}"
           @click.stop="">
        <div v-if="!isSet" class="filter-contain" :style="{height:scrollHeight}">
          <yi-list
            v-if="!isSet"
            :data="filterData"
            :enabled-pull-down="false"
            :enabled-pull-up="false">
            <div slot="header" class="filter-header">
              <yi-touch class="btn-contain" @click="filterReset">
                <yi-image class="icon" :src="$images.filter.small_del"/>
                <div>重置</div>
              </yi-touch>
              <yi-touch class="btn-contain button" @click="reversalSet">
                <yi-image class="icon" :src="$images.filter.small_set"/>
                <div>设置</div>
              </yi-touch>
            </div>
            <div
              slot-scope="{item,index}"
              class="filter-item">
              <div
                class="item-section">
                <div>{{item.name}}</div>
                <!--<img-->
                <!--class="item-icon"-->
                <!--:style="{transform:`rotate(${item.isOpen ? 0 : 180}deg)`}"-->
                <!--:src="$images.all.arrows_down"-->
                <!--/>-->
              </div>
              <div
                class="sub-contain"
                v-show="item.isOpen">
                <yi-touch
                  v-for="(subItem,i) in item.values"
                  :class="{
                selected:item.selectedIndex === i,
                normal:item.selectedIndex !== i
                }"
                  class="sub-item"
                  :key="i"
                  @click="handleButtonClick(item,subItem,i)"
                >
                  <div>{{subItem.name}}</div>
                </yi-touch>
              </div>
            </div>
          </yi-list>
          <div>
            <yi-touch class="filter-footer" @click="handleFilter">
              确定筛选
            </yi-touch>
          </div>
        </div>
        <div v-else style="width:100%;height:100%;display: flex;flex-direction: column;">
          <yi-list
            :data="[{name:'已启用',values:startUseList},{name:'未启用',values:noUserList}]"
            :enabled-pull-down="false"
            :enabled-pull-up="false">
            <div
              slot-scope="{item,index}"
              class="filter-item">
              <div
                class="item-section item-section-set"
              >
                <div>{{item.name}}</div>
              </div>
              <div
                class="sub-contain"
                style="flex-wrap: wrap;justify-content: flex-start;display: flex;"
              >
                <yi-touch
                  v-for="(subItem,index) in item.values"
                  :class="{selected:subItem.isOpen, normal:!subItem.isOpen}"
                  class="sub-item"
                  :key="index"
                  @click="subItem.isOpen = !subItem.isOpen"
                >
                  <div>{{subItem.name}}</div>
                </yi-touch>
              </div>
            </div>
          </yi-list>
          <div class="set-button-contain">
            <yi-touch class="set-button touch-opacity" @click="reversalSet(false)">取消</yi-touch>
            <yi-touch class="set-button set-button-active touch-opacity" @click="reversalSet(true)">确认</yi-touch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ddApi} from '../../api/dingding';
import {AlertUtil} from '../../utils/AlertUtil';
import {getUserSubordinates} from '../../api/client';

export default {
  name: 'FilterContent',
  props: {
    data: Array,
    selectedIndex: Number,
    show: Boolean,
    top: Number
  },
  data() {
    return {
      isSet: false,
      mShow: false,
      clientHeight: 0,
      filterData: this.data[this.data.findIndex(item => item.isAllFilter)].values,
      setData: JSON.parse(JSON.stringify(this.data[this.data.findIndex(item => item.isAllFilter)].values))
    };
  },
  computed: {
    storeList() {
      return this.$store.state.user.storeList;
    },
    menuShow() {
      return this.selectedIndex !== -1;
    },
    selectedMenuData() {
      return this.menuShow ? this.data[this.selectedIndex].values : [];
    },
    isChooseAll() {
      return this.data[this.selectedIndex].isAllFilter;
    },
    scrollHeight() {
      return this.isChooseAll ? `${this.clientHeight}px` : '0px';
    },
    menuHeight() {
      return this.mShow ? this.realMenuHeight : '0px';
    },
    realMenuHeight() {
      return this.isChooseAll ? this.scrollHeight : `${window.px2realPx(this.selectedMenuData.length * 50)}px`;
    },
    startUseList() {
      return this.setData.filter(item => item.isOpen);
    },
    noUserList() {
      return this.setData.filter(item => !item.isOpen);
    }
  },
  mounted() {
    setTimeout(() => this.mShow = true, 0);
    const height = document.querySelector('#filter-float').clientHeight;
    this.clientHeight = height;
  },
  methods: {
    handleMenuClick(i) {
      this.$emit('menuClick', this.selectedIndex, i);
      this.mHideMenu(true);
    },
    mHideMenu(isChange) {
      if (this.mShow) {
        this.mShow = false;
        setTimeout(() => this.$emit('hideMenu', isChange), 200);
      } else {
        this.$emit('hideMenu', isChange);
      }
    },
    filterReset() {
      // this.data.filter(item => !item.isAllFilter).forEach(item => item.selectedIndex = -1);
      this.filterData.forEach(item => item.selectedIndex = -1);
    },
    reversalSet(sure) {
      this.isSet = !this.isSet;
      if (sure) {
        this.filterData.forEach((item, index) => item.isOpen = this.setData[index].isOpen);
      } else {
        this.setData = JSON.parse(JSON.stringify(this.filterData));
      }
    },
    handleFilter() {
      let data = this.filterData.filter(item => item.isOpen && item.selectedIndex !== -1);
      const list = data.map(item => item.values[item.selectedIndex]);
      let condition = {};
      data.forEach((item, index) => {
        if (item.type === 'date') {
          condition[item.key] = [list[index].startTime, list[index].endTime];
        } else {
          condition[item.key] = [list[index].code];
        }
      });
      this.handleMenuClick(JSON.stringify(condition) === '{}' ? -1 : 0);
    },
    async handleButtonClick(item, subItem, index) {
      item.selectedIndex = index;
      console.log('subItem', subItem);
      // 判断action的类型选择对应的操作
      if (subItem.action === 'date') {
        ddApi.datepicker({
          'format': 'yyyy-MM-dd',
          value: subItem.startTime && subItem.startTime.split(' ')[0],
          onSuccess: ({value}) => {
            subItem.startTime = `${value} 00:00:00`;
            ddApi.datepicker({
              'format': 'yyyy-MM-dd',
              value: subItem.endTime && subItem.endTime.split(' ')[0],
              onSuccess: (endTime) => {
                subItem.endTime = `${endTime.value} 23:59:59`;
              }
            });
          }
        });
      }
      if (subItem.action === 'multipleChoose') {
        ddApi.customContact.multipleChoose({
          max: 10,
          onSuccess: (value) => {
            console.log('value', value);
            subItem.code = value.map(t => t.emplId);
          }
        });
      }
      if (subItem.action === 'address') {
        ddApi.getAdress({
          all: true,
          onSuccess: (selectedVal, selectedIndex, selectedText) => {
            subItem.name = selectedText.join('/');
            subItem.code = `${selectedVal[selectedVal.length - 1]}`;
            console.log(selectedVal, selectedIndex, selectedText, subItem);
          }
        });
        // ddApi.customContact.choose({
        //   onSuccess: (value)=>{
        //     console.log('value', value);
        //     subItem.code = value[0].emplId;
        //   }
        // });
      }
      if (subItem.action === 'store') {
        if (this.storeList.length === 0) {
          await this.$store.dispatch('user/getStoreList');
        }
        AlertUtil.show('select', {
          selectList: this.storeList.map(t => ({...t, title: t.storeName})),
          title: '选择地面店',
          onSuccess: (data) => {
            console.log(data);
            subItem.name = data[0].title;
            subItem.code = `${data[0].id}`;
          }
        });
      }
      if (subItem.action === 'groundPromotion') {
        const list = await getUserSubordinates(this.$store.state.user.id, 'ground_promotion');
        AlertUtil.show('select', {
          selectList: list.map(t => ({...t, title: t.name})),
          title: '选择地推',
          onSuccess: (data) => {
            console.log(data);
            subItem.name = data[0].title;
            subItem.code = `${data[0].id}`;
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .menu-item {
    background-color white
    height px2rem(50)
    border-bottom-style double
    border-bottom-width 1px
    border-bottom-color #eaeaea
    display flex
    align-items center
    padding 0 px2rem(14)
  }

  .menu-text {
    flex 1
    font-size px2rem(14)
    text-align left
    color #31363B
    regular()
  }

  .btn-contain {
    display flex
    align-items center
  }

  .menu-icon {
    width px2rem(14)
    height px2rem(10)
  }

  .float {
    overflow hidden
    width 100%
    height auto
    transition height .2s linear
  }

  .filter-contain {
    display: flex;
    flex-direction: column;
    background-color: white;
    overflow hidden
  }

  .filter-header {
    display: flex;
    height px2rem(44)
    justify-content: flex-end;
    align-items flex-end
    color $themeColor
    font-size px2rem(14)
    medium()
    margin 0 px2rem(14)
    .button {
      margin-left px2rem(40)
    }
    .icon {
      width px2rem(14)
      height px2rem(14)
      margin-right px2rem(4)
    }
  }

  .filter-footer {
    height px2rem(50)
    background-color $themeColor
    text-align center
    line-height px2rem(50)
    font-size px2rem(16)
    color white
    regular()
  }

  .filter-item {
    margin px2rem(24) px2rem(14)
    .sub-item {
      width auto
      height px2rem(35)
      padding 0 px2rem(12)
      margin-top px2rem(8)
      display flex
      align-items center
      justify-content center
      border-width 1px
      border-style double
      border-radius px2rem(5)
      font-size px2rem(12)
      color $deepBlack
      border-color #EAEAEA
      margin-right px2rem(10)
      regular()
    }
    .selected {
      color $themeColor
      border-color $themeColor
      background-color #eff6fe
    }
    .sub-contain {
      display flex
      flex-wrap wrap
    }
    .item-section {
      font-size px2rem(14)
      color $darkBlack
      margin-bottom px2rem(4)
      line-height px2rem(20)
      align-items center
      justify-content space-between
      display flex
      medium()
    }
    .item-section-set {
      margin-top px2rem(24)
    }
    .margin-top {
      margin-top px2rem(8)
    }
    .item-icon {
      width px2rem(10)
      height px2rem(6)
    }
  }

  .set-button-contain {
    display flex
    margin-bottom px2rem(40)
    padding 0 px2rem(14)
    justify-content space-between
  }

  .set-button {
    width px2rem(170)
    height px2rem(40)
    border-radius px2rem(4)
    border-color #C1C1C1
    border-style double
    border-width 1px
    color $darkBlack
    text-align center
    line-height px2rem(40)
    regular()
    font-size px2rem(14)
  }

  .set-button-active {
    border-color $themeColor
    color $themeColor
  }

  .model {
    position absolute
    top: 0
    left 0
    right 0
    bottom 0
    background-color $modelBg
    z-index 1000
  }

</style>
