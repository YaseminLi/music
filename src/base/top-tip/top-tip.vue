<template>
  <transition name="move">
    <div class="top-tip" v-show="showState" @click.stop="hide">
      <i class="iconfont iconsuccess"></i>
      <span class="text">{{text}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showState: false
    };
  },
  props: {
    text: String,
    delay: {
      type: Number,
      default: 3000
    }
  },
  methods: {
    show() {
      this.showState = true;  
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.hide();
      }, this.delay);
    },
    hide() {
      this.showState = false;
    }
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
.top-tip
  width: 100%
  height: 44px
  position: fixed
  top: 0
  background: white
  display: flex
  justify-content: center
  align-items: center
  &.move-enter-active, &.move-leave-active
    transition: all 1s
  &.move-enter, &.move-leave-to
    transform: translateY(-100%)
  .iconfont
    color: $color-theme-d
    font-size: 18px
    margin-right: 5px
</style>
