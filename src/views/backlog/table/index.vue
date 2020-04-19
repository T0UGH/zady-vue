<template>
  <common-table
    :load-request="loadRequest"
    :insert-request="insertBacklog"
    :update-request="updateBacklog"
    :additional-form-data="additionalData"
    :delete-request="deleteBacklog"
    primary-key="backlogId"
  >
    <template #buttonSlot="{formData}">
      <submit-button
        size="small"
        :request="addToCurrentSprint"
        :submit-data="formData.backlogId"
        :after-submit="afterSubmit"
        :validates="[validateImport(formData)]"
      >
        导入
      </submit-button>
      <submit-button
        size="small"
        :request="removeFromCurrentSprint"
        :submit-data="formData.backlogId"
        :after-submit="afterSubmit"
        :validates="[validateExport(formData)]"
      >
        导出
      </submit-button>
    </template>
    <template #tableContent>
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
    </template>
    <template #formContent="{formData}">
      <el-form-item label="工作ID" prop="backlogId">
        <el-input v-model="formData.backlogId" disabled />
      </el-form-item>
      <el-form-item label="工作名称" prop="name" :rules="[{required: true, message: '工作名称不能为空', trigger: 'blur'}]">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="工作描述" prop="note">
        <el-input v-model="formData.note" />
      </el-form-item>
      <el-form-item label="优先级" prop="priority" :rules="[{required: true, message: '优先级不能为空', trigger: 'blur'}]">
        <el-select v-model="formData.priority" placeholder="请选择">
          <el-option
            v-for="item in backlogPriorityEnum"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="当前状态" prop="status">
        <el-input v-model="formData.status" disabled />
      </el-form-item>
      <el-form-item label="所属迭代" prop="sprintId">
        <el-input v-model="formData.sprintId" disabled/>
      </el-form-item>
    </template>
  </common-table>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import { mapGetters } from 'vuex'
import { getBacklogs, insertBacklog, updateBacklog, deleteBacklog, addToCurrentSprint, removeFromCurrentSprint } from '@/api/backlog'
import SubmitButton from '@/components/Button/SubmitButton'
export default {
  name: 'Table3',
  components: {
    SubmitButton,
    CommonTable
  },
  data() {
    return {
      additionalData: {
        projectId: this.$store.getters.currentProjectId
      }
    }
  },
  computed: {
    ...mapGetters([
      'backlogPriorityEnum'
    ])
  },
  methods: {
    loadRequest() {
      return getBacklogs(this.$store.getters.currentProjectId)
    },
    insertBacklog,
    updateBacklog,
    deleteBacklog,
    addToCurrentSprint,
    removeFromCurrentSprint,
    validateImport(formData) {
      return formData && formData.status === '未开始'
    },
    validateExport(formData) {
      return function() {
        return formData && formData.status === '进行中'
      }
    },
    afterSubmit() {
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>
