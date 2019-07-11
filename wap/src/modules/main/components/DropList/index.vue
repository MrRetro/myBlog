<template>
    <div class="select-box">
      <yi-touch
        :key="index"
        v-for="(item,index) in data"
        class="select"
        @click="onSelect(item,index)"
      >
        <p>{{item.select}}{{item.type==='date'?'年':''}}</p>
        <img class="img" :src="$images.work.ico_angle" alt="img">
      </yi-touch>
    </div>
</template>

<script>
import {ddApi} from '../../../../api/dingding';

const years = [];
for (let i = 2000; i < 2100; i++) {
  years.push({key: i, value: i});
}

export default {
  name: 'drop-list',
  props: {
    form: {
      type: [Object, Array],
      default: ()=>{
        return [
          // {
          //   type: 'select',
          //   select: '全公司',
          //   source: [{'key': '全公司', 'value': '0'}]
          // },
          // {
          //   type: 'date',
          //   select: 2018,
          //   source: years
          // },
          // {
          //   type: 'select',
          //   select: '全年',
          //   source: [{'key': '全年', 'value': '0'}]
          // }
        ];
      }
    }
  },
  computed: {
    result() {
      let arry = [];
      this.data && this.data.forEach(item=>{
        item.source.forEach(item1=>{
          if (item1.key === item.select) {
            arry.push(item1.value);
          }
        });
      });
      return arry;
    }
  },
  watch: {
    form(vl) {
      this.data = vl;
    },
    data(vl) {
      this.$emit('input', vl);
    }
  },
  data() {
    return {
      data: this.form,
      isSel: 0
    };
  },
  methods: {
    onSelect(item, index) {
      // console.log(item, index);
      switch (index) {
        case 0: {
          // 公司
          console.log('id==', this.$store.state.user.config.corpId);
          // let depart ={selectedCount: 11, users: [], departments: [{id: 69061279, name: "打杂部", number: 11}]}
          // let users ={selectedCount: 1, users: [{name: "陈燕东", avatar: "", emplId: "160152352437894959"}], departments: []};
          dd && ddApi.complexChoose({
            title: '选人与部门', // 标题
            multiple: true, // 是否多选
            limitTips: '超出了', // 超过限定人数返回提示
            maxUsers: 1, // 最大可选人数
            pickedUsers: [], // 已选用户
            pickedDepartments: [], // 已选部门
            disabledUsers: [], // 不可选用户
            disabledDepartments: [], // 不可选部门
            requiredUsers: [], // 必选用户（不可取消选中状态）
            requiredDepartments: [], // 必选部门（不可取消选中状态）
            appId: this.$store.state.user.config.corpId, // 微应用的Id
            responseUserOnly: false, // 返回人，或者返回人和部门
            startWithDepartmentId: 0, // 0表示从企业最上层开始
            onSuccess: (data) => {
              // console.log(data);
              // debugger;
              console.log(data, '---');
              let newObj = {key: '', value: ''};
              if (data.users && data.users.length > 0) {
                newObj.key = data.users[0].name;
                newObj.value = data.users[0].emplId;

                this.isSel = 1;
              }
              if (data.departments && data.departments.length > 0) {
                newObj.key = data.departments[0].name;
                newObj.value = data.departments[0].id;

                this.isSel = 2;
              }
              this.data[index].select = newObj.key;
              this.data[index].source = [newObj];

              this.goBackData(this.isSel);
            }
          });
          break;
        }
        case 1:
          // 年份
          dd && ddApi.chosen({
            'source': item.source,
            'selectedKey': item.select,
            onSuccess: (data) => {
              // console.log(this, data, '---');
              this.data[index].select = data.key;

              this.goBackData(this.isSel);
            },
            onFail(err) {
              console.log(err);
            }
          });
          break;
        case 2:
          // 季度
          dd && ddApi.chosen({
            'source': item.source,
            'selectedKey': item.select,
            onSuccess: (data) => {
              // console.log(this, data, '---');
              this.data[index].select = data.key;

              this.goBackData(this.isSel);
            },
            onFail(err) {
              console.log(err);
            }
          });
          break;
        default:
      }
    },
    // 选中数据回调
    goBackData(index = 0) {
      this.$emit('onDropList', this.result, index);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.select-box{
  display flex
  flex-direction row
  justify-content space-around
  line-height px2rem(50)
  font-size px2rem(14)
  color $darkBlack
  border-bottom 1px solid $lightGray

  .select{
    display flex
    flex-direction row
    align-items center

    .img{
      width px2rem(6)
      height px2rem(4)
      margin-left px2rem(4)
    }
  }
}
</style>
