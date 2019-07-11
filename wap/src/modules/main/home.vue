 <template>
    <div class="home-box" @click.stop>
      <Notice
        v-if="news && news.title || ''"
        :form="{
            id: '1',
            title: news && news.title || ''
          }"
        @onAdClick="onAdClick"
      />
      <cube-scroll>
        <User
          :form="{
            img: $store.state.user.avatar,
            name: $store.state.user.name
          }"
          @onUser="onUser"
        />
        <p class="title">- 待办事项 -</p>
        <cube-scroll class="scroll" direction="horizontal">
          <div class="cards-box">
            <template v-for="(item,index) in backlog">
              <Dealcard
                :key="index"
                v-bind="item"
                :color="backlogEnum[index%6]"
                @onBacklog="onBacklog"
              />
            </template>
            <p class="p-space">
              <span class="sp-space"></span>
            </p>
          </div>
        </cube-scroll>
        <p class="title">- 数据看板 -</p>
        <!--{{selData}}-->
        <DropList
          :form="selData"
          @onDropList="onDropList"
        />
        <div class="board-list mb">
          <template v-for="(item,index) in boardList">
            <Board
              v-show="index < 4 || !isMore"
              :key="index"
              v-bind="item"
              :color="boardListEnum[index%11]"
              @onType="onType"
            />
          </template>
          <yi-touch v-if="boardList.length>4" class="more-box" @click="isMore=!isMore">
            {{isMore?'展开数据':'收起数据'}}
            <img v-if="isMore" :src="$images.all.angle_more_d" alt="img">
            <img v-else :src="$images.all.angle_more_u" alt="img">
          </yi-touch>
        </div>
        <!--<p class="title">- 销售漏斗 -</p>-->
        <!--<DropList-->
          <!--:form="selData"-->
          <!--@onDropList="onDropList"-->
        <!--/>-->
        <div class="board-list">
          <!--<Funnel />-->
        </div>
      </cube-scroll>
    </div>
 </template>

<script>
import {
  Notice,
  User,
  Dealcard,
  DropList,
  Board,
  UpdateCell,
  Funnel
} from './components';
import {
  getWorkbench,
  getYears,
  getWorkDataBoard,
  getWorkDataBoardByUser,
  getWorkDataBoardByDep,
  getUpdateMatter,
  getKnown,
  getNotification
} from '../../api/work';

