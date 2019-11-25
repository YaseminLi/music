<template>
  <div class="user">
    <switches @switchItem="switchItem" :switches="switches" :currentIndex="switchesCurrentIndex" />
    <div class="play-btn" @click.stop="playRandom">
      <i class="iconfont iconbofang"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list favorite" v-show="switchesCurrentIndex==0" ref="favorite">
      <scroll :data="favoriteList" ref="scroll" class="scroll" v-show="favoriteList.length>0">
        <div>
          <songList :songs="favoriteList" @selectItem="selectSong" />
        </div>
      </scroll>
      <noResult :title="noResult[switchesCurrentIndex]" v-show="favoriteList.length==0"/>
    </div>
    <div class="list play" v-show="switchesCurrentIndex==1" ref="play">
      <scroll :data="playHistory" ref="scroll" class="scroll" v-show="playHistory.length>0">
        <div>
          <songList :songs="playHistory" @selectItem="selectSong" />
        </div>
      </scroll>
      <noResult :title="noResult[switchesCurrentIndex]" v-show="playHistory.length==0"/>
    </div>
  </div>
</template>

<script>
import switches from "base/switches/switches";
import { Song } from "common/js/song.js";
import { mapGetters, mapActions } from "vuex";
import scroll from "base/scroll/scroll";
import songList from "base/song-list/song-list";
import { playlistMixin } from "common/js/mixin";
import noResult from "base/no-result/no-result.vue"
export default {
  mixins: [playlistMixin],
  data() {
    return {
      switches: ["我喜欢的", "最近听的"],
      switchesCurrentIndex: 0,
      noResult:["暂时没有收藏","你还没有听过歌曲"]
    };
  },
  computed: {
    ...mapGetters(["playHistory", "favoriteList"])
  },
  methods: {
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? `60px` : `0`;
      this.$refs.favorite.style.bottom = bottom;
      this.$refs.play.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    switchItem(index) {
      this.switchesCurrentIndex = index;
    },
    selectSong(song) {
      this.insertSong(new Song(song));
    },
    playRandom() {
      let list = this.switchesCurrentIndex == 0 ? this.favoriteList : this.playHistory;
      list.map(item =>new Song(item));
      this.randomPlay({
        list
      });
    },
    ...mapActions({
      insertSong: "insertSong",
      randomPlay: "randomPlay"
    })
  },
  components: {
    switches,
    scroll,
    songList,
    noResult
  }
};
</script>

<style lang='stylus' >
.user
  .play-btn
    height: 40px
    display: flex
    justify-content: center
    align-items: center
    font-size: 14px
    .iconfont
      font-size: 18px
  .list
    position: fixed
    top: 136px
    bottom: 0
    width: 100%
    .scroll
      width: 100%
      height: 100%
      overflow: hidden
</style>
