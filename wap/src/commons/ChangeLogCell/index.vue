<template>
  <li
    class="li-over"
    :class="['active',{deactive:item.deactive}]"
  >
    <div class="item-contain">
      <div class="words">
        <span v-if="item.title" class="name name2">{{ item.title }}</span>
        <span class="date" :class="{'deactive-color':item.deactive}">{{ item.date }}</span>
      </div>
      <p class="words txts" v-for="(item1, index1) in item.data" :key="'item02'+index1">
        <span class="name">{{ item1.title }}:</span>
        <yi-more-text
          class="more"
          :content="item1.value"
          :length="43"
        />
      </p>
      <yi-touch component-name="p" v-if="showDetail" class="words"><span class="name detail" @click="onGetDetail">查看详情</span></yi-touch>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ChangeLogCell',
  props: ['item', 'index', 'showDetail']
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .more {
    color $deepBlack !important
  }

  .deactive-color {
    color $darkBlack !important
  }

  .deactive:before {
    content: '';
    position: absolute;
    top: px2rem(-2);
    left: px2rem(-7) !important;
    width: px2rem(4) !important;
    height: px2rem(4) !important;
    background-color: #BDBDBD !important;
    border-color white !important;
    border-radius: 50%;
  }

  .li-over {
    list-style: none;
    text-align: left;
    margin: 0 px2rem(10);
    min-width px2rem(340)
    margin-left px2rem(15)
    padding-left: px2rem(22);
    border-left: 2px dashed #eee;
    font-size: px2rem(14);
    float: left;
    padding-bottom: px2rem(40);
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: px2rem(-2);
      left: px2rem(-6);
      width: px2rem(4);
      height: px2rem(4);
      background-color: white;
      border: px2rem(10) solid #dedfdc;
      border-radius: 50%;
    }
    &.active {
      border-left-style: solid;
    }
    &.active:before {
      border-color: #1990ff;
      border-width: px2rem(4);
    }
  }

  .item-contain {
    display flex
    flex-direction column

    .words {
      font-size px2rem(14)
      color $deepBlack
      float: left;
      width: 100%;
      line-height px2rem(20)
      position: relative;
      margin-bottom px2rem(8);
      display flex
      top: px2rem(-6);

      &.txts {
        display flex
        flex-direction row
        justify-content flex-start
        align-items flex-start
        flex-wrap wrap
      }

      .name {
        color: rgba(0, 0, 0, 0.447058823529412);
        margin-right: px2rem(4);

        &.detail {
          color $themeColor
        }
        &.name2 {
          flex 1
          color $deepBlack
        }
      }
      .date {
        color $deepBlack
        float right
        margin-right px2rem(15)
      }
    }
  }

</style>
