# 输入框

### Props

| 字段名            | 描述           | 类型       | 默认值 |
| ----------------- | -------------- | ---------- | ------ |
| rules | 验证规则 | `Object`  | null  |
| type | 类型'text','tel','textarea',grade   | `String`  | null  |
| text | 输入内容的值 | `String | Array | Object`  | null  |
| value | 选择框真正选择的值 | `String | Array | Object`  | null  |
| title | 输入框左边标题   | `String`  | null  |
| focus2 | 模拟获取焦点状态 (显示焦点状态线)  | `Boolean`  | false  |
| placeholder | 输入框为空时显示的值   | `String`  | null  |
| required | 提示必填   | `Boolean`  | false  |
| disable | 是否禁用(针对select类型)   | `Boolean`  | false  |
| line | 是否显示下划线   | `Boolean`  | true  |
| value | 输入框值   | `String`  | null  |
| indent | 缩进   | `Boolean`  | true  |
| selData | 下来框选择内容  | `Object`  | {'source': [{'key': '选项1', 'value': 1}, {'key': '选项2', 'value': 2}], 'selectedKey': '选项1'}  |
| onClick | 回调函数  | `Function`  | null  |
| clearMR | 右外边距设置为0  | `Boolean`  | false  |
| params | 参数列表  | `Object`  | null |
| singleChoose | 是否没有模糊车型  | `Boolean`  | false |
| unit | 文本单位显示  | `String`  | '' |
| direction | 排列方向  | `Boolean`  | false |
| link | 外链  | `Boolean`  | false |
| warnInfo | 警告信息  | `String`  | '' |

### Events
| 方法名       | 描述     |
| ------------ | -------- |
| changeV  | 校验 |
| setText  | 设置父级传进来的v-model值 |

```js
<yi-input
  ref="va"
  :type="select"
  :title="我是标题"
  v-model="form.value"
  :placeholder="我是值为空的时候显示的"
  :indent="false"
  :selData="{'source': [{'key': '选项1', 'value': 1}, {'key': '选项2', 'value': 2}], 'selectedKey': '选项1'}"
  :rules="{required: true}"
/>
```
