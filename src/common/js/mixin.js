import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from 'common/js/config'
 // 洗牌函数
 import {shuffle} from 'common/js/util'

export const playListMixin = {
    computed: {
       ...mapGetters([
           'playlist'
       ])   
    },
    mounted() {
        this.handlePlayList(this.playlist)
    },
    activated() {
        this.handlePlayList(this.playlist)
    },
    watch: {
        playlist(newVal) {
          this.handlePlayList(newVal)
        }
    },
    methods: {
        handlePlayList() {
           throw new Error('component must implement handlePlaylist method')
        }
    }
}

export const playerMixin = {
    computed: {
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random' 
         },
         ...mapGetters(['sequenceList','currentSong','playlist','mode','favoriteList'])
    },
    methods: {
        // 改变播放模式
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if(mode == playMode.random) {
               list = shuffle(this.sequenceList)
            } else {
               list = this.sequenceList
            }
            this.resetCurrentIndex(list)
            this.setPlayList(list)
         },
         resetCurrentIndex(list){
            let index = list.findIndex((items) => { return items.id === this.currentSong.id })
            this.setCurrentIndex(index)
         },
         getFavoriteIcon(song) {
             if(this.isFavorite(song)) {
                 return 'icon-favorite'
             }
             return 'icon-not-favorite'
         },
         toggleFavorite(song) {
            if(this.isFavorite(song)) {
                this.deleteFavoriteList(song)
            } else {
                this.saveFavoriteList(song)
            }
         },
         isFavorite(song){
             const index =this.favoriteList.findIndex((item) => {
                 return item.id === song.id
             })
             return index > -1
         },
         ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setMusicUrl: 'SET_MUSIC_URL',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST'
         }),
         ...mapActions(['saveFavoriteList','deleteFavoriteList'])
    }
}

export const searchMixin = {
    data() {
        return {
            query: '',
            refreshDelay: 100
        }
    },
    computed: {
        ...mapGetters(['searchHistory'])
    },
    methods: {
        blurInput(){
            this.$refs.searchBox.blur()
        },
        saveSearch(){
            this.saveSearchHistory(this.query)
        },
        onQueryChange(query) {
            this.query = query
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        },
        ...mapActions(['saveSearchHistory','deleteSearchHistory'])
    }
}