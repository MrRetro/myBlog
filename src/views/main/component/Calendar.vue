<template>
  <div id="calendar">
    <div>
      <!-- 年份 月份 -->
      <div class="month">
        <ul>
          <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
          <p class="arrow" @click="pickPre(currentYear,currentMonth)">❮</p>
          <li class="year-month" @click="onSelTitle">
            <span class="choose-year">{{ currentYear }}年</span>
            <span class="choose-month">{{ currentMonth }}月</span>
          </li>
          <p class="arrow" @click="pickNext(currentYear,currentMonth)">❯</p>
        </ul>
      </div>
      <!-- 星期 -->
      <ul class="weekdays">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <li>日</li>
      </ul>
      <!-- 日期 -->
      <ul class="days">
        <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
        <li
          class="li"
          v-for="(dayobject, index) in days"
          :key="index"
          @click="dayobject.day.getMonth()+1 === currentMonth && handleGetByDate(dayobject.day.getFullYear(),dayobject.day.getMonth(),dayobject.day.getDate())"
          :disabled="dayobject.day.getMonth()+1 != currentMonth"
        >
          <!--本月-->
          <!--如果不是本月  改变类名加灰色-->

          <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>

          <!--如果是本月  还需要判断是不是这一天-->
          <span
            v-else
            class="day"
          >
              <!--今天  同年同月同日-->
              <span :class="{
                          'active':getNewDate(dayobject.day.getFullYear(),dayobject.day.getMonth(),dayobject.day.getDate())
                          === selDate,
                          'brage':isSpecail(dayobject.day.getFullYear(),dayobject.day.getMonth(),dayobject.day.getDate())
                         }"
              >
                {{ dayobject.day.getDate() }}
              </span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  props: {
    special: {
      type: Array,
      default: () => []
    },
    defaultDate: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isFull: true,
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      selDate: '',
      curWeek: []
    }
  },
  created () { // 在vue初始化时调用
    let d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    d.setDate(0)
    this.initData(this.getNewDate(year, month, 1))

    // 获取本周数据
    let date = new Date()
    let c = 0
    let newDays = []
    let start = 0
    let end = 0
    let data = this.days
    data.forEach((item, index) => {
      if (item.day.getFullYear() === date.getFullYear() && item.day.getMonth() === date.getMonth() && item.day.getDate() === date.getDate()) {
        c = index
      }
    })
    if (c < 7) {
      start = 0
      end = 6
    } else if (c < 14) {
      start = 7
      end = 13
    } else if (c < 21) {
      start = 14
      end = 20
    } else if (c < 28) {
      start = 21
      end = 27
    } else if (c < 35) {
      start = 28
      end = 34
    } else if (c < 42) {
      start = 35
      end = 41
    }
    for (let i = 0, len = data.length; i < len; i++) {
      if (i >= start && i <= end) {
        newDays.push(data[i])
      }
    }
    this.curWeek = newDays
  },
  mounted () {
    let date = new Date()
    let newDate = this.getNewDate(date.getFullYear(), date.getMonth(), date.getDate())
    this.selDate = newDate
  },
  activated () {
    let data = this.defaultDate.split('/')
    if (data.length >= 3) {
      this.selDate = `${data[0]}/${data[1] - 1}/${data[2]}`
    }
  },
  methods: {
    initData (cur) {
      console.log('initData')
      console.log(cur)
      // let leftcount = 0; // 存放剩余数量
      let date

      if (cur != null) {
        console.log('-------01------')
        date = new Date(cur)
      } else {
        console.log('-------02------')
        let now = new Date()
        let d = new Date(this.getNewDate(now.getFullYear(), now.getMonth(), 1))
        d.setDate(42)
        date = new Date(this.getNewDate(d.getFullYear(), d.getMonth() + 1, 1))
      }
      console.log('-------03------')
      console.log(date)
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      console.log(this.currentDay)
      console.log(this.currentMonth)
      console.log(this.currentYear)
      this.currentWeek = date.getDay() // 1...6,0
      if (this.currentWeek === 0) {
        this.currentWeek = 7
      }
      let str = this.getNewDate(this.currentYear, this.currentMonth, this.currentDay)
      this.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个
      // 初始化本周
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str)
        d.setDate(d.getDate() - i)
        let dayobject = {} // 用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day = d
        this.days.push(dayobject)// 将日期放入data 中的days数组 供页面渲染使用
      }
      // 其他周
      for (let i = 1; i <= 42 - this.currentWeek; i++) {
        let d = new Date(str)
        d.setDate(d.getDate() + i)
        let dayobject = {}
        dayobject.day = d
        this.days.push(dayobject)
      }
    },
    pickPre (year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      let d = new Date(this.getNewDate(year, month, 1))
      d.setDate(0)
      let newYear = d.getFullYear()
      let newMonth = d.getMonth() + 1
      this.initData(this.getNewDate(newYear, newMonth, 1))

      console.log(newYear, newMonth, '------0000')
      this.$emit('onMonth', `${newYear}/${newMonth}`)
    },
    pickNext (year, month) {
      let d = new Date(this.getNewDate(year, month, 1))
      d.setDate(42)
      let newYear = d.getFullYear()
      let newMonth = d.getMonth() + 1
      this.initData(this.getNewDate(newYear, newMonth, 1))

      console.log(newYear, newMonth, '------1111')
      this.$emit('onMonth', `${newYear}/${newMonth}`)
    },
    // 年月日格式为yyyy-MM-dd
    getNewDate (year, month, day) {
      if (month > 12) {
        year += 1
        month = 1
      }
      return `${year}/${month}/${day}`
    },
    // 判断是否是特别的日子
    isSpecail (year, month, day) {
      let date = this.getNewDate(year, month + 1, day)
      if (this.special.indexOf(date) >= 0) {
        return true
      }
      return false
      // let d = new Date();
      // if (year === d.getFullYear() && month === d.getMonth() && day === d.getDate()) {
      //   return true;
      // }
      // return false;
    },
    // 收起日历回到
    onCalendarClick () {
      this.isFull = !this.isFull
    },
    // 选中日期
    handleGetByDate (year, month, day) {
      let newDate = this.getNewDate(year, month, day)
      this.selDate = newDate
      this.$emit('onSelDate', this.getNewDate(year, month + 1, day))
    },
    // 选中今天
    handleSelToday () {
      console.log('today')
      let d = new Date()
      this.selDate = this.getNewDate(d.getFullYear(), d.getMonth(), d.getDate())
      this.initData(this.getNewDate(d.getFullYear(), d.getMonth() + 1, 1))
      this.$emit('onSelDate', this.getNewDate(d.getFullYear(), d.getMonth() + 1, d.getDate()))
    },
    // 通过日期选择日历
    setDay (date) {
      let arr = date.split('/')
      this.initData(this.getNewDate(arr[0], arr[1], arr[2]))
    },
    // 选中日历标题
    onSelTitle () {
      // this.$emit('onSelTitle');
      // 弹出时间选择
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '选择日期',
          min: new Date(2008, 7, 8),
          max: new Date(2050, 9, 20),
          value: new Date(),
          onSelect: this.selectHandle
        })
      }

      this.datePicker.show()
    },
    selectHandle (date, selectedVal) {
      console.log(selectedVal)
      // 根据日期刷新日历
      let month = selectedVal[1] - 1
      this.selDate = `${selectedVal[0]}/${month}/${selectedVal[2]}`
      this.initData(this.getNewDate(selectedVal[0], selectedVal[1], 1))
      this.$emit('onSelDate', this.getNewDate(selectedVal[0], selectedVal[1], selectedVal[2]))
    }
  }
}
</script>

