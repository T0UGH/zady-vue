<template>
  <common-table
    :load-request="loadRequest"
    :delete-request="deleteStory"
    :update-request="updateStory"
    :insert-request="insertStory"
    :primary-keys="['storyId']"
  >
    <template #buttonSlot="{formData, defaultAfterSubmit}">
      <submit-button
        size="small"
        :request="importStory"
        :submit-data="[formData.storyId]"
        :after-submit="defaultAfterSubmit"
        :validates="[validateImport(formData)]"
      >
        导入
      </submit-button>
    </template>
    <template #tableContent>
      <el-table-column
      prop="storyId"
      label="故事ID"
      sortable
    />
      <el-table-column
        prop="name"
        label="内容"
      />
      <el-table-column
        prop="expectedHours"
        label="预计用时"
      />
    </template>
    <template #formContent="{formData}">
      <el-form-item label="故事ID" prop="storyId">
        <el-input v-model="formData.storyId" disabled />
      </el-form-item>
      <el-form-item label="故事内容" prop="name" :rules="[{required: true, message: '名称不能为空', trigger: 'blur'}]">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="所属工作" prop="backlogId" :rules="[{required: true, message: '所属工作不能为空', trigger: 'blur'}]">
        <el-select v-model="formData.backlogId" placeholder="请选择">
          <el-option
            v-for="item in backlogs"
            :key="item.backlogId"
            :label="item.name"
            :value="item.backlogId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="期待用时" prop="expectedHours" :rules="[{required: true, message: '期待用时不能为空', trigger: 'blur'}]">
        <el-input-number v-model="formData.expectedHours" :min="1" :max="256" label="期待用时"></el-input-number>
      </el-form-item>
      <el-form-item label="当前状态" prop="status">
        <el-input v-model="formData.status" disabled />
      </el-form-item>
    </template>
  </common-table>
</template>

<script>
import { getStorysBySprintAndStatus, insertStory, updateStory, deleteStory, importStory } from '@/api/story'
import { getBacklogs } from '@/api/backlog'
import { mapGetters } from 'vuex'
import CommonTable from '@/components/CommonTable/index'
import SubmitButton from '@/components/Button/SubmitButton'

export default {
  name: 'InsertTable',
  components: { SubmitButton, CommonTable },
  data() {
    return {
      backlogs: []
    }
  },
  created() {
    this.loadBacklogs()
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'currentProjectId',
      'storyStatusEnum'
    ])
  },
  methods: {
    loadRequest() {
      return getStorysBySprintAndStatus(this.currentProject.currentSprintId, '待导入')
    },
    insertStory,
    updateStory,
    deleteStory,
    importStory,
    async loadBacklogs() {
      try {
        const res = await getBacklogs(null, this.currentProject.currentSprintId, '进行中')
        this.backlogs = res.body
      } catch (e) {
        console.log(e)
      }
    },
    validateImport(formData) {
      return formData && formData.status === '待导入'
    }
  }
}
</script>

<style scoped>

</style>
