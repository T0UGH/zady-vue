<template>
  <common-form
    no-load
    :submit-request="insertProject"
    :after-success="afterSuccess"
  >
    <template #formContent="{formData}">
      <el-form-item label="项目名称" prop="name" :rules="[{required: true, message: '项目名称不能为空'}]">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="项目描述" prop="note">
        <el-input v-model="formData.note" />
      </el-form-item>
      <el-form-item label="Github地址" prop="githubUrl">
        <el-input v-model="formData.githubUrl" />
      </el-form-item>
    </template>
  </common-form>
</template>

<script>
import CommonForm from '@/components/CommonForm'
import { insertProject } from '@/api/project'

export default {
  name: 'InsertProject',
  components: {
    CommonForm
  },
  methods: {
    insertProject,
    async afterSuccess() {
      await this.$store.dispatch('user/getProjectsByUser')
    }
  }
}
</script>

<style scoped>

</style>
