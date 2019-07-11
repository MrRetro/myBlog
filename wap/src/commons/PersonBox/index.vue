<template>
  <div class="person-box">
    <div v-if="form.name" class="master-box">
      <p class="title">{{ form.name }}</p>
      <div class="master">
        <p class="img-box">
            <span class="name">
              <span v-if="!hasMaster" class="img-name" style="background-color: transparent;">
                <img class="img" :src="$images.base.ic_empty_header" alt="img">
              </span>
              <span v-else-if="form.master.ico" if="form.master.ico" class="img-name">
                <img class="img" :src="form.master.ico" alt="img">
              </span>
              <span v-else class="img-name">{{form.master.name}}</span>
              <span class="sp-name" :class="{'sp-name-no':!hasMaster}">{{ hasMaster ? form.master.name :`暂无${form.name}`}}</span>
            </span>
        </p>
        <yi-touch v-if="hasCareOf" class="btn-box" @click="onChangeMan">
          <span class="btn">转交</span>
        </yi-touch>
      </div>

    </div>
    <div v-if="form.saleName" class="master-box">
      <p class="title">{{ form.saleName }}</p>
      <div class="master">
        <p class="img-box">
            <span class="name">
              <span v-if="!form.saleMaster.name" class="img-name" style="background-color: transparent;">
                <img class="img" :src="$images.base.ic_empty_header" alt="img">
              </span>
              <span v-else-if="form.saleMaster.ico" if="form.master.ico" class="img-name">
                <img class="img" :src="form.saleMaster.ico" alt="img">
              </span>
              <span v-else class="img-name">{{form.saleMaster.name}}</span>
              <span class="sp-name" :class="{'sp-name-no':!form.saleMaster.name}">{{ form.saleMaster.name ? form.saleMaster.name :`暂无${form.saleName}`}}</span>
            </span>
        </p>
        <yi-touch v-if="hasSalesOf" class="btn-box" @click="onChangeSaleMan">
          <span class="btn">转交</span>
        </yi-touch>
      </div>

    </div>
    <div v-if="form.subname && showParter" class="parter-box">
      <p class="title">{{ form.subname }}</p>
      <div class="parter">
        <ul class="mans">
          <li class="man" v-for="(item, index) in form.pater" :key="'item1'+ index">
              <span class="img-box">
                <span v-if="item.ico" class="img-name" style="background-color: transparent;">
                  <img class="img" :src="item.ico" alt="img"></span>
                <span v-else class="img-name">{{ item.name }}</span>
                <img v-if="isDel" @click="onDelManById(item.id)" class="close" :src="$images.all.ico_close_r" alt="img">
              </span>
            <span class="name">{{ item.name }}</span>
          </li>
          <li v-if="edit">
            <yi-touch component-name="img" :src="$images.base.ic_add" class="btn" @click="onAddMan"/>
          </li>
          <li v-if="edit">
            <yi-touch component-name="img" :src="$images.base.ic_sub" class="btn" @click="onDelMan"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import {AlertUtil} from '../../utils/AlertUtil';

