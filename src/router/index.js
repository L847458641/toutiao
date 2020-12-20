import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/layout',
    component: () => import('../views/layout/layout.vue'),
    children: [
      {
        path: '/home', // 默认子路由
        name: 'home',
        component: () => import('../views/home/home.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('../views/qa/qa.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('../views/video/video.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/user.vue')
      }
    ]
  },
  {
    path: '/search', // 默认子路由
    name: 'search',
    component: () => import('../components/search.vue')

  }
]

const router = new VueRouter({
  routes
})

export default router
