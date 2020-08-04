<template>
<div id="tempvarchart">
  <h3>温度:</h3>
  <div id="chart"></div>
  <div id="cmm" class="box ">
    <p>当前温度:{{tempVar0}}</p>
    <p>今天最高:{{tempVar1}}</p>
    <p>今日最低:{{tempVar2}}</p>
  </div>
  <br>

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
      var date = new Date();
      var current = date.getTime();
      var ta = [];
      for (let i = 0; i <24; i++) {
        ta[i] = [(current + 3600000*i), this.hourlyInfo[i]]
      }
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '温度变化'
        },
        tooltip: {},
        legend: {
          data:['小时']
        },
        color: ['#409EFF'],
        xAxis: {
          type: 'time',
          splitNumber: 10,
          //type: 'category',
          splitLine: {
            show: false
          },
          //data: this.hourArray
        },
        yAxis: {
          //min:'20',
          splitNumber:'10',
          max: Math.round(Math.max.apply(null, this.hourlyInfo)) + 5,
          min: Math.round(Math.min.apply(null, this.hourlyInfo)) - 5,
        },
        series: [{
          smooth: true,
          name: '温度',
          type: 'line',
          data: ta,
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
    hourlyInfo(){
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
  width: 100%;
  height: 500px;
}
#tempvarchart{
  padding: 50px;
  background-color: white;
}
.box{
  display: flex;
  justify-content: space-around;
}
</style>
