<template>
    <yi-result
      :form="form"
    />
</template>

<script>

import {ddApi} from '../../../../api/dingding';
import Page from '../../../../components/Mixins/EditPage';
import {addUserInfo} from '../../../../api/clue';

export default {
  name: 'orderTwo',
  extends: Page,
  created() {
    // 获取路由参数
    let data = this.$route.params;
    console.log(data, '123----------------');
    // 客户信息
    let info = `${data.info.name}   ${data.info.gender.name} ${data.info.mobile}`;
    // console.log(typeof data.data.code);
    // console.log(data.data.code);
    // let status = data.data.code === 10101001;
    // console.log(status, ' 111 11');
    // 创建成功数据
    if (!data.info.isExist) {
      // 创建成功
      this.form = {
        type: 'success',
        title: '创建成功',
        content: [{value: info}],
        btn: [
          {
            name: '选中',
            event: () => {
              this.nextClick();
            }
          }
        ]
      };
      console.log('成功');
    } else {
      console.log('失败');
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
    }

  },
  data() {
    return {
      form: {
        type: 'success',
        title: '创建成功1',
        content: [{value: '该号码已存在客户（黄秋葵），是否直接选中该客户？'}, {value: '黄秋葵   女 13564000123'}]
        // btn: [
        //   {
        //     name: '覆盖并选中',
        //     event: ()=>{ this.nextClick(); }
        //   },
        //   {
        //     name: '选中',
        //     event: ()=>{ this.nextClick(); }
        //   }
        // ]
      }
    };
  },
  methods: {
    // 选中
    nextClick(obj) {
      console.log(obj, '....0000123');
      let method = 'replace';
      this.$RouteUtil.orderAddThree({
        ...this.params
      }, method);
    },
    // 覆盖选中
    coverUserClick() {
      let data = {...this.params};
      let obj = data.newInfo;

      // debugger;
      addUserInfo({
        id: obj.id,
        name: obj.name,
        mobile: obj.mobile,
        gender: obj.gender,
        isOverride: obj.isOverride
      })
        .then((res)=>{
          if (res) {
            data.data1.forEach((item, index) => {
              if (item.attr === 'name') {
                data.data1[index].value = obj.name;
              }
              if (item.attr === 'mobile') {
                data.data1[index].value = obj.mobile;
              }
              if (item.attr === 'gender') {
                data.data1[index].value = obj.gender;
              }
            });
            let method = 'replace';
            this.$RouteUtil.orderAddThree(data, method);
          }
        })
        .catch(err=>console.log(err));

    }
  },
  activated() {
    ddApi.setRight();

    if (this.params.id) {
      ddApi.setTitle({title: '编辑合同'});
    } else {
      ddApi.setTitle({title: '新建合同'});
    }
  }
};
</script>

<style scoped>

</style>
