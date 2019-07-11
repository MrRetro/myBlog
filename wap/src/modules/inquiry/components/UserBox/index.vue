<template>
    <div class="user-box">
      <p class="left">
        <img v-if="form.img" class="img" :src="form.img || $images.all.img_man01" alt="img" />
        <span v-else class="img-name">{{form.name}}</span>
        <span v-if="form.title" class="title">{{form.title}}:</span>
        <span v-if="form.name" class="name">{{form.name}}</span>
      </p>
      <p class="right">
        <span v-if="form.date" class="date">{{form.date}}</span>
      </p>
    </div>
</template>

<script>
export default {
  name: 'user-box',
  props: {
    form: {
      type: [Object, String],
      default: ()=>({
        img: '',
        title: '',
        name: '',
        date: ''
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.user-box{
  display flex
  flex 1
  padding-left px2rem(14)
  padding-right px2rem(14)
  margin px2rem(20) 0
  flex-direction row
  justify-content space-between
  align-items center
  font-size px2rem(14)
  color $deepBlack

  .left{
    display flex
    flex-direction row
    justify-items flex-start
    align-items center

    .img{
      width px2rem(44)
      height px2rem(44)
      margin-right px2rem(10)
      border-radius 50%;
    }
    .img-name{
      width px2rem(44)
      height px2rem(44)
      line-height px2rem(44)
      margin-right px2rem(10)
      border-radius 50%;
      background-color #348eed
      color #fff
      font-size px2rem(14)
      font-weight bold;
    }
    .name{
      margin-left px2rem(6)
    }
  }

  .right{
    display flex
    flex-direction row
    justify-items flex-end
    align-items center
  }
}
</style>
