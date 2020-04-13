<template>
  <div class="app-container">
    <el-form ref="form" :model="newProject" label-width="120px">
      <el-form-item>
        <el-button-group>
          <el-button size="medium" :loading="loading" @click="onSubmit">提交</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="项目名称" :roles="[{required: true, message: '项目名称不能为空'}]">
        <el-input v-model="newProject.name" />
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="newProject.note" />
      </el-form-item>
      <el-form-item label="Github地址">
        <el-input v-model="newProject.githubUrl" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { insertProject } from '../../../api/project'
import { Message } from 'element-ui'

export default {
  name: 'InsertProject',
  data() {
    return {
      loading: false,
      newProject: {
        name: null,
        note: null,
        githubUrl: null
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        const valid = await this.$refs.form.validate()
        if (valid) {
          this.loading = true
          await insertProject(this.newProject)
          await this.$store.dispatch('user/getProjectsByUser')
          Message.success('新建成功')
          this.loading = false
        } else {
          return false
        }
      } catch (e) {
        console.log(e)
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
