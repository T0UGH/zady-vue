<template>
  <common-table
    :load-request="loadRequest"
    no-delete
    no-insert
    no-update
    :primary-keys="['projectId']"
  >
    <template #tableContent>
      <el-table-column
        prop="projectId"
        label="项目编号"
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
      <el-form-item label="项目ID">
        <el-input v-model="formData.projectId" disabled />
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="formData.name" disabled />
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="formData.note" disabled />
      </el-form-item>
      <el-form-item label="Github地址">
        <el-input v-model="formData.githubUrl" disabled />
      </el-form-item>
      <el-form-item label="我的角色">
        <template v-if="formData.role">
          <el-input v-model="formData.role.role" disabled />
        </template>
        <template v-else>
          <el-input disabled />
        </template>
      </el-form-item>
    </template>
  </common-table>
</template>

<script>
import CommonTable from '@/components/CommonTable/index'
export default {
  name: 'ProjectTable',
  components: { CommonTable },
  methods: {
    async loadRequest() {
      const res = {}
      await this.$store.dispatch('user/getProjectsByUser')
      res.body = this.$store.getters.projectList
      return res
    }
  }
}
</script>

<style scoped>

</style>
