<template>
  <div class="container">
    <div class="input-box2">
      <cube-scroll>
        <div class="content">
          <template v-for="(item,index) in form.data">
            <div v-if="item.attr === 'customerId'" :key="'index'+index" class="id-box">
              <div
                :key="'index2'+index1"
                class="in-box"
                :class="{'self':item1.columnWidth===50}"
                v-for="(item1,index1) in form.info"
              >
                <yi-input
                  ref="info"
                  v-bind="item1"
                  v-model="item1.text"
                  :value.sync="item1.value"
                  :indent="true"
                  :selData="item1.selData || null"
                  :clearMR="item1.columnWidth===50"
                />
              </div>
            </div>
            <div
              v-else-if="item.type==='groupHeader'"
              class="section-title section-margin-top"
              :key="'index'+index">
              {{item.title}}
            </div>
            <div
              v-else
              :key="'index'+index"
              class="in-box"
              :class="{'self':item.columnWidth===50}"
            >
              <yi-input
                :ref="'va'"
                v-bind="item"
                v-model="item.text"
                :value.sync="item.value"
                :indent="true"
                :selData="item.selData || null"
                :clearMR="item.columnWidth===50 && item.attr!=='interior'"
                @onCarModel="onCarModel"
                @onGetMan="onGetMan"
                @onStore="onStore"
              />
              <!--{{item}}-->
            </div>
          </template>
          <div class="space-box"></div>
        </div>
      </cube-scroll>
    </div>
    <yi-btn-box
      :name="btnName"
      @onBtnClick="onBtnClick"
    />
  </div>
</template>

<script>
import {getAddClueModule, addClueInfo, editUserInfo, getClueEditInfo, editClueInfo} from '../../../api/clue';
import {getClientEditInfo} from '../../../api/client';
import {getStoresByUserId} from '../../../api/order';
import {inputType} from '../../../config/module';
import {getModelDetail} from '../../../api/carModel';
import EditPage from '../../../components/Mixins/EditPage';
import {ddApi} from '../../../api/dingding';
import {validate} from '../../../config/validate';
import {enterFomart, isEmptyObject} from '../../../utils/commonUtil';

