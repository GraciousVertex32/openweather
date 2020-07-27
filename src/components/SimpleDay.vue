<template>
  <div id="simpleDay">
    <h3>{{day}}的天气情况</h3>
    <br>
    <DayNightTemp v-bind:temp-info="tempInfo"></DayNightTemp>
    <HighLights v-bind:highlights="highLightsInfo"></HighLights>
  </div>
</template>

<script>
import TempVarChart from "./TempVarChart";
import DayNightTemp from "./Temp";
import HighLights from "./HighLights";
import utils from "../utils/utils";
export default {
  name: "SimpleDay",
  components: {DayNightTemp, TempVarChart, HighLights},
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
        visibility:'',
        type:'',
        icon:''
      }
      obj.humidity = this.weatherObj.humidity;
      obj.visibility = this.weatherObj.uvi;
      obj.type = this.weatherObj.weather[0].description;
      obj.icon = this.weatherObj.weather[0].icon;
      return obj;
    },
    day(){
      return utils.unixToDate(this.weatherObj.dt);
    }
  }
}
</script>

<style scoped>

</style>
