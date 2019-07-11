<template>
  <div class="container">
    <div class="search-box">
      <div class="search-bar">
        <img :src="$images.all.small_search" class="search-icon"/>
        <input type="text" ref="input" v-model="searchText" placeholder="请输入颜色名称"
               class="search-input"/>
      </div>
    </div>
    <div class="list-box">
      <cube-scroll
        :scroll-events="['scroll','scroll-end']"
        @scroll-end="scrollEnd"
      >
        <div ref="list" index="1" class="color-list" v-for="(item,index) in list" :key="index">
          <yi-touch class="item-box" @click="selectItem(item)">
            <yi-out-color v-if="item.hex" :colors="item"/>
            <p class="name">{{item.name}}</p>
          </yi-touch>
        </div>
      </cube-scroll>

      <div class="loading" v-show="loading">
        <cube-loading />
      </div>
    </div>
    <div class="btn-content">
      <yi-btn-box
        class="btnBox"
        :add="true"
        :backgroundColor="'white'"
        :color="'#348EED'"
        name="添加颜色"
        @onBtnClick="addItem"
      />
    </div>
  </div>
</template>

<script>
import Page from '../../../components/Mixins/EditPage';
import {
  getColors,
  addColor,
  addColors
} from '../../../api/carModel';

export default {
  name: 'colorStep2',
  extends: Page,
  computed: {
    list() {
      return this.selectList;
    }
  },
  mounted() {
    this.$nextTick(()=>{
      getColors({pageNum: this.pageNum, pageSize: this.pageSize})
        .then((res)=>{
          if (res.content) {
            console.log('===>>>', res);
            this.selectList = res.content.map(item => ({name: item.name, hex: item.hex || '', id: item.id}));
          }
        })
        .catch((err)=>{ console.log(err); });
    });
  },
  watch: {
    searchText(vl) {

      try {
        getColors({name: vl, pageNum: 1, pageSize: 100})
          .then((res)=>{
            if (res.content) {
              console.log('===>>>', res);
              this.selectList = res.content.map(item => ({name: item.name, hex: item.hex || '', id: item.id}));
            }
          })
          .catch((err)=>{ console.log(err); });

      } catch (e) {
        console.log(e);
      }
    }
  },
  data() {
    return {
      searchText: '',
      selectList: [],
      pageNum: 1,
      pageSize: 20,
      // 加载动画
      loading: false
    };
  },
  methods: {
    // 选择颜色
    selectItem(value) {
      if (this.params.singleChoose) {
        // 删除多余的颜色id对象
        value && value.id && delete value.id;
        this.params.onSuccess &&
        this.params.onSuccess({key: -1, value});
        this.$router.go(-1);
      } else {
        this.params.onSuccess &&
        this.params.onSuccess({key: this.params.index, value});
        this.$router.go(-1);
      }
    },
    // 进入添加颜色
    addItem() {
      this.$AlertUtil.show('chooseCustomize', {
        type: 'insurer',
        title: '添加颜色',
        value: '',
        btnCancel: '取消',
        btnSure: '确认',
        placeholder: '请输入颜色名称',
        onSuccess: (data1) => {

          // 如果颜色一存在，择选择改颜色
          addColor({name: data1.value})
            .then((res)=>{
              console.log('===<<<', res);
              if (res) {
                let value = {name: res.name, hex: res.hex || '', id: res.id};
                // 添加外观颜色库
                if (this.params.singleChoose) {
                  // 外观删除多余的颜色id
                  value && value.id && delete value.id;
                  addColors({carId: this.params.carId, type: 0, colors: [res.id]})
                    .then(res1=>{ console.log(res1); })
                    .catch(err=>{ console.log(err); });
                }
                this.params.onSuccess &&
                this.params.onSuccess({key: this.params.index, value});
                this.$router.go(-1);
              }
            });
        }
      });
    },
    scrollEnd() {
      console.log('dddddd==>end');
      if (!this.loading) {
        this.loading = true;
        getColors({name: this.searchText, pageNum: this.pageNum + 1, pageSize: this.pageSize})
          .then((res) => {
            if (res.content) {
              console.log('===>>>', res);
              let newData = res.content.map(item => ({name: item.name, hex: item.hex || '', id: item.id}));
              this.selectList = this.selectList.concat(newData);
              this.pageNum++;

              let fn = null;
              setTimeout(() => {
                this.loading = false;
                clearTimeout(fn);
              }, 500);
            }
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl"
.container {
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  display flex
  flex-direction column

  .search-box {
    position absolute
    left 0
    right 0
    top 0
    z-index 10
    background-color white

    .search-bar {
      height: px2rem(40);
      margin: px2rem(12)
      background-color: #F8F8F8;
      border-radius: px2rem(4);
      align-items: center;
      justify-content center
      display flex
      flex: 1;
      .search-icon {
        height: px2rem(12)
        width: px2rem(13)
        margin-left px2rem(19)
        margin-right px2rem(5)
      }
      .search-input {
        font-size px2rem(12)
        color $deepBlack
        flex: 1
        background-color transparent
        regular()
      }
    }
  }
  .list-box {
    display flex
    width 100%
    margin-top px2rem(55)
    flex-direction column
    position absolute
    top 0
    left 0
    height calc(100% - 200px)
    overflow-y hidden

    .loading{
      display flex
      flex-direction row
      justify-content center
      margin px2rem(6) 0
    }
    .color-list {
      display flex
      width 100%

      .item-box {
        display flex
        flex-direction row
        flex 1
        width 100%
        justify-content flex-start
        align-items center
        padding px2rem(12) 0
        margin px2rem(0) px2rem(12)
        border-bottom 1px solid $lightGray

        .name {
          font-size px2rem(14)
          color $deepBlack
          margin-left px2rem(4)
        }
      }
    }
  }
  .btn-content{
    display flex
    direction row
    justify-content center
    margin-top px2rem(15)
    margin-bottom px2rem(50)
    position: absolute
    bottom 0
    left 0
    right 0
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
  }
}
</style>
