<template>
  <template>
    <div class="app-container">
      <el-form ref="form" :model="newBacklog" label-width="120px">
        <el-form-item>
          <el-button-group>
            <el-button size="medium" :loading="loading" @click="onSubmit">提交</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item label="工作名称" :roles="[{required: true, message: '工作名称不能为空'}]">
          <el-input v-model="newBacklog.name" />
        </el-form-item>
        <el-form-item label="工作描述">
          <el-input v-model="newBacklog.note" />
        </el-form-item>
        <el-form-item label="优先级" :roles="[{required: true, message: '工作优先级不能为空'}]">
          <el-select v-model="newBacklog.priority" placeholder="请选择">
            <el-option
              v-for="item in backlogPriorityEnum"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </template>
</template>

<script>
import { mapGetters } from 'vuex'
import { insertBacklog } from '@/api/backlog'

export default {
  name: 'InsertBacklog',
  data() {
    return {
      loading: false,
      newBacklog: {
        projectId: this.currentProjectId,
        name: null,
        note: null,
        priority: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'backlogStatusEnum',
      'backlogPriorityEnum',
      'currentProjectId'
    ])
  },
  methods: {
    async onSubmit() {
      try {
        const valid = await this.$refs.form.validate()
        if (valid) {
          this.loading = true
          await insertBacklog(this.newBacklog)
          this.$message.success('新建成功')
        } else {
          return false
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
