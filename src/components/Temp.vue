<template>
  <div id="dayNightTemp">
    <h3>当天温度</h3>
    白天温度:{{dayTemp}}<br>
    夜间温度:{{nightTemp}}<br>
    最高温度:{{highTemp}}<br>
    最低温度:{{lowTemp}}

  </div>
</template>

<script>
import echarts2 from 'echarts';
export default {
  name: "DayNightTemp",
  props:['tempInfo'],
  data(){
    return{

    }
  },
  methods:{

  },

  mounted() {

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
    }
  }
}
</script>

<style scoped>
#chart{
  width: 300px;
  height: 300px;
}
</style>
