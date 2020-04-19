<template>
  <div class="app-container">
    <el-form size="small">
      <el-form-item label-width="120px">
        <el-button-group>
          <el-button size="small" :loading="loading" @click="onSubmit">提交</el-button>
          <el-button size="small" :loading="loading" @click="onReturn">返回</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="头像列表">
        <el-radio v-for="avatar in avatarList" :key="avatar" v-model="selected" :label="avatar"><el-avatar :src="avatar" /></el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateUser } from '@/api/user'

export default {
  name: 'UserAvatar',
  data() {
    return {
      loading: false,
      selected: null,
      avatarList: [
        'https://i.loli.net/2020/04/09/Sdl7onfAyYRVC2X.jpg',
        'https://i.loli.net/2020/04/09/3XhA4796VbYcC51.png',
        'https://i.loli.net/2020/04/09/VQ1wTvLkm9qhcpX.jpg',
        'https://i.loli.net/2020/04/09/zWxdJefQItr4Tm8.jpg'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    onReturn() {
      this.$router.go(-1)
    },
    async onSubmit() {
      if (this.selected) {
        try {
          const user = {
            userId: this.userId,
            avatar: this.selected
          }
          this.loading = true
          await updateUser(user)
          this.$store.commit('user/SET_AVATAR', user.avatar)
          this.$message.success('更新头像成功')
        } catch (e) {
          console.log(e)
        } finally {
          this.loading = false
        }
      } else {
        this.$message.error('当前没有头像被选中')
      }
    }
  }
}
</script>

<style scoped>

</style>
