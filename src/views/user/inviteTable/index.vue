<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="search" prefix-icon="el-icon-search" placeholder="输入关键字搜索" />
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button size="medium" @click="onReceiveInvite">接受邀请</el-button>
          <el-button size="medium" @click="onClickCancel">不选</el-button>
          <el-button size="medium" @click="onReturn">返回</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-table ref="table" v-loading="listLoading" highlight-current-row :data="filteredData" @current-change="handleCurrentChange">
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
    </el-table>
    <el-pagination layout="prev, pager, next" :total="tableData.length" :page-size="pageSize" :current-page.sync="currentPage" />
  </div>
</template>

<script>
import { getInviteProjectsByUser, acceptInvite } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'InviteTable',
  data() {
    return {
      listLoading: false,
      search: '',
      pageSize: 10,
      currentPage: 1,
      currentRow: null,
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
      'userId'
    ])
  },
  created() {
    this.getTableData()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
      console.log(this.currentRow)
    },
    async onReceiveInvite() {
      if (this.currentRow) {
        try {
          this.listLoading = true
          await acceptInvite(this.currentRow.projectId)
          this.$message.success('接受邀请成功')
          await this.getTableData()
        } catch (e) {
          console.log(e)
        } finally {
          this.listLoading = false
        }
      } else {
        this.$message.error('请先选择一个项目')
      }
    },
    onReturn() {
      this.$router.go(-1)
    },
    onClickCancel() {
      this.$refs.table.setCurrentRow()
    },
    async getTableData() {
      this.listLoading = true
      try {
        const res = await getInviteProjectsByUser(this.userId)
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
