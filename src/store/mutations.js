//定义修改的操作

import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playingState = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAY_LIST](state, list) {
        state.playList = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_MODE](state, mode) {
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_DISC](state, disc) {
        state.disc = disc
    },
    [types.SET_TOP_LIST](state, top) {
        state.topList = top
    },
    [types.SET_SEARCH_HISTORY](state, searches) {
        state.searchHistory = searches
    },
    [types.SET_PLAY_HISTORY](state, playHistory) {
        state.playHistory = playHistory
    },
    [types.SET_FAVORITE_LIST](state, favoriteList) {
        state.favoriteList = favoriteList
    }
}
export default mutations