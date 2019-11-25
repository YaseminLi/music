<template>
<transition name="move">
  <div class="playlist" v-show="playlistShow" @click.stop="close">
    
    <div class="container" @click.stop>
      <div class="head border-1px" @click.stop="modeChange" ref="mode">
        <i :class="modeIcon"></i>
        <span class="mode" >{{modeContent}}</span>
        <i class="iconfont iconclear" @click.stop="clear"></i>
      </div>
      <scroll class="list" :data="sequenceList" ref="list">
        <div ref="wrapper">
          <transition-group name="list" tag="ul">
          <div
            ref="item"
            class="item"
            v-for="(item,index) in sequenceList"
            :key="item.id"
            :class="{'currentItem':currentSong.id==item.id}"
          >
            <i
              class="iconfont iconpause"
              v-show="currentSong.id==item.id"
              :class="{'current':currentSong.id==item.id}"
            ></i>
            <span
              class="songname"
              :class="{'current':currentSong.id==item.id}"
              @click.stop="selectItem(item,index)"
            >{{item.songname}}</span>
            <i  :class="favoriteIcon(item)" @click.stop="toggleFavorite(item)"/>
            <i class="iconfont iconremove" @click.stop="remove(item,index)"></i>
          </div>
          </transition-group>
        </div>
      </scroll>
      <div class="operate border-1px">
        <div class="add" @click.stop="addSong">
          <i class="iconfont iconadd"></i>
          <span class="text">添加歌曲到队列</span>
        </div>
      </div>
      <div class="close" @click.stop="close">关闭</div>
      <confirm ref="confirm" @clear="clearList" />
    </div> 
    <addSong ref="addSong" />
  </div>
 </transition>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { playMode } from "common/js/config.js";
import scroll from "base/scroll/scroll.vue";
import confirm from "base/confirm/confirm";
import { playerMixin } from "common/js/mixin.js";
import addSong from "components/add-song/add-song";
export default {
  mixins: [playerMixin],
  data() {
    return {
      playlistShow: false
    };
  },
  computed: {
    modeContent() {
      return this.mode == playMode.random
        ? "随机播放"
        : this.mode == playMode.loop
        ? "单曲循环"
        : "顺序播放";
    }
  },
  methods: {
    show() {
      this.playlistShow = true;
      setTimeout(() => {
        this.$refs.list.refresh();
        this.scrollToCurrent(this.currentSong);
      }, 20);
    },
    close() {
      this.playlistShow = false;
    },
    // modeChange() {
    //   console.log(1);
      
    //   this.$emit("modeChange");
    // },
    clear() {
      this.$refs.confirm.show();
    },
    clearList() {
      this.clearPlaylist();
      this.playlistShow = false;
    },
    remove(item) {
      this.removeSong(item);
      if (this.playList == 0) {
        this.playlistShow = false;
      }
    },
    selectItem(item, index) {
      if (this.mode == playMode.random) {
        index = this.playList.findIndex(song => song.id == item.id);
      }
      this.setCurrentIndex(index);
      this.setPlayingState(true);
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex(song => current.id === song.id);
      this.$refs.list.scrollToElement(this.$refs.item[index], 300);
    },
    addSong() {
      this.$refs.addSong.show();
    },
    ...mapMutations({
      setSequenceList: "SET_SEQUENCE_LIST"
    }),
    ...mapActions(["clearPlaylist", "removeSong"])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.playlistShow || newSong.id === oldSong.id) {
        return;
      }
      setTimeout(() => {
        this.scrollToCurrent(newSong);
      }, 20);
    }
  },
  components: {
    scroll,
    confirm,
    addSong
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.playlist
  width: 100%
  position: fixed
  top: 0
  bottom: 0
  z-index: 200
  background: $color-background-d
  color: $color-theme
  .container
    position: absolute
    bottom: 0
    width: 100%
    overflow: hidden
    border-radius: 10px 10px 0 0
    background: white
    .head
      border-1px($color-text-l)
      height: 50px
      box-sizing: border-box
      padding: 10px
      display: flex
      align-items: center
      position: relative
      .iconfont
        font-size: 24px
        color: $color-text-l
        &.iconclear
          font-size: 16px
          position: absolute
          right: 10px
      .mode
        font-size: 14px
        margin-left: 5px
    .list
      max-height: 240px
      overflow: hidden
      .item
        padding: 0 20px
        height: 40px
        line-height: 40px
        font-size: 14px
        display: flex
        flex-direction: row
        align-items: center
        position: relative
        &.list-enter-active,&.list-leave-active
          transition all 0.1s
        &.list-enter,&.list-leave-to
          height 0px
        .current
          color: $color-theme-d
        .songname
          flex: 1
          margin-right: 50px
          no-wrap()
        .iconpause
          margin-right: 5px
        .iconlike,.icondislike
          position: absolute
          right: 45px
          &.iconlike
            color red
        .iconremove
          position: absolute
          right: 20px
    .operate
      height: 80px
      padding: 20px 20px 30px 20px
      box-sizing: border-box
      font-size: 12px
      border-1px($color-text-l)
      .add
        width: 120px
        margin: 0 auto
        line-height: 28px
        border: 1px solid $color-theme
        border-radius: 20px
        display: flex
        align-items: center
        justify-content: center
    .close
      line-height: 50px
      text-align: center
      color: $color-theme-d
  &.move-enter-active,&.move-leave-active
    transition: opacity 0.4s
    .container
      transition all 0.4s
  &.move-enter,&.move-leave-to
    opacity 0
    .container
       transform translateY(100%)
</style>
