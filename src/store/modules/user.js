import { login, logout, getInfo } from '@/api/user'
import { getProjectsByUser } from '../../api/project'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

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
  // user login
  // login({ commit }, userInfo) {
  //   const { email, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ email: email.trim(), password: password }).then(response => {
  //       const { body } = response
  //       commit('SET_TOKEN', body.token)
  //       commit('SET_NAME', body.name)
  //       commit('SET_AVATAR', body.avatar)
  //       commit('SET_ROLE', body.role.role)
  //       setToken(body.token)
  //       resolve()
  //     }).catch(error => {
  //       console.log(error)
  //       reject(error)
  //     })
  //   })
  // },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response
  //
  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }
  //
  //       const { name, avatar } = data
  //
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
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

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

