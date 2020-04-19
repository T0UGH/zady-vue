<template>
  <common-form
    :load-request="loadRequest"
    :submit-request="updateProject"
    :after-success="afterSuccess"
  >
    <template #buttonSlot="{formData}">
      <JumpButton size="small" to="/project/user">成员列表</JumpButton>
      <JumpButton size="small" to="/project/invite">邀请列表</JumpButton>
    </template>
    <template #formContent="{formData}">
      <template v-if="formData.projectId">
        <el-form-item label="项目ID">
          <el-input v-model="formData.projectId" disabled />
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input v-model="formData.note" />
        </el-form-item>
        <el-form-item label="Github地址">
          <el-input v-model="formData.githubUrl" />
        </el-form-item>
      </template>
      <span v-else>当前无项目，<router-link to="/">创建</router-link>项目</span>
    </template>
  </common-form>
</template>

<script>
import CommonForm from '@/components/CommonForm'
import { updateProject } from '@/api/project'
import JumpButton from '@/components/Button/JumpButton'

export default {
  name: 'UpdateProject2',
  components: {
    CommonForm,
    JumpButton
  },
  methods: {
    updateProject,
    async afterSuccess() {
      await this.$store.dispatch('user/getProjectsByUser')
    },
    loadRequest() {
      return {
        body: this.$store.getters.currentProject
      }
    }
  }
}
</script>

<style scoped>

</style>
