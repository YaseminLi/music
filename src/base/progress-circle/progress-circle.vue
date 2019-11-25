<template>
  <div class="progress-circle">
    <!-- 中间插入的小图标 -->
    <slot></slot>
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 120 120"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
    <circle class="progress-background" r="50" cx="60" cy="60" fill="transparent"/>
      <circle
        class="progress-bar"
        r="50"
        cx="60"
        cy="60"
        fill="transparent"
        :stroke-dasharray="dasharray"
        :stroke-dashoffset="dashoffset"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 120
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    //每个线段长，一段长100PI的实线，一段长100PI的虚线，这样循环
    dasharray() {
      return Math.PI * 100;
    },
    //偏移量(减去)，逆时针方向，从圆形右半边中点开始逆时针
    dashoffset() {
      return (1 - this.percent) * this.dasharray;
    }
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
.progress-circle
   position: relative
   circle
      stroke-width: 6px
      transform-origin: center
      &.progress-background
        stroke: $color-theme
      &.progress-bar
        transform: rotate(-90deg)
        stroke: $color-theme-d
</style>
