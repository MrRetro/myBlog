/**
 * User: retro.
 * Time: 2018/7/23
 */

// 表单验证
export const validate = (obj)=>{
  let objs = {};
  if (obj.rulesObj && obj.rulesObj.length > 0) {
    obj.rulesObj.forEach((item2) => {
      if (item2.type === 'pattern') {
        objs[item2.value] = true;
      } else {
        objs[item2.type] = parseInt(item2.value) || item2.value;
      }
    });
  }
  return objs;
};
