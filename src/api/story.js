import request from '@/utils/request'

export function getStorysBySprint(sprintId) {
  return request({
    url: '/stories',
    method: 'get',
    params: {
      sprintId: sprintId
    }
  })
}

export function getStorysBySprintAndStatus(sprintId, status) {
  return request({
    url: '/stories',
    method: 'get',
    params: {
      sprintId: sprintId,
      statusStr: status
    }
  })
}

export function insertStory(data) {
  return request({
    url: '/story',
    method: 'post',
    data: data
  })
}

export function updateStory(data) {
  return request({
    url: '/story',
    method: 'put',
    data: data
  })
}

export function deleteStory(storyId) {
  return request({
    url: '/story/' + storyId,
    method: 'delete'
  })
}

export function importStory(storyId) {
  return request({
    url: '/story/' + storyId + '/import',
    method: 'put'
  })
}

export function returnStory(storyId) {
  return request({
    url: '/story/' + storyId + '/return',
    method: 'put'
  })
}

export function developReceive(storyId, userId) {
  return request({
    url: '/story/' + storyId + '/developReceive/' + userId,
    method: 'put'
  })
}

export function developReturn(storyId, userId) {
  return request({
    url: '/story/' + storyId + '/developReturn/' + userId,
    method: 'put'
  })
}

export function developFinish(storyId, userId) {
  return request({
    url: '/story/' + storyId + '/developFinish/' + userId + '/' + 0,
    method: 'put'
  })
}

export function testReceive(storyId, userId) {
  return request({
    url: '/story/' + storyId + '/testReceive/' + userId,
    method: 'put'
  })
}

export function testReturn(storyId, userId) {
  return request({
    url: '/story/' + storyId + '/testReturn/' + userId,
    method: 'put'
  })
}

export function testPass(storyId, userId) {
  return request({
    url: '/story/' + storyId + '/testPass/' + userId + '/' + 0,
    method: 'put'
  })
}

export function testNotPass(storyId, userId) {
  return request({
    url: '/story/' + storyId + '/testNotPass/' + userId + '/' + 0,
    method: 'put'
  })
}

export function message(storyId) {
  return request({
    url: '/message/' + storyId,
    method: 'put'
  })
}
