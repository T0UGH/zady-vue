<template>
  <common-table
    :load-request="loadRequest"
    no-insert
    :delete-request="deleteUserFromProject"
    :update-request="updateRole"
    :primary-keys="['projectId','userId','roleList']"
    :additional-form-data="{roleList: roleList, projectId: currentProjectId}"
  >
    <template #buttonSlot="{formData}">
      <JumpButton size="small" to="/project/inviteUser">新增邀请</JumpButton>
    </template>
    <template #tableContent>
      <el-table-column
        prop="userId"
        label="用户编号"
        sortable
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="role.role"
        label="角色"
        sortable
      />
    </template>
    <template #formContent="{formData}">
      <el-form-item label="用户ID">
        <el-input v-model="formData.userId" disabled />
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="formData.email" disabled />
      </el-form-item>
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="formData.name" disabled />
      </el-form-item>
      <el-form-item label="用户角色">
        <el-checkbox-group v-model="roleList">
          <el-checkbox v-for="role in rolesEnum" :key="role" :label="role" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="头像">
        <el-avatar
          style="width: 100px; height: 100px"
          :src="formData.avatar"
        />
      </el-form-item>
    </template>
  </common-table>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import { getInviteUsersByProject, deleteUserFromProject, updateRole } from '@/api/project'
import { mapGetters } from 'vuex'
import JumpButton from '@/components/Button/JumpButton'

export default {
  name: 'InviteTable',
  components: {
    JumpButton,
    CommonTable
  },
  data() {
    return {
      roleList: ['tester', 'developer']
    }
  },
  computed: {
    ...mapGetters([
      'currentProjectId',
      'rolesEnum'
    ])
  },
  methods: {
    loadRequest() {
      return getInviteUsersByProject(this.currentProjectId)
    },
    deleteUserFromProject,
    updateRole
  }
}
</script>

<style scoped>

</style>
