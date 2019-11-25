<template>
  <div class="loading">
    <img src="./loading.gif">
    <p class="text">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在载入……"
    }
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable.styl'
.loading
  width: 100%
  text-align center
  img
    width: 24px
    height: 24px
  .text
    font-size: $font-size-small
    color: $color-text-l
    line-height: 20px
</style>
