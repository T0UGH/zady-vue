import request from '@/utils/request'
import { convertArrtoStr } from '@/utils/roles'

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

export function inviteUser(projectId, userId, role) {
  return request({
    url: '/role',
    method: 'post',
    params: {
      projectId: projectId,
      userId: userId,
      role: convertArrtoStr(role)
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

export function updateRole({ projectId, userId, roleList }) {
  return request({
    url: '/role',
    method: 'put',
    params: {
      projectId: projectId,
      userId: userId,
      role: convertArrtoStr(roleList)
    }
  })
}
