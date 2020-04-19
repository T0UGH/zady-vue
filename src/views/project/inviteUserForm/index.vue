<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form size="small" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="search" prefix-icon="el-icon-search" placeholder="输入关键字搜索" />
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button size="small" @click="onSearch">搜索</el-button>
              <el-button size="small" @click="onInvite">邀请</el-button>
              <el-button size="small" @click="onClickCancel">不选</el-button>
              <el-button size="small" @click="onReturn">返回</el-button>
            </el-button-group>
          </el-form-item>
        </el-form>
      </div>
      <el-col :span="12">
        <el-table ref="table" size="small" v-loading="listLoading" highlight-current-row :data="filteredData" @current-change="handleCurrentChange">
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
            prop="email"
            label="用户邮箱"
            sortable
          />
        </el-table>
        <el-pagination layout="prev, pager, next" :total="tableData.length" :page-size="pageSize" :current-page.sync="currentPage" />
      </el-col>
      <el-col :span="12">
        <el-form ref="form" size="small" :model="formData" v-loading="listLoading" label-width="120px">
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
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="master"></el-checkbox>
              <el-checkbox label="owner"></el-checkbox>
              <el-checkbox label="developer"></el-checkbox>
              <el-checkbox label="tester"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="头像">
            <el-avatar
              style="width: 100px; height: 100px"
              :src="formData.avatar"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import { getUsersForInvite } from '@/api/user'
import { inviteUser } from '@/api/project'
import { mapGetters } from 'vuex'

export default {
  name: 'ProjectInviteTable',
  data() {
    return {
      listLoading: false,
      search: '',
      pageSize: 10,
      currentPage: 1,
      formData: {},
      tableData: [],
      checkList: ['developer', 'tester']
    }
  },
  computed: {
    filteredData() {
      return this.tableData
        .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    ...mapGetters([
      'currentProjectId'
    ])
  },
  methods: {
    handleCurrentChange(val) {
      this.formData = val
      console.log(this.formData)
    },
    async onInvite() {
      if (this.formData && this.formData.userId) {
        try {
          this.listLoading = true
          const projectId = this.currentProjectId
          const userId = this.formData.userId
          await inviteUser(projectId, userId, this.checkList)
          this.$message.success('邀请成功')
          await this.onSearch()
        } catch (e) {
          console.log(e)
        } finally {
          this.listLoading = false
        }
      } else {
        this.$message.error('请先搜索并选定一个用户')
      }
    },
    async onSearch() {
      if (this.search) {
        try {
          this.listLoading = true
          const res = await getUsersForInvite(this.search, this.currentProjectId)
          this.tableData = res.body
        } catch (e) {
          console.log(e)
        } finally {
          this.listLoading = false
        }
      } else {
        this.$message.error('请先输入关键字')
      }
    },
    onReturn() {
      this.$router.go(-1)
    },
    onClickCancel() {
      this.$refs.table.setCurrentRow()
    }
  }
}
</script>

<style scoped>

</style>
