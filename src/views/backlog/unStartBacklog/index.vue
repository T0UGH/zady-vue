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
import { getBacklogs, deleteBacklog } from '@/api/backlog'
import { mapGetters } from 'vuex'

export default {
  name: 'UnStartBacklog',
  data() {
    return {
      listLoading: false,
      search: '',
      pageSize: 10,
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
      this.$message.info('新增按钮被点击了')
    },
    async onClickDelete() {
      this.listLoading = true
      try {
        await deleteBacklog(this.currentRow.backlogId)
        this.$message.success('删除成功')
        await this.getTableData()
      } catch (e) {
        console.log(e)
      } finally {
        this.listLoading = false
      }
    },
    onClickImport() {
      this.$message.info('导入按钮被点击了')
    },
    onClickDetail() {
      this.$message.info('详情按钮被点击了')
    },
    onClickCancel() {
      this.$message.info('不选按钮被点击了')
      // 清空选择
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
