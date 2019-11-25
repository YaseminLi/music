<template>
  <div class="search-box">
    <div class="search-container">
      <i class="iconfont iconsousuo" />
      <input type="text" :placeholder="placeholder" v-model.trim="query" />
      <i v-show="query" class="iconfont iconquxiao" @click.stop="clearInput"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ""
    };
  },
  props: {
    placeholder: {
      type:String,
      default:"搜索歌曲、歌单、专辑"
    }
  },
  methods: {
    clearInput() {
    this.$emit("clearInput");
    this.query="";
    },
    setQuery(query){
      this.query=query
    }
  },
  watch: {
    query(newQuery) {
      this.$emit("query", newQuery);
    }
  }
};
</script>

<style lang='stylus' >
@import '~common/stylus/variable'
.search-box
  padding: 10px
  background: $color-background-dd
  .search-container
    border-radius: 10px
    position: relative
    input
      width: 100%
      box-sizing: border-box
      height: 36px
      padding: 8px 12px 8px 35px
      font-size: 14px
      color: $color-background-d
      outline: none
    .iconfont
      position: absolute
      color: #b1b1b1
      font-size: 20px
      bottom: 7px
    .iconquxiao
      right: 10px
    .iconsousuo
      left: 10px
</style>
