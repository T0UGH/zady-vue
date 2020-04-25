import request from '@/utils/request'

export function getDashBoardBySprint(sprintId) {
  return request({
    url: '/sprint/' + sprintId + '/dashBoard',
    method: 'get'
  })
}

export function getBornoutBySprint(sprintId) {
  return request({
    url: '/sprint/' + sprintId + '/bornout',
    method: 'get'
  })
}
