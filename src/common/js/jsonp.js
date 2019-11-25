import originJSONP from 'jsonp'

// url:https://music.163.com/#/playlist
//data:{id:2850578667}
export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

//{id:2850578667} =>  id=2850578667
function param(data) {
    let url = '';
    for (var key in data) {
        let value = data[key] !== undefined ? data[key] : '';
        url += `&${key}=${decodeURIComponent(value)}`;
    }
    return url ? url.substr(1) : '';
}
