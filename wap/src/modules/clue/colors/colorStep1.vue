<template>
    <div class="container">
      <p class="warn">组合内饰请填满2个色值，单色内饰仅需填写内饰颜色-1</p>
      <div class="select-box">
        <cube-scroll>
          <yi-touch @click="selectColor(1)">
            <ColorCell
              :form="firstColor"
            />
          </yi-touch>
          <yi-touch @click="selectColor(2)">
            <ColorCell
              :form="secondColor"
            />
          </yi-touch>
        </cube-scroll>
      </div>
      <yi-btn-box
        name="确认颜色"
        @onBtnClick="onClick"
      />
    </div>
</template>

<script>
import Page from '../../../components/Mixins/EditPage';
import {ColorCell} from './components';
import {addColors} from '../../../api/carModel';

export default {
  name: 'colorStep1',
  extends: Page,
  components: {
    ColorCell
  },
  data() {
    return {
      color1: '',
      color2: '',
      firstColor: {
        color: '',
        name: '暂无颜色',
        subName: '内饰颜色-1',
        changeName: '选择颜色'
      },
      secondColor: {
        color: '',
        name: '暂无颜色',
        subName: '内饰颜色-2',
        changeName: '选择颜色'
      }
    };
  },
  methods: {
    // 颜色选择
    selectColor(index) {
      this.$RouteUtil.colorSelect2({
        index,
        singleChoose: this.params.singleChoose,
        onSuccess: (data)=>{
          // 如果颜色为1把值赋给颜色一
          if (data.key === 2) {
            this.secondColor.id = data.id;
            this.secondColor.color = data.value;
            this.secondColor.name = data.value.name || '暂无颜色名';
            this.secondColor.changeName = '更改颜色';
          } else {
            this.secondColor.id = data.id;
            this.firstColor.color = data.value;
            this.firstColor.name = data.value.name || '暂无颜色名';
            this.firstColor.changeName = '更改颜色';
          }
        }
      });
    },
    // 确认
    onClick() {
      if (this.firstColor.color !== '') {
        let array = [this.firstColor.color];
        let ids = [this.firstColor.color.id];
        if (this.secondColor.color) {
          array.push(this.secondColor.color);
          ids.push(this.secondColor.color.id);
        }
        // 删除多余的颜色id
        array[0] && array[0] && array[0].id && delete array[0].id;
        array[1] && array[1] && array[1].id && delete array[1].id;
        // 内饰颜色库添加
        addColors({carId: this.params.carId, type: 1, colors: ids})
          .then(res1=>{ console.log(res1); })
          .catch(err=>{ console.log(err); });

        console.log(array, '==<<<<');

        this.params.onSuccess &&
        this.params.onSuccess({key: -1, value: {colors: array}});
        this.$router.go(-1);
      } else {
        this.$AlertUtil.showToast({txt: '内饰颜色-1为必填'});
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

  .warn{
    background #F3F9FF
    width 100%
    height px2rem(34)
    line-height px2rem(34)
    padding 0 px2rem(15)
    font-size px2rem(14)
    color #348EED
  }

  .select-box {
    display flex
    height calc(100% - 50px)
    flex-direction column
    flex 1
    overflow-y auto
    padding-top px2rem(20)
  }
}
</style>
