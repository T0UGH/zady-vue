<template>
  <div class="app-container">
    <el-form v-if="currentProject" :model="currentProject" label-width="120px">
      <el-form-item>
        <el-button-group>
          <el-button v-permission="['master']" size="medium" :loading="loading" :disabled="!disableTag" @click="onEdit">编辑</el-button>
          <el-button v-permission="['master']" size="medium" :loading="loading" :disabled="disableTag" @click="onSubmit">提交</el-button>
          <el-button v-permission="['master']" size="medium" :loading="loading" @click="onUserTable">成员列表</el-button>
          <el-button v-permission="['master']" size="medium" :loading="loading" @click="onInviteTable">邀请列表</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="项目ID">
        <el-input v-model="currentProject.projectId" disabled />
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="currentProject.name" :disabled="disableTag" />
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="currentProject.note" :disabled="disableTag" />
      </el-form-item>
      <el-form-item label="Github地址">
        <el-input v-model="currentProject.githubUrl" :disabled="disableTag" />
      </el-form-item>
    </el-form>
    <span v-else>当前无项目，<router-link to="/">创建</router-link>项目</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateProject } from '@/api/project'
import { Message } from 'element-ui'

export default {
  name: 'UpdateProject',
  data() {
    return {
      disableTag: true,
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'currentProject'
    ])
  },
  methods: {
    onUserTable() {
      this.$router.push('/project/user')
    },
    onInviteTable() {
      this.$router.push('/project/invite')
    },
    onEdit() {
      this.disableTag = false
    },
    onSubmit: async function() {
      this.disableTag = true
      this.loading = true
      try {
        await updateProject(this.currentProject)
        await this.$store.dispatch('user/getProjectsByUser')
        Message.success('更新成功')
        this.loading = false
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
