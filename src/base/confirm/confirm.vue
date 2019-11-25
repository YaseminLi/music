<template>
  <div class="confirm" v-show="showConfirm">
    <div class="confirm-wrapper">
      <div class="text">{{text}}</div>
      <div class="btn">
        <span class="option" @click.stop="confirm">{{confirmText}}</span>
        <span class="option" @click.stop="cancel">{{cancelText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConfirm: false
    };
  },
  props: {
    text: {
      type: String,
      default: "确定要清空播放列表？"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    confirmText: {
      type: String,
      default: "清空"
    }
  },
  methods: {
    show() {
      this.showConfirm = true;
    },
    close() {
      this.showConfirm = false;
    },
    cancel(){
        this.showConfirm=false
    },
    confirm(){
        this.$emit('clear')
        this.showConfirm=false
    }
  }
};
</script>

<style lang='stylus'  scoped>
@import '~common/stylus/variable'
.confirm
  z-index: 200
  position: fixed
  top: 0
  bottom: 0
  left 0
  width: 100%
  background: $color-background-d
  .confirm-wrapper
    background: white
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 300px
    height: 80px
    box-sizing: border-box
    border-radius: 10px
    padding: 20px
    .text
      color: $color-theme
      font-size: 14px
    .btn
      color: $color-theme-d
      font-size: 12px
      display: flex
      flex-direction: row-reverse
      margin-top 10px
      .option
        margin-left: 20px
</style>