export default {
  name: 'person-box',
  props: {
    form: {
      type: Object
    },
    edit: {
      type: Boolean,
      default: false
    },
    module:{type:String},
    type:{type:String}
  },
  data() {
    return {
      parters: [
        {}
      ],
      isDel: false
    };
  },
  computed: {
    isLeader() {
      return this.$store.getters['user/isLeader'];
    },
    userId() {
      return this.$store.state.user.id;
    },
    // 判断是否有master
    hasMaster() {
      return !!(this.form.master && this.form.master.name) || !(this.module === 'agents' && this.type === 'sea');
    },
    // 判断是否有saleMaster
    hasSaleMaster() {
      return !!(this.form.saleMaster && this.form.saleMaster.name) || !(this.module === 'agents' && this.type === 'sea');
    },
    showParter() {
      return this.edit || this.form.pater.length !== 0;
    },
    hasCareOf() {
      return this.edit && this.hasMaster && this.$store.state.user.userAuths[this.form.auth];
    },
    hasSalesOf() {
      return this.edit && this.hasSaleMaster && this.$store.state.user.userAuths[this.form.saleAuth];
    },
    /**
       * 判断是否有添加协同人权限
       * @returns {*|boolean}
       */
    changeAuthority() {
      return this.isLeader || (this.userId === this.form.master.id) || (this.userId === this.form.saleMaster.id);
    }
  },
  methods: {
    // 转让
    onChangeMan() {
      this.$emit('onChangeMan');
    },
    // 转让关联销售
    onChangeSaleMan() {
      this.$emit('onChangeSaleMan');
    },
    // 添加
    onAddMan() {
      if (!this.changeAuthority) {
        AlertUtil.showToast({txt: '您没有添加/删除协同人权限'});
        return;
      }
      this.$emit('onAddMan');
    },
    // 删除
    onDelMan() {
      if (!this.changeAuthority) {
        AlertUtil.showToast({txt: '您没有添加/删除协同人权限'});
        return;
      }
      this.isDel = !this.isDel;
    },
    // 根据id删除人
    onDelManById(id) {
      this.$emit('onDelManById', id);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .person-box {
    display flex
    flex-direction column
    width 100%
    border-top px2rem(10) solid #f3f3f3
    padding-bottom px2rem(15)

    .master-box {
      display flex
      width 100%
      flex-direction column

      .title {
        display flex
        flex-direction row
        justify-content flex-start
        font-size px2rem(14)
        line-height px2rem(20)
        color $deepBlack
        padding px2rem(16) 0 px2rem(10) px2rem(16)
        medium()
      }
      .master {
        display flex
        flex-direction row
        width 100%
        justify-content space-between
        align-items center

        .img-box {
          padding-left px2rem(15)
          .name {
            display flex
            flex-direction row
            align-items center
          }
          .name img {
            width px2rem(44)
            height px2rem(44)
          }
          .name > span {
            margin-left px2rem(10)
          }
        }
        .btn-box {
          display flex
          justify-content center
          align-items center
          width px2rem(68)
          height px2rem(30)
          margin-right px2rem(15)
          border 1px solid #348EED
          border-radius px2rem(4)

          .btn {
            font-size px2rem(14)
            color #348EED
          }
        }
      }
    }
    .parter-box {
      display flex
      flex-direction column
      width 100%
      padding-right px2rem(15)

      .title {
        display flex
        flex-direction row
        justify-content flex-start
        font-size px2rem(14)
        color $deepBlack
        padding px2rem(16) 0 px2rem(0) px2rem(16)
        padding-top px2rem(24)
        line-height px2rem(20)
        medium()
      }
      .parter {
        display flex
        flex-direction row
        justify-content flex-start
        flex-wrap wrap

        .mans {
          display flex
          flex-direction row
          max-width 100%
          flex-wrap wrap

          .man {
            display flex
            flex-direction column
            justify-content flex-start
            align-items center
            margin-top px2rem(10)
            margin-left px2rem(15)
            .img-box {
              position relative
              width px2rem(44)
              height px2rem(44)

              .img {
                width px2rem(44)
                height px2rem(44)
              }
              .close {
                position absolute
                top px2rem(-4)
                right px2rem(-4)
                width px2rem(16)
                height px2rem(16)
              }
            }
            .name {
              margin-top px2rem(10)
              font-size px2rem(14)
            }
          }

          .btn {
            width px2rem(44)
            height px2rem(44)
            border-radius 50%
            margin-left px2rem(15)
            margin-top px2rem(10)
          }
        }
      }
    }
    .img-name {
      text-align center
      width px2rem(44)
      height px2rem(44)
      overflow hidden
      line-height px2rem(44)
      border-radius 50%
      background-color #348EED
      color white
      font-size px2rem(14)
      font-weight bold
      display inline-block
      margin-left 0px !important

      img {
        float left
      }
    }
    .sp-name {
      font-size px2rem(14)
      color $deepBlack
    }

    .sp-name-no {
      color $darkBlack
    }
  }
</style>
