import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/project',
    component: Layout,
    redirect: '/project/update',
    name: '项目管理',
    meta: { title: '项目管理', icon: 'example' },
    children: [
      {
        path: 'update',
        name: '当前项目',
        component: () => import('@/views/project/update/index'),
        meta: { title: '当前项目', icon: 'form' }
      },
      {
        path: 'insert',
        name: '新建项目',
        component: () => import('@/views/project/insert/index'),
        meta: { title: '新建项目', icon: 'form' }
      },
      {
        path: 'invite',
        name: '邀请列表',
        component: () => import('@/views/project/inviteTable/index'),
        meta: { title: '邀请列表', icon: 'peoples' }
      },
      {
        path: 'user',
        name: '用户列表',
        component: () => import('@/views/project/userTable/index'),
        meta: { title: '用户列表', icon: 'peoples' }
      },
      {
        path: 'inviteUser',
        name: '邀请用户',
        hidden: true,
        component: () => import('@/views/project/inviteUserForm/index'),
        meta: { title: '邀请用户', icon: 'peoples' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/info',
    name: '个人管理',
    meta: { title: '个人管理', icon: 'user' },
    children: [
      {
        path: 'info',
        name: '个人信息',
        component: () => import('@/views/user/info/index'),
        meta: { title: '个人信息', icon: 'user' }
      },
      {
        path: 'avatar',
        name: '修改头像',
        hidden: true,
        component: () => import('@/views/user/avatar/index'),
        meta: { title: '修改头像', icon: 'user' }
      },
      {
        path: 'project',
        name: '项目列表',
        hidden: true,
        component: () => import('@/views/user/projectTable/index'),
        meta: { title: '项目列表', icon: 'table' }
      },
      {
        path: 'invite',
        name: '我的邀请列表',
        hidden: true,
        component: () => import('@/views/user/inviteTable/index'),
        meta: { title: '邀请列表', icon: 'table' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/backlog',
    component: Layout,
    redirect: '/backlog/table',
    name: '工作表管理',
    meta: { title: '工作表管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '项目工作表',
        component: () => import('@/views/backlog/table/index'),
        meta: { title: '项目工作表', icon: 'table' }
      }
    ]
  },
  {
    path: '/sprint',
    component: Layout,
    redirect: '/sprint/update',
    name: '迭代管理',
    meta: { title: '迭代管理', icon: 'example' },
    children: [
      {
        path: 'update',
        name: '当前迭代',
        component: () => import('@/views/sprint/update/index'),
        meta: { title: '当前迭代', icon: 'form' }
      },
      {
        path: 'insert',
        name: '新建迭代',
        hidden: true,
        component: () => import('@/views/sprint/insert/index'),
        meta: { title: '新建迭代', icon: 'form' }
      },
      {
        path: 'history',
        name: '历史迭代',
        hidden: true,
        component: () => import('@/views/sprint/historyTable/index'),
        meta: { title: '历史迭代', icon: 'table' }
      }
    ]
  },
  {
    path: '/story',
    component: Layout,
    redirect: '/story/insert',
    name: '故事管理',
    meta: { title: '故事管理', icon: 'example' },
    children: [
      {
        path: 'insert',
        name: '创建用户故事',
        component: () => import('@/views/story/insertTable/index'),
        meta: { title: '创建用户故事', icon: 'form' }
      },
      {
        path: 'drag',
        name: '故事看板',
        component: () => import('@/views/story/multiDrag/index'),
        meta: { title: '故事看板', icon: 'table' }
      }
    ]
  },
  {
    path: '/bug',
    component: Layout,
    redirect: '/bug/table',
    name: 'BUG管理',
    meta: { title: 'BUG管理', icon: 'bug' },
    children: [
      {
        path: 'table',
        name: 'BUG列表',
        component: () => import('@/views/bug/table/index'),
        meta: { title: 'BUG列表', icon: 'bug' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
