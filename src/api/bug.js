import request from '@/utils/request'

export function getBugsBySprint(sprintId, statusStr) {
  return request({
    url: '/bugs',
    method: 'get',
    params: {
      sprintId: sprintId,
      statusStr: statusStr
    }
  })
}

export function createBug(data) {
  return request({
    url: '/bug',
    method: 'post',
    data: data
  })
}

export function updateBug(data) {
  return request({
    url: '/bug',
    method: 'put',
    data: data
  })
}

export function deleteBug(bugId) {
  return request({
    url: '/bug/' + bugId,
    method: 'delete'
  })
}

export function developNotConfirm(bugId, userId) {
  return request({
    url: '/bug/' + bugId + '/developNotConfirm/' + userId,
    method: 'put'
  })
}

export function developConfirm(bugId, userId) {
  return request({
    url: '/bug/' + bugId + '/developConfirm/' + userId,
    method: 'put'
  })
}

export function developFinish(bugId, userId) {
  return request({
    url: '/bug/' + bugId + '/developFinish/' + userId,
    method: 'put'
  })
}

export function testPass(bugId, userId) {
  return request({
    url: '/bug/' + bugId + '/testPass/' + userId,
    method: 'put'
  })
}

export function testNotPass(bugId, userId) {
  return request({
    url: '/bug/' + bugId + '/testNotPass/' + userId,
    method: 'put'
  })
}
