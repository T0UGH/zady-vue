import request from '@/utils/request'

export function getProjectsByUser(userId) {
  return request({
    url: '/user/projects/' + userId,
    method: 'get'
  })
}

export function getProjectById(projectId) {
  return request({
    url: '/projectTable/' + projectId,
    method: 'get'
  })
}

export function updateProject(project) {
  return request({
    url: '/projectTable',
    method: 'put',
    data: project
  })
}

export function insertProject(project) {
  return request({
    url: '/projectTable',
    method: 'post',
    data: project
  })
}
