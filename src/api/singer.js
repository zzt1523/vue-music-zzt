import originJSONP from 'jsonp'
import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'

export function getSingerList() {
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

export function getSingerDetail(singerId){
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({},commonParams, {
      hostUin:0,
      loginUin: 0,
      platform: 'yqq',
      order: 'listen',
      begin: 0,
      num: 100,
      songstatus: 1,
      singermid: singerId,
  })

  return jsonp(url, data, options)
}

export function getMusicUrl(mid){
   let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

   let _guid = Math.round(2147483647 * Math.random()) * (new Date).getUTCMilliseconds() % 1e10

   const data = {
      g_tk: 5381,
      jsonpCallback: "MusicJsonCallback" + (Math.random() + "").replace("0.", ""),
      loginUin: 0,
      hostUin: 0,
      format: "json",
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq',
      needNewCode: 0,
      cid: 205361747, 
      callback: "MusicJsonCallback" + (Math.random() + "").replace("0.", ""),
      uin: 0,
      filename: 'C400' + mid + '.m4a',
      songmid: mid,
      guid: _guid
   }

    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

    return new Promise((resolve,reject) => {
        originJSONP(url,{},(err,data) => {
            data.guid = _guid
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })

    // return jsonp(url, data)
}

function param(data) {
    let url = ''
    for (var k in data) {
        let value = data[k] !== undefined ?  data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}