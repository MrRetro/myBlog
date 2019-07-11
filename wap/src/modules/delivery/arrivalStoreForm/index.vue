<template>
  <div class="container">
    <div class="input-box2">
      <cube-scroll>
        <div v-for="(item,index) in form" :key="index" class="content">
          <div class="section-title section-margin-top">
            {{item.title}}
          </div>
          <div
            :key="'index2'+index1"
            class="in-box"
            :class="{'self':item1.columnWidth===50}"
            v-for="(item1,index1) in item.form"
          >
            <yi-input
              ref="va"
              v-bind="item1"
              v-model="item1.text"
              :value.sync="item1.value"
              :indent="true"
              :selData="item1.selData || null"
            />
          </div>
        </div>
        <div class="space-box"></div>
      </cube-scroll>
    </div>
    <yi-btn-box
      name="车辆到店"
      :icon="$images.delivery.ic_car"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import EditPage from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import {addCarArrival} from '../../../api/delivery';
import {handleFormParams} from '../../../utils/paramsUtil';

export default {
  name: 'arrivalStoreForm',
  extends: EditPage,
  data() {
    return {
      initData: null,
      form: [{
        title: '车辆详情',
        form: [
          {
            attr: 'storageTime',
            type: 'date',
            title: '车辆入库时间',
            text: '',
            placeholder: '请选择车辆入库时间',
            rules: {required: true},
            required: true,
            indent: false
          },
          {
            attr: 'stockId',
            type: 'text',
            title: '车辆入库仓库',
            rules: {required: false},
            required: false,
            text: null,
            value: null,
            placeholder: '请选择车辆入库仓库',
            indent: false
          },
          {
            attr: 'storageImg',
            type: 'fileUpload',
            title: '车辆入库图片',
            value: null,
            line: false,
            placeholder: '请选择车辆入库图片',
            rules: {required: true},
            required: true,
            indent: false
          }
        ]
      }, {
        title: '车辆手续',
        form: [
          // {
          //   attr: 'name',
          //   type: 'date',
          //   title: '手续入库时间',
          //   text: '',
          //   placeholder: '请选择手续入库时间',
          //   rules: {required: true},
          //   required: true,
          //   indent: false
          // },
          {
            attr: 'carProcedures',
            type: 'carProcedures',
            title: '手续详情',
            line: false,
            rules: {required: true},
            text: null,
            required: true,
            value: null,
            placeholder: '请选择手续详情',
            indent: false
          }
        ]
      }]
    };
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    onBtnClick() {
      const arr = this.$refs.va.map((item) => {
        return item.changeV();
      });
      Promise.all(arr).then(async data => {
        let state = data.every(item => item);
        if (state) {
          let list = [];
          this.form.forEach(t=>list.push(...t.form));
          await addCarArrival(handleFormParams(list, {deliveryId: this.params.id}));
          this.params.onSuccess && this.params.onSuccess();
          this.$router.go(-1);
        }
      });
    }
  },
  activated() {
    ddApi.setRight();
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl";
  .container {
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    display flex
    flex-direction column

    .section-title {
      width 100%
      font-size: px2rem(16);
      color: $deepBlack
      text-align left
      margin 0 px2rem(14)
      medium()
    }
    .section-margin-top {
      margin-top px2rem(28)
    }
    .input-box2 {
      display flex
      height calc(100% - 50px)
      flex-direction column
      flex 1
      overflow-y auto

      .content {
        display flex
        flex-direction row
        flex-wrap wrap
        .id-box {
          width 100%
          display flex
          flex-direction row
          flex-wrap wrap
        }
        .in-box {
          width 100%
        }
        .self {
          width 48%
        }

      }
    }

    .p-warm {
      width 100%
      background-color #FDFCEA
      height px2rem(28);
      line-height px2rem(28)
      font-size px2rem(12)
      color #EF465B
    }

    .space-box {
      display flex
      width 100%
      height px2rem(78)
    }
  }
</style>
