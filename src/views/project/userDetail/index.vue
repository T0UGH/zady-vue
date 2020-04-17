<template>
  <div class="app-container">
    <el-form v-if="user" ref="form" v-loading="listLoading" :model="user" label-width="120px">
      <el-form-item>
        <el-button-group>
          <el-button size="medium" :disabled="!disabledTag" @click="onEdit">修改</el-button>
          <el-button size="medium" :disabled="disabledTag" @click="onSubmit">提交</el-button>
          <el-button size="medium" :disabled="disabledTag" @click="onCancel">取消</el-button>
          <el-button size="medium" @click="onReturn">返回</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="user.userId" disabled />
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="user.email" disabled />
      </el-form-item>
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="user.name" disabled />
      </el-form-item>
      <el-form-item label="用户角色">
        <el-checkbox-group v-model="roleList" :disabled="disabledTag">
          <el-checkbox v-for="role in rolesEnum" :key="role" :label="role" />
        </el-checkbox-group>
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
import { getUser } from '@/api/user'
import { getRole, updateRole } from '@/api/role'
import { mapGetters } from 'vuex'
import { convertArrtoStr } from '@/utils/roles'

export default {
  name: 'UserDetail',
  data() {
    return {
      listLoading: false,
      user: {},
      roleList: [],
      disabledTag: true
    }
  },
  computed: {
    ...mapGetters([
      'currentProjectId',
      'rolesEnum'
    ])
  },
  created() {
    if (!this.$route.params.userId) {
      this.$route.push('/404')
    } else {
      this.loadingData()
    }
  },
  methods: {
    onEdit() {
      this.disabledTag = false
    },
    async onCancel() {
      this.disabledTag = true
      await this.loadingData()
    },
    onReturn() {
      this.$router.go(-1)
    },
    async onSubmit() {
      try {
        this.listLoading = true
        const projectId = this.currentProjectId
        const userId = this.$route.params.userId
        const roleStr = convertArrtoStr(this.roleList)
        await updateRole(projectId, userId, roleStr)
        this.$message.success('修改成功')
        await this.loadingData()
      } catch (e) {
        console.log(e)
      } finally {
        this.disabledTag = true
        this.listLoading = false
      }
    },
    async loadingData() {
      try {
        this.listLoading = true
        const res = await getUser(this.$route.params.userId)
        this.user = res.body
        const res2 = await getRole(this.currentProjectId, this.$route.params.userId)
        this.user.role = res2.body.role
        this.roleList = this.user.role.split(',')
      } catch (e) {
        console.log(e)
      } finally {
        this.listLoading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
