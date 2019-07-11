<template>
  <yi-container>
    <yi-list :data="data" :enabled-pull-up="false" :enabled-pull-down="false">
      <template slot-scope="{item,index}">
        <yi-touch v-if="type==='series'" class="item-contain touch-highlight height67" @click="handleClick(index)">
          <yi-image class="item-icon" :src="item.avatar"/>
          <div style="flex: 1;display: flex;flex-direction: column;justify-content: space-around">
            <div class="item-name">
              {{item.name}}
            </div>
            <!--<div class="item-content red">-->
            <!--28.68~34.56万-->
            <!--</div>-->
          </div>
          <!--<img v-if="hasRightIcon" class="icon-right" :src="$images.base.arrow_right"/>-->
        </yi-touch>
        <car-model-cell v-if="type==='model'"  @click="handleClick(index)" :item="item"/>
      </template>
    </yi-list>
  </yi-container>
</template>

<script>
import CarModelCell from '../../commons/CarModelCell';

export default {
  name: 'index',
  components: {
    CarModelCell
  },
  props: {
    data: Array,
    hasRightIcon: Boolean,
    type: String
  },
  methods: {
    handleClick(index) {
      this.$emit('itemClick', index);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .item-contain {
    display flex
    align-items center
    margin-left px2rem(14)
    border-bottom-style double
    border-bottom-width 1px
    border-bottom-color $lightGray
    padding-right px2rem(14)
  }

  .height67 {
    height px2rem(67)
  }

  .height50 {
    height px2rem(50)
  }

  .padding-top {
    padding-top px2rem(16)
  }

  .item-icon {
    width px2rem(80)
    height px2rem(60)
    margin-right px2rem(15)
  }

  .icon-right {
    width px2rem(6)
    height px2rem(10)
  }

  .item-name {
    font-size px2rem(14)
    color $deepBlack
    medium()
    text-align left
    text-overflow: ellipsis;
    white-space: nowrap;
    medium()
  }

  .item-content {
    color $darkBlack
    font-size px2rem(12)
    margin-top px2rem(8)
    text-overflow: ellipsis;
    white-space: nowrap;
    width 100%;
    text-align left
    medium()
  }

  .red {
    color $red
    medium()
  }

</style>
