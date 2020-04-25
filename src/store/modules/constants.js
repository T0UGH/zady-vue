const state = {
  backlogStatusEnum: ['未开始', '进行中', '已完成'],
  backlogPriorityEnum: ['A', 'B', 'C', 'D', 'E'],
  rolesEnum: ['master', 'owner', 'developer', 'tester'],
  storyStatusEnum: ['待导入', '待完成', '完成中', '待测试', '测试中', '已完成'],
  bugLevelEnum: ['A', 'B', 'C', 'D'],
  bugStatusEnum: ['待确认', '待修复', '待复核', '已完成']
}

const mutations = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
