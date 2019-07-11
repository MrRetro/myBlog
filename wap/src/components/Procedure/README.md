# 添加字段

### Props

| 字段名            | 描述           | 类型       | 默认值 |
| ----------------- | -------------- | ---------- | ------ |
| form | 表单数据 | `Object`  | ß  |


```js
<yi-procedure
  :form={
  title: '手续详情',
  countName: '数量',
  names: [{key: '', value: 1}],
  counts: [],
  selData: [
    {key: '车钥匙', value: 0},
    {key: '合格证', value: 1},
    {key: '行驶证', value: 2}
  ]
  }
/>
```
