import request from '@/utils/request'

export function getProjectsByUser(userId) {
  return request({
    url: '/user/projects/' + userId,
    method: 'get'
  })
}

export function getProjectById(projectId) {
  return request({
    url: '/project/' + projectId,
    method: 'get'
  })
}

export function updateProject(project) {
  return request({
    url: '/project',
    method: 'put',
    data: project
  })
}

export function insertProject(project) {
  return request({
    url: '/project',
    method: 'post',
    data: project
  })
}

export function getInviteUsersByProject(projectId) {
  return request({
    url: '/project/invites/' + projectId,
    method: 'get'
  })
}

export function inviteUser(projectId, userId, roleStr) {
  return request({
    url: '/role',
    method: 'post',
    params: {
      projectId: projectId,
      userId: userId,
      role: roleStr
    }
  })
}

export function deleteUserFromProject(projectId, userId) {
  return request({
    url: '/role',
    method: 'delete',
    params: {
      projectId: projectId,
      userId: userId
    }
  })
}

export function updateRole(projectId, userId, roleStr) {
  return request({
    url: '/role',
    method: '/put',
    params: {
      projectId: projectId,
      userId: userId,
      role: roleStr
    }
  })
}
