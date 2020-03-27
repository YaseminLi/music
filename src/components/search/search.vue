<template>
  <div class="search">
    <searchBox @query="queryChange" ref="box" />
    <div class="search-wrapper" ref="wrapper">
      <scroll ref="scroll" class="scroll" :data="keyHistory">
        <div>
          <div class="hotkeys">
            <div class="title" >热门搜索</div>
            <div class="container">
              <span
                class="key"
                v-for="(item,index) in hotkeys"
                :key="index"
                @click.stop="search(item.k)"
              >{{item.k}}</span>
            </div>
          </div>
          <div class="serach-history" v-show="searchHistory.length">
            <searchList
              :searchList="searchHistory"
              @clear="clearSearchHistory"
              @remove="removeSearchHistory"
              @addSearch="search"
            />
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="result">
      <suggest :query="query" ref="suggest" @selectItem="saveSearch" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getHotKey } from "api/search.js";
import { ERR_OK } from "api/config.js";
import searchBox from "base/search-box/search-box";
import suggest from "base/suggest/suggest";
import searchList from "base/search-list/search-list";
import scroll from "base/scroll/scroll";
import { playlistMixin, searchMixin } from "common/js/mixin.js";
import { mapGetters, mapActions } from "vuex";
const HOTKEYS_NUM = 9;
export default {
  mixins: [playlistMixin, searchMixin],
  data() {
    return {
      hotkeys: []
    };
  },
  computed: {
    ...mapGetters(["playList"]),
    keyHistory() {
      return this.hotkeys.concat(this.searchHistory);
    }
  },
  created() {
    this._initHotKey();
  },
  methods: {
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? `60px` : `0`;
      this.$refs.wrapper.style.bottom = bottom;
      this.$refs.result.style.bottom = bottom;
      this.$refs.scroll.refresh();
      this.$refs.suggest.refresh();
    },

    _initHotKey() {
      getHotKey().then(res => {
        if (res.code == ERR_OK)
          this.hotkeys = res.data.hotkey.slice(0, HOTKEYS_NUM);
      });
    },
    ...mapActions(["clearSearchHistory"])
  },
  watch: {
    query(newQuery) {
      this.query = newQuery;
    }
  },
  components: {
    searchBox,
    suggest,
    searchList,
    scroll
  }
};
</script>

<style lang="stylus">
@import '~common/stylus/variable.styl'
.search
  position: fixed
  width: 100%
  top: 44px
  bottom: 0
  background: white
  .search-wrapper
    position: fixed
    width: 100%
    top: 100px
    bottom: 0
    .scroll
      width: 100%
      height: 100%
      overflow: hidden
      .hotkeys
        padding: 20px
        .title
          font-size: 14px
          font-weight: 700
          line-height: 21px
          margin-bottom: 8px
          color: $color-theme
        .container
          display: flex
          flex-wrap: wrap
          .key
            margin: 0 14px 10px 0
            padding: 0 10px
            border: 1px solid $color-theme
            line-height: 30px
            font-size: 14px
            color: $color-theme
            border-radius: 16px
            &:first-child
              color: $color-text-dd
              border: 1px solid $color-text-dd
      .search-history
        width: 100%
  .search-result
    position: fixed
    top: 100px
    bottom: 0
    width: 100%
    overflow: hidden
</style>