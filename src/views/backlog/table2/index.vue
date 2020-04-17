<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button-group style="float: right;">
          <el-button size="small">操作</el-button>
          <el-button size="small">操作</el-button>
          <el-button size="small">操作</el-button>
          <el-button size="small">操作</el-button>
          <el-button size="small">操作</el-button>
          <return-button size="small"/>
          <submit-button size="small" :validates="[validateForm, () => true]" :request="insertBacklog" :submit-data="newBacklog">提交</submit-button>
        </el-button-group>
      </div>
      <el-col :span="8">
        <div v-for="o in 4" :key="o" >
          {{'列表内容 ' + o }}
        </div>
      </el-col>
      <el-col :span="16">
        <el-form ref="form" :rules="rules" :model="newBacklog" label-width="120px">
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
      </el-col>
    </el-card>
  </div>
</template>

<script>
import ReturnButton from '@/components/button/ReturnButton.vue'
import SubmitButton from '@/components/button/SubmitButton.vue'
import { insertBacklog } from '@/api/backlog'
import { mapGetters } from 'vuex'

export default {
  name: 'BacklogTable2',
  components: {
    ReturnButton,
    SubmitButton
  },
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
    insertBacklog,
    validateForm() {
      return this.$refs.form.validate()
    }
  }
}
</script>

<style scoped>

</style>
