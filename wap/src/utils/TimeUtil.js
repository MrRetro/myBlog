/* eslint-disable no-extend-native,func-names */
/**
 * User: puti.
 * Time: 2018/6/8 下午2:22.
 */

Date.prototype.format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return fmt;
};


/**
 * 获取与当前时间间隔 day天的时间  格式yyyy-MM-dd hh:mm:ss
 * @param day
 * @returns {*}
 * @param format yyyy-MM-dd hh:mm:ss
 */
export const getSpaceDate = (day = 0, format = 'yyyy-MM-dd hh:mm:ss') => {
  return new Date(Date.now() - 24 * 60 * 60 * 1000 * day).format(format);
};

/**
 * 时间格式化 yyyy/MM/dd
 * @param year            年份
 * @param month           月份(系统系统默认从0开始)
 * @param day             日期
 * @returns {string}
 */
export const getDateFormat = (year, month, day) => {
  if (month > 12) {
    year += 1;
    month = 1;
  }
  return `${year}/${month}/${day}`;
};

/**
 * 将日期格式转成 日期+时分秒
 * @param inputTime
 * @returns {string}
 */
export const formatDateTime = (inputTime) => {
  let date = new Date(inputTime);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? (`0${m}`) : m;
  let d = date.getDate();
  d = d < 10 ? (`0${d}`) : d;
  let h = date.getHours() - 8;
  h = h < 10 ? (`0${h}`) : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? (`0${minute}`) : minute;
  second = second < 10 ? (`0${second}`) : second;
  return `${y}-${m}-${d} ${h}:${minute}:${second}`;
};


/**
 * 移除时间细节
 * @param dataStr
 * @param format
 * @returns {*}
 */
export const removeSecond = (dataStr, format = 'yyyy-MM-dd') => {
  if (!dataStr) return dataStr;
  return new Date(dataStr.replace(/-/g, '/')).format(format);
};
