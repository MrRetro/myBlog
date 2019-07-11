# Container

## 介绍

这是通用的容器组件,包含一个通用导航栏,加载视图，错误视图

### Props

| Props           | Type     | Default             | Description         |
| --------------- | :------- | -------------------| ------------------- |
| title           | String   |                   | 导航栏标题            |
| showNav         | Boolean  |     false         | 显示导航栏 |
| hideClose       | Boolean  |        false      | 隐藏左边关闭按钮            |
| hideLeft        | Boolean  |      false     | 隐藏左边返回按钮         |
| showError       | Boolean  | false          | 显示错误视图          |
| showLoading     | Boolean  | false          | 显示加载视图          |

### Function

| Name      | Type                   | Description  |
| --------- | :--------------------- | ------------ |
| 暂时没有    | Params:value`[String]` | 显示一个弹窗 |

### Events

| Name            | Type                    | Description |
| --------------- | :---------------------- | ----------- |
| 暂时没有         | Params: value`[String]` | 回调事件    |

### Slot

| Name | Description |
| ---- | ----------- |
| nav-left | 导航栏左边的视图  |
| nav-right | 导航栏右边的视图  |
| loading-view | 加载视图  |
| error-view | 错误视图  |

### Example

```js
 <example-component
       ref="test"
       v-show="show"
       v-if="!remove"
       title="标题"
       :onButtonClick="onButtonClick"
       :onValueCallback="onValueCallback"
       @onValueCallback="onValueCallback"
       v-model="text"
     >
       <p slot="header">头部插槽</p>
       <p slot="footer">尾部插槽{{data}}</p>
       <p slot-scope="{item}">插槽props{{item}}</p>
     </example-component>
```
