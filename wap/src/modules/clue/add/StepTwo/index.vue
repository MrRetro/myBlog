<template>
    <yi-result
      :form="form"
    />
</template>

<script>
import {addUserInfo} from '../../../../api/clue';
import {ddApi} from '../../../../api/dingding';
import EditPage from '../../../../components/Mixins/EditPage';

const genderBox = {1: '女', 2: '男'};
export default {
  name: 'addTwo',
  extends: EditPage,
  created() {
    // 获取路由参数
    let data = this.$route.params;
    console.log(data, '123----------------');
    // 客户信息
    let info = `${data.info.name}   ${genderBox[data.info.gender]} ${data.info.mobile}`;
    // console.log(typeof data.data.code);
    // console.log(data.data.isExist);
    // let status = data.data.code === 10101001;
    // console.log(status, ' 111 11');
    // 创建成功数据
    if (!data.data.isExist) {
      // 创建成功
      this.form = {
        type: 'success',
        title: '创建成功',
        content: [{value: info}],
        btn: [
          {
            name: '选中',
            event: () => {
              this.nextClick({
                userId: data.data.id,
                name: data.data.name,
                mobile: data.data.mobile,
                gender: data.data.gender.code
              });
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
        content: [{value: info}, {value: '该号码已存在客户，是否直接选中该客户'}],
        btn: [
          {
            name: '选中',
            event: () => {
              this.nextClick({
                userId: data.data.id,
                name: data.data.name,
                mobile: data.data.mobile,
                gender: data.data.gender.code
              });
            }
          },
          {
            name: '覆盖并选中',
            event: () => {
              this.coverUserClick({
                userId: data.data.id,
                name: data.info.name,
                mobile: data.info.mobile,
                gender: data.info.gender,
                isOverride: data.data.isExist
              });
            }
          }
        ]
      };
    }

  },
  activated() {
    ddApi.setRight();
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
      this.$RouteUtil.clueAddThree({
        ...this.params,
        obj
      }, method);
    },
    // 覆盖选中
    coverUserClick(obj) {
      let method = 'replace';
      addUserInfo({
        userId: obj.userId,
        name: obj.name,
        mobile: obj.mobile,
        gender: obj.gender,
        isOverride: obj.isOverride
      }).then((res)=>{
        if (res) {
          this.$RouteUtil.clueAddThree({
            ...this.params,
            obj
          }, method);
        }
      }).catch(err=>console.log(err));
    }
  }
};
</script>

<style scoped>

</style>
