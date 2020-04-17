<template>
  <el-button :size="size" @click="onReturn">返回</el-button>
</template>

<script>
export default {
  name: 'ReturnButton',
  props: {
    size: String
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    onReturn() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
