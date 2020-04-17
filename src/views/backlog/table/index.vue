<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="search" prefix-icon="el-icon-search" placeholder="输入关键字搜索" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="currentStatus" clearable placeholder="按状态筛选">
          <el-option
            v-for="item in backlogStatusEnum"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="currentPriority" clearable placeholder="按优先级筛选">
          <el-option
            v-for="item in backlogPriorityEnum"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button v-permission="['master', 'owner']" @click="onClickInsert">新增</el-button>
          <el-button v-permission="['master', 'owner']" @click="onClickImport">导入</el-button>
          <el-button v-permission="['master', 'owner']" @click="onClickExport">导出</el-button>
          <el-button @click="onClickDetail">详情</el-button>
          <el-button v-permission="['master', 'owner']" @click="onClickDelete">删除</el-button>
          <el-button @click="onClickCancel">不选</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-table ref="table" :data="filteredData" highlight-current-row @current-change="handleCurrentChange" v-loading="listLoading">
      <el-table-column
        prop="backlogId"
        label="编号"
        sortable
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="priority"
        label="优先级"
        sortable
      />
      <el-table-column
        prop="status"
        label="状态"
      />
      <el-table-column
        prop="sprintId"
        label="所属迭代"
      />
    </el-table>
    <el-pagination layout="prev, pager, next" :total="tableData.length" :page-size="pageSize" :current-page.sync="currentPage" />
  </div>
</template>

<script>
import { getBacklogs, deleteBacklog, addToCurrentSprint, removeFromCurrentSprint } from '@/api/backlog'
import { mapGetters } from 'vuex'

export default {
  name: 'BacklogTable',
  data() {
    return {
      listLoading: false,
      search: '',
      pageSize: 4,
      currentPage: 1,
      currentRow: null,
      currentStatus: '',
      currentPriority: '',
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'backlogStatusEnum',
      'backlogPriorityEnum'
    ]),
    filteredData() {
      return this.tableData
        .filter(data => !this.search || data.name.includes(this.search))
        .filter(data => !this.currentStatus || data.status === this.currentStatus)
        .filter(data => !this.currentPriority || data.priority === this.currentPriority)
        .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
      console.log(this.currentRow)
    },
    onClickInsert() {
      this.$router.push('/backlog/insert')
    },
    async onClickDelete() {
      if (this.currentRow) {
        if (this.currentRow.status === '未开始') {
          try {
            this.listLoading = true
            await deleteBacklog(this.currentRow.backlogId)
            this.$message.success('删除成功')
            await this.getTableData()
          } catch (e) {
            console.log(e)
          } finally {
            this.listLoading = false
          }
        } else {
          this.$message.error('当前工作不是未开始状态，无法删除')
        }
      } else {
        this.$message.error('请先选择一个工作')
      }
    },
    async onClickImport() {
      if (this.currentRow) {
        if (this.currentRow.status === '未开始') {
          try {
            this.listLoading = true
            await addToCurrentSprint(this.currentRow.backlogId)
            this.$message.success('导入成功')
            await this.getTableData()
          } catch (e) {
            console.log(e)
          } finally {
            this.listLoading = false
          }
        } else {
          this.$message.error('当前工作不是未开始状态，无法导入当前迭代')
        }
      } else {
        this.$message.error('请先选择一个工作')
      }
    },
    async onClickExport() {
      if (this.currentRow) {
        if (this.currentRow.status === '进行中') {
          try {
            this.listLoading = true
            await removeFromCurrentSprint(this.currentRow.backlogId)
            this.$message.success('导出成功')
            await this.getTableData()
          } catch (e) {
            console.log(e)
          } finally {
            this.listLoading = false
          }
        } else {
          this.$message.error('当前工作不是进行中状态，无法从当前迭代导出')
        }
      } else {
        this.$message.error('请先选择一个工作')
      }
    },
    onClickDetail() {
      if (this.currentRow) {
        this.$router.push('/backlog/update/' + this.currentRow.backlogId)
      } else {
        this.$message.error('请先选择一个工作')
      }
    },
    onClickCancel() {
      this.$refs.table.setCurrentRow()
    },
    async getTableData() {
      this.listLoading = true
      try {
        const res = await getBacklogs(this.$store.getters.currentProjectId)
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
