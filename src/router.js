import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store.js'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: () =>
        import(/* webpackChunkName: "sandbox" */ './views/Sandbox.vue'),

    },

    {
      path: '/upload',
      name: 'upload',
      component: () =>
        import(/* webpackChunkName: "upload" */ './views/Upload.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    { path: '/uploadFile', redirect: { name: 'upload' } },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  let jwt = localStorage.getItem('jwt')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn && jwt) {
      next()
      return
    }
    store.dispatch('logout').then(router.push('/login'))
    next('/login')
  } else {
    next()
  }
})

export default router
