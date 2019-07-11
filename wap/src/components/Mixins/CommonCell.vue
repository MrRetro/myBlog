<script>
import {removeSecond} from '../../utils/TimeUtil';

export default {
  name: 'CommonCell',
  props: {
    sort: String,
    hasShadow: Boolean,
    item: Object,
    index: Number
  },
  data() {
    return {
      type: this.$route.params.type,
      module: this.$route.params.module
    };
  },
  computed: {
    showTimeText() {
      switch (this.sort) {
        case 'failTime':
          return `失效时间:${this.removeSecond(this.item.failTime)}`;
        case 'lastFollowUpTime':
          return `跟进时间:${this.removeSecond(this.item.lastFollowUpTime)}`;
        case 'nextFollowUpTime':
          return `跟进时间:${this.removeSecond(this.item.nextFollowUpTime)}`;
        case 'obtainTime':
          return `获取时间:${this.removeSecond(this.item.obtainTime)}`;
        case 'createTime':
          if (this.module === 'enquiryPrices' || this.module === 'quotedPrices') {
            return `发起询价时间:${this.removeSecond(this.item.createTime)}`;
          }
          if (this.module === 'quotedRecords') {
            return `提交报价时间:${this.removeSecond(this.item.createTime)}`;
          }
          return `创建时间:${this.removeSecond(this.item.createTime)}`;
        case 'deliveryTime':
          return `交车时间:${this.removeSecond(this.item.deliveryTime)}`;
        case 'finishTime':
          return `完成时间:${this.removeSecond(this.item.finishTime)}`;
        case 'updateTime':
          return `跟新时间:${this.removeSecond(this.item.updateTime)}`;
        case 'clueCreateTime':
          return `线索创建时间:${this.removeSecond(this.item.clueCreateTime)}`;
        case 'quotedTime':
          return `提交报价时间:${this.removeSecond(this.item.quotedTime)}`;
        case 'enquiryTime':
          return `发起询价时间:${this.removeSecond(this.item.enquiryTime)}`;
        case 'lastActiveTime':
          return `最后活跃时间:${this.removeSecond(this.item.lastActiveTime)}`;
        default:
          if (this.module === 'quotedRecords') {
            return `提交报价时间:${this.removeSecond(this.item.createTime)}`;
          }
          return `创建时间:${this.removeSecond(this.item.createTime)}`;
      }

    }
  },
  methods: {
    handleClick() {
      this.$emit('onItemClick', this.item, this);
    },
    getLevelIcon(level) {
      switch (level) {
        case 'A':
          return this.$images.base.level_a;
        case 'B':
          return this.$images.base.level_b;
        case 'C':
          return this.$images.base.level_c;
        case 'H':
          return this.$images.base.level_h;
        case 'N':
          return this.$images.base.level_n;
        case 'S':
          return this.$images.base.level_s;
        default:
          return this.$images.base.level_no;
      }
    },
    removeSecond(dateStr, format = 'yyyy-MM-dd') {
      return removeSecond(dateStr, format) || '无';
    }
  }
};
</script>
