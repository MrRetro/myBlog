<template>
  <div class="logo-box">
    <div class="logo-content">
      <p class="left">
        <a href="/">
          <img class="img" src="../../../assets/logo.png" alt="">
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({

})
export default class LogoRow extends Vue {

}
</script>

<style scoped>
  .logo-box{
    float: left;
    width: 100%;
    height: 0px;
    margin-top: 30px;
  }
  .logo-content{
    position: relative;
    width: 1200px;
    margin-left: 50%;
    left: -600px;
  }
  .logo-content .left{
    float: left;
    width: 330px;
    height: 100px;
    background-color: black;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    transition: all .2s linear;
    position: relative;
    z-index: 100;
    animation: animate 10s infinite;
  }
  @keyframes animate {
    0%{
      transform: skew(30deg);
    }
    50%{
      transform: skew(-30deg);
    }
    100%{
      transform: skew(30deg);
    }
  }
  .logo-content .left .img{
    margin-top: -15px;
  }
  .small{
    transform: scale(0.2);
    transform-origin: 35px 0px;
    position: fixed;
    top: 30px;
    left: 0px;
    z-index: 10;
  }
</style>
