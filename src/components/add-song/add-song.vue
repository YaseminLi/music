<template>
<transition name="move">
  <div class="add-song" v-show="showing" @click.stop>
    <div class="header">
      添加歌曲到列表
      <i class="iconfont iconremove" @click.stop="close"></i>
    </div>
    <div class="search-box-wrapper">
      <searchBox :placeholder="searchBoxTitle" @query="queryChange" ref="box" />
    </div>
    <div class="shortcut">
      <switches @switchItem="switchItem" :switches="switches" :currentIndex="switchesCurrentIndex" />
    </div>
    <scroll
      :data="playHistory"
      ref="playList"
      class="play contentList"
      v-show="switchesCurrentIndex==0"
    >
      <div>
        <songList :songs="playHistory" @selectItem="selectSong" />
      </div>
    </scroll>
    <scroll
      :data="searchHistory"
      ref="searchList"
      class="history contentList"
      v-show="switchesCurrentIndex==1"
    >
      <div>
        <searchList
          :searchList="searchHistory"
          :title="false"
          @remove="removeSearchHistory"
          @addSearch="search"
        />
      </div>
    </scroll>
    <div class="search-result" v-show="query">
      <suggest :query="query" :showSinger="false" @selectItem="selectSuggest" />
    </div>
    <topTip :text="topTip" ref="topTip" />
  </div>
</transition>
</template>

<script>
import searchBox from "base/search-box/search-box";
import scroll from "base/scroll/scroll";
import searchList from "base/search-list/search-list";
import songList from "base/song-list/song-list";
import suggest from "base/suggest/suggest";
import { searchMixin } from "common/js/mixin.js";
import { mapGetters, mapActions } from "vuex";
import { Song } from "common/js/song.js";
import switches from "base/switches/switches.vue";
import topTip from "base/top-tip/top-tip.vue";
export default {
  mixins: [searchMixin],
  data() {
    return {
      showing: false,
      showPlay: true,
      searchBoxTitle: "搜索歌曲",
      switches: ["最近播放", "历史搜索"],
      switchesCurrentIndex: 0,
      topTip: "1首歌曲已添加到播放列表"
    };
  },
  computed: {
    ...mapGetters(["playHistory"])
  },
  methods: {
    show() {
      this.showing = true;
    },
    close() {
      this.showing = false;
    },
    showPlayList() {
      this.showPlay = true;
    },
    showSearchList() {
      this.showPlay = false;
    },
    selectSuggest() {
      this.saveSearch();
      this.showTip()
    },
    selectSong(song, index) {
      if (index !== 0) {
        this.insertSong(new Song(song));
        this.showTip()
      }
    },
    showTip() {
      this.$refs.topTip.show();
    },
    switchItem(index) {
      this.switchesCurrentIndex = index;
    },
    ...mapActions({
      insertSong: "insertSong"
    })
  },
  components: {
    searchBox,
    scroll,
    searchList,
    songList,
    suggest,
    switches,
    topTip
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.add-song
  position: fixed
  top: 0
  bottom: 0
  background: white
  width: 100%
  z-index: 200
  .header
    text-align: center
    font-size: 18px
    line-height: 44px
    color: $color-theme
    .iconfont
      color: $color-theme-d
      position: absolute
      right: 20px
      font-size: 16px
  .contentList
    width: 100%
    position: fixed
    top: 152px
    bottom: 0
    overflow: hidden
  .search-result
    position: fixed
    width: 100%
    top: 100px
    bottom: 0
    overflow: hidden
  &.move-enter-active,&.move-leave-active
    transition all .4s 
  &.move-enter,&.move-leave-to
    transform translateX(100%)
</style>
