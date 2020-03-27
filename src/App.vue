<template>
  <div id="app">
    <tab />
    <!-- keep-alive可以保留组件状态，将组件缓存到内存中，：max属性可以限制最多缓存多少组件，不能包含v-for -->
    <keep-alive>
      <!-- 路由匹配到的组件会显示在这里 -->
      <router-view></router-view>
    </keep-alive>
    <player />
  </div>
</template>

<script type="text/ecmascript-6">
import tab from 'components/tab/tab'
import player from 'components/player/player'
export default{
  components:{
    tab,
    player
  }
}
</script>

<style scoped lang="stylus">
#app
  background white
</style>
