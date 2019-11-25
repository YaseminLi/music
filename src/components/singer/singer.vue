<template>
  <div class="singer" ref="singer">
   <listview :data='singers' @select='selectSinger' ref="listview"/>
   <router-view></router-view>
  </div>
</template>

<script>
import { getSinger } from "api/singer.js";
import { ERR_OK } from "api/config.js";
import Singer from "common/js/singer.js";
import listview from 'base/listview/listview';
import {mapMutations} from 'vuex';
import { playlistMixin } from "common/js/mixin.js";
const HOT_SINGER_LEN = 10;
const HOT_NAME = "热门";

export default {
  mixins: [playlistMixin],
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSinger();
  },
  methods: {
     handlePlaylist(playList) {
      const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.listview.refresh()
    },
    selectSinger(singer){
      this.$router.push({
        path:`/singer/${singer.mid}`
      });
      this.setSinger(singer);
    },
    _getSinger() {
      getSinger().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_id,
              mid:item.Fsinger_mid,
              name: item.Fsinger_name,
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_id,
              mid:item.Fsinger_mid,
              name: item.Fsinger_name,
          })
        );
      });
      let singer = [];
      singer.push(map.hot);
      for (let i = "A".charCodeAt(); i < "Z".charCodeAt() + 1; i++) {
        if (map[String.fromCharCode(i)]) {
          singer.push(map[String.fromCharCode(i)]);
        }
      }
      return singer;
    },
    ...mapMutations({
      setSinger:'SET_SINGER'
    })
  },
  components: {
    listview
  }
};
</script>

<style scoped lang="stylus">
.singer
  position: fixed
  width: 100%
  top: 44px
  bottom: 0
</style>