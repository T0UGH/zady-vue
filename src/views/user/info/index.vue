<template>
  <common-form
    :load-request="loadRequest"
    :submit-request="updateUser"
    :after-success="afterSuccess"
  >
    <template #buttonSlot="{formData}">
      <jump-button size="small" to="/user/avatar">修改头像</jump-button>
      <jump-button size="small" to="/user/project">项目列表</jump-button>
      <jump-button size="small" to="/user/invite">邀请列表</jump-button>
    </template>
    <template #formContent="{formData}">
      <el-form-item label="用户ID">
        <el-input v-model="formData.userId" disabled />
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="formData.email" disabled />
      </el-form-item>
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="默认项目" prop="defaultProjectId">
        <el-select v-model="formData.defaultProjectId" placeholder="请选择">
          <el-option
            v-for="project in projectList"
            :key="project.projectId"
            :label="project.name"
            :value="project.projectId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <el-avatar
          style="width: 100px; height: 100px"
          :src="formData.avatar"
        />
      </el-form-item>
    </template>
  </common-form>
</template>

<script>
import CommonForm from '@/components/CommonForm/index'
import { getUser, updateUser } from '@/api/user'
import { mapGetters } from 'vuex'
import JumpButton from '@/components/Button/JumpButton'

export default {
  name: 'UserInfo',
  components: { JumpButton, CommonForm },
  computed: {
    ...mapGetters([
      'userId',
      'projectList'
    ])
  },
  methods: {
    updateUser,
    loadRequest() {
      return getUser(this.userId)
    },
    async afterSuccess() {
      await this.$store.dispatch('user/getUserInfo')
    }
  }
}
</script>

<style scoped>

</style>
