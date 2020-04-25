<template>
  <div class="dashboard-container">
    <panel-group v-if="currentProject && currentProject.currentSprintId" />
    <bornout-chart v-if="currentProject && currentProject.currentSprintId"></bornout-chart>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from '@/views/dashboard/PanelGroup'
import BornoutChart from '@/views/dashboard/BornoutChart'
export default {
  name: 'Dashboard',
  components: { BornoutChart, PanelGroup },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'currentProject'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
