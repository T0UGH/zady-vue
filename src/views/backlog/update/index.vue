<template>
  <div class="app-container">
    <el-form v-if="backlog" ref="form" :rules="rules" :model="backlog" label-width="120px">
      <el-form-item>
        <el-button-group>
          <el-button v-permission="['master', 'owner']" size="medium" :disabled="!disabledTag" :loading="loading" @click="onEdit">编辑</el-button>
          <el-button v-permission="['master', 'owner']" size="medium" :disabled="disabledTag" :loading="loading" @click="onSubmit">提交</el-button>
          <el-button size="medium" @click="onReturn">返回</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="工作编号" prop="backlogId">
        <el-input v-model="backlog.backlogId" disabled />
      </el-form-item>
      <el-form-item label="工作名称" prop="name">
        <el-input v-model="backlog.name" :disabled="disabledTag" />
      </el-form-item>
      <el-form-item label="工作描述" prop="note">
        <el-input v-model="backlog.note" :disabled="disabledTag" />
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-select v-model="backlog.priority" placeholder="请选择" :disabled="disabledTag">
          <el-option
            v-for="item in backlogPriorityEnum"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="当前状态" prop="status">
        <el-input v-model="backlog.status" disabled />
      </el-form-item>
      <el-form-item label="所属迭代" prop="status">
        <el-input v-model="backlog.sprintId" disabled />
      </el-form-item>
    </el-form>
    <span v-else>无</span>
  </div>
</template>

<script>
import { getBacklog, updateBacklog } from '@/api/backlog'
import { mapGetters } from 'vuex'

export default {
  name: 'UpdateBacklog',
  data() {
    return {
      backlog: null,
      disabledTag: true,
      loading: false,
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
      'backlogPriorityEnum'
    ])
  },
  async mounted() {
    await this.loadBacklog()
  },
  methods: {
    onReturn() {
      this.$router.go(-1)
    },
    async loadBacklog() {
      // todo :所属迭代ID要改成对应的名称
      try {
        const backlogId = this.$route.params.backlogId
        const res = await getBacklog(backlogId)
        this.backlog = res.body
      } catch (e) {
        console.log(e)
        this.$router.push('/404')
      }
    },
    onEdit() {
      this.disabledTag = false
    },
    async onSubmit() {
      try {
        const valid = await this.$refs.form.validate()
        if (valid) {
          this.disabledTag = true
          this.loading = true
          await updateBacklog(this.backlog)
          await this.loadBacklog()
          this.$message.success('更新成功')
        } else {
          return false
        }
      } catch (e) {
        console.log(e)
        this.disabledTag = false
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
