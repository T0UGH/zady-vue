<template>
  <el-button :size="size" @click="onSubmit"><slot></slot></el-button>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    size: String,
    submitData: {
      type: Array,
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
      try {
        let valid = true
        for (let i = 0; i < this.validates.length; i++) {
          const currFun = this.validates[i]
          if (typeof (currFun) === 'boolean') {
            valid = currFun && valid
          } else {
            valid = await currFun() && valid
          }
          if (valid === false) {
            break
          }
        }

        if (valid) {
          await this.request(...this.submitData)
          await this.afterSubmit()
          this.$message.success('提交成功')
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
