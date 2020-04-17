import request from '@/utils/request'

export function getRole(projectId, userId) {
  return request({
    url: '/role',
    method: 'get',
    params: {
      projectId: projectId,
      userId: userId
    }
  })
}

export function updateRole(projectId, userId, roleStr) {
  return request({
    url: '/role',
    method: 'put',
    params: {
      projectId: projectId,
      userId: userId,
      role: roleStr
    }
  })
}

export function getUsersByProject(projectId) {
  return request({
    url: '/project/users/' + projectId,
    method: 'get'
  })
}
