<template>
  <transition appear name="slide">
    <div class="disc" ref="disc">
      <div class="back">
        <i @click="back" class="iconfont iconreturn" />
        <span v-html="title"></span>
      </div>
      <div class="head" ref="head" :style="{zIndex:0}">
        <div class="left">
          <img class="avatar" :src="discInfo.logo" />
        </div>
        <div class="right">
          <div class="name"  v-html="discInfo.name"></div>
          <div class="tags desc">标签： {{tags}}</div>
          <div class="visitNum desc">播放量： {{normalizeVisitNum}}</div>
          <div class="play" v-show="songs.length>0" @click="random">
            <i class="iconfont iconbofang" />
            <span>随机播放全部</span>
          </div>
          <div class="play" v-show="songs.length==0">
            <span>暂时没有歌曲信息</span>
          </div>
        </div>
      </div> 
      <loading v-show="songs.length==0" />
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
          <div class="total">
            歌曲共
            <span class="num">{{songs.length}}首</span>
          </div>
          <songList :songs="songs" @selectItem="selectItem" />
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import { getSongList } from "api/recommend.js";
import { ERR_OK } from "api/config.js";
import { mapGetters, mapActions } from "vuex";
import songList from "base/song-list/song-list";
import scroll from "base/scroll/scroll";
import loading from "base/loading/loading";
import { playlistMixin } from "common/js/mixin.js";
import { normalizeNum } from "common/js/filter.js";
import { createSong, processSongsUrl } from "common/js/song.js";
export default {
  mixins: [playlistMixin],
  data() {
    return {
      songs: [],
      discInfo: {},
      probeType: 3,
      listenScroll: true,
      scrollY: 0,
      title: "歌单"
    };
  },
  created() {
    this._getSongList();
  },
  computed: {
    ...mapGetters(["disc"]),
    tags() {
      let arr = [];
      if (this.discInfo.tags) {
        this.discInfo.tags.forEach(element => {
          arr.push(element.name);
        });
        return arr.join(" ");
      } else {
        return "";
      }
    },
    normalizeVisitNum() {
      return normalizeNum(this.discInfo.visitNum);
    }
  },
  methods: {
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? "60px" : "";
      this.$refs.disc.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push("/recommend");
      }
      getSongList(this.disc.dissid).then(res => {
        if (res.code == ERR_OK) {
          processSongsUrl(this._normalizeDisc(res.cdlist[0])).then(songs => {
            this.songs = songs;
          });
        }
      });
    },
    _normalizeDisc(disc) {
      let songs = [];
      disc.songlist.forEach(song => {
          if(song.songid&&song.songmid){
              songs.push(createSong(song));
          }
      });
      let info = {
        logo: disc.logo,
        name: disc.dissname,
        avatar: disc.logo,
        tags: disc.tags,
        visitNum: disc.visitnum
      };
      this.discInfo = info;
      return songs;
    },
    back() {
      this.$router.push("/recommend");
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
      if (newY < -145) {
        this.title = this.discInfo.name;
      } else {
        this.title = "歌单";
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
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.slide-enter-active, .slide-leave-active
  transition: all 0.8s
.disc
  background: white
  position: fixed
  top: 0
  width: 100%
  bottom: 0
  overflow: hidden
  z-index 10
  .back
    position: fixed
    width: 100%
    background: white
    padding: 10px 16px
    box-sizing: border-box
    top: 0
    left: 0
    z-index: 20
    color: $color-theme
    display: flex
    align-items: center
    .iconreturn
      font-size: 20px
    span
      font-size: 16px
      line-height: 30px
  .head
    padding: 60px 16px 20px 16px
    background: white
    display: flex
    font-size: 0
    .left
      width: 140px
      margin-right: 10px
      .avatar
        width: 140px
        height: 140px
        border-radius: 5px
    .right
      flex: 1
      .name
        font-size: 16px
        line-height: 20px
        color: $color-text
        margin-bottom: 12px
        font-weight: 700
        height: 40px
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 2
      .desc
        font-size: 12px
        color: $color-text
        margin-bottom: 12px
      .play
        width: 100%
        height: 38px
        border-radius: 5px
        color: $color-theme-d
        border: 1px solid $color-theme-d
        display: flex
        justify-content: center
        align-items: center
        font-size: 16px
        .iconbofang
          font-size: 20px
  .list
    position: absolute
    bottom: 0
    width: 100%
    top: 220px
    .list-content
      background: white
      .total
        margin-left: 16px
        font-size: 12px
        color: $color-text-l
        padding-top: 20px
        margin-bottom 10px
        .num
          margin-left: 5px
</style>
