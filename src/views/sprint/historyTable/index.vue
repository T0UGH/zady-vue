<template>
  <common-table
    :load-request="loadRequest"
    no-delete
    no-update
    no-insert
    :primary-keys="['sprintId']"
  >
    <template #tableContent>
      <el-table-column
        prop="roundId"
        label="轮次"
        sortable
      />
      <el-table-column
        prop="sprintId"
        label="冲刺编号"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="status"
        label="状态"
      />
    </template>
    <template #formContent="{formData}">
      <el-form-item label="冲刺ID">
        <el-input v-model="formData.sprintId" disabled />
      </el-form-item>
      <el-form-item label="冲刺轮次">
        <el-input v-model="formData.roundId" disabled />
      </el-form-item>
      <el-form-item label="冲刺名称">
        <el-input v-model="formData.name" disabled />
      </el-form-item>
      <el-form-item label="冲刺描述">
        <el-input v-model="formData.note" disabled />
      </el-form-item>
      <el-form-item label="冲刺状态">
        <el-input v-model="formData.status" disabled />
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="formData.startDate"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
          disabled
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预计结束日期">
        <el-date-picker
          v-model="formData.expectedEndDate"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
          disabled
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实际结束日期">
        <el-date-picker
          v-model="formData.actualEndDate"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
          disabled
        >
        </el-date-picker>
      </el-form-item>
    </template>
  </common-table>
</template>

<script>
import CommonTable from '@/components/CommonTable/index'
import { getSprintList } from '@/api/sprint'
import { mapGetters } from 'vuex'

export default {
  name: 'SprintHistory',
  components: { CommonTable },
  computed: {
    ...mapGetters([
      'currentProjectId'
    ])
  },
  methods: {
    loadRequest() {
      return getSprintList(this.currentProjectId)
    }
  }
}
</script>

<style scoped>

</style>
