<template>
<div id="tempvarchart">
  <h3>temperature:</h3>
  current temperature:{{tempVar0}}<br>
  today's highest:{{tempVar1}}<br>
  today's  lowest:{{tempVar2}}
  <div id="chart"></div>
</div>
</template>

<script>
import Vue from 'vue';
import utils from "../utils/utils";
export default {
  name: "TempVarChart",
  props:['tempInfo'],
  data(){
    return{
      raw: {},
    }
  },
  methods:{
    drawChart(){
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('chart'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '温度变化'
        },
        tooltip: {},
        legend: {
          data:['小时']
        },
        xAxis: {
          data: this.hourArray
        },
        yAxis: {},
        series: [{
          name: '温度',
          type: 'line',
          data: this.rawProcessed,
          //data: [30,20,10,12,15,15,16,18]
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.raw = this.tempInfo
    this.drawChart();
  },
  beforeUpdate() {
    this.raw = this.$store.state.forecast.hourly
    this.drawChart();
  },
  computed:{
    tempVar0(){
      return this.tempInfo.tempInfo.temp;
    },
    tempVar1(){
      return this.tempInfo.tempInfo.todayTempHigh;
    },
    tempVar2(){
      return this.tempInfo.tempInfo.todayTempLow;
    },
    rawProcessed(){
      let hourlyInfo = [];
      for(var i = 0; i < this.raw.hourly.length; i++) {
        hourlyInfo[i] = this.raw.hourly[i].temp;
      }
      return hourlyInfo
    },
    hourArray(){
      var hours = [];
      for (let i = 0; i <24; i++) {
        Vue.set(hours, i, utils.getHourOfDay() + i < 24? utils.getHourOfDay() + i : utils.getHourOfDay() + i - 24 )
      }
      return hours
    }
  }
}
</script>

<style scoped>
#chart{
  width: 500px;
  height: 500px;
}
</style>
