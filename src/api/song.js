import { getUid } from 'common/js/uid';
import { commonParams } from './config'
import axios from 'axios'
import { ERR_OK } from 'api/config'
// import { Base64 } from 'js-base64'
export function getLyric(mid){
    const url="/api/lyric";
    const data = Object.assign({}, commonParams, {
        platform: 'yqq.json',
        needNewCode: 0,
        songmid: mid,
        hostUin: 0,
        format:'json',
        g_tk: 1433327100
      });
      return axios.get(url, {
        params: data
      }).then((res) => { 
        return Promise.resolve(res.data)
      })

}
//拿到key=songmid  value=url的对象集合
export function getSongsUrl(songs) {
    const url = '/api/getPurlUrl';

    //所有歌曲的mid汇总在mids数组
    let mids = [];
    let types = [];

    songs.forEach(song => {
        mids.push(song.mid);
        types.push(0);
    });

    const urlMid = getUrlMid(mids, types);
    //歌曲播放请求form.data.comm
    const data = Object.assign({}, commonParams, {
        g_tk: 5381,
        format: 'json',
        platform: 'h5',
        needNewCode: 1,
        uin: 0
    })
    return new Promise((resolve, reject) => {
        let tryTime = 3;
        function request() {
            return axios.post(url, {
                comm: data,
                req_0: urlMid
            }).then(response => {
                const res = response.data;
                if (res.code == ERR_OK) {
                    let urlMid = res.req_0
                    if (urlMid && urlMid.code == ERR_OK) {
                        //purlMap为key=songmid  value=url的对象
                        const purlMap = {};
                        urlMid.data.midurlinfo.forEach(item => {
                            if (item.purl) {
                                purlMap[item.songmid] = item.purl
                            }
                        })
                        if (Object.keys(purlMap).length > 0) {
                            resolve(purlMap)
                        } else {
                            retry()
                        }
                    } else {
                        retry()
                    }
                } else {
                    retry()
                }
            })
        }
        function retry() {
            if (--tryTime >= 0) {
                request()
              } else {
                reject(new Error('Can not get the songs url'))
              }
        }
        request()
    })
}

//获取歌曲播放请求的formData.req_0
function getUrlMid(mids, types) {
    const guid = getUid();
    return {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
            guid,
            songmid: mids,
            songtype: types,
            uin: '0',
            loginflag: 0,
            platform: '23'
        }
    }


}