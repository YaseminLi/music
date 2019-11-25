import { getSongsUrl, getLyric } from 'api/song';
import { ERR_OK } from "api/config.js";
import {Base64 } from 'js-base64';
export class Song {
    constructor({ id, mid, singer, songname, album, albumdesc, duration, image, url }) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.songname = songname;
        this.album = album;
        this.albumdesc = albumdesc;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
    getLyric() {
        if(this.lyric){
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve,reject)=>{
            getLyric(this.mid).then(res => {
                if (res.code==ERR_OK) {
                    //转译歌词
                    this.lyric=Base64.decode(res.lyric)
                    resolve(this.lyric);
                }else{
                    reject(new Error('no lyric'))
                }
            })
        })
        
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        songname: musicData.songname,
        album: musicData.albumname,
        albumdesc: musicData.albumdesc,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: musicData.url
    })
}
function filterSinger(singer) {
    if(typeof(singer)=="string"){
        return singer
    }
    if (!singer) {
        return '';
    }
    let ret = [];
    singer.forEach(item => {
        ret.push(item.name)
    });
    return ret.join('/')
}

//给song添加歌曲的播放地址url:"http://dl.stream.qqmusic.qq.com/C400003iHc0e2UIgMC.m4a?guid=7254994994&vkey=079498FAEB2890EE7C4D41141BB1F98FE54D3A784B1FD4F164A86A71D3CF68C6BADF4FA5E23D04D2B7F26DEB2563D1FEFD1B926F031EE7C1&uin=0&fromtag=38"
export function processSongsUrl(songs) {
    if (!songs.length) {
        return Promise.resolve(songs);
    }
    return getSongsUrl(songs).then((purlMap) => {
        songs = songs.filter(song => {
            const purl = purlMap[song.mid];
            if (purl) {
                song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl;
                return true
            }
            return false
        })
        return songs
    })

}