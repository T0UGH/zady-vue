<template>
  <el-button :size="size" @click="onSubmit"><slot></slot></el-button>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    size: String,
    submitData: {
      type: Object,
      required: true
    },
    request: {
      required: true
    },
    validates: {
      type: Array,
      default: () => []
    },
    afterSubmit: {
      default: function() { return () => {} }
    }
  },
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {
    async onSubmit() {
      this.$message.info('点击了提交')
      // todo: 如何嵌入验证逻辑
      try {
        let valid = true
        for (let i = 0; i < this.validates.length; i++) {
          const currFun = this.validates[i]
          valid = await currFun()
        }

        if (valid) {
          await this.request(this.submitData)
          this.$message.success('提交成功')
          await this.afterSubmit()
        } else {
          this.$message.warning('提交失败')
        }
      } catch (e) {
        this.$message.warning('提交失败')
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
