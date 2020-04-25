<template>
  <common-table
    v-if="currentProject && currentProject.currentSprintId"
    :load-request="loadRequest"
    :insert-request="createBug"
    :update-request="updateBug"
    :delete-request="deleteBug"
    :primary-keys="['bugId']"
  >
    <template #buttonSlot="{formData, defaultAfterSubmit}">
      <submit-button
        size="small"
        :request="developNotConfirm"
        :submit-data="[formData.bugId, userId]"
        :after-submit="defaultAfterSubmit"
        :validates="[validateDevelopNotConfirm(formData)]"
      >
        开发非错
      </submit-button>
      <submit-button
        size="small"
        :request="developConfirm"
        :submit-data="[formData.bugId, userId]"
        :after-submit="defaultAfterSubmit"
        :validates="[validateDevelopConfirm(formData)]"
      >
        开发接受
      </submit-button>
      <submit-button
        size="small"
        :request="developFinish"
        :submit-data="[formData.bugId, userId]"
        :after-submit="defaultAfterSubmit"
        :validates="[validateDevelopFinish(formData)]"
      >
        开发改完
      </submit-button>
      <submit-button
        size="small"
        :request="testPass"
        :submit-data="[formData.bugId, userId]"
        :after-submit="defaultAfterSubmit"
        :validates="[validateTestPass(formData)]"
      >
        测试通过
      </submit-button>
      <submit-button
        size="small"
        :request="testNotPass"
        :submit-data="[formData.bugId, userId]"
        :after-submit="defaultAfterSubmit"
        :validates="[validateTestNotPass(formData)]"
      >
        测试不通过
      </submit-button>
    </template>
    <template #tableContent>
      <el-table-column
        prop="bugId"
        label="ID"
        sortable
      />
      <el-table-column
        prop="name"
        label="内容"
      />
      <el-table-column
        prop="level"
        label="严重等级"
        sortable
      />
      <el-table-column
        prop="status"
        label="状态"
        sortable
      />
    </template>
    <template #formContent="{formData}">
      <el-form-item label="ID" prop="bugId">
        <el-input v-model="formData.bugId" disabled />
      </el-form-item>
      <el-form-item label="BUG名称" prop="name" :rules="[{required: true, message: '名称不能为空', trigger: 'blur'}]">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="BUG详情" prop="note" >
        <el-input v-model="formData.note" />
      </el-form-item>
      <el-form-item label="所属故事" prop="storyId" :rules="[{required: true, message: '所属故事不能为空', trigger: 'blur'}]">
        <el-select v-model="formData.storyId" placeholder="请选择">
          <el-option
            v-for="item in storyList"
            :key="item.storyId"
            :label="item.name"
            :value="item.storyId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="严重级别" prop="level" :rules="[{required: true, message: '严重级别不能为空', trigger: 'blur'}]">
        <el-select v-model="formData.level" placeholder="请选择">
          <el-option
            v-for="item in bugLevelEnum"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="当前状态" prop="status">
        <el-input v-model="formData.status" disabled />
      </el-form-item>
      <el-form-item label="开发负责人" prop="status">
        <el-input v-model="formData.developerId" disabled />
      </el-form-item>
      <el-form-item label="测试负责人" prop="status">
        <el-input v-model="formData.testerId" disabled />
      </el-form-item>
    </template>
  </common-table>
</template>

<script>
import CommonTable from '@/components/CommonTable/index'
import { mapGetters } from 'vuex'
import { getBugsBySprint, createBug, updateBug, deleteBug, developNotConfirm, developConfirm, developFinish, testPass, testNotPass } from '@/api/bug'
import { getStorysBySprintAndStatus } from '@/api/story'
import SubmitButton from '@/components/Button/SubmitButton'

export default {
  name: 'BugTable',
  components: { CommonTable, SubmitButton },
  data() {
    return {
      storyList: []
    }
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'currentProjectId',
      'userId',
      'bugLevelEnum'
    ])
  },
  created() {
    if (this.currentProject && this.currentProject.currentSprintId) {
      this.loadStoryList()
    }
  },
  methods: {
    createBug,
    updateBug,
    deleteBug,
    developNotConfirm,
    developConfirm,
    developFinish,
    testPass,
    testNotPass,
    loadRequest() {
      return getBugsBySprint(this.currentProject.currentSprintId)
    },
    async loadStoryList() {
      try {
        const res = await getStorysBySprintAndStatus(this.currentProject.currentSprintId, '测试中')
        this.storyList = res.body.filter(data => data.testerId === this.userId)
      } catch (e) {
        console.log(e)
      }
    },
    validateDevelopNotConfirm(formData) {
      return formData && formData.status === '待确认' && formData.developerId === this.userId
    },
    validateDevelopConfirm(formData) {
      return formData && formData.status === '待确认' && formData.developerId === this.userId
    },
    validateDevelopFinish(formData) {
      return formData && formData.status === '待修改' && formData.developerId === this.userId
    },
    validateTestPass(formData) {
      return formData && formData.status === '待复核' && formData.testerId === this.userId
    },
    validateTestNotPass(formData) {
      return formData && formData.status === '待复核' && formData.testerId === this.userId
    }
  }
}
</script>

<style scoped>

</style>
