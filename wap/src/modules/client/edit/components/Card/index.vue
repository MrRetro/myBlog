<template>
  <div class="card-box">
    <p class="p-left">
      <img v-if="avatar" class="img" :src="avatar" alt="img">
      <span class="img-name" v-else>{{name.substring(0,1)}}</span>
    </p>
    <div class="info-box">
      <div class="name-box">
        <p class="name">{{name}}</p>
        <p class="career">
          <img class="img" :src="$images.all.ico_career" alt="img">
          {{career}}
        </p>
      </div>
      <div class="word-box">
        <p class="name">电话：</p>
        <p class="value">{{mobile}}</p>
      </div>
      <div class="word-box">
        <p class="name">邮箱：</p>
        <p class="value">{{email}}</p>
      </div>
      <div class="word-box">
        <p class="name">部门：</p>
        <p class="value">{{department}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit-card',
  props: {
    avatar: String,
    name: String,
    career: String,
    mobile: String,
    email: String,
    department: String
  }

};
</script>


<style lang="stylus" scoped>
@import "~styles/global.styl";
  .card-box{
    width px2rem(347)
    margin-left px2rem(14)
    margin-top px2rem(15)
    padding-bottom px2rem(20)
    box-shadow 0 2px 6px 0 rgba(0,0,0,0.15);
    border-radius px2rem(8);
    display flex
    flex-direction row
    justify-content flex-start

    .p-left{
      width px2rem(68)
      display flex
      flex-direction row
      justify-content flex-end

      .img{
        width px2rem(50)
        height px2rem(50)
        border-radius 50%
        margin-top px2rem(20)
      }
      .img-name{
        width px2rem(50)
        height px2rem(50)
        line-height px2rem(50)
        border-radius 50%
        margin-top px2rem(20)
        background-color #348EED
        text-align center
        color white
        font-size px2rem(30)
      }
    }
    .info-box{
      display flex
      flex 1
      flex-direction column
      align-items flex-start
      padding-left px2rem(10)
      padding-right px2rem(14)
      line-height px2rem(22)

      .name-box{
        display flex
        flex-direction row
        justify-content space-between
        margin-top px2rem(20)
        width 100%

        .name{
          font-size: 16px;
          color: #31363B;
          letter-spacing: 0;
          font-weight bold
        }

        .career{
          display flex
          flex-direction row
          align-items center
          font-size: 14px;
          color: #31363B;
          letter-spacing: 0;

          .img{
            width px2rem(16)
            height px2rem(12)
            margin-right px2rem(6)
          }
        }
      }
      .word-box{
        display block
        line-height px2rem(20)
        margin-top px2rem(8)
        font-size: 14px;
        color: #8D8D8D;
        letter-spacing: 0;
        width 100%

        .name{
          float left
          min-width px2rem(36)
          text-align left
        }
        .value{
          float left
          width 82%
          color #323232
          text-align left
          max-width px2rem(200)
        }
      }
    }
  }
</style>
