<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <el-dropdown @command="handleCommand">
              <span>项目: {{currentProjectName}}<i class="el-icon-caret-bottom" /></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="project in projectList" :command="project.projectId" :key="project.projectId">{{ project.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { resetRouter } from '@/router'
import { getProjectsByUser } from '../../api/project'
import { switchProject } from '../../api/user'
import { generateRoutes } from '../../utils/roles'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      currentProjectName: '',
      projectList: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  beforeCreate: function() {
    console.log(this)
    const projectId = this.$store.state.user.currentProjectId
    console.log(projectId)
    if (projectId) {
      getProjectsByUser(projectId).then(res => {
        console.log(res)
        res.body.forEach(project => {
          if (project.projectId === projectId) {
            this.currentProjectName = project.name
          }
        })
        this.projectList = res.body
      }).catch(e => {
        console.log(e)
      })
    }
    // todo: 这里实现的是直接跳转到创建一个项目的界面
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      resetRouter()
      this.$store.commit('user/RESET_STATE')
      this.$store.commit('permission/RESET_ROUTES')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleCommand(projectId) {
      this.$message('click on item ' + projectId)
      switchProject(projectId).then(res => {
        this.$store.commit('user/SET_CURRENT_PROJECT_ID', projectId)
        this.$store.commit('user/SET_TOKEN', res.body)
        this.projectList.forEach(async project => {
          if (project.projectId === projectId) {
            this.currentProjectName = project.name
            this.$store.commit('user/SET_ROLES', project.role.role.split(','))
          }
          resetRouter()
          this.$store.commit('permission/RESET_ROUTES')
          await generateRoutes()
        })
        this.$router.push(`/`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .project{
      display: inline-block;
      font-size: 14px;
      line-height: 50px;
    }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
