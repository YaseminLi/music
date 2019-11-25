<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <slider v-if="slider.length>0" :slider="slider" @loadImg="loadImg" />
        <div class="discList-wrapper">
          <h1 class="title">推荐歌单</h1>
          <div class="discList">
            <div
              class="item"
              v-for="(item,index) in discList"
              :key="index"
              @click="selectDisc(item)"
            >
              <img v-lazy="item.imgurl" />
              <div class="desc">
                <div class="dissname">{{item.dissname}}</div>
                <div class="info">
                  <span class="listennum">
                    <i class="iconfont iconpause1" />
                    <span>{{normalizeNum(item.listennum)}}</span>
                  </span>
                  <span class="creator">{{item.creator.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="!discList.length">
      <loading />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from "api/recommend.js";
import { ERR_OK } from "api/config.js";
import slider from "base/slider/slider.vue";
import scroll from "base/scroll/scroll.vue";
import loading from "base/loading/loading.vue";
import { setTimeout } from "timers";
import { normalizeNum } from "common/js/filter.js";
import { playlistMixin } from "common/js/mixin.js";
import { mapMutations } from "vuex";
export default {
  mixins: [playlistMixin],
  data() {
    return {
      slider: [],
      discList: []
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    selectDisc(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      });
      this.setDisc(item);
    },
    normalizeNum(num) {
      return normalizeNum(num);
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.slider = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      });
    },
    //轮播图的图片加载出来后刷新scroll，不然scroll的高度会少了轮播图的一块
    loadImg() {
      if (!this.checkloaded) {
        this.checkloaded = true;
        setTimeout(() => {
          this.$refs.scroll.refresh();
        }, 20);
      }
    },
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? "60px" : "";
      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    ...mapMutations({
      setDisc: "SET_DISC"
    })
  },
  components: {
    slider,
    scroll,
    loading
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
.recommend
  position: fixed
  width: 100%
  top: 44px
  bottom: 0
  .recommend-content
    width: 100%
    height: 100%
    overflow: hidden
    background white
    .discList-wrapper
      .title
        margin: 20px
        font-size: 16px
        color: $color-theme
      .discList
        display: flex
        flex-direction: column
        .item
          width: 100%
          box-sizing: border-box
          display: flex
          flex-direction: row
          padding: 0 20px 20px 20px
          img
            height: 60px
            width: 60px
            border-radius: 5px
            margin-right: 10px
          .desc
            flex: 1
            padding: 6px 0
            font-size: 14px
            line-height: 20px
            color: $color-theme
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 2
            .dissname
              margin-bottom: 8px
            .info
              font-size: 12px
              color: $color-text-l
              display flex
              .listennum
                margin-right 10px
                display: flex
                align-items: center
  .loading-container
    width: 100%
    position: absolute
    top: 50%
</style>