export default {
  name: 'clue-add',
  extends: EditPage,
  created() {

    // 路由参数 判断是否为编辑状态或新增状态
    this.params = this.$route.params;
    let params = this.params;
    console.log(params);
    if (params && params.id) {
      this.id = params.id;
      this.form.type = 'edit';
    } else {
      this.form.type = 'add';
    }

    if (params.obj && params.obj.userId) {
      this.userId = params.obj.userId;
      this.form.info[0].text = params.obj.name;
      this.form.info[0].value = params.obj.name;
      this.form.info[1].text = params.obj.mobile;
      this.form.info[1].value = params.obj.mobile;
      this.form.info[2].text = params.obj.gender === 1 ? '女' : '男';
      this.form.info[2].value = params.obj.gender;
    }

    if (params.customerId) {
      this.userId = params.customerId;
      this.selClueFrom = true;
    } else {
      this.selClueFrom = false;
    }

    if (this.form.type === 'add') {
      if (params.customerId) {
        // 根据用户id获取用户名、性别、电话
        getClientEditInfo(params.customerId)
          .then((res) => {
            this.form.info[0].text = res.name;
            this.form.info[0].value = res.name;
            this.form.info[1].text = res.mobile;
            this.form.info[1].value = res.mobile;
            this.form.info[2].text = res.gender.name;
            this.form.info[2].value = res.gender.code;
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.getPage({});
    } else {
      // 编辑赋初值
      getClueEditInfo(this.id)
        .then((res) => {
          // 客户id设置值
          this.userId = res.customerId;

          console.log(res, '111222333');
          // 设置用户是否有订单 并处理显示
          this.whetherOrder = res.whetherOrder;
          if (this.whetherOrder) {
            // 用户不可编辑 用户信息只读
            this.form.info[0].disable = true;
            this.form.info[1].disable = true;
            this.form.info[2].disable = true;
          } else {
            // 用户信息可编辑
            this.form.info[0].disable = false;
            this.form.info[1].disable = false;
            this.form.info[2].disable = false;
          }
          this.getPage(res);
          this.edit = res;

          this.intentionType = res.intentionType.code;
        })
        .catch(err => {
          console.log(err);
        });
    }

  },
  computed: {
    btnName() {
      let id = this.id;
      return id ? '保   存' : '确认提交';
    }
  },
  activated() {
    ddApi.setRight();
  },
  data() {
    return {
      params: this.$route.params,
      initData: null,
      id: '',
      userId: '',
      selClueFrom: false, // 是否来自选择线索
      intentionType: 0, // 意向类型
      carInfo: null, // 车模回调
      whetherOrder: false, // 用户是否有订单
      form: {
        type: 'add',
        info: [
          {
            attr: 'name',
            type: 'text',
            title: '客户名称',
            text: '',
            value: null,
            placeholder: '请选择客户名称',
            rules: {required: true},
            required: true,
            indent: false,
            disable: true
          },
          {
            attr: 'mobile',
            type: 'text',
            title: '联系电话',
            text: null,
            value: null,
            placeholder: '客户联系电话',
            rules: {required: true, mobile: true},
            required: true,
            indent: false,
            disable: true
          },
          {
            attr: 'gender',
            type: 'select',
            title: '性别',
            text: null,
            value: null,
            placeholder: '请选择性别',
            rules: {required: true},
            selData: {source: []},
            required: true,
            indent: false,
            disable: true
          }
        ],
        data: []
      },
      edit: null
    };
  },
  methods: {
    isEdit() {
      return this.initData !== JSON.stringify(this.form);
    },
    onBtnClick() {
      // this.params.onSuccess && this.params.onSuccess();
      // this.$router.go(-1);
      // return;
      console.log('新建线索1');
      console.log(this.$refs.va);
      const arr = [];
      this.$refs.va.forEach((item)=>{
        if (item.rules && !isEmptyObject(item)) {
          arr.push(item.changeV());
        }
      });

      // 验证用户信息
      if (!this.whetherOrder) {
        this.$refs.info.forEach((item)=>{
          if (item.rules && !isEmptyObject(item)) {
            arr.push(item.changeV());
          }
        });
      }

      Promise.all(arr).then(data => {
        console.log('新建线索2', data);
        let state = data.every(item => item);
        console.log(state);
        if (state) {
          console.log(this.form, '校验成功并提交数据');
          // todo
          let items = {};
          this.form.data.forEach((item) => {
            if (item.attr !== 'group') {
              let val = '';
              if (item.value || item.type === 'switch') {
                val = item.value;
              } else {
                val = item.value === 0 ? 0 : item.text;
              }
              console.log(val, 'item');

              // 转换外观和内饰格式
              if (item.attr === 'appearance' || item.attr === 'interior') {
                try {
                  val && val.id && delete val.id;
                  val.colors && val.colors[0] && val.colors[0].id && delete val.colors[0].id;
                  val.colors && val.colors[1] && val.colors[1].id && delete val.colors[1].id;
                  if(typeof val === 'object'){
                    val = val && JSON.stringify(val) || '';
                  }else{
                    val = val;
                  }
                } catch (e) {
                  console.log(e);
                }
              }
              // 地面店
              if (item.attr === 'belongStoreId') {
                if (typeof item.value === 'object') {
                  val = item.value && item.value.id;
                } else if (typeof item.value === 'string') {
                  val = item.value && JSON.parse(item.value) && JSON.parse(item.value).id;
                }
              }
              if (!item.hide) {
                items[item.attr] = val;
              }

              if (item.attr === 'vehicleModelId') {
                items.carName = item.text;
                items.vehicleModelId = item.value;
              }
              if (item.attr === 'intentionGrade' && typeof item.value === 'string') {
                item.intentionGrade = parseInt(item.value);
              }
            }
          });

          items.responsibleId = items.responsibleId || '';// items.responsibleId || '032756564936690840';
          // items.teamworkIds = items.teamworkIds ? items.teamworkIds : [];
          // items.targetIds = [];
          // items.target = items.target.toString(); // 字段格式有问题====****=====
          if (typeof items.belongPlaceId === 'number') {
            items.belongPlaceId = items.belongPlaceId.toString();
          }

          items.customerId = this.userId; // '4028810a6381933101638193d0430000';
          items.intentionType = this.intentionType;

          // 如果意向是模糊 将车型id字段不传
          if (items.intentionType === 2) {
            delete items.vehicleModelId;
            delete items.carName;
          }

          console.log(items, '校验成功并提交数据--01');
          if (this.carInfo) {
            items = Object.assign({}, items, this.carInfo);
          }

          // 判断意向等级是否为空
          if (!items.intentionGrade) {
            delete items.intentionGrade;
          }

          if (this.form.type === 'add') {
            // 判断是否来自选择线索
            if (this.selClueFrom) {
              addClueInfo(items).then(() => {
                this.params.onSuccess && this.params.onSuccess();
                this.$router.go(-1);
              }).catch((err) => {
                console.log(err, '--------02---------');
              });
            } else {
              addClueInfo(items).then((res) => {
                console.log(res);
                this.$RouteUtil.clueAddSuccess({
                  ...this.params,
                  name: '新建线索',
                  id: res.id,
                  clueNo: res.clueNo
                });
                this.params.onSuccess && this.params.onSuccess();
                console.log(res, '--------01---------');

              }).catch((err) => {
                console.log(err, '--------02---------');
              });
            }
          } else if (this.form.type === 'edit') {
            // 修改用户信息
            if (!this.whetherOrder) {
              // todo
              editUserInfo({
                id: this.userId,
                name: this.form.info[0].text,
                mobile: this.form.info[1].text,
                gender: this.form.info[2].value,
                isOverride: true
              }).then((res)=>{
                if (res) {
                  // todo
                }
              }).catch(err=>console.log(err));
            }

            items.id = this.id;
            items.customerId = this.edit.customerId;
            console.log(items, '==>edit items');
            editClueInfo(items)
              .then(() => {
                this.params.onSuccess && this.params.onSuccess(items);
                this.$router.go(-1);
              })
              .catch(err => console.log(err));
          }
        }
      });
    },
    // 通过负责人联动地面店
    onGetMan(id, initial) {
      console.log(id);
      id && getStoresByUserId(id)
        .then((res) => {
          console.log(res, 'ddddd');
          // 所属区域可编辑 - 地面店无值即可编辑，有值的话为只读
          let state = false;
          this.form.data.forEach((item, index) => {
            if (item.attr === 'belongStoreId') {
              this.form.data[index].selData.source = res.stores.map((item1, index2) => {
                return {key: item1.name, value: {id: item1.id, ...res.areas[index2]}};
              });
              // 如果地面无选择列表-隐藏
              try {
                if (this.form.data[index].selData.source.length === 0) {
                  this.form.data[index].hide = true;
                  state = true;
                } else {
                  this.form.data[index].hide = false;
                  state = false;
                }
              } catch (e) {
                console.log('异常==>', e);
              }
            }
          });
          if (state) {
            this.form.data.forEach((item, index) => {
              if (item.attr === 'belongPlaceId') {
                this.form.data[index].disable = false;
              }
            });
          } else {
            this.form.data.forEach((item, index) => {
              if (item.attr === 'belongPlaceId') {
                this.form.data[index].disable = true;
              }
            });
          }

          // 是否是当前负责人 如果不是的话清空地面店和省市区
          // 清空联动内容数据
          if (!initial) {
            this.form.data.forEach((item, index)=>{
              if (item.attr === 'belongStoreId' || item.attr === 'belongPlaceId') {
                this.form.data[index].text = '';
                this.form.data[index].value = '';
              }
            });
          }

          // 初始数据保留
          if (initial) {
            this.initData = JSON.stringify(this.form);
          }
        })
        .catch(err => console.log(err));
    },
    // 选择地面店联动地址
    onStore(obj, initial = false) {
      if (obj) {
        console.log(typeof obj, '==>000');
        if (typeof obj === 'string') {
          obj = JSON.parse(obj);
        }
        if (typeof obj === 'string') {
          obj = JSON.parse(obj);
        }
        console.log(typeof obj, '==>000==>000');
        this.form.data.forEach((item, index) => {
          if (item.attr === 'belongPlaceId') {
            if (!initial) {
              console.log(obj, '==>666');
              console.log(this.form.data[index], '==>111');
              console.log(this.form.data[index].attr, '==>222');
              console.log(obj.address, '==>333');
              console.log(obj.codes, '==>444');
              console.log(obj.codes[obj.codes.length - 1], '==>555');

              this.form.data[index].text = obj.address;
              this.form.data[index].value = obj.codes && `${obj.codes[obj.codes.length - 1]}`;
            }
          }
        });
      }
    },
    // 车信息回调
    onCarModel(obj, initial) {
      console.log(obj, '==>colors');
      // 设置外观和内饰
      let innerColors = obj.data.innerColors;
      let outerColors = obj.data.outerColors;
      this.form.data.forEach((item, index) => {
        if (item.attr === 'appearance') {
          // 外观绑定车型id
          this.form.data[index].carId = obj.data.id;
          if (!initial) {
            this.form.data[index].text = '';
            this.form.data[index].value = '';
          }
          this.form.data[index].selData = outerColors;
          this.form.data[index].disable = false;
        }
        if (item.attr === 'interior') {
          // 内饰绑定车型id
          this.form.data[index].carId = obj.data.id;
          if (!initial) {
            this.form.data[index].text = '';
            this.form.data[index].value = '';
          }
          this.form.data[index].selData = innerColors;
          this.form.data[index].disable = false;
        }
      });
      if (obj.id || obj.data.id) {
        this.intentionType = 1;
      } else {
        this.intentionType = 2;
        this.carInfo = obj.data;
      }

      // 初始数据保留
      if (initial) {
        this.initData = JSON.stringify(this.form);
      }
    },
    // 获取模版
    getPage(edit) {
      console.log('--------------------');
      console.log(edit);
      // 获取枚举类别
      let form = this.menu;
      let followUpTarget = form.followUpTarget; // 跟进线索
      let followPurpose = []; // 跟进目的
      let clueAdditionalConfiguration = form.clueAdditionalConfiguration; // 车型信息
      let outerColor = null; // 外观
      let innerColor = null;// 内饰
      let clueIntentionType = form.clueIntentionType; // 意向类型
      // let clueIntentionGrade = form.clueIntentionGrade; // 意向等级
      let clueLevel = form.clueIntentionGrade; // 线索等级
      let clueShoppingWay = form.clueShoppingWay; // 购买方式
      let genderData = form.gender; // 性别
      let customerOrigin = form.customerOrigin; // 客户来源
      let customer = form.customerType; // 客户类型
      let shoppingTime = form.shoppingTime;
      let to4s = form.to4s;
      let quotation = form.quotation;
      let qualifications = form.qualifications;
      let compareNum = form.compareNum;
      let responsibleId = null; // 负责人列表

      // 获取负责人列表
      responsibleId = (this.$store.state.user.users || []).map(v=>({name: v.name, code: v.dingUserId}));
      responsibleId.length === 1 && this.onGetMan(responsibleId[0].code);
      // 用户信息 - 性别选项
      this.form.info[2].selData.source = genderData.map((item1) => {
        return {key: item1.name, value: item1.code};
      });

      // 用户名，电话，性别不可编辑独自处理
      if (edit.name) {
        this.form.info[0].text = edit.name;
      }
      if (edit.mobile) {
        this.form.info[1].text = edit.mobile;
      }
      if (edit.gender) {
        this.form.info[2].text = edit.gender.name;
        this.form.info[2].value = edit.gender.code;
      }

      // 获取添加模版
      getAddClueModule()
        .then((res) => {
          console.log(res, '=========================>success');
          let data = [];
          res.forEach((item) => {
            if (item.code === 'create-clue') {
              data = item.fields;
            }
            if (item.code === 'edit-clue') {
              data = item.fields;
            }
          });
          // 升序
          data.sort((a, b) => a.sort - b.sort);
          console.log(data, '=========================>data');
          let formData = [];
          data.forEach((item) => {
            let obj = {
              attr: item.attr,
              type: inputType[item.configsObj.type],
              title: item.name,
              text: null,
              value: null,
              placeholder: item.configsObj.placeholder,
              indent: true,
              columnWidth: item.columnWidth,
              selData: {'source': [], 'selectedKey': ''}
            };

            if (obj.attr === 'vehicleModelId' && this.selClueFrom) {
              if (this.params.type === 'add') {
                obj.singleChoose = false;
              } else {
                obj.singleChoose = true;
              }
            }

            // 外观与内饰包括其他颜色
            if (obj.attr === 'appearance' || obj.attr === 'interior') {
              obj.isOther = true;
            }

            // 禁用地面店地址选择
            if (obj.attr === 'belongPlaceId') {
              obj.disable = true;
            }

            // 编辑 数据绑定
            if (edit[obj.attr]) {
              obj.value = edit[obj.attr];
              obj.text = edit[obj.attr];

              // 意向类型
              if (obj.attr === 'intentionType') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }
              // 意向等级
              if (obj.attr === 'intentionGrade') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }
              // 购车方式
              if (obj.attr === 'shoppingWay') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }
              // 外观
              if (obj.attr === 'appearance') {
                try {
                  obj.text = JSON.parse(edit[obj.attr]).name;
                  obj.value = JSON.parse(edit[obj.attr]);
                } catch (e) {
                  obj.text = null;
                }
              }
              // 内饰
              if (obj.attr === 'interior') {
                try {
                  let name = JSON.parse(edit[obj.attr]).colors[0].name;
                  if (JSON.parse(edit[obj.attr]).colors[1]) {
                    name += `/${JSON.parse(edit[obj.attr]).colors[1].name}`;
                  }
                  obj.text = name;
                } catch (e) {
                  obj.text = null;
                }
              }
              // 客户地区
              if (obj.attr === 'area') {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }
              // 地面店铺
              if (obj.attr === 'belongStoreId') {
                obj.text = edit.storeSimpleDTO && edit.storeSimpleDTO.storeName;
                obj.value = edit.storeSimpleDTO && {id: edit.storeSimpleDTO.id};
              }
              // 备注
              if (obj.attr === 'remark') {
                obj.text = enterFomart(edit[obj.attr]);
                obj.value = enterFomart(edit[obj.attr]);
              }

              if (['compareNum', 'shoppingTime'].includes(obj.attr)) {
                obj.text = edit[obj.attr].name;
                obj.value = edit[obj.attr].code;
              }
            }

            // 是否必填
            let required = false;
            item.rulesObj && item.rulesObj.forEach((item2)=>{
              if (item2.type === 'required') {
                required = true;
              }
            });

            // 校验规则
            let rules = validate(item);
            if (required) {
              obj.required = required;
            }
            if (rules) {
              obj.rules = rules;
            }

            // 类别
            switch (item.attr) {
              case 'target':
                obj.selData.source = followUpTarget.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'purpose':
                obj.selData.source = followPurpose;
                break;
              case 'vehicleModelId':
                obj.selData.source = clueAdditionalConfiguration.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'shoppingTime':
                obj.selData.source = shoppingTime.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'compareNum':
                obj.selData.source = compareNum.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'intentionType':
                obj.selData.source = clueIntentionType.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'intentionGrade':
                obj.selData.source = clueLevel.map((item1) => {
                  return {key: item1.name, value: item1.code};
                }).filter(item2=>item2.value !== 0);
                break;
              case 'shoppingWay':
                obj.selData.source = clueShoppingWay.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'appearance':
                obj.selData = outerColor;
                break;
              case 'interior':
                obj.selData = innerColor;
                break;
              case 'gender':
                obj.selData.source = genderData.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'origin':
                obj.selData.source = customerOrigin.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'type':
                obj.selData.source = customer.map((item1) => {
                  return {key: item1.name, value: item1.code};
                });
                break;
              case 'to4s':
                obj.selData.source = [
                  {key: '是',value: true},
                  {key: '否',value: false}
                ];
                break;
              case 'quotation':
                obj.selData.source = [
                  {key: '是',value: true},
                  {key: '否',value: false}
                ];
                break;
              case 'qualifications':
                obj.selData.source = [
                  {key: '是',value: true},
                  {key: '否',value: false}
                ];
                break;
              default:
            }
            formData.push(obj);
          });
          this.form.data = formData;
          console.log(this.form.data, '---------->>>>>>>>>>');

          if (this.form.type === 'edit') {
            // 初始化页面编辑数据
            this.form.data.forEach((item, index) => {
              if (item.attr === 'vehicleModelId') {
                this.form.data[index].text = edit.carName;
                this.form.data[index].value = edit.vehicleModelId;

                if (edit.vehicleModelId) {
                  edit.vehicleModelId && edit.carName !== '模糊意向' && getModelDetail(edit.vehicleModelId)
                    .then((res1) => this.onCarModel({data: res1}, true))
                    .catch((err) => console.log(err));
                }
              }
              if (item.attr === 'responsibleId') {
                this.form.data[index].text = edit.responsibleName;
                this.form.data[index].value = edit.responsibleId;

                edit.responsibleId && this.onGetMan(edit.responsibleId, true);
              }
              if (item.attr === 'belongPlaceId') {
                this.form.data[index].text = edit.belongPlaceName;
                this.form.data[index].value = edit.belongPlaceId;
              }
            });
          }

          // 初始数据保留
          this.initData = JSON.stringify(this.form);
        })
        .catch((err) => {
          console.log(err, '==============================>err');
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl";
  .container {
    display flex
    flex-direction column
    flex 1
    overflow-y auto
    height 100%

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
          width 50%

          &:nth-child(even) .input-box{
            margin-right px2rem(14)
          }
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
