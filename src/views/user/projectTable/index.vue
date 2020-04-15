<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="search" prefix-icon="el-icon-search" placeholder="输入关键字搜索" />
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button size="medium" @click="onReturn">返回</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-table ref="table" v-loading="listLoading" :data="filteredData">
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
export default {
  name: 'ProjectTable',
  data() {
    return {
      listLoading: false,
      search: '',
      pageSize: 10,
      currentPage: 1,
      tableData: []
    }
  },
  computed: {
    filteredData() {
      return this.tableData
        .filter(data => !this.search || data.name.includes(this.search))
        .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    onReturn() {
      this.$router.go(-1)
    },
    async getTableData() {
      this.listLoading = true
      try {
        await this.$store.dispatch('user/getProjectsByUser')
        this.tableData = this.$store.getters.projectList
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
