/* eslint-disable no-restricted-properties */
let lastExecuteTime = 0;

/**
 * 是否连续快速执行两次方法
 * @param time  延迟时间
 * @returns {boolean}
 */
export const isFastExecute = (time = 1000) => {
  if (Date.now() - lastExecuteTime < time) {
    return true;
  }
  lastExecuteTime = Date.now();
  return false;
};
/**
 * 对象深拷贝方法
 * @param source
 * @returns {*}
 */
export const objDeepCopy = (source) => {
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
  }
  return sourceCopy;
};

/**
 * 粗略计算两个经纬度之间的距离
 * @param lat1  第一个维度
 * @param lng1  第一个经度
 * @param lat2  第二个维度
 * @param lng2  第二个经度
 * @returns {number}
 */
export function getDistance(lat1, lng1, lat2, lng2) {
  let radLat1 = lat1 * Math.PI / 180.0;
  let radLat2 = lat2 * Math.PI / 180.0;
  let a = radLat1 - radLat2;
  let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s *= 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10;
  return s;
}


/**
 * 转变颜色
 * @param color
 * @returns {*}
 */
export function transformColorName(color) {
  if (!color) return '';
  if (typeof color === 'string') {
    try {
      color = JSON.parse(color);
    } catch (e) {
      return '';
    }
  }
  if (color.colors && color.colors.length !== 0) {
    if (color.colors.length === 1) {
      return color.colors[0].name;
    }
    return `${color.colors[0].name}/${color.colors[1].name}`;
  }
  return color.name;

}

/**
 * 车型颜色解析
 * @param colors
 * @returns {*}
 */
export function tranformColors(colors) {
  // 返回 [{name:'颜色',colors: {size: 1, color: ['', '']}}]
  let list = [];
  let name = '';
  let size = 1;
  let color = ['', ''];
  list = colors.map((item) => {
    if (item.colors) {
      size = item.colors.length;
      name = size === 1 ? item.colors[0].name : `${item.colors[0].name}/${item.colors[1].name}`;
      color = size === 1 ? ['#ffffff', item.colors[0].hex] : [item.colors[0].hex, item.colors[1].hex];
    } else {
      size = 1;
      name = item.name;
      color = ['#ffffff', item.hex];
    }
    return {name, colors: {size, color}};
  });
  return list;
}

export function tranformColorsApi(colors, type = 'innerColors') {
  // [{name:'颜色',colors: {size: 1, color: ['', '']}}]
  let list = '';
  let size = colors.colors.size;
  let name = colors.name;
  if (type === 'innerColors') {
    if (size === 1) {
      list = `{"colors": [{"hex": "${colors.colors.color[1]}", "name":"${name}"}]}`;
    } else if (size === 2) {
      list = `{"colors": [{"hex": "${colors.colors.color[0]}", "name": "${name.split('/')[0]}"},
      {"hex": "${colors.colors.color[1]}", "name": "${name.split('/')[1]}"}]}`;
    } else {
      list = null;
    }
  } else if (type === 'outerColors') {
    if (size === 1) {
      list = `{"hex": "${colors.colors.color[1]}", "name":"${name}"}`;
    } else if (size === 2) {
      list = `{"colors": [{"hex": "${colors.colors.color[0]}", "name": "${name.split('/')[0]}"},
      {"hex": "${colors.colors.color[1]}", "name": "${name.split('/')[1]}"}]}`;
    } else {
      list = null;
    }
  }
  list = JSON.parse(list);
  if (list.colors && list.colors[0].name === '无') {
    list = null;
  } else if (list.name && list.name === '无') {
    list = null;
  }
  list = list === null ? null : JSON.stringify(list);
  console.log(list, ' ++++++++++++++++++');
  return list;
}

/**
 * 处理时间字符串
 * @returns {*}
 * @param time
 */
export function handleDateString(time) {
  if (!time) return undefined;
  let split = time.split(' ');
  if (split.length === 1) {
    return `${split[0]} 12:00:00`;
  }
  return time;
}

/**
 * 颜色值转全局组件格式
 * @returns {{name: string, colors: {size: number, color: string[]}}}
 * @param obj
 */
