/**
 * User: retro.
 * Time: 2018/8/24
 */

export class ChangeType {
  // 任意类型转换
  static xToType(target, type) {
    try {
      let value = target;
      console.log(target, type);
      if (value || value === 0) {
        switch (type.toLowerCase()) {
          case 'string':
            if (target === 0) {
              value = '0';
            } else if (target instanceof Object) {
              value = JSON.stringify(target);
            } else {
              value = `${target}`;
            }
            break;
          case 'number':
            value = parseInt(target);
            break;
          case 'double':
          case 'float':
            value = parseFloat(target);
            break;
          case 'json':
            value = JSON.parse(target);
            break;
          default:
        }
      }
      return value;
    } catch (e) {
      console.log('错误信息：', e);
      return target;
    }
  }
}
