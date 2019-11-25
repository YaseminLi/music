import * as types from './mutation-types';
import { shullfle } from "common/js/filter.js";
import { playMode } from "common/js/config.js";
import { saveSearch, clearSearch, removeSearch ,savePlay,saveFavoriteItem,removeFavoriteItem} from "common/js/cache.js"

function indexFind(list, song) {
    return list.findIndex(item => {
        return item.id == song.id
    })
}
//点击歌曲播放
export const selectPlay = function ({ commit, state }, { list, index }) {

    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode == playMode.random) {
        let randomList = shullfle(list);
        commit(types.SET_PLAY_LIST, randomList)
        index = indexFind(randomList, list[index])
    } else {
        commit(types.SET_PLAY_LIST, list)
    }
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_CURRENT_INDEX, index)
}
//切换到随机播放模式
export const randomPlay = function ({ commit }, { list }) {
    commit(types.SET_MODE, playMode.random)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_FULL_SCREEN, true)
    let randomList = shullfle(list);
    commit(types.SET_PLAY_LIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
}

//播放列表的清空所有歌曲功能
export const clearPlaylist = function ({ commit }) {
    commit(types.SET_PLAY_LIST, [])
    commit(types.SET_SEQUENCE_LIST, [])
    commit(types.SET_CURRENT_INDEX, -1)
    commit(types.SET_PLAYING_STATE, false)
}

//删除播放列表的某一首歌
/* eslint-disable */
export const removeSong = function ({ commit, state }, item) {
    let sequenceList = state.sequenceList.slice();
    let fdSIndex = sequenceList.findIndex(song => song.id == item.id)
    sequenceList.splice(fdSIndex, 1)

    let playList = state.playList.slice();
    let currentIndex = state.currentIndex
    let fdIndex = playList.findIndex(song => song.id == item.id)
    playList.splice(fdIndex, 1)
    if (fdIndex < currentIndex) {
        currentIndex--
    }
    if (playList.length == 0) {
        currentIndex = -1
    }

    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_PLAY_LIST, playList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    if (!playList.length) {
        commit(types.SET_PLAYING_STATE, false)
    } else {
        commit(types.SET_PLAYING_STATE, true)
    }
}

//从搜索结果中点击歌曲进行播放，加入播放列表
export const insertSong = function ({ commit, state }, song) {
    let playList = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    let currentSong = playList[currentIndex]
    //原播放列表中是否有要插入的歌
    let fdIndex = playList.findIndex(item => item.id == song.id)
    //插入歌曲，索引加1
    currentIndex += 1
    //在当前索引位置插入该歌曲
    playList.splice(currentIndex, 0, song)
    //原列表中有该歌曲
    if (fdIndex > -1) {
        //fdIndex在currentIndex前，删掉fdIndex位置上的歌曲
        if (fdIndex < currentIndex) {
            playList.splice(fdIndex, 1)
            currentIndex--
        } else {
            //fdIndex在currentIndex后，删掉fdIndex+1位置上的歌曲
            playList.splice(fdIndex + 1, 1)
        }
    }

    //再操作有序播放列表……
    let currentSIndex = sequenceList.findIndex(item => item.id == currentSong.id)
    currentSIndex += 1
    let fdSIndex = sequenceList.findIndex(item => item.id == song.id)
    sequenceList.splice(currentSIndex, 0, song)
    if (fdSIndex > -1) {
        if (fdSIndex < currentSIndex) {
            sequenceList.splice(fdSIndex, 1)
            currentSIndex--;
        } else {
            sequenceList.splice(fdSIndex + 1, 1)
        }
    }
    commit(types.SET_PLAY_LIST, playList)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULL_SCREEN, true)
}

export const saveSearchHistory = function ({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
export const clearSearchHistory = function ({ commit }) {
    commit(types.SET_SEARCH_HISTORY, clearSearch())
}
export const removeSearchHistory = function ({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, removeSearch(query))
}

export const savePlayHistory=function({commit},song){
    commit(types.SET_PLAY_HISTORY,savePlay(song))
}

export const saveFavorite=function({commit},song){
    commit(types.SET_FAVORITE_LIST,saveFavoriteItem(song))
}

export const removeFavorite=function({commit},song){
    commit(types.SET_FAVORITE_LIST,removeFavoriteItem(song))
}