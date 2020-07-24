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
export default {
  name: "TempVarChart",
  //props:['tempInfo'],
  data(){
    return{
      raw: [],
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
          data: ["1","2","3","4","5","6",'7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
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
    this.raw = this.$store.state.forecast.hourly
    console.log(this.rawProcessed.length);
    console.log(this.rawProcessed[0]);
    console.log(this.rawProcessed[1]);
    //this.buildTempArray();
    this.drawChart();
  },
  beforeUpdate() {
    this.raw = this.$store.state.forecast.hourly
    console.log(this.rawProcessed.length);
    console.log(this.rawProcessed[0]);
    console.log(this.rawProcessed[1]);
    //this.buildTempArray();
    this.drawChart();
  },
  computed:{
    tempVar0(){
      return this.tempInfo.temp;
    },
    tempVar1(){
      return this.tempInfo.todayTempHigh;
    },
    tempVar2(){
      return this.tempInfo.todayTempLow;
    },
    tempInfo(){
      return this.$store.state.currentWeather.tempInfo;
    },
    hourlyTempArray(){
      let hourlyInfo = [];
      let raw = this.$store.state.forecast.hourly;
      for(var i = 0; i < raw.length; i++) {
        hourlyInfo[i] = raw[i].temp;
      }
      return hourlyInfo
    },
    rawProcessed(){
      let hourlyInfo = [];
      for(var i = 0; i < this.raw.length; i++) {
        hourlyInfo[i] = this.raw[i].temp;
      }
      return hourlyInfo
    },

  }
}
</script>

<style scoped>
#chart{
  width: 500px;
  height: 500px;
}
</style>
