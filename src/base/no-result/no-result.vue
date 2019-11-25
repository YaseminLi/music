<template>
  <div class="no-result">{{title}}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "抱歉，暂时没有搜索结果！"
    }
  }
};
</script>

<style lang='stylus' >
@import "~common/stylus/variable"
.no-result
    font-size 14px
    text-align center
    line-height 50px
    color $color-text-l
</style>
