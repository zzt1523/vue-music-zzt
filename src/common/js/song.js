import {getLyric} from '@/api/song'
import {ERR_OK} from '@/api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }){
     this.id = id
     this.mid = mid
     this.singer = singer
     this.name = name
     this.album = album
     this.duration = duration
     this.image = image
     this.url = url
  }
  // 歌词数据
  getLyric() {
     if (this.lyric) {
        return Promise.resolve(this.lyric)
     }
     return new Promise((resolve,reject) => {
       getLyric(this.mid).then(res => {
            if(res.retcode === ERR_OK) {
              this.lyric = Base64.decode(res.lyric)
              resolve(this.lyric)
            } else {
               reject('no lyric')
            }
        })
     })
  }
}

export function createSong(musicData){
   return new Song({
     id: musicData.songid,
     mid: musicData.songmid,
     singer: filtersSinger(musicData.singer),
     name: musicData.songname,
     album: musicData.albumname,
     duration: musicData.interval,
     image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
     url: `http://dl.stream.qqmusic.qq.com/${musicData.songid}.m4a?vkey=F88A5865719F74495BB5FC1BD6F7A34D796381DF789F4F16FB0B648147CC1E84C3E48B55653507BDE1670885B15B33C6DB86CE55593C3BF4&guid=8753008512&uin=0&fromtag=66`
    //  http://dl.stream.qqmusic.qq.com/C400003TfyNp47dm7E.m4a?vkey=F88A5865719F74495BB5FC1BD6F7A34D796381DF789F4F16FB0B648147CC1E84C3E48B55653507BDE1670885B15B33C6DB86CE55593C3BF4&guid=8753008512&uin=0&fromtag=66
    //  url: 'http://dl.stream.qqmusic.qq.com/C400000QCwge3B6Ad1.m4a?vkey=28E124C8E802C899F6EE493F7BC4F38F695F3D6C48AD271FBA6FCCFA61612A24B1B2483741253989536242D783746B3CE74E37B4B221B522&guid=8753008512&uin=0&fromtag=66'
   })
}

export function filtersSinger(singer) {
    let ret = []
    if(!singer) {
      return ''
    }
    singer.forEach(s => {
      ret.push(s.name)
    })
    return ret.join('/')
}