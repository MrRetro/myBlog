# List

## 介绍

基于滴滴Scroll组件封装项目通用List组件。自定义上拉下拉布局。添加空视图，简化使用方法

### Props

| Props           | Type     | Default             | Description         |
| --------------- | :------- | -------------------| ------------------- |
| fetchData       | Function:(page)=>Promise<Array>|             | 传入一个根据page返回数据的Promise  |
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

### Example

```html
     <template>
       <yi-auto-list :fetchData="fetchData"  ref="list">
         <div slot="header" style="background-color: red;height: 100px;">我是头部</div>
         <div slot="footer"  style="background-color: red;height: 100px;">我是尾部</div>
         <div slot-scope="{item,index}" style="width:100%;height:200px;background-color: white;margin-top: 10px;">
           {{item}}
         </div>
       </yi-auto-list>
     </template>

     <script>
     export default {
       name: 'tab3',
       methods: {
         fetchData(page) {
           return new Promise((resolve) => {
             setTimeout(() => {
               let data = [];
               for (let i = 0; i < (page === 3 ? 5 : 10); i++) {
                 data.push(`页数${page}列表${i}`);
               }
               resolve(data);
             }, 1000);
           });
         }
       }
     };
     </script>
```
