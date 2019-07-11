<template>
    <div class="container">
      <template v-for="(item,index) in newData">
        <div class="content" :key="index">
          <p class="date">{{item.update_matter_time.substring(0,11)}}更新内容:</p>
          <template v-for="(item1,index1) in item.module_list">
            <div class="content-item" :key="'item'+index1">
              <p class="p-title">{{item1.moduleName}}</p>
              <ul class="ul-box">
                <li
                  v-for="(item2,index2) in item1.featuresList"
                  :key="'item2'+index2"
                >
                  <span class="sp-word">{{item2}}</span>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </template>
    </div>
</template>

<script>

export default {
  name: 'update-cell',
  props: {
    form: {
      type: [Object, String, Array]
      // [
      //   {
      //     'update_matter_time': '2018-08-10 00:00:00',
      //     'module_list': [
      //       {
      //         'moduleName': 'crm模块',
      //         'featuresList': [
      //           '客户管理'
      //         ]
      //       }
      //     ]
      //   }
      // ]
    }
  },
  watch: {
    form(vl) { this.data = vl; },
    data(vl) { this.$emit('input', vl); }
  },
  computed: {
    newData() {
      let data = this.data;
      if (typeof this.data === 'string') {
        try {
          data = JSON.parse(this.data);
        } catch (e) {
          console.log('==>err', e);
        }
      }
      return data;
    }
  },
  data() {
    return {
      data: this.form
    };
  }

};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.container{
  display flex
  flex-direction column
  justify-content flex-start
  font-size px2rem(14)
  color $deepBlack
  text-align left
  line-height px2rem(24)

  .content{
    padding 0 px2rem(24)
    margin-bottom px2rem(18)

    .date{
      margin-top px2rem(16)
    }

    .p-title{
      color #FBA839
    }
    .ul-box li{
      position relative

      .sp-word {
        display inline-block
        padding-left px2rem(10)
        position relative
      }
      .sp-word:before {
        position absolute
        left 0
        top px2rem(10)
        content ''
        width px2rem(6)
        height px2rem(6)
        background-color #FBA839
        border-radius 50%
      }

    }

  }
}
</style>
