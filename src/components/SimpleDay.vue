<template>
  <div id="simpleDay">
    <div class="title">
      <h3>{{day}}的天气情况</h3>
    </div>
    <div class="box">
      <uv_chart v-bind:uv-index="uvInfo"></uv_chart>
      <DayNightTemp v-bind:temp-info="tempInfo"></DayNightTemp>
      <HighLights v-bind:highlights="highLightsInfo"></HighLights>
    </div>
  </div>
</template>

<script>
import TempVarChart from "./TempVarChart";
import DayNightTemp from "./forecastday/Temp";
import HighLights from "./forecastday/HighLights";
import utils from "../utils/utils";
import Uv_chart from "./forecastday/uv_chart";
export default {
  name: "SimpleDay",
  components: { Uv_chart, DayNightTemp, TempVarChart, HighLights},
  /*props:[
    'Day'
  ],*/
  data: {
    return: {

    }
  },
  computed: {
    weatherObj(){
      //get index of forecast by router link
      return this.$store.state.forecast.daily[this.$route.params.id];
    },
    tempInfo(){
      return this.weatherObj.temp;
    },
    highLightsInfo(){
      var obj = {
        humidity:'',
        uvi:'',
        type:'',
        icon:''
      }
      obj.humidity = this.weatherObj.humidity;
      obj.uvi = this.weatherObj.uvi;
      obj.type = this.weatherObj.weather[0].description;
      obj.icon = this.weatherObj.weather[0].icon;
      return obj;
    },
    uvInfo(){
      return this.weatherObj.uvi;
    },
    day(){
      return utils.unixToDate(this.weatherObj.dt);
    }
  }
}
</script>

<style scoped>
.title{
  margin-bottom: 50px;
}
.box{
  display: flex;
  justify-content: space-around;
}
</style>
