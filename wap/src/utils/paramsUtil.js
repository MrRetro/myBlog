/**
 * User: puti.
 * Time: 2018/10/29 上午9:56.
 */
import numeral from 'numeral';

export function firstUpperCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

/**
 * 根据key和type获取对象中的值
 * @param data
 * @param key
 * @param type
 * @returns {*}
 */
export function getInfoValue({ data, key, type }) {
  let str = (!!data[key] && data[key].name) || data[key];
  if (!!str && key === 'appearance') {
    let appearance = JSON.parse(str);
    str = appearance.name || '';
  }
  if (!!str && key === 'interior') {
    let interior = JSON.parse(str);
    if (interior.colors) {
      str = interior.colors.map(c => c.name).join('/');
    } else {
      str = '';
    }
  }
  if (type === 'price') {
    return `¥ ${numeral(str).format('0,0.00')}`;
  }
  return str;

}
/**
 * 简单判断是否是枚举类型
 * @param data
 * @returns {boolean}
 */
export function isEnumType(data) {
  if (typeof data !== 'object' || !data) return false;
  const keys = Object.keys(data);
  return keys.length <= 3 && keys.includes('name') && keys.includes('code');
}

/**
 * 将两级结构扁平化处理
 * @param data
 */
export function delayeringValue(data) {
  let value = {};
  Object.keys(data).forEach(item => {
    if (
      data[item] &&
      typeof data[item] === 'object' &&
      !Array.isArray(data[item]) &&
      !isEnumType(data[item])
    ) {
      Object.keys(data[item]).forEach(t => {
        value[`${item}${firstUpperCase(t)}`] = data[item][t];
      });
    } else {
      value[item] = data[item];
    }
  });
  return value;
}


/**
 * 将验证成功后的表单转为提交的参数
 * @param form      提交的表单列表数据
 * @param handle    自定义处理函数（formItem,params）=> void
 * @param other     默认拼接的数据
 * @return {{}}
 */
export function handleFormParams(form, other, handle) {
  let params = {
    ...other
  };
  form.forEach(t=>{
    if (t.type === 'fileUpload') {
      params[t.attr] = t.value.map(img=>img.url);
      // 过滤不可编辑的表单
    } else if (!t.disable) {
      params[t.attr] = t.value;
    }
    handle && handle(t, params);
  });
  return params;
}
