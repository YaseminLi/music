
import storage from 'good-storage'
const SEARCH_KEY = "_search_"
const SEARCH_MAX_LEN = 20

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200
//用storage库写

function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)
    arr.unshift(val)
    if (index > -1) {
        arr.splice(index + 1, 1)
    }
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}
function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
        arr.splice(index, 1)
    }
}
export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, (item) => item == query, SEARCH_MAX_LEN)
    storage.set(SEARCH_KEY, searches)
    return searches
}

export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
}
export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}
export function removeSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches, (item) => item == query);
    storage.set(SEARCH_KEY, searches)
    return searches
}

export function savePlay(song){
    let playes = storage.get(PLAY_KEY, [])
    insertArray(playes, song, (item) => item.id == song.id, PLAY_MAX_LEN)
    storage.set(PLAY_KEY, playes)
    return playes
}
export function loadHistory() {
    return storage.get(PLAY_KEY, [])
}

export function saveFavoriteItem(song){
    let favorites = storage.get(FAVORITE_KEY, [])
    insertArray(favorites, song, (item) => item.id == song.id, FAVORITE_MAX_LEN)
    storage.set(FAVORITE_KEY, favorites)
    return favorites
}
export function removeFavoriteItem(song){
    let favorites = storage.get(FAVORITE_KEY, [])
    deleteFromArray(favorites,item=>item.id==song.id)
    storage.set(FAVORITE_KEY, favorites)
    return favorites
}
export function loadFavorite() {
    return storage.get(FAVORITE_KEY, [])
}
// export function saveSearch(key, value) {
//     let list = JSON.parse(localStorage.getItem(key));
//     if (!list) {
//         list = []
//     }
//     //之前存在，位置调到第一个，不存在放到队首
//     const find=list.findIndex(item=>item==value)
//     if(find==-1){
//         list.unshift(value)
//     }else{
//         for(let i=find;i>0;i--){
//             list[i]=list[i-1]
//         }
//         list[0]=value;
//     }

//     localStorage.setItem(key, JSON.stringify(list))
// }

// export function loadSearch() {
//     let list = JSON.parse(localStorage.getItem(key));
//     if (!list) {
//         return [];
//     } else {
//         return list
//     }
// }
// export function removeLocalAll(key){
//     localStorage.removeItem(key);
// }
// export function  removeLocalItem(key,value){
//     let list=JSON.parse(localStorage.getItem(key))
//     list=list.filter(item=>item!==value);
//     localStorage.setItem(key, JSON.stringify(list))
// }