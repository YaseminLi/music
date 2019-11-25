<template>
  <div class="listview">
    <scroll
      class="singer-wrapper"
      :data="data"
      ref="singerWrapper"
      :listenScroll="true"
      :probeType="3"
      @scroll="scroll"
    >
      <div>
        <div class="singer-group" v-for="(item,index) in data" :key="index" ref="singerGroup">
          <div class="title">{{item.title}}</div>
          <div>
            <div class="singer-item" v-for="(singer,index) in item.items" :key="index" @click="selectItem(singer)">
              <img class="avatar" v-lazy="singer.avatar" />
              <span class="name">{{singer.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="list-shortcut"
        @touchstart="onShortcutTouchStart"
        @touchmove.stop.prevent="onShortcutTouchMove"
      >
        <span
          class="item"
          :data-index="index"
          v-for="(item,index) in shortcutList"
          :key="index"
          :class="{'current':currentIndex==index}"
        >{{item}}</span>
      </div>
      <div v-show='fixedTitle' class="title fixed-title" ref="fixedTitle">{{fixedTitle}}</div>
      <div v-show='!data.length' class="loading"><loading /></div>
    </scroll>
  </div>
</template>

<script>
import scroll from "base/scroll/scroll.vue";
import { getData } from "common/js/dom.js";
import loading from'base/loading/loading';
const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 30;
export default {
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff:-1
    };
  },
  created() {
    //data,props中的数据有setter、getter方法，这个不需要
    this.touch = {};
    this.listHeight = [];
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  computed: {
    shortcutList() {
      return this.data.map(item => {
        return item.title.substr(0, 1);
      });
    },
    fixedTitle(){
      if(this.scrollY>0){
        return ''
      }
      return this.data[this.currentIndex]?this.data[this.currentIndex].title:'';
    }
  },
  methods: {
    refresh(){
      this.$refs.singerWrapper.refresh()
    },
    onShortcutTouchStart(e) {
      //点击了哪个tag
      let anchorIndex = getData(e.target, "index");
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      let anchorIndex = parseInt(this.touch.anchorIndex + delta);
      this._scrollTo(anchorIndex);
    },
    scroll(pos) {
      //实时滚动的位置
      this.scrollY = pos.y;
    },
    selectItem(item){
      this.$emit('select',item);
    },
    _scrollTo(index) {
      this.scrollY = this.listHeight[index];
      this.$refs.singerWrapper.scrollToElement(
        this.$refs.singerGroup[index],
        0
      );
    },
    _calculateHeight() {
      let list = this.$refs.singerGroup;
      let listHeight = [0];
      let height = 0;
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight;
        listHeight.push(height);
      }
      this.listHeight = listHeight;
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      let scrollY = Math.abs(Math.round(newY));
      let listHeight = this.listHeight;
      for (let i = 0; i < listHeight.length; i++) {
        if (listHeight[i + 1]) {
          if (scrollY >= listHeight[i] && scrollY < listHeight[i + 1]) {
            this.currentIndex = i;
            this.diff=listHeight[i+1]+newY;
          }
        }
      }
    },
    //diff为每个title顶部距scroll上方的距离
    diff(newVal){
       //title重叠的高度
        let fixedTop=(newVal>0&&newVal<TITLE_HEIGHT)?newVal-TITLE_HEIGHT:'0';
        if(this.fixedTop==fixedTop){
          return
        }
        this.fixedTop=fixedTop;
        //title向上偏移
        this.$refs.fixedTitle.style.transform=`translate3d(0,${fixedTop}px,0)`;
     }
  },
  components: {
    scroll,
    loading
  }
};
</script>

<style lang='stylus'  scoped>
@import '~common/stylus/variable'
.listview
  height 100%
  overflow hidden
  background white
  .title
    width: 100%
    box-sizing: border-box
    height: 30px
    line-height: 30px
    padding-left: 20px
    background: $color-background-dd
    color: $color-text
    font-size: 12px
    &.fixed-title
      position: absolute
      top: 0
      left: 0
  .singer-wrapper
    height 100%
    overflow: hidden
    .singer-group
      padding-bottom: 30px
      .singer-item
        width: 100%
        box-sizing: border-box
        padding: 20px 0 0 30px
        display: flex
        align-items: center
        .avatar
          border-radius: 50%
          width: 50px
          height: 50px
        .name
          font-size: 14px
          color: $color-text
          margin-left: 20px
    .list-shortcut
      position: absolute
      right: 0
      bottom: 50px
      width: 20px
      padding: 20px 0
      border-radius: 10px
      background: $color-background-dd
      display: flex
      flex-direction: column
      .item
        font-size: 12px
        height: 12px
        width: 14px
        color: $color-text
        padding: 3px
        background: $color-background-dd
        color: $color-text
        text-align: center
        &.current
          color: $color-theme-d
    .loading
      position fixed
      top 50%
</style>