<style scoped>
  #calendar{
    width:100%;
    margin: 0 auto;
    font-size: 14px;
  }
  .curWeek{
    text-align: left;
    font-size: 16px;
    color: #31363B;
    padding-top: 24px;
    padding-bottom: 14px;
    padding-left: 15px;
  }
  .month {
    width: 100%;
  }
  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .year-month {
    font-size: 16px !important;
    color: #348EED !important;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .arrow {
    padding: 15px;
    cursor: pointer;
  }
  .month ul li {
    color: #B0B0B0;
    font-size: 20px;
    text-transform: uppercase;
  }
  .month .choose-year, .month .choose-month{
    font-weight: bold !important;
  }
  .weekdays {
    margin: 0;
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    color: #31363B;
    justify-content: space-around;
  }
  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }
  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding-bottom: 6px;
    padding-top: 6px;
    font-size: 14px !important;
    color: #727272;
  }
  .days li span{
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    display: inline-block;
  }
  .days li .active {
    border-radius: 50%;
    background: #348EED;
    color: #fff;
  }
  .days li .active.brage{
    color: white;
  }
  .days li .active.brage:before{
    background-color: white;
  }
  .days li .brage{
    position: relative;
    color: #348EED;
  }
  .days li .brage:before{
    content:'';
    position: absolute;
    left: 0px;
    bottom: 4px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #348EED;
  }
  .days li .other-month {
    color: #B0B0B0;
  }
  .days li:hover {
    /*background: #e1e1e1;*/
  }
  .btn-box .btn{
    padding: 6px 0px 20px;
    font-size: 14px;
    color: #348EED;
    display: inline-block;
  }
  .btn-box img{
    width: 10px;
    display: inline-block;
  }
</style>
