<template>
  <div class="dashboard-container">
    <panel-group />
    <bornout-chart></bornout-chart>
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
      'roles'
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
