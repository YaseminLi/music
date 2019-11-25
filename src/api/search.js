import jsonp from 'common/js/jsonp.js';
import { commonParams, options } from 'api/config.js';
import axios from "axios"

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url, data, options)
}
export function getSearchResult(search, page, zhida, perpage) {
  const url = '/api/getSearchResult'
  const data = Object.assign({}, commonParams, {
    w: search,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => { 
    return Promise.resolve(res.data)
  })
}
// export function getSearchResult(key) {
//   const url = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg'

//   const data = Object.assign({}, commonParams, {
//     hostUin: 0,
//     needNewCode: 0,
//     platform: 'yqq.json',
//     key: key
//   })
//   return jsonp(url, data, options)
// }
