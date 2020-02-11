# music-vue

## Project setup
- Project setup
```
npm install
```
- Compiles and hot-reloads for development
```
npm run serve
```
- Compiles and minifies for production
```
npm run build
```

## 技术概述
- 组件化、模块化的开发方式，对通用组件进行提取、公共方法封装
- vue-cli搭建脚手架、webpack进行项目构建、ES6语法编写
- axios、jsonp实现跨域请求
- vue的高级应用，vuex状态管理、同级与不同级组件间数据共享，Vue Router路由跳转及传递复杂数据，slot、mixin、通用组件的提取
v-lazy、fastclick、better-scroll等第三方插件

## 通用组件
1. confirm：确认对话框组件
2. listview：通讯录列表组件
3. loading：加载态组件
4. no-result：无结果展示组件
5. progress-bar：进度条组件
6. progress-circle：圆形进度条组件
7. scroll：移动端滚动组件
8. search-box：搜索框组件
9. search-list：搜索列表组件
10. slider：轮播图组件
11. switches：开关切换组件
12. top-tip：顶部消息提示组件
13. song-list：歌曲列表组件

## 页面展示与功能介绍
<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 推荐页 | 歌手 |排行榜 |
| ---- | ---- |---- |
|![推荐页][推荐页] |![歌手][歌手]|![排行榜][排行榜] |

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 歌手 | 描述 |
| ---- | ---- |
|![歌手][歌手] |•tab组件路由切换：router-link/keep-alive/router-view<br> •轮播图:vue-awesome-swiper插件<br>•监听页面滚动：better-scroll插件 <br>• 固定宽度+自适应：父元素弹性盒子，子元素宽度+flex 1(1 1 0)<br> • 点击歌单跳转到子路由 图片懒加载：v-lazy|

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 排行榜 | 描述 |
| ---- | ---- |
|![排行榜][排行榜] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 搜索 | 描述 |
| ---- | ---- |
|![搜索][搜索] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 用户中心 | 描述 |
| ---- | ---- |
|![用户中心][用户中心] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 歌单页 | 描述 |
| ---- | ---- |
|![歌单页][歌单页] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 播放器 | 描述 |
| ---- | ---- |
|![播放器][播放器] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 播放列表 | 描述 |
| ---- | ---- |
|![播放列表][播放列表] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 最近播放 | 描述 |
| ---- | ---- |
|![最近播放][最近播放] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 历史搜索 | 描述 |
| ---- | ---- |
|![历史搜索][历史搜索] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 歌手详情 | 描述 |
| ---- | ---- |
|![歌手详情][歌手详情] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 搜索结果 | 描述 |
| ---- | ---- |
|![搜索结果][搜索结果] ||

--------------------------------
[推荐页]:/readme-img/推荐页.png 
[歌手]:/readme-img/歌手.png 
[播放列表]:/readme-img/播放列表.png 
[播放器]:/readme-img/播放器.png 
[歌单页]:/readme-img/歌单页.png 
[搜索结果]:/readme-img/搜索结果.png 
[歌手详情]:/readme-img/歌手详情.png 
[历史搜索]:/readme-img/历史搜索.png 
[排行榜]:/readme-img/排行榜.png 
[搜索]:/readme-img/搜索.png 
[最近播放]:/readme-img/最近播放.png 
[用户中心]:/readme-img/用户中心.png 

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
<!-- | 推荐页 | 描述 |
| ---- | ---- |
|![推荐页][推荐页] |•tab组件路由切换：router-link/keep-alive/router-view<br> •轮播图:vue-awesome-swiper插件<br>•监听页面滚动：better-scroll插件 <br>• 固定宽度+自适应：父元素弹性盒子，子元素宽度+flex 1(1 1 0)<br> • 点击歌单跳转到子路由 图片懒加载：v-lazy|

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 歌手 | 描述 |
| ---- | ---- |
|![歌手][歌手] |•tab组件路由切换：router-link/keep-alive/router-view<br> •轮播图:vue-awesome-swiper插件<br>•监听页面滚动：better-scroll插件 <br>• 固定宽度+自适应：父元素弹性盒子，子元素宽度+flex 1(1 1 0)<br> • 点击歌单跳转到子路由 图片懒加载：v-lazy|

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 排行榜 | 描述 |
| ---- | ---- |
|![排行榜][排行榜] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 搜索 | 描述 |
| ---- | ---- |
|![搜索][搜索] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 用户中心 | 描述 |
| ---- | ---- |
|![用户中心][用户中心] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 歌单页 | 描述 |
| ---- | ---- |
|![歌单页][歌单页] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 播放器 | 描述 |
| ---- | ---- |
|![播放器][播放器] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 播放列表 | 描述 |
| ---- | ---- |
|![播放列表][播放列表] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 最近播放 | 描述 |
| ---- | ---- |
|![最近播放][最近播放] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 历史搜索 | 描述 |
| ---- | ---- |
|![历史搜索][历史搜索] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 歌手详情 | 描述 |
| ---- | ---- |
|![歌手详情][歌手详情] ||

<!-- <style> table th:first-of-type { width: 250px; } </style> -->
| 搜索结果 | 描述 |
| ---- | ---- |
|![搜索结果][搜索结果] || -->