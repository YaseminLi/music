<template>
  <div class="switches">
    <span
      class="switch"
      v-for="(item,index) in switches"
      :key="index"
      :class="{'active':currentIndex==index}"
      @click.stop="switchItem(index)"
    >{{item}}</span>
  </div>
</template>

<script>
export default {
  props: {
    switches: Array,
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods:{
    switchItem(index){
      this.$emit("switchItem",index)
    }
  },
  components: {}
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
.switches
  width: 240px
  height: 30px
  border: 1px solid $color-theme-d
  border-radius: 5px
  font-size: 14px
  margin: 10px auto
  color: $color-theme-d
  overflow: hidden
  .switch
    display: inline-block
    text-align: center
    line-height: 30px
    width: 120px
    &.active
      color: white
      background: $color-theme-d
</style>
