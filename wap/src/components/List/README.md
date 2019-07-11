# List

## 介绍

基于滴滴Scroll组件封装项目通用List组件。自定义上拉下拉布局。添加空视图，简化使用方法

### Props

| Props           | Type     | Default             | Description         |
| --------------- | :------- | -------------------| ------------------- |
| data            | Array    |                    | 数据源            |
| enabledPullDown | Boolean  |    true            | 是否开启下拉刷新 |
| enabledPullUp   | Boolean  |    true            | 是否开启上拉加载           |
| showEmptyView   | Boolean  |    true            | data为空是否显示一个空的占位图  |
| emptyText       | String   |    数据为空          | 空视图文字提示          |
| emptyIcon       | Object   |   require('../../assets/images/ic_empty.png') | 空视图图片          |
| scrollEvents    | Array    |    | `['scroll','before-scroll-start','scroll-end']` 开启回调 |

### Function

| Name      | Type                   | Description  |
| --------- | :--------------------- | ------------ |
| scrollTo  | Function:(x,y,time,easing)=>void | 滑动到具体位置x,y坐标,time时间,easing缓动函数 |

### Events

| Name            | Type                    | Description |
| --------------- | :---------------------- | ----------- |
| pulling-down         |   | 下拉事件    |
| pulling-up         |   | 上拉事件    |
| before-scroll-start  |   | 滑动前的事件    |
| scroll         | Params:{x,y}  | 滑动事件    |
| scroll-end         | Params:{x,y}  | 滑动后的事件    |

### Slot

| Name | Description |
| ---- | ----------- |
| header | 头部视图  |
| empty | 空视图  |
| footer | 底部视图  |
| default | 自定义Cell视图 slot-scope值item,index |

### 注意事项

header第一个标签使用margin或者padding会使内容高度计算不准确

### Example

```html
     <yi-list :data="listData" :no-more-data="true" @pulling-down="pullDown" @pulling-up="pullUp" ref="list">
       <div slot="header" style="background-color: red;height: 100px;">我是头部</div>
       <div slot="footer" @click="handleClick" style="background-color: red;height: 100px;">我是尾部</div>
       <div slot-scope="{item,index}" style="width:100%;height:200px;background-color: white;margin-top: 10px;">
         {{item+index}}
       </div>
     </yi-list>
```
