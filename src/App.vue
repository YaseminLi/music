<template>
  <div id="app">
    <tab />
    <keep-alive>
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
