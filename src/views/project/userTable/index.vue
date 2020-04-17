<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="search" prefix-icon="el-icon-search" placeholder="输入关键字搜索" />
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button size="medium" @click="onUserDetail">查看</el-button>
          <el-button size="medium" @click="onDelete">删除</el-button>
          <el-button size="medium" @click="onClickCancel">不选</el-button>
          <el-button size="medium" @click="onReturn">返回</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-table ref="table" v-loading="listLoading" highlight-current-row :data="filteredData" @current-change="handleCurrentChange">
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
    </el-table>
    <el-pagination layout="prev, pager, next" :total="tableData.length" :page-size="pageSize" :current-page.sync="currentPage" />
  </div>
</template>

<script>
import { deleteUserFromProject } from '@/api/project'
import { getUsersByProject } from '@/api/role'
import { mapGetters } from 'vuex'

export default {
  name: 'ProjectInviteTable',
  data() {
    return {
      listLoading: false,
      search: '',
      pageSize: 10,
      currentPage: 1,
      formData: null,
      tableData: []
    }
  },
  computed: {
    filteredData() {
      return this.tableData
        .filter(data => !this.search || data.name.includes(this.search))
        .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    ...mapGetters([
      'currentProjectId'
    ])
  },
  created() {
    this.getTableData()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
      console.log(this.formData)
    },
    onReturn() {
      this.$router.go(-1)
    },
    onUserDetail() {
      if (this.formData && this.formData.userId) {
        this.$router.push('/project/userDetail/' + this.formData.userId)
      } else {
        this.$message.error('请先选定一个用户')
      }
    },
    async onDelete() {
      if (this.formData) {
        try {
          this.listLoading = true
          const projectId = this.currentProjectId
          const userId = this.formData.userId
          await deleteUserFromProject(projectId, userId)
          this.$message.success('删除成功')
          await this.getTableData()
        } catch (e) {
          console.log(e)
        } finally {
          this.listLoading = false
        }
      } else {
        this.$message.error('请先选定一个用户')
      }
    },
    onClickCancel() {
      this.$refs.table.setCurrentRow()
    },
    async getTableData() {
      this.listLoading = true
      try {
        const res = await getUsersByProject(this.currentProjectId)
        this.tableData = res.body
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
