<template>
  <div>
    <common-form
      v-if="currentProject && currentProject.currentSprintId"
      :load-request="loadRequest"
      :submit-request="updateSprint"
    >
      <template #buttonSlot="{formData}">
        <submit-button
          size="small"
          :submit-data="[currentProject.currentSprintId]"
          :request="endSprint"
          :after-submit="afterEnd"
        >
          结束当前迭代
        </submit-button>
        <jump-button size="small" to="/sprint/insert">开启新迭代</jump-button>
        <jump-button size="small" to="/sprint/history">查看历史迭代</jump-button>
      </template>
      <template #formContent="{formData}">
        <el-form-item label="冲刺ID">
          <el-input v-model="formData.sprintId" disabled />
        </el-form-item>
        <el-form-item label="冲刺轮次">
          <el-input v-model="formData.roundId" disabled />
        </el-form-item>
        <el-form-item label="冲刺名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="冲刺描述">
          <el-input v-model="formData.note" />
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
    </common-form>
    <span v-else>当前没有开始的迭代<router-link to="/sprint/insert">,点击开启新迭代</router-link></span>
  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm'
import { getSprint, updateSprint, endSprint } from '@/api/sprint'
import { mapGetters } from 'vuex'
import SubmitButton from '@/components/Button/SubmitButton'
import JumpButton from '@/components/Button/JumpButton'

export default {
  name: 'UpdateSprint',
  components: { JumpButton, SubmitButton, CommonForm },
  data() {
    return {
      value1: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentProject'
    ])
  },
  methods: {
    loadRequest() {
      return getSprint(this.currentProject.currentSprintId)
    },
    updateSprint,
    endSprint,
    async afterEnd() {
      await this.$store.dispatch('user/getProjectsByUser')
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>
