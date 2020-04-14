<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="newBacklog" label-width="120px">
      <el-form-item>
        <el-button-group>
          <el-button size="medium" :loading="loading" @click="onSubmit">提交</el-button>
          <el-button size="medium" @click="onReturn">返回</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="工作名称" prop="name">
        <el-input v-model="newBacklog.name" :disabled="disabledTag" />
      </el-form-item>
      <el-form-item label="工作描述" prop="note">
        <el-input v-model="newBacklog.note" :disabled="disabledTag" />
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-select v-model="newBacklog.priority" placeholder="请选择" :disabled="disabledTag">
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

<script>
import { mapGetters } from 'vuex'
import { insertBacklog } from '@/api/backlog'

export default {
  name: 'InsertBacklog',
  data() {
    return {
      disabledTag: false,
      loading: false,
      newBacklog: {
        projectId: this.$store.getters.currentProjectId,
        name: null,
        note: null,
        priority: null
      },
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '工作名称不能为空' }
        ],
        priority: [
          { required: true, trigger: 'change', message: '工作优先级不能为空' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'backlogStatusEnum',
      'backlogPriorityEnum'
    ])
  },
  methods: {
    onReturn() {
      this.$router.go(-1)
    },
    async onSubmit() {
      try {
        const valid = await this.$refs.form.validate()
        console.log(valid)
        if (valid) {
          this.loading = true
          this.disabledTag = true
          await insertBacklog(this.newBacklog)
          this.$message.success('新建成功')
          this.$router.push('/backlog/table')
        } else {
          return false
        }
      } catch (e) {
        this.disabledTag = false
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
