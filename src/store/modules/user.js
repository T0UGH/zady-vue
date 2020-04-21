import { getUser } from '@/api/user'
import { getProjectsByUser } from '../../api/project'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: undefined,
    userId: '',
    name: '',
    avatar: '',
    roles: [],
    currentProjectId: undefined,
    currentProject: undefined,
    projectList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_CURRENT_PROJECT_ID: (state, id) => {
    state.currentProjectId = id
  },
  SET_CURRENT_PROJECT: (state, project) => {
    state.currentProject = project
  },
  SET_PROJECT_LIST: (state, projectList) => {
    state.projectList = projectList
  }
}

const actions = {
  getProjectsByUser({ commit, state }) {
    return new Promise((resolve, reject) => {
      getProjectsByUser(state.userId).then(res => {
        console.log(res)
        commit('SET_PROJECT_LIST', res.body)
        if (state.currentProjectId) {
          res.body.forEach(project => {
            if (project.projectId === state.currentProjectId) {
              commit('SET_CURRENT_PROJECT', project)
            }
          })
        }
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  },

  async getUserInfo({ commit, state }) {
    try {
      const { body } = await getUser(state.userId)
      commit('SET_NAME', body.name)
      commit('SET_AVATAR', body.avatar)
    } catch (e) {
      console.log(e)
    }
  }

  // remove token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     removeToken() // must remove  token  first
  //     commit('RESET_STATE')
  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

