<template>
  <transition appear name="slide">
    <div class="topList" ref="top">
      <div class="back" ref="back">
        <i @click.stop="back" class="iconfont iconreturn" />
        <span>{{title}}</span>
      </div>
      <div class="head" ref="head" :style="{zIndex:0}">
        <img class="avatar" :src="top.logo" />
        <div class="updateTime">最近更新：{{top.updateTime}}</div>
      </div>
      <div class="loading-container" v-show="songs.length==0">
        <loading />
      </div>
      <scroll
        class="list"
        ref="list"
        :data="songs"
        :probeTybe="probeType"
        :listenScroll="listenScroll"
        @scroll="scroll"
        v-show="songs.length>0"
      >
        <div class="list-content">
          <div class="play" v-show="songs.length>0" @click="random">
            <i class="iconfont iconbofang" />
            <span>随机播放全部</span>
          </div>
          <div class="play" v-show="songs.length==0">
            <span>暂时没有歌曲信息</span>
          </div>
          <songList :songs="songs" @selectItem="selectItem" :rank="true" />
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import { getTopList } from "api/rank.js";
import { ERR_OK } from "api/config.js";
import { mapGetters, mapActions } from "vuex";
import songList from "base/song-list/song-list";
import scroll from "base/scroll/scroll";
import loading from "base/loading/loading";
import { playlistMixin } from "common/js/mixin.js";
import { createSong, processSongsUrl } from "common/js/song.js";
export default {
  mixins: [playlistMixin],
  data() {
    return {
      songs: [],
      top: {},
      probeType: 3,
      listenScroll: true,
      scrollY: 0,
      title: ""
    };
  },
  created() {
    this._getTopList();
  },
  computed: {
    ...mapGetters(["topList"])
  },
  methods: {
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? "60px" : "";
      this.$refs.top.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    _getTopList() {
      if (!this.topList.id) {
        this.$router.push("/rank");
      }
      getTopList(this.topList.id).then(res => {
        if (res.code == ERR_OK) {
          processSongsUrl(this._normalizeTop(res)).then(songs => {
            this.songs = songs;
          });
        }
      });
    },
    _normalizeTop(top) {
      let songs = [];
      top.songlist.forEach(song => {
        if (song.data.songid && song.data.songmid) {
          songs.push(createSong(song.data));
        }
      });
      let info = {
        logo: top.topinfo.pic_h5,
        name: top.topinfo.ListName,
        updateTime: top.update_time
      };
      this.top = info;
      return songs;
    },
    back() {
      this.$router.push("/rank");
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    random() {
      this.randomPlay({ list: this.songs });
    },
    ...mapActions(["selectPlay", "randomPlay"])
  },
  watch: {
    scrollY(newY) {
      if (newY < -90) {
        this.title = this.top.name;
        this.$refs.back.style.background = `white`;
        this.$refs.back.style.color = `#333333`;
      } else {
        this.title = "";
        this.$refs.back.style.background = ``;
        this.$refs.back.style.color = `white`;
      }
    }
  },
  components: {
    songList,
    scroll,
    loading
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.slide-enter-active, .slide-leave-active
  transition: all 0.8s
.topList
  background: white
  position: fixed
  top: 0
  width: 100%
  bottom: 0
  overflow: hidden
  .back
    position: fixed
    width: 100%
    padding: 10px 16px
    box-sizing: border-box
    top: 0
    left: 0
    z-index: 20
    color: white
    display: flex
    align-items: center
    .iconreturn
      font-size: 20px
    span
      font-size: 16px
      line-height: 30px
      no-wrap()
  .head
    position: relative
    width: 100%
    height: 0
    padding-bottom: 46.875%
    background: $color-theme-d
    .avatar
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
    .updateTime
      width: 100%
      position: absolute
      color: white
      text-align: center
      bottom: 30px
      font-size: 12px
      margin-bottom: 12px
  .loading-container
      position fixed
      width 100%
      top 50%
      transform translateY(-50%)
  .list
    border-radius: 10px
    position: absolute
    bottom: 0
    width: 100%
    top: 140px
    .list-content
      background: white
      border-radius: 10px
      .play
        padding-left: 16px
        height: 38px
        color: $color-theme
        display: flex
        align-items: center
        font-size: 14px
        .iconbofang
          font-size: 18px
</style>
