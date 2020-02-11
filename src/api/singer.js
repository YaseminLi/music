import jsonp from 'common/js/jsonp.js';
import { commonParams, options } from 'api/config.js';
// import singer from '../data/singer'
// import singerDetail from '../data/singerDetail'
import axios from 'axios';

// export function getSinger() {

//   return new Promise((resolve) => {
//     resolve(singer)
//   })
// }
// export function getSinger(singer) {

//   return new Promise((resolve) => {
//     resolve(singerDetail)
//   })
// }
export function getSinger() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

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
export function getSingerDetail(singer) {
  const url = '/api/getSingerDetail';
  const data = Object.assign({}, commonParams, {
    notice: 0,
    platform: 'h5page',
    needNewCode: 1,
    order: 'listen',
    from: 'h5',
    num: 20,
    begin: 0,
    singerid: singer.id,
    singermid: singer.mid,
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
