import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
    singer: {},
    // 播放状态
    playing: false,
    // 是否全屏
    fullScreen: false,
    // 播放列表
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    musicUrl: '',

    disc: {},

    topList: {},
    // 搜索历史
    searchHistory: loadSearch(),

    // 播放历史
    playHistory:loadPlay(),

    // 喜欢的歌曲
    favoriteList: loadFavorite()
}

export default state