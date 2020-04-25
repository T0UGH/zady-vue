<template>
  <div class="chart" style="height:350px; width: 100%;" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getBornoutBySprint, getDashBoardBySprint } from '@/api/dashBoard'
import { getSprint } from '@/api/sprint'
import { mapGetters } from 'vuex'

export default {
  name: 'BornoutChart',
  data() {
    return {
      chart: null,
      chartData: {
        expectedData: [
          // {
          //   name: new Date(2020, 4, 3).toString(),
          //   value: [
          //     [new Date(2020, 4, 3).getFullYear(), new Date(2020, 4, 3).getMonth() + 1, new Date(2020, 4, 3).getDate()].join('/'),
          //     100
          //   ]
          // },
          // {
          //   name: new Date(2020, 5, 3).toString(),
          //   value: [
          //     [new Date(2020, 5, 3).getFullYear(), new Date(2020, 5, 3).getMonth() + 1, new Date(2020, 5, 3).getDate()].join('/'),
          //     0
          //   ]
          // }
        ],
        actualData: [
          {
            name: new Date(2020, 4, 3).toString(),
            value: [
              [new Date(2020, 4, 3).getFullYear(), new Date(2020, 4, 3).getMonth() + 1, new Date(2020, 4, 3).getDate()].join('/'),
              100
            ]
          },
          {
            name: new Date(2020, 4, 23).toString(),
            value: [
              [new Date(2020, 4, 23).getFullYear(), new Date(2020, 4, 23).getMonth() + 1, new Date(2020, 4, 23).getDate()].join('/'),
              25
            ]
          }
        ]
      }
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'currentProjectId',
      'storyStatusEnum'
    ])
  },
  async created() {
    await this.loadData()
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async loadData() {
      const currentSprintId = this.currentProject.currentSprintId
      let res = await getSprint(currentSprintId)
      const currentSprint = res.body
      res = await getBornoutBySprint(currentSprintId)
      const bornout = res.body
      res = await getDashBoardBySprint(currentSprintId)
      const dashBoardData = res.body
      console.log(currentSprint)
      console.log(bornout)
      console.log(dashBoardData)
      this.chartData.expectedData = this.generateExpectedData(currentSprint, dashBoardData)
      this.chartData.actualData = this.generateActualData(currentSprint, dashBoardData, bornout)
    },
    generateActualData: function(currentSprint, dashBoardData, bornout) {
      const actualData = []
      const startDate = new Date(currentSprint.startDate)
      const startValue = dashBoardData.storyNum
      const start = this.generateDayData(startDate, startValue)
      actualData.push(start)
      for (let i = 0; i < bornout.length; i++) {
        const curr = bornout[i]
        const currDate = new Date(curr.createDate)
        const currValue = startValue - curr.finishedStoryNum
        actualData.push(this.generateDayData(currDate, currValue))
      }
      return actualData
    },
    generateExpectedData: function(currentSprint, dashBoardData) {
      const expectedData = []
      const startDate = new Date(currentSprint.startDate)
      const startValue = dashBoardData.storyNum
      const start = this.generateDayData(startDate, startValue)
      expectedData.push(start)
      const endDate = new Date(currentSprint.expectedEndDate)
      const end = this.generateDayData(endDate, 0)
      expectedData.push(end)
      return expectedData
    },
    generateDayData(date, value) {
      return {
        name: date.toString(),
        value: [
          [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/'),
          value
        ]
      }
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['expected', 'actual']
        },
        series: [{
          name: 'expected', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>
