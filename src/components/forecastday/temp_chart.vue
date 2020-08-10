<template>
  <div>
    <div id="temp-chart"></div>
  </div>
</template>

<script>
export default {
  name: "temp_chart",
  props:['tempInfo'],
  methods:{
    drawChart(){
      let myChart = this.$echarts.init(document.getElementById('temp-chart'));
      let option = {
        title: {
          text: "温度预告",
          top: "5%",
          left: "center"
        },
        tooltip: {},
        legend: {},
        color: ['#409EFF'],
        xAxis: {
          data: ["白天温度", "夜间温度", "最高温度", "最低温度"]
        },
        yAxis: {
          max: Math.round(Math.max.apply(null, this.chartArray)) + 5,
          min: Math.round(Math.min.apply(null, this.chartArray)) - 5,
          //splitNumber: 10,
        },
        series: [{
          type: "bar",
          data: this.dataArray,
          itemStyle: {
            barBorderRadius: [4, 4, 0, 0]
          },
          barWidth: 30
        }]
      }
      console.log(Math.round(Math.min.apply(null, this.chartArray)));
      myChart.setOption(option);
    }
  },
  mounted() {
    this.drawChart();
  },
  beforeUpdate() {
    this.drawChart();
  },
  computed:{
    dayTemp(){
      return this.tempInfo.day;
    },
    nightTemp(){
      return this.tempInfo.eve;
    },
    highTemp(){
      return this.tempInfo.max;
    },
    lowTemp(){
      return this.tempInfo.min;
    },
    chartArray(){
      return [this.dayTemp, this.nightTemp, this.highTemp, this.lowTemp];
    },
    dataArray(){
      let a = [
        {
          value: this.dayTemp,
          itemStyle: {color: '#67C23A'}
        },
        {
          value: this.nightTemp,
          itemStyle: {color: '#909399'}
        },
        {
          value: this.highTemp,
          itemStyle: {color: '#F56C6C'}
        },
        {
          value: this.lowTemp,
          itemStyle: {color: '#409EFF'}
        }
      ];
      return a;
    }
  }
}
</script>

<style scoped>
#temp-chart{
  width: 400px;
  height: 300px;
  margin: 10px;
  background-color: white;
}
</style>
