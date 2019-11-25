import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Rank=()=>import("./components/rank/rank.vue")
const Recommend=()=>import('./components/recommend/recommend.vue')
const Search=()=>import('./components/search/search.vue')
const Singer=()=>import('./components/singer/singer.vue')
const singerDetail=()=>import('./components/singer-detail/singer-detail.vue')
const disc=()=>import("./components/disc/disc.vue")
const topList=()=>import("./components/top-list/top-list.vue")
const user=()=>import("./components/user/user.vue")

export default new Router({
  routes: [
    {
      path: '/',
      redirect:  '/rank',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      children:[{
        path:":id",
        component:topList
      }]
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: disc
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children:[
        {
          path:':id',
          component:singerDetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
    }
  ]
});

