import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/token',
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
