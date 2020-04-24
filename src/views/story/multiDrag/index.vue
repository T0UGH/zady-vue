<template>
  <div class="app-container">
    <el-card ref="card" v-loading="loading" class="box-card">
      <div slot="header" class="clearfix">
        <el-button-group style="float: right;">
          <jump-button size="small" to="/story/insert">新增故事</jump-button>
          <return-button size="small" />
        </el-button-group>
      </div>
      <el-row v-if="refreshTag" :gutter="20">
        <el-col v-for="item in multiList" :key="item.status" :span="4">
          <el-table :ref="item.status" :data="item.list" row-key="storyId" size="small">
            <el-table-column
              :label="item.status"
              prop="name"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { message, getStorysBySprintAndStatus, importStory, returnStory, developReceive, developReturn, developFinish, testReceive, testPass, testNotPass, testReturn } from '@/api/story'
import { mapGetters } from 'vuex'
import ReturnButton from '@/components/Button/ReturnButton'
import JumpButton from '@/components/Button/JumpButton'

export default {
  name: 'StoryMultiDrag',
  components: { JumpButton, ReturnButton },
  data() {
    return {
      group: 'mission',
      refreshTag: true,
      loading: false,
      select: null,
      multiList: [
        {
          status: '待导入',
          list: []
        },
        {
          status: '待完成',
          list: []
        },
        {
          status: '完成中',
          list: []
        },
        {
          status: '待测试',
          list: []
        },
        {
          status: '测试中',
          list: []
        },
        {
          status: '已完成',
          list: []
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'userId'
    ])
  },
  async created() {
    this.loading = true
    for (let i = 0; i < this.multiList.length; i++) {
      const item = this.multiList[i]
      await this.loadStoryList(item.status)
    }
    this.$nextTick(() => {
      for (let i = 0; i < this.multiList.length; i++) {
        const item = this.multiList[i]
        this.setSort(this.$refs[item.status][0])
      }
    })
    this.loading = false
  },
  methods: {
    importStory,
    returnStory,
    developReceive,
    developReturn,
    developFinish,
    testReceive,
    testPass,
    testNotPass,
    testReturn,
    message,
    test() {
      this.refreshTag = true
    },
    async loadStoryList(status) {
      const res = await getStorysBySprintAndStatus(this.currentProject.currentSprintId, status)
      const item = this.multiList.find(item => item.status === status)
      item.list = res.body
    },
    setSort(ref) {
      console.log(ref)
      console.log(ref.$el)
      const el = ref.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      console.log('el')
      console.log(el)
      Sortable.create(el, {
        group: this.group,
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        onMove: evt => {
          if (evt.from === evt.to) {
            return false
          }
        },
        onEnd: evt => {
          const parsedEvent = this.parseEvent(evt)
          this.onDrag(parsedEvent)
        }
      })
    },
    async onDrag({ from, to, el }) {
      this.loading = true
      let message = '未知错误'
      try {
        if (from.status === '待导入' && to.status === '待完成') {
          await this.importStory(el.storyId)
          message = '导入成功'
        } else if (from.status === '待完成' && to.status === '待导入') {
          await this.returnStory(el.storyId)
          message = '导出成功'
        } else if (from.status === '待完成' && to.status === '完成中') {
          await this.developReceive(el.storyId, this.userId)
          message = '开发人员领取成功'
        } else if (from.status === '完成中' && to.status === '待完成') {
          await this.developReturn(el.storyId, this.userId)
          message = '开发人员退回成功'
        } else if (from.status === '完成中' && to.status === '待测试') {
          await this.developFinish(el.storyId, this.userId)
          message = '开发人员提交成功'
        } else if (from.status === '待测试' && to.status === '测试中') {
          await this.testReceive(el.storyId, this.userId)
          message = '测试人员领取成功'
        } else if (from.status === '测试中' && to.status === '待测试') {
          await this.testReturn(el.storyId, this.userId)
          message = '测试人员退回成功'
        } else if (from.status === '测试中' && to.status === '已完成') {
          await this.testPass(el.storyId, this.userId)
          message = '测试人员通过测试成功'
        } else if (from.status === '测试中' && to.status === '完成中') {
          await this.testNotPass(el.storyId, this.userId)
          message = '测试人员未通过测试成功'
        } else {
          message = '非法的状态移动'
          throw new Error(message)
        }
        this.$message.success(message)
      } catch (e) {
        console.log(e)
        this.$message.error(message)
      }
      if (from === to) {
        await this.loadStoryList(from.status)
      } else {
        await this.loadStoryList(from.status)
        await this.loadStoryList(to.status)
      }
      this.loading = false
      this.refreshTag = false
      this.$nextTick(() => {
        this.refreshTag = true
        this.$nextTick(() => {
          for (let i = 0; i < this.multiList.length; i++) {
            const item = this.multiList[i]
            this.setSort(this.$refs[item.status][0])
          }
        })
      })
    },
    parseEvent(evt) {
      const result = {}
      result.from = this.whichList(evt.from)
      result.to = this.whichList(evt.to)
      result.el = result.from.list[evt.oldIndex]
      console.log(result)
      return result
    },
    whichList(element) {
      for (let i = 0; i < this.multiList.length; i++) {
        const item = this.multiList[i]
        if (this.$refs[item.status][0].$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0] === element) {
          return item
        }
      }
    }
  }
}
</script>

<style scoped>
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
</style>
