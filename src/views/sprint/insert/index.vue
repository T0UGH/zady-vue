<template>
  <common-form
    no-load
    :submit-request="startSprint"
    :additional-form-data="{projectId: currentProjectId}"
    :after-success="afterNew"
  >
    <template #formContent="{formData}">
      <el-form-item label="冲刺名称">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="冲刺描述">
        <el-input v-model="formData.note" />
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
    </template>
  </common-form>
</template>

<script>
import { startSprint } from '@/api/sprint'
import { mapGetters } from 'vuex'
import CommonForm from '@/components/CommonForm'

export default {
  name: 'NewSprint',
  components: {
    CommonForm
  },
  computed: {
    ...mapGetters([
      'currentProjectId'
    ])
  },
  methods: {
    startSprint,
    async afterNew() {
      await this.$store.dispatch('user/getProjectsByUser')
      console.log('afterNew')
      this.$router.push('/sprint/update')
    }
  }
}
</script>

<style scoped>

</style>
