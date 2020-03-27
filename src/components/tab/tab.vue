<template>
  <div class="tab">
    <!-- 默认router-link为a标签，tag可以生成别的，to属性指定目标地址 -->
    <!-- 以下几种写法都可以 v-bind是绑定动态属性-->
     <router-link tag="div" class="tab-item" to="/recommend">
     <!-- <router-link tag="div" class="tab-item" v-bind:to="'/recommend'"> -->
     <!-- <router-link tag="div" class="tab-item" :to="'/recommend'"> -->
     <!-- <router-link tag="div" class="tab-item" :to="{path:'/recommend'}"> -->
     <!-- <router-link tag="div" class="tab-item" :to="{name:'recommend',params: { userId: 123 }}"> -->
       <!-- 带查询参数，下面的结果为 /recommend?plan=private -->
     <!-- <router-link tag="div" class="tab-item" :to="{path:'/recommend',query:{ plan: 'private' }}"> -->
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
     <router-link tag="div" class="tab-item" to="/user">
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus" >
@import '~common/stylus/variable';
  .tab
    display :flex
    height: 44px
    font-size: $font-size-medium
    .tab-item
      flex:1
      text-align:center
      margin auto 0
      .tab-link
        padding-bottom:5px
        color:$color-text-l
        border-bottom :2px solid white
      &.router-link-active
        .tab-link
          color:$color-theme-d
          border-bottom:2px solid $color-theme-d
</style>