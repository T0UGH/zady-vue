import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import store from './store'
import { Message } from 'element-ui'
import { generateRoutes } from './utils/roles'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  let hasToken = store.getters.token
  console.log(hasToken)

  // 先尝试从sessionStorage中加载
  if (!hasToken) {
    // loadTokenFirst
    if (sessionStorage.getItem('store')) {
      console.log('ok')
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      console.log('exit')
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })
  }

  // 然后重新取一遍，还没有就跳转到登陆
  hasToken = store.getters.token
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoutes = store.state.permission.routes && store.state.permission.routes.length > 0
      console.log(hasRoutes)
      if (hasRoutes) {
        next()
      } else {
        try {
          await generateRoutes()
          // hack method to ensure that addRoutes is complete
          // 重新执行一遍这个方法的意思
          // set the replace: true, so the navigation will not leave a history record
          // 不会产生历史记录
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
          // remove token and go to login page to re-login
          store.commit('user/RESET_STATE')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