export function tranformColorsComponent(obj) {
  let newObj = {
    name: '',
    colors: {
      size: 1,
      color: ['#ffffff', '']
    }
  };
  let hex = '';
  if (obj.name) {
    newObj.name = obj.name;
    hex = obj.hex ? obj.hex : '';
    newObj.colors.color = ['#ffffff', hex];
  } else if (obj.colors) {
    newObj.name = obj.colors[0].name;
    newObj.colors.size = obj.colors.length;
    if (newObj.colors.size === 1) {
      hex = obj.hex ? obj.hex : '';
      newObj.colors.color = ['#ffffff', hex];
    } else {
      hex = obj.colors[1].hex ? obj.colors[1].hex : '';
      newObj.colors.color = [obj.colors[0].hex, hex];
    }
  }
  return newObj;
}


/**
 * 根据tag将表单自动转化成接口请求数据
 * @param form
 */
export const handleForm = (form) => {
  let params = {};
  form.filter(item => item.tag).forEach(item => {
    if (item.tag === 'nextExecutionTime') {
      params[item.tag] = handleDateString(item.value);
    } else if (item.value || item.value === 0) {
      params[item.tag] = item.value;
    } else {
      params[item.tag] = item.text;
    }
  });
  return params;
};


/**
 * 根据tag将表单自动转化成接口请求数据
 * @param menu
 */
export const handleMenuSource = (menu) => {
  return menu.map(item => ({key: item.name, value: item.code}));
};


export function hashCode(str) {
  let h = 0;
  let len = str.length;
  let t = 2147483648;
  for (let i = 0; i < len; i++) {
    h = 31 * h + str.charCodeAt(i);
    if (h > 2147483647) h %= t;
  }
  return h;
}

/**
 * 16进制颜色转 rgba颜色
 * @param target
 * @returns {string}
 */
export function colorRgb(target) {
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = target && target.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    let sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
    }
    return `rgba(${sColorChange.join(',')},0.5)`;
  }
  return sColor;
}

/**
 * 数据库回车转成html中textarea换行
 * @param str
 * @returns {*}
 * @constructor
 */
export function enterFomart(str) {
  try {
    return str.replace(/\\n|\\r|(\\r\\n)|(\u0085)|(\u2028)|(\u2029)/g, '\r\n');
  } catch (e) {
    return str;
  }
}

/**
 * 判断是否为空对象
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
  // 判断是否禁用
  if (obj.disable) {
    return true;
  }
  for (let key in obj.rules) {
    return false;
  }
  return true;
}

/**
 * 阿拉伯数字转大写中文
 * */
export function changeMoneyToChinese(money) {
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; // 汉字的数字
  let cnIntRadice = ['', '拾', '佰', '仟']; // 基本单位
  let cnIntUnits = ['', '万', '亿', '兆']; // 对应整数部分扩展单位
  let cnDecUnits = ['角', '分', '毫', '厘']; // 对应小数部分单位
  // var cnInteger = "整"; //整数金额时后面跟的字符
  let cnIntLast = '台'; // 整型完以后的单位
  let maxNum = 999999999999999.9999; // 最大处理的数字

  let IntegerNum; // 金额整数部分
  let DecimalNum; // 金额小数部分
  let ChineseStr = ''; // 输出的中文金额字符串
  let parts; // 分离金额后用的数组，预定义
  if (money === '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    console.log('超出最大处理数字');
    return '';
  }
  if (money === 0) {
    // ChineseStr = cnNums[0]+cnIntLast+cnInteger;
    ChineseStr = cnNums[0] + cnIntLast;
    // document.getElementById("show").value=ChineseStr;
    return ChineseStr;
  }
  money = money.toString(); // 转换为字符串
  if (money.indexOf('.') === -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split('.');
    IntegerNum = parts[0];
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum) > 0) { // 获取整型部分转换
    let zeroCount = 0;
    let IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = IntegerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (n === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0];
        }
        zeroCount = 0; // 归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q];
      }
    }
    ChineseStr += cnIntLast;
    // 整型部分处理完毕
  }
  if (DecimalNum !== '') { // 小数部分
    let decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = DecimalNum.substr(i, 1);
      if (n !== '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseStr === '') {
    // ChineseStr += cnNums[0]+cnIntLast+cnInteger;
    ChineseStr += cnNums[0] + cnIntLast;
  }
  return ChineseStr;
}

// 判断当前是什么设备
export function isDevice(type) {
  let u = navigator.userAgent;
  let app = null;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  switch (type) {
    case 'android':
      app = isAndroid;
      break;
    case 'ios':
      app = isIOS;
      break;
    default:
  }
  return app;
}

/**
 * 生成唯一Id
 * @param length
 * @returns {string}
 */
export function createSoleID(length = 3) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
