<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner" ref="barInner"></div>
    <div class="progress" ref="progress"></div>
    <div
      class="btn"
      ref="btn"
      @touchstart="progressTouchstart"
      @touchmove="progressTouchmove"
      @touchend="progressTouchend"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    percent: Number
  },
  created() {
    //不需要getter\setter方法，就用created
    this.touch = {};
  },
  watch: {
    //播放进度变化时，进度条长度变化
    percent(newP) {
      if (newP >= 0 && !this.touch.initialed) {
        this.setProgressOffset(newP);
      }
    }
  },
  methods: {
    progressTouchstart(e) {
      this.touch.initialed = true;
      this.touch.statX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchmove(e) {
      if (!this.touch.initialed) {
        return;
      }
      let delta = e.touches[0].pageX - this.touch.statX;
      let offsetWidth = Math.min(
        this.$refs.barInner.clientWidth,
        Math.max(0, this.touch.left + delta)
      );
      this._offset(offsetWidth);
      this.touch.percent =
        this.$refs.progress.clientWidth / this.$refs.barInner.clientWidth;
    },
    progressTouchend() {
      this.touch.initialed = false;
      this.$emit("progressBarChange", this.touch.percent);
    },
    //点击进度条任意位置，歌曲播放到相应的进度
    progressClick(e) {
      let width = e.pageX - this.$refs.progressBar.getBoundingClientRect().left;
      this._offset(width);
      this.touch.percent =
        this.$refs.progress.clientWidth / this.$refs.barInner.clientWidth;
      this.$emit("progressBarChange", this.touch.percent);
    },
    //计算变化宽度及进度条变化
    setProgressOffset(percent) {
      let width = this.$refs.progressBar.clientWidth * percent;
      this._offset(width);
    },
    //进度条的宽度及按钮的位置改变
    _offset(width) {
      this.$refs.progress.style.width = width + "px";
      this.$refs.btn.style.left = width + "px";
    }
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
.progress-bar
  position: relative
  .bar-inner
    width: 100%
    height: 4px
    background: $color-background-d
  .progress
    height: 4px
    position: absolute
    top: 0
    background: $color-theme-d
  .btn
    width: 4px
    height: 4px
    background: white
    border-radius: 50%
    border: 3px solid $color-theme-d
    position: absolute
    top: -3px
</style>
