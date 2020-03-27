<template>
  <div class="rank" ref="rank">
    <scroll class="rank-scroll" ref="scroll" :data="rank">
      <div class="container">
        <div class="list-group" v-for="(item,index) in rank" :key="index" @click="selectItem(item)">
          <div class="left">
            <img class="pic" v-lazy="item.picUrl" />
            <span class="listenCount">
              <i class="iconfont iconlisten" />
              <span>{{normalizeNum(item.listenCount)}}</span>
            </span>
          </div>
          <div class="right">
            <div class="song" v-for="(song,index) in item.songList" :key="index">
              {{index+1}}
              <span class="songname">{{song.songname}}</span>
              -{{song.singername}}
            </div>
            <i class="iconfont iconxiayige" />
          </div>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="rank.length==0">
      <loading />
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
import { getRank } from "api/rank.js";
import { ERR_OK } from "api/config.js";
import scroll from "base/scroll/scroll";
import { normalizeNum } from "common/js/filter.js";
import { playlistMixin } from "common/js/mixin.js";
import { mapMutations } from "vuex";
import loading from "base/loading/loading"
export default {
  mixins: [playlistMixin],
  data() {
    return {
      rank: []
    };
  },
  created() {
    this._initedRank();
  },
  methods: {
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? "60px" : "";
      this.$refs.rank.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    normalizeNum(num) {
      return normalizeNum(num);
    },
    _initedRank() {
      getRank().then(res => {
        if (res.code == ERR_OK) {
          this.rank = res.data.topList;
        }
      });
    },
    // 跳转到子路由,this.$router为路由实例，push方法会向 history栈添加一个新的记录，当用户点击浏览器后退按钮时，则回到之前的 URL。
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}` 
      });
      this.setTopList(item);
    },
    ...mapMutations({
      setTopList: "SET_TOP_LIST"
    })
  },
  components: {
    scroll,
    loading
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.rank
  position: fixed
  top: 44px
  width: 100%
  bottom: 0
  background: $color-background-dd
  overflow hidden
  .rank-scroll
    height: 100%
    overflow: hidden
    .container
      margin: 0 10px
      padding: 10px 0
      .list-group
        width: 100%
        font-size: 0px
        margin-bottom: 10px
        background: $color-background
        display: flex
        .left
          flex: 0 0 100px
          position: relative
          .pic
            height: 100px
            width: 100px
          .listenCount
            position: absolute
            bottom: 8px
            left: 5px
            color: $color-background
            display: flex
            align-items: center
            .iconlisten
              font-size: 10px
              margin-right: 3px
            span
              font-size: 9px
        .right
          flex: 1
          padding: 20px 30px 20px 15px
          display: flex
          flex-direction: column
          overflow: hidden
          position: relative
          .iconxiayige
            color: $color-text-lll
            position: absolute
            right: 10px
            bottom: 44px
          .song
            line-height: 21px
            font-size: 14px
            color: $color-text-lll
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            .songname
              color: $color-theme
              margin: 0 5px 0 8px
  .loading-container
    width 100%
    position fixed
    top 50%
    transform translateY(-50%)
</style>