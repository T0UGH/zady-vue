import request from '@/utils/request'

export function getProjectsByUser(userId) {
  return request({
    url: '/user/projects/' + userId,
    method: 'get'
  })
}
