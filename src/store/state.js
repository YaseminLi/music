import {playMode} from 'common/js/config.js';
import {loadSearch,loadHistory,loadFavorite} from 'common/js/cache.js';
const state={
    singer:{},
    playingState:false,
    fullScreen:false,
    playList:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1, 
    disc:{},
    topList: {},
    searchHistory:loadSearch(),
    playHistory:loadHistory(),
    favoriteList:loadFavorite()
}
export default state;