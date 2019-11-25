import jsonp from 'common/js/jsonp.js';
import { commonParams, options } from 'api/config.js';
// import axios from 'axios';
export function getRank() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uni: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}
export function getTopList(topid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  
    const data = Object.assign({}, commonParams, {
      topid,
      needNewCode: 1,
      uin: 0,
      tpl: 3,
      page: 'detail',
      type: 'top',
      platform: 'h5'
    })
  
    return jsonp(url, data, options)
  }