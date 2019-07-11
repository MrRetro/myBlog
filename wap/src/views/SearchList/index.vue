<template>
    <FilterList
      ref="list"
      :fetch-data="mFetchData"
      :filterArray="filterArray"
      @valueChange="onValueChange"
    >
      <div v-if="!hideSearchBar" slot="header">
        <yi-search-bar :text="searchText"  @click="handleSearchClick"/>
      </div>
      <div slot="header-bottom">
        <div style="height:9px;background-color: #F3F3F3;"/>
        <div class="header-text">共 <span class="header-text-number">{{totalNumber}}</span> {{totalText}}</div>
      </div>
      <template slot-scope="{item,index}">
        <ClientCell
          v-if="module ==='customers'"
          @obtainClick="handleObtainClick"
          @onItemClick="item=>$emit('onItemClick',item)"
          :item="item"
          :sort="sort"
          :index="index"
        />
        <AgentCell
          v-if="module ==='agents'"
          @obtainClick="handleObtainClick"
          @onItemClick="item=>$emit('onItemClick',item)"
          :item="item"
          :sort="sort"
          :index="index"
        />
        <ClueCell
          v-if="module ==='clues'"
          @onItemClick="item=>$emit('onItemClick',item)"
          :item="item"
          :sort="sort"
        />
        <FollowUpRecordCell
          v-if="module ==='followUpRecords'"
          @onItemClick="(item,ins)=>$emit('onItemClick',item,ins)"
          :item="item"
          :sort="sort"
        />
        <OrderCell
          v-if="module ==='order'"
          @onItemClick="item=>$emit('onItemClick',item)"
          :item="item"
          :sort="sort"
        />
        <EnquiryCell
          v-if="module ==='enquiryPrices'"
          @onItemClick="item=>$emit('onItemClick',item)"
          :item="item"
          :sort="sort"
        />
        <EnquiryCell
          v-if="module ==='quotedPrices'"
          @onItemClick="item=>$emit('onItemClick',item)"
          :item="item"
          :sort="sort"
        />
        <QuotedRecordCell
          v-if="module ==='quotedRecords'"
          @onItemClick="item=>$emit('onItemClick',item)"
          :item="item"
          :sort="sort"
        />
        <OrderCell
          v-if="module ==='delivery'"
          @onItemClick="item=>$emit('onItemClick',item)"
          :item="item"
          :sort="sort"
        />
      </template>
    </FilterList>
</template>

<script>
import ClientCell from '../../commons/ClientCell/index';
import AgentCell from '../../commons/AgentCell/index';
import ClueCell from '../../commons/ClueCell/index';
import EnquiryCell from '../../commons/EnquiryCell/index';
import OrderCell from '../../commons/OrderCell/index';
import FollowUpRecordCell from '../../commons/FollowUpRecordCell';
import QuotedRecordCell from '../../commons/QuotedRecordCell';
import FilterList from '../../commons/FilterList';
import {obtainPerson} from '../../api/common';
import {AlertUtil} from '../../utils/AlertUtil';

export default {
  name: 'SearchList',
  components: {
    FilterList,
    ClientCell,
    AgentCell,
    ClueCell,
    FollowUpRecordCell,
    OrderCell,
    EnquiryCell,
    QuotedRecordCell
  },
  props: {
    fetchData: Function,
    hideSearchBar: Boolean,
    searchText: String,
    totalText: String,
    filterArray: Array // 筛选条件的字段
  },
  data() {
    return {
      showLoading: true,
      module: this.$route.params.module,
      showError: true,
      errorMessage: '',
      barTop: '0px',
      totalNumber: 0,
      sort: ''
    };
  },
  methods: {
    refreshData() {
      this.$refs.list.refreshData();
    },
    async mFetchData(params) {
      try {
        this.sort = params.orders && params.orders[0] && params.orders[0].name;
        params.loading = !this.showLoading;
        const res = await this.fetchData(params);
        this.totalNumber = res.totalElements;
        return res;
      } catch (e) {
        throw e;
      }
    },
    onValueChange(list) {
      this.$emit('onValueChange', list);
    },
    handleSearchClick() {
      this.$emit('searchClick');
    },
    async handleObtainClick({item}) {
      await obtainPerson({id: item.id, module: this.module});
      this.refreshData();
      AlertUtil.showToast({txt: '捞取成功', type: 'correct'});
      // this.$RouteUtil.commonDetail({id: item.id, module: this.module});
    },
    handleItemClick(item, ins) {
      console.log(item, ins);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/global.styl"

  .header-text {
    height px2rem(48)
    line-height px2rem(48)
    text-align: center
    font-size px2rem(14)
    color $darkBlack
    regular()
  }

  .header-text-number {
    color $themeColor
    medium()
  }

</style>
