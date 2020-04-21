<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button-group style="float: right;">
        <submit-button
          v-if="!noSubmit"
          size="small"
          :request="submitRequest"
          :validates="[validateForm]"
          :submit-data="[allFormData]"
          :after-submit="afterSuccess"
        >
          提交
        </submit-button>
        <slot name="buttonSlot" :formData="formData" />
        <el-button size="small" @click="onClickCancel">取消</el-button>
        <return-button size="small"/>
      </el-button-group>
    </div>
    <el-form ref="form" size="small" :model="formData" label-width="120px">
      <slot name="formContent" :formData="formData" />
    </el-form>
  </el-card>
</template>

<script>
import SubmitButton from '@/components/Button/SubmitButton'
import ReturnButton from '@/components/Button/ReturnButton'

export default {
  name: 'CommonForm',
  components: {
    SubmitButton,
    ReturnButton
  },
  props: {
    noLoad: {
      type: Boolean,
      default: () => false
    },
    loadRequest: {
      type: Function,
      default: function() {}
    },
    submitRequest: {
      type: Function,
      default: function() {}
    },
    noSubmit: {
      type: Boolean,
      default: () => false
    },
    afterSuccess: {
      type: Function,
      default: function() {
        return async function f() {
          if (!this.noLoad) {
            this.loadTableData()
          }
        }
      }
    },
    additionalFormData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: this.newFormData()
    }
  },
  computed: {
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
    }
  },
  created() {
    if (!this.noLoad) {
      this.loadTableData()
    }
  },
  methods: {
    onClickCancel() {
      if (!this.noLoad) {
        this.loadTableData()
      } else {
        this.formData = this.newFormData()
      }
    },
    newFormData() {
      return {}
    },
    validateForm() {
      return this.$refs.form.validate()
    },
    async loadTableData() {
      this.loading = true
      try {
        const res = await this.loadRequest()
        this.formData = res.body
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
