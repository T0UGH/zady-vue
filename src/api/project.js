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
