const express = require('express')
const app = express()
const axios=require('axios')
const apiRoutes = express.Router()
const bodyParser = require('body-parser')
// const compression=require('compression')
const port= 9000

apiRoutes.get('/getDiscList', function (req, res) {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
    axios.get(url, {
        headers: {
            referer: 'https://y.qq.com/portal/playlist.html',
            // host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e);
    })
})
apiRoutes.get('/getSingerDetail', function (req, res) {
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
        axios.get(url, {
            // headers: {
            //     referer: `https://y.qq.com/n/yqq/singer/${req.query.myid}.html`,
            // },
            params: req.query
        }).then((response) => {
            res.json(response.data)
        }).catch((e) => {
            console.log(e);
        })
    })
apiRoutes.get('/lyric', function (req, res) {
        const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
        axios.get(url, {
            headers: {
                referer: "https://y.qq.com/portal/player.html",
            },
            params: req.query
        }).then((response) => {
            res.json(response.data)
        }).catch((e) => {
            console.log(e);
        })
    })
apiRoutes.get('/getSongList', function (req, res) {
        const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
        axios.get(url, {
            headers: {
                referer: `https://y.qq.com/n/yqq/playsquare/${req.query.disstid}.html`,
            },
            params: req.query
        }).then((response) => {
            res.json(response.data)
        }).catch((e) => {
            console.log(e);
        })
    })
apiRoutes.get('/getSearchResult', function (req, res) {
        const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
        axios.get(url, {
            headers: {
                referer: `https://y.qq.com/m/index.html`,
            },
            params: req.query
        }).then((response) => {
            res.json(response.data)
        }).catch((e) => {
            console.log(e);
        })
    }),
apiRoutes.post('/getPurlUrl', bodyParser.json(), function (req, res) {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
        axios.post(url, req.body, {
            headers: {
                referer: 'https://y.qq.com/',
                origin: 'https://y.qq.com',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            res.json(response.data)
        }).catch(e => {
            console.log(e);

        })
    })

app.use('/api', apiRoutes)

// app.use(compression())

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})