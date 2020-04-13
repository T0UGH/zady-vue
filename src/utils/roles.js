import store from '../store'
import router from '../router'

export async function generateRoutes() {
  const roles = store.getters.roles
  console.log(roles)
  // // generate accessible routes map based on roles
  const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
  //
  // // dynamically add accessible routes
  router.addRoutes(accessRoutes)
}
