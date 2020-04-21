import request from '@/utils/request'

export function getSprint(sprintId) {
  return request({
    url: '/sprint/' + sprintId,
    method: 'get'
  })
}

export function updateSprint(data) {
  return request({
    url: '/sprint',
    method: 'put',
    data: data
  })
}

export function endSprint(sprintId) {
  return request({
    url: '/sprint/' + sprintId,
    method: 'delete'
  })
}

export function startSprint(data) {
  return request({
    url: '/sprint',
    method: 'post',
    data: data
  })
}

export function getSprintList(projectId) {
  return request({
    url: '/sprints/' + projectId,
    method: 'get'
  })
}
