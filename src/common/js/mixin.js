import { mapGetters, mapMutations, mapActions } from "vuex";
import { shullfle } from "common/js/filter.js";
import { playMode } from "common/js/config.js";
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playList)
  },
  activated() {
    this.handlePlaylist(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

export const playerMixin = {
  data(){
    return{
      currentFavorite:null
    }
  },
  computed: {
    ...mapGetters(["sequenceList", "mode", "currentSong", "playList",  "favoriteList"]),
    modeIcon() {
      let mode = "";
      for (var key in playMode) {
        if (playMode[key] === this.mode) {
          mode = key;
        }
      }
      return `iconfont icon${mode}`;
    }
  },
  methods: {
    modeChange() {
      const mode = (this.mode + 1) % 3;
      this.setMode(mode);
      let list = [];
      if (mode == playMode.random) {
        list = shullfle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this._resetCurrentIndex(list);
      this.setPlayList(list);
    },
    _resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    toggleFavorite(song){
     
      if(this.isFavorite(song)){
        this.removeFavorite(song)
      }else{
        this.saveFavorite(song)
      }
    },
    favoriteIcon(song){
      return this.isFavorite(song)?"iconfont iconlike":"iconfont icondislike"
    },
    isFavorite(song){
      let index=this.favoriteList.findIndex(item=>item.id==song.id)
      return index>-1
    },
    ...mapMutations({
      setPlayList: "SET_PLAY_LIST",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayingState: "SET_PLAYING_STATE",
      setMode:"SET_MODE"
    }),
    ...mapActions({
      saveFavorite:"saveFavorite",
      removeFavorite:"removeFavorite"
    })
  }
}
export const searchMixin = {
  data() {
    return {
      query: ""
    }
  },
  computed: {
    ...mapGetters(["searchHistory"])
  },
  methods: {
    queryChange(query) {
      this.query = query;
    },
    search(query) {
      this.$refs.box.setQuery(query);
    }, 
    saveSearch() {
      this.saveSearchHistory(this.query);
    },
    ...mapActions([
      "removeSearchHistory",
      "saveSearchHistory",
    ])
  }
}