import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/token',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function switchProject(projectId) {
  return request({
    url: '/token/' + projectId,
    method: 'put'
  })
}

export function getUser(userId) {
  return request({
    url: '/user/' + userId,
    method: 'get'
  })
}

export function updateUser(user) {
  return request({
    url: '/user',
    method: 'put',
    data: user
  })
}

export function getInviteProjectsByUser(userId) {
  return request({
    url: '/user/invites/' + userId,
    method: 'get'
  })
}

export function acceptInvite(projectId) {
  return request({
    url: '/invite/' + projectId,
    method: 'put'
  })
}

export function getUsersForInvite(search, projectId) {
  return request({
    url: '/usersForInvite',
    method: 'get',
    params: {
      queryStr: search,
      projectId: projectId
    }
  })
}
