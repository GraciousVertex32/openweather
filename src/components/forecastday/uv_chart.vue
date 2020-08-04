<template>
  <div>
    <div id="uv-chart"></div>
  </div>
</template>

<script>
export default {
  name: "uv_chart",
  props:['uvIndex'],
  data () {
    return {}
  },
  methods:{
    drawChart(){
      let myChart = this.$echarts.init(document.getElementById('uv-chart'));
      let option = {
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{
          name: '紫外指标',
          type: 'gauge',
          detail: {formatter: '{value}'},
          data: [{value: this.uvValue , name: '紫外线指数'}],
          radius: '85%',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 15,
          splitNumber: 3,
          axisLine:{
            lineStyle:{
              color:[[0.2, '#67C23A'], [0.8, '#409EFF'], [1, '#F56C6C']],
              width: 25
            }
          },
          title: {
            fontSize: 20
          }
        }]
      }
      myChart.setOption(option);
    },
  },
  mounted() {
    this.drawChart();
  },
  beforeUpdate() {
    this.drawChart();
  },
  computed:{
    uvValue(){
      return this.uvIndex;
    }
  }
}
</script>

<style scoped>
#uv-chart{
  width: 400px;
  height: 300px;
  margin: 10px;
  background-color: white;
}
</style>
