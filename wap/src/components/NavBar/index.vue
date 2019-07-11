<template>
  <ul class="nav-box">
    <li
      class="item-li"
      :class="hover==index?'hover':null"
      v-for="(item,index) in navData"
      :key="'item2'+index"
      :rel="item.id"
      :index="index"
      @click="handleItemClick(index)"
    >
      <p><img class="img" :src="item.icon"/></p>
      <p><span class="name">{{ item.name }}</span></p>
    </li>
    <li class="item-li" @click="onChangeNav">
      <p>
        <span class="img more">
          <img v-if="type=='down'" class="ico" :src="$images.all.angle_down" alt="img">
          <img v-else class="ico" :src="$images.all.angle_up" alt="img">
        </span>
      </p>
      <p>
        <span class="name">{{ title }}</span>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'navbar',
  props: {
    navData: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: '菜单'
    },
    type: {
      type: String,
      default: 'down'
    },
    hover: {
      type: Number,
      default: -1
    }
  },
  watch: {
    navData(vl) {
      this.navList = vl;
    },
    navList(vl) {
      this.$emit('input', vl);
    }
  },
  data() {
    return {
      navList: this.navData
    };
  },
  methods: {
    onChangeNav() {
      this.$emit('onChangeNav');
    },
    handleItemClick(id) {
      this.$emit('onSelectById', id);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"
  .nav-box {
    background-color: white;
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 2.56rem;
    display: flex;
    flex-direction: row;
    border-top: 1px solid #f2f2f2;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 12px;
    color: #8D8D8D;
    z-index: 1000;
  }

  .nav-box .item-li {
    display: flex;
    width: 20%;
    flex-direction: column;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
  }

  .name{
    font-size px2rem(12)
    line-height px2rem(17)
    color $darkBlack
  }

  .nav-box .item-li.hover:before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    border: 1px dashed white;
    background-color: rgba(0, 0, 0, .6);
  }

  .nav-box .item-li .img {
    width: px2rem(28);
    height: px2rem(28);
    display: inline-block;
    border-radius: 4px;
    margin-bottom: px2rem(4);
    pointer-events: none;
  }

  .nav-box .item-li .img.more {
    background-color: #448AFF;
  }

  .nav-box .item-li .img .ico {
    width: 14px;
    position: relative;
    top: 40%;
    transform: translateY(-50%);
  }
</style>
