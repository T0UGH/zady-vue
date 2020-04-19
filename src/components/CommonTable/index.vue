<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form size="small" :inline="true" style="float: left;" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="search" prefix-icon="el-icon-search" placeholder="输入关键字搜索" />
          </el-form-item>
        </el-form>
        <el-button-group style="float: right;">
          <el-button v-if="!noInsert" size="small" @click="onClickInsert">新增</el-button>
          <!--<jump-button to="/" size="small">跳转</jump-button>-->
          <submit-button
            v-if="!noDelete"
            size="small"
            :after-submit="afterSubmit"
            :request="deleteRequest"
            :submit-data="primaryData"
          >
            删除
          </submit-button>
          <submit-button
            v-if="!(noInsert && noUpdate)"
            size="small"
            :validates="[validateForm]"
            :after-submit="afterSubmit"
            :request="submitRequest"
            :submit-data="[allFormData]"
          >
            提交
          </submit-button>
          <slot name="buttonSlot" :formData="formData" :defaultAfterSubmit="afterSubmit" />
          <el-button size="small" @click="onClickNotSelect">不选</el-button>
          <el-button size="small" @click="onClickCancel">取消</el-button>
          <return-button size="small" />
        </el-button-group>
      </div>
      <el-col :span="12">
        <el-table ref="table" v-loading="loading" size="small" :data="filteredData" highlight-current-row @current-change="onCurrentChange">
          <slot name="tableContent" />
        </el-table>
        <el-pagination layout="prev, pager, next" :total="tableData.length" :page-size="pageSize" :current-page.sync="currentPage" />
      </el-col>
      <el-col :span="12">
        <el-form ref="form" size="small" :model="formData" label-width="120px">
          <slot name="formContent" :formData="formData" :allFormData="allFormData" />
        </el-form>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import ReturnButton from '@/components/Button/ReturnButton.vue'
import SubmitButton from '@/components/Button/SubmitButton.vue'
// import JumpButton from '@/components/Button/JumpButton.vue'

export default {
  name: 'CommonTable',
  components: {
    ReturnButton,
    // JumpButton,
    SubmitButton
  },
  props: {
    loadRequest: {
      type: Function,
      default: function() {}
    },
    insertRequest: {
      type: Function,
      default: function() {}
    }, // 传入一个不带参数的promise
    updateRequest: {
      type: Function,
      default: function() {}
    },
    deleteRequest: {
      type: Function,
      default: function() {}
    },
    primaryKeys: {
      type: Array,
      required: true
    }, // 用什么做参数来删除
    noInsert: {
      type: Boolean,
      default: () => false
    }, // 不可新增标志
    noUpdate: {
      type: Boolean,
      default: () => false
    }, // 不可更新标志
    noDelete: {
      type: Boolean,
      default: () => false
    }, // 不可删除标志
    additionalFormData: {
      type: Object,
      default: () => {}
    } // update或者insert的时候需要的额外属性
  },
  data() {
    return {
      search: '',
      pageSize: 6,
      currentPage: 1,
      formData: this.newFormData(),
      tableData: [],
      loading: false
    }
  },
  computed: {
    filteredData() {
      // this.search 搜索字符串，遍历tableData中的每个项，看是否匹配
      return this.tableData
        .filter(data => !this.search || this.convertArrToStr(Object.values(data)).includes(this.search))
        .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    submitRequest() {
      if (!this.noInsert && !this.noUpdate) {
        return this.formData[this.primaryKeys[0]] ? this.updateRequest : this.insertRequest
      } else if (this.noInsert && !this.noUpdate) {
        return this.updateRequest
      } else {
        return function() {}
      }
    },
    allFormData() {
      const allFormData = {}
      // 先加载additional的
      for (const prop in this.additionalFormData) {
        allFormData[prop] = this.additionalFormData[prop]
      }
      // 然后在加载formData的
      for (const prop in this.formData) {
        allFormData[prop] = this.formData[prop]
      }
      return allFormData
    },
    primaryData() {
      const primaryData = []
      for (let i = 0; i < this.primaryKeys.length; i++) {
        primaryData[i] = this.allFormData[this.primaryKeys[i]]
      }
      return primaryData
    }
  },
  created() {
    this.loadTableData()
  },
  methods: {
    onClickCancel() {
      this.afterSubmit()
    },
    onClickInsert() {
      this.$refs.table.setCurrentRow()
      this.formData = this.newFormData()
    },
    newFormData() {
      return {}
    },
    validateForm() {
      return this.$refs.form.validate()
    },
    onCurrentChange(val) {
      if (val) {
        this.formData = val
      }
      console.log(this.formData)
    },
    onClickNotSelect() {
      this.$refs.table.setCurrentRow()
      this.formData = this.newFormData()
    },
    async afterSubmit() {
      await this.loadTableData()
      // this.formData = this.newFormData()
    },
    async loadTableData() {
      this.loading = true
      try {
        const res = await this.loadRequest()
        this.tableData = res.body
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    convertArrToStr(arr) {
      let result = ''
      for (let i = 0; i < arr.length; i++) {
        result += arr[i]
        if (i !== arr.length - 1) {
          result += '|'
        }
      }
      return result
    }
  }
}
</script>

<style scoped>

</style>
