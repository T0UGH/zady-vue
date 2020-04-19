<template>
  <common-form
    :submit-request="updateUser"
    :additional-form-data="{userId: userId, avatar: selected}"
    :after-success="afterSuccess"
  >
    <template #formContent="{formData}">
      <el-form-item label="头像列表">
        <el-radio v-for="avatar in avatarList" :key="avatar" v-model="selected" :label="avatar"><el-avatar :src="avatar" /></el-radio>
      </el-form-item>
    </template>
  </common-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateUser } from '@/api/user'
import CommonForm from '@/components/CommonForm/index'

export default {
  name: 'UserAvatar',
  components: {
    CommonForm
  },
  data() {
    return {
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
    updateUser,
    async afterSuccess() {
      await this.$store.dispatch('user/getUserInfo')
    }
  }
}
</script>

<style scoped>

</style>
