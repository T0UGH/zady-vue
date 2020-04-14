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

export function deleteBacklog(backlogId) {
  return request({
    url: '/backlog/' + backlogId,
    method: 'delete'
  })
}

export function insertProject(backlog) {
  return request({
    url: '/backlog',
    method: 'post',
    data: backlog
  })
}
