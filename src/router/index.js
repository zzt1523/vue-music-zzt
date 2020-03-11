import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from 'components/recommend/recommend'
// import Singer from 'components/singer/singer'
// import Rank from 'components/rank/rank'
// import Search from 'components/search/search'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import Disc from 'components/disc/disc'
// import TopList from 'components/top-list/top-list'
// import UserCenter from 'components/user-center/user-center'

Vue.use(Router)

const Recommend = ((resolve) => {
    import('components/recommend/recommend').then((modules) => {
        resolve(modules)
    })
})

const Singer = ((resolve) => {
  import('components/singer/singer').then((modules) => {
      resolve(modules)
  })
})

const Rank = ((resolve) => {
  import('components/rank/rank').then((modules) => {
      resolve(modules)
  })
})

const Search = ((resolve) => {
  import('components/search/search').then((modules) => {
      resolve(modules)
  })
})

const SingerDetail = ((resolve) => {
  import('components/singer-detail/singer-detail').then((modules) => {
      resolve(modules)
  })
})

const Disc = ((resolve) => {
  import('components/disc/disc').then((modules) => {
      resolve(modules)
  })
})

const TopList = ((resolve) => {
  import('components/top-list/top-list').then((modules) => {
      resolve(modules)
  })
})

const UserCenter = ((resolve) => {
  import('components/user-center/user-center').then((modules) => {
      resolve(modules)
  })
})

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc 
        }
      ]
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      children: [
         {
            path: ':id',
            component: SingerDetail
         }
      ]
    },
    {
      path: '/user',
      component: UserCenter,
    }
  ]
})
