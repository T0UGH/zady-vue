<template>
  <el-button :size="size" @click="onJump"><slot></slot></el-button>
</template>

<script>
export default {
  name: 'JumpButton',
  props: {
    size: String,
    to: String
  },
  methods: {
    onJump() {
      this.$router.push(this.to)
    }
  }
}
</script>

<style scoped>

</style>
