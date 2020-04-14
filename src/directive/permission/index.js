import permission from './permission'
import Vue from 'vue'

const install = function(Vue) {
  Vue.directive('permission', permission)
}

if (window.Vue) {
  window['permission'] = permission
  Vue.use(install); // eslint-disable-line
  console.log('here')
}
Vue.use(install); // eslint-disable-line

permission.install = install
export default permission
