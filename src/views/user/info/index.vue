<template>
  <div class="app-container">
    <el-form ref="form" :model="user" :rules="rules" v-loading="loading" label-width="120px">
      <el-form-item>
        <el-button-group>
          <el-button size="medium" :loading="loading" :disabled="!disableTag" @click="onEdit">编辑</el-button>
          <el-button size="medium" :loading="loading" :disabled="disableTag" @click="onSubmit">提交</el-button>
          <el-button size="medium" :loading="loading" :disabled="disableTag" @click="onCancel">取消</el-button>
          <el-button size="medium" @click="onAvatar">修改头像</el-button>
          <el-button size="medium" @click="onProjectTable">项目列表</el-button>
          <el-button size="medium" @click="onInviteTable">邀请列表</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="user.userId" disabled />
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="user.email" disabled />
      </el-form-item>
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="user.name" :disabled="disableTag" />
      </el-form-item>
      <el-form-item label="默认项目" prop="defaultProjectId">
        <el-select v-model="user.defaultProjectId" placeholder="请选择" :disabled="disableTag">
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
          :src="user.avatar"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'UserInfo',
  data() {
    return {
      loading: true,
      disableTag: true,
      user: {
        userId: null,
        avatar: null,
        name: null,
        email: null,
        password: null,
        defaultProjectId: null
      },
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '用户名称不能为空' }
        ],
        defaultProjectId: [
          { required: true, trigger: 'change', message: '用户默认项目不能为空' }
        ]
      }
    }
  },
  created() {
    this.loadUser()
  },
  computed: {
    ...mapGetters([
      'userId',
      'projectList'
    ])
  },
  methods: {
    onEdit() {
      this.disableTag = false
    },
    async onCancel() {
      await this.loadUser()
      this.disableTag = true
    },
    onAvatar() {
      this.$router.push('/user/avatar')
    },
    onInviteTable() {
      this.$router.push('/user/invite')
    },
    onProjectTable() {
      this.$router.push('/user/project')
    },
    async onSubmit() {
      this.disableTag = true
      try {
        const valid = await this.$refs.form.validate()
        if (valid) {
          this.loading = true
          await updateUser(this.user)
          await this.loadUser()
          this.$store.commit('user/SET_NAME', this.user.name)
          this.$message.success('更新成功')
        } else {
          return false
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    async loadUser() {
      try {
        this.loading = true
        const res = await getUser(this.userId)
        this.user = res.body
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
