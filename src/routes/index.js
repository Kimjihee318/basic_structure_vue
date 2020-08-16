import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
import __C from '@/primitives/_constants_'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/container/layout/index.vue'),
      meta: {
        requiresAuth: true
      },
      redirect: '/main',
      children: [
        {
          path: 'main', // * 그냥 자식 path는 '/' 붙여주지 않음 redirect에만 / 붙여줌
          name: 'main',
          component: () => import('@/views/service/ServiceMain.vue'),
          meta: {
            requiresAuth: true
          }
        },
        // {
        //   path: 'residenceinfo',
        //   name: 'residenceinfo',
        //   component: () => import('@'),
        //   meta: {
        //     requiresAuth: true
        //   }
        // },
        {
          path: 'system',
          name: 'system',
          redirect: '/system/userinfo',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: 'userinfo',
              name: 'sys_userinfo',
              component: () => import('@/views/system/SystemUserInfoBoard.vue'),
              meta: {
                requiresAuth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/service/ServiceLogin.vue'),
      meta: {
        requiresAuth: false
      },
      beforeEnter(from, to, next) {
        const account = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))

        if (account) return next('/')
        next()
      }
    },
    {
      path: '/test',
      component: () => import('@/views/service/test.vue'),
      meta: {
        requiresAuth: true
      }
    },
    { path: '/404', component: () => import('@/views/service/Service404.vue') },
    { path: '*', redirect: '/404' }
  ]
})

router.beforeEach((to, from, next) => {
  let account = JSON.parse(localStorage.getItem(__C.LOCAL_STORAGE_NAME.ACCOUNT))
  if (to.meta.requiresAuth && !account) {
    next({ path: '/login' })
    return
  }
  // store.state.application.isResidence = to.name === 'residenceinfo' ? true : false
  next()
})

export default router
