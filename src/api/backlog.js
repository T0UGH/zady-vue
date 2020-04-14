import request from '@/utils/request'

export function getBacklogs(projectId, sprintId, statusStr) {
  return request({
    url: '/backlogs',
    method: 'get',
    params: {
      projectId: projectId,
      sprintId: sprintId,
      statusStr: statusStr
    }
  })
}

export function getBacklog(backlogId) {
  return request({
    url: '/backlog/' + backlogId,
    method: 'get'
  })
}

export function deleteBacklog(backlogId) {
  return request({
    url: '/backlog/' + backlogId,
    method: 'delete'
  })
}

export function insertBacklog(backlog) {
  return request({
    url: '/backlog',
    method: 'post',
    data: backlog
  })
}

export function updateBacklog(backlog) {
  return request({
    url: '/backlog',
    method: 'put',
    data: backlog
  })
}

export function addToCurrentSprint(backlogId) {
  return request({
    url: '/currentBacklog/' + backlogId,
    method: 'post'
  })
}

export function removeFromCurrentSprint(backlogId) {
  return request({
    url: '/currentBacklog/' + backlogId,
    method: 'delete'
  })
}
