<template>
  <div class="search-list" v-show="searchList.length">
    <div class="title" v-if="title">
      <span class="text">搜索历史</span>
      <i class="iconfont iconclear" @click.stop="showConfirm" @clear="clear"></i>
    </div>
    <div class="container">
      <transition-group name="list" tag="div">
      <div class="item" v-for="item in searchList" :key="item">
        <span class="text" @click.stop="addSearch(item)">{{item}}</span>
        <i class="iconfont iconremove" @click.stop="remove(item)"></i>
      </div>
      </transition-group>
    </div>
    <confirm :text="confirmText" ref="confirm" @clear="clear"/>
  </div>
</template>

<script>
import confirm from "base/confirm/confirm";
export default {
  data() {
    return {
      confirmText: "确定要清空搜索历史？"
    };
  },
  props: {
    searchList: Array,
    title:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    showConfirm() {
      this.$refs.confirm.show();8
    },
    clear() {
      this.$emit("clear");
    },
    remove(item) {
      this.$emit("remove", item);
    },
    addSearch(item) {
      this.$emit("addSearch", item);
    }
  },
  components: {
    confirm
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.search-list
  width: 100%
  padding: 10px 16px
  box-sizing: border-box
  font-size: 14px
  .title
    line-height: 21px
    margin-bottom: 8px
    color: #333
    display: flex
    align-items: center
    justify-content: space-between
    .text
      font-weight: 700
  .container
    .item
      display: flex
      align-items: center
      justify-content: space-between
      height 30px
      &.list-enter,&.list-leave-to
        height 0
      &.list-enter-active,&.list-leave-active
        transition all 0.1s
      .text
        flex: 1
        no-wrap()
      .iconremove
        margin-left: 10px
</style>
