const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  currentProjectId: state => state.user.currentProjectId,
  currentProject: state => state.user.currentProject,
  projectList: state => state.user.projectList,
  userId: state => state.user.userId
}
export default getters
