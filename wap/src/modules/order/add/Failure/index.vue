<template>
    <yi-result
      :form="form"
    />
</template>

<script>
import {addUserInfo} from '../../../../api/clue';
import {editOrderInfo} from '../../../../api/order';
import {ddApi} from '../../../../api/dingding';

const genderBox = {1: '女', 2: '男'};
export default {
  name: 'addTwo',
  created() {
    // 获取路由参数
    let data = this.$route.params;
    this.params = data;
    // 客户信息
    let info = `${data.info.name}   ${genderBox[data.info.gender.code]} ${data.info.mobile}`;

    // 创建失败
    this.form = {
      type: 'fail',
      title: '创建失败',
      content: [{value: `该号码已存在客户（${data.info.name}），是否直接选中该客户？`}, {value: info}],
      btn: [
        {
          name: '覆盖并选中',
          event: () => {
            this.coverUserClick();
          }
        },
        {
          name: '选中',
          event: () => {
            this.nextClick();
          }
        }
      ]
    };

  },
  data() {
    return {
      form: {
        type: 'success',
        title: '创建成功1',
        content: [{value: '该号码已存在客户（黄秋葵），是否直接选中该客户？'}, {value: '黄秋葵   女 13564000123'}]
      },
      params: {}
    };
  },
  methods: {
    // 选中
    nextClick() {
      let data = this.params;
      console.log(data, '选中');
      // 编辑合同
      data.items.customerId = data.info.id;
      editOrderInfo(data.items)
        .then((res1)=>{
          console.log(res1, '==>edit success');

          this.params.onSuccess && this.params.onSuccess();
          this.$router.go(-2);
        })
        .catch((err)=>{ console.log(err); });
    },
    // 覆盖选中
    coverUserClick() {
      let data = this.params;
      console.log(data, '覆盖');

      addUserInfo({
        id: data.info.id,
        name: data.info.name,
        mobile: data.info.mobile,
        gender: data.info.gender.code,
        isOverride: true
      })
        .then((res)=>{
          // 覆盖成功 customerNo
          console.log(res, '==>covers');

          // 编辑合同
          data.items.customerId = data.info.id;
          editOrderInfo(data.items)
            .then((res1)=>{
              console.log(res1, '==>edit success');

              this.params.onSuccess && this.params.onSuccess();
              this.$router.go(-2);
            })
            .catch((err)=>{ console.log(err); });
        })
        .catch((err)=>{ console.log(err); });
    }
  },
  activated() {
    ddApi.setRight();
  }
};
</script>

<style scoped>

</style>