export default {
  name: 'home-box',
  components: {
    Notice,
    User,
    Dealcard,
    DropList,
    Board,
    UpdateCell,
    Funnel
  },
  created() {
    this.$nextTick(()=>{
      // 待办事项列表
      getWorkbench({id: this.$store.state.user.id})
        .then(res=>{
          console.log('--->>>>>>', res);
          this.backlog = res.map((item=>({
            form: {
              code: item.type.code,
              title: item.type.name,
              count: item.total_num,
              addCount: item.today_num
            }
          })));

          console.log('--->>>>>>1', this.backlog);
        })
        .catch(err=>console.log(err));

      // 获取筛选数据
      const department = this.$store.state.user.departments.map(item=>({key: item.name, value: item.id}));
      const month = [
        {value: 13, key: '全年'},
        {value: 14, key: '上半年'},
        {value: 15, key: '下半年'},
        {value: 1, key: '一月'},
        {value: 2, key: '二月'},
        {value: 3, key: '三月'},
        {value: 4, key: '四月'},
        {value: 5, key: '五月'},
        {value: 6, key: '六月'},
        {value: 7, key: '七月'},
        {value: 8, key: '八月'},
        {value: 9, key: '九月'},
        {value: 10, key: '十月'},
        {value: 11, key: '十一月'},
        {value: 12, key: '十二月'}
      ];
      this.selData[0].source = department;
      this.selData[0].select = department[0].key;
      this.selData[2].source = month;
      this.selData[2].select = month[0].key;
      getYears()
        .then(res=>{
          this.selData[1].source = res.map(item=>({key: item, value: item}));
          this.selData[1].select = this.selData[1].source[0].key;
        })
        .catch(err=>console.log(err));

      // 数据看板
      this.reflashData({year: new Date().getFullYear(), month: 13, departmentId: this.$store.state.user.departments[0].id});
    });
  },
  mounted() {
    this.$nextTick(async ()=>{
      // 新闻公告
      const news = await getNotification();
      this.news = news;
      console.log('==>news', news);
      // 版本更新事项
      const data = await getUpdateMatter();
      if (data && data !== [] && data.length !== 0) {
        this.$AlertUtil.show('dialogInfo', {
          version: true,
          title: '版本更新事项',
          btnCancel: '稍后提醒',
          btnSure: '我已知晓',
          content: data,
          onSuccess: (data1) => {
            if (data1 && data1.state) {
              // 我已知晓
              getKnown()
                .catch(err=>console.log(err));
            }
          }
        });
      }

      // 初始数据看板
      // this.getDataBoard({year: 2018, month: 13, departmentId: ''});
    });
  },
  computed: {
    // 待办颜色枚举
    backlogEnum() {
      return [
        'violet', 'pink', 'orange',
        'coffee', 'blue', 'yellow'
      ];
    },

    // 看板颜色枚举
    boardListEnum() {
      return [
        'pink', 'gray', 'lightBlue', 'green', 'blue',
        'red', 'pink', 'deepBlue', 'yellow', 'orange',
        'voilet'
      ];
    }
  },
  watch: {
    selData(vl) {
      // 改变看板数据
      console.log('vl==>', vl);
    },
    isSel(vl) {
      console.log(vl, this.selData);
      this.getDataBoard({year: this.year, month: this.month, id: this.departmentId});
    }
  },
  data() {
    return {
      // 待办事项
      backlog: [
        // {
        //   color: 'violet',
        //   form: {
        //     title: '待确认合同',
        //     count: 1233,
        //     addCount: 1342
        //   }
        // },
        // {
        //   color: 'pink',
        //   form: {
        //     title: '待分配线索',
        //     count: 7340,
        //     addCount: 56
        //   }
        // },
        // {
        //   color: 'orange',
        //   form: {
        //     title: '待发起订车',
        //     count: 454,
        //     addCount: 56
        //   }
        // },
        // {
        //   color: 'coffee',
        //   form: {
        //     title: '待完成线索跟进计划',
        //     count: 90,
        //     addCount: 32
        //   }
        // },
        // {
        //   color: 'blue',
        //   form: {
        //     title: '待确认车辆到店',
        //     count: 120,
        //     addCount: 32
        //   }
        // },
        // {
        //   color: 'yellow',
        //   form: {
        //     title: '待报价',
        //     count: 64,
        //     addCount: 56
        //   }
        // }
      ],
      // 看板数据
      boardList: [
        // {
        //   type: 'clue',
        //   color: 'pink',
        //   title: '新增线索',
        //   count: '42'
        // },
        // {
        //   type: 'clue',
        //   color: 'gray',
        //   title: '无效线索',
        //   count: '4252'
        // },
        // {
        //   type: 'order',
        //   color: 'lightBlue',
        //   title: '订单战败',
        //   count: '122'
        // },
        // {
        //   type: 'custorm',
        //   color: 'green',
        //   title: '新增客户',
        //   count: '55'
        // },
        // {
        //   type: 'agent',
        //   color: 'blue',
        //   title: '新增经纪人',
        //   count: '30'
        // },
        // {
        //   type: 'inuiqry',
        //   color: 'red',
        //   title: '新增询价单',
        //   count: '905'
        // },
        // {
        //   type: 'inuiqry',
        //   color: 'pink',
        //   title: '取消询价单',
        //   count: '11'
        // },
        // {
        //   type: 'quoted',
        //   color: 'deepBlue',
        //   title: '新增报价单',
        //   count: '76'
        // },
        // {
        //   type: 'quoted',
        //   color: 'yellow',
        //   title: '取消报价单',
        //   count: '1'
        // },
        // {
        //   type: 'quotedRecord',
        //   color: 'orange',
        //   title: '采纳报价记录',
        //   count: '3'
        // },
        // {
        //   type: 'quotedRecord',
        //   color: 'voilet',
        //   title: '生成报价记录',
        //   count: '8'
        // }
      ],
      // 上一次筛选选项
      initialSels: null,
      // 筛选项
      selData: [
        {
          type: 'select',
          select: ''
          // source: [{'key': '全公司', 'value': '0'}]
        },
        {
          type: 'date',
          select: ''
          // source: [{'key': '2018', 'value': '2018'}]
        },
        {
          type: 'select',
          select: ''
          // source: [{'key': '全年', 'value': '0'}]
        }
      ],
      // 公告
      news: null,
      // 筛选项
      year: '',
      month: '',
      departmentId: '',
      isMore: true
    };
  },
  methods: {
    // 跳转个人中心
    onUser() {
      this.$RouteUtil.clientEditInfo({});
    },
    // 公告点击通知回调
    onAdClick(id) {
      console.log(id);
      this.$AlertUtil.show('dialogInfo', {
        title: '新增自营店',
        btnSure: '确定',
        content: this.news.content,
        onSuccess: (data)=>{
          console.log(data);
        }
      });
    },
    // 待办事项点击回调
    onBacklog(obj) {
      // console.log(obj.type);
      console.log(obj);

      switch (obj.data.code) {
        case 'undoneCustomer':
          // 待完成客户跟进计划数
          console.log('待完成客户跟进计划数');
          this.$RouteUtil.commonPlanAll({module: 'followUpPlans', type: 'customer'});
          break;
        case 'undoneClue':
          // 待完成线索跟进计划数
          console.log('待完成线索跟进计划数');
          this.$RouteUtil.commonPlanAll({module: 'followUpPlans', type: 'clue'});
          break;
        case 'undoneAgent':
          // 待完成经纪人跟进计划数
          console.log('待完成经纪人跟进计划数');
          this.$RouteUtil.commonPlanAll({module: 'followUpPlans', type: 'agent'});
          break;
        case 'unallocatedClue':
          // 待分配线索
          console.log('待分配线索');
          this.$RouteUtil.searchList({module: 'clues', type: 'sea'});
          break;
        case 'unQuotedPrice':
          // 待报价
          console.log('待报价');
          this.$RouteUtil.searchList({module: 'quotedPrices', type: 'all'});
          break;
        default:
      }
    },
    // 大分类筛选
    onDropList(data, type) {
      // 数据看板
      data && this.reflashData({year: data[1], month: data[2], departmentId: data[0]}, type);
      console.log(data, 'onDropList');

      this.year = data[1];
      this.month = data[2];
      this.departmentId = data[0];
    },
    // 类别选择
    onType(type) {
      console.log(type);
      switch (type) {
        case 'newClue':
          // 新建线索数
          console.log('新建线索数');
          this.$RouteUtil.searchList({module: 'clues',
            type: 'all',
            condition: {},
            'orders': [{
              'name': 'createTime',
              'order': 'desc'
            }]});
          break;
        case 'invalidClue':
          // 无效线索数
          console.log('无效线索数');
          this.$RouteUtil.searchList({module: 'clues', type: 'all', condition: {status: [6]}});
          break;
        case 'orderFailed':
          // 订单战败数
          console.log('订单战败数');
          this.$RouteUtil.searchList({module: 'followUpRecords', type: 'customer', condition: {status: [5]}});
          break;
        case 'newCustomer':
          // 新增客户
          console.log('新增客户');
          this.$RouteUtil.searchList({module: 'customers',
            type: 'all',
            condition: {},
            'orders': [{
              'name': 'createTime',
              'order': 'desc'
            }]});
          break;
        case 'newBroker':
          // 新增经纪
          console.log('新增经纪');
          this.$RouteUtil.searchList({module: 'agents',
            type: 'all',
            condition: {},
            'orders': [{
              'name': 'createTime',
              'order': 'desc'
            }]});
          break;
        case 'newEnquiry':
          // 新增询价单
          console.log('新增询价单');
          this.$RouteUtil.searchList({module: 'enquiryPrices',
            type: 'all',
            condition: {},
            'orders': [{
              'name': 'clueCreateTime',
              'order': 'desc'
            }]});
          break;
        case 'cancelEnquiry':
          // 取消询价单
          console.log('取消询价单');
          this.$RouteUtil.searchList({module: 'enquiryPrices',
            type: 'all',
            condition: {status: [2]}
          });
          break;
        case 'newQuotes':
          // 新增报价单
          console.log('新增报价单');
          this.$RouteUtil.searchList({module: 'quotedPrices',
            type: 'all',
            condition: {},
            'orders': [{
              'name': 'clueCreateTime',
              'order': 'desc'
            }]});
          break;
        case 'cancelQuotes':
          // 取消报价单
          console.log('取消报价单');
          this.$RouteUtil.searchList({
            module: 'quotedPrices',
            type: 'all',
            condition: {status: [2]}
          });
          break;
        case 'adoptQuotesRecord':
          // 采纳报价记录
          console.log('采纳报价记录');
          this.$RouteUtil.searchList({
            module: 'quotedPrices',
            type: 'all',
            condition: {acceptStatus: [1]}
          });
          break;
        case 'generateQuotesRecord':
          // 新建线索数
          console.log('生成报价记录');

          this.$RouteUtil.searchList({module: 'quotedRecords',
            type: 'all',
            condition: {},
            'orders': [{
              'name': 'clueCreateTime',
              'order': 'desc'
            }]});
          break;
        default:
      }
    },
    // 数据看板刷新
    reflashData(obj, type) {
      let state = false;
      if (JSON.stringify(this.initialSels) !== JSON.stringify(obj)) {
        this.initialSels = obj;
        state = true;
      }
      // 数据看板
      state && this.getDataBoard({year: obj.year, month: obj.month, departmentId: obj.departmentId}, type);
      // .then(res=>{
      //   console.log('-->res111', res);
      //   this.boardList = res.map(item=>({
      //     type: item.type.code,
      //     title: item.type.name,
      //     count: item.num
      //   }));
      // })
      // .catch(err=>console.log(err));
    },
    async getDataBoard(obj, type = 0) {
      let newObj = {year: obj.year, month: obj.month, id: obj.departmentId};
      switch (type) {
        case 0:
          // debugger;
          this.setBoardList(await getWorkDataBoard(
            newObj
          ));
          break;
        case 1:
          // debugger;
          this.setBoardList(await getWorkDataBoardByUser(
            newObj
          ));
          break;
        case 2:
          // debugger;
          this.setBoardList(await getWorkDataBoardByDep(
            newObj
          ));
          break;
        default:
      }
      // getWorkDataBoard(newObj)
      //   .then(res=>{
      //     this.boardList = res.map(item=>({
      //       type: item.type.code,
      //       title: item.type.name,
      //       count: item.num
      //     }));
      //   })
      //   .catch(err=>console.log(err));
    },
    setBoardList(res) {
      this.boardList = res.map(item=>({
        type: item.type.code,
        title: item.type.name,
        count: item.num
      }));
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~styles/global.styl";
.home-box{
  display flex
  flex-direction column
  justify-content flex-start
  position absolute
  top 0
  bottom 0
  left 0
  right 0

  .title{
    display flex
    flex-direction row
    justify-content center
    font-size px2rem(16)
    margin px2rem(16) 0
    font-weight bold
    color $deepBlack
  }
  .cards-box{
    width 100%
    display flex
    flex-direction row
    padding-bottom px2rem(30)

    & >>> .deal-box:first-child{
      margin-left px2rem(14)
    }

    & >>> .deal-box:last-child{
      border-right px2rem(14)
      margin-right px2rem(60)
    }
    .p-space{
      display flex
      height 100%
      .sp-space{
        width px2rem(1)
        height px2rem(10)
      }
    }
  }
  .board-list{
    display flex
    flex-direction row
    flex-wrap wrap
    padding-top px2rem(6)
    margin-bottom px2rem(80)

    &.mb{
      margin-bottom px2rem(50)
    }
    .more-box{
      display flex
      width 100%
      flex-direction row
      justify-content center
      align-items center
      margin-top px2rem(24)
      color #348EED

      img{
        width px2rem(10)
        margin-left px2rem(6)
      }
    }
  }
  .scroll >>> .cube-scroll-content {
    overflow hidden
    transform: rotate(0deg)
    display: inline-block
    width 100%
  }
}
</style>
