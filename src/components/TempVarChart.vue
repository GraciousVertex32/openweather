<template>
<div id="tempvarchart">
  <h3>温度:</h3>
  当前温度:{{tempVar0}}<br>
  今天最高:{{tempVar1}}<br>
  今日最低:{{tempVar2}}
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
          type: 'category',
          data: this.hourArray
        },
        yAxis: {
          //min:'20',
          splitNumber:'10'
        },
        series: [{
          smooth: true,
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
    this.raw = this.tempInfo
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
      var d = new Date();
      for (let i = 0; i <24; i++) {
        Vue.set(hours, i, utils.getHourOfDay() + i < 24? utils.getHourOfDay() + i : utils.getHourOfDay() + i - 24 )
        //Vue.set(hours, i, d.getTime()+i*3600 )
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
