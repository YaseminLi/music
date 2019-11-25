import jsonp from 'common/js/jsonp.js';
import { commonParams, options } from 'api/config.js';
import axios from 'axios';
export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uni: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}
export function getDiscList() {
    const url = '/api/getDiscList';
    const data = Object.assign({}, commonParams, {
        picmid: 1,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 19,
        rnd: Math.random()
    });
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })

}       

export function getSongList(id) {
    const url = '/api/getSongList';
    const data = Object.assign({}, commonParams, {
        hostUin: 0,
        format: 'json',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        type:1,
        disstid:id

    });
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}