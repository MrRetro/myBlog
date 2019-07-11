# 按钮

### Props

| 字段名            | 描述           | 类型       | 默认值 |
| ----------------- | -------------- | ---------- | ------ |
| name | 按钮名称 | `String`  | null  |
| icon | 按钮图标 | `String`  | null  |
| add | 添加图标 | `Boolean`  | false  |
| disabled | 是否禁用 | `Boolean`  | null  |
| backgroundColor | 按钮背景颜色 | `String`  | '#348EED'  |
| color | 文字颜色 | `String`  | 'whiteß'  |


```js
<yi-btn-box
      name="下一步"
      :backgroundColor="'#348eed'"
      :color="'white'"
      @onBtnClick="onBtnClick"
    />
```
