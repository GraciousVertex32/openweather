<template>
  <div id="simpleDay">
    <h3>{{day}}的天气情况</h3>
    <br>
    <DayNightTemp v-bind:temp-info="tempInfo"></DayNightTemp>
  </div>
</template>

<script>
import TempVarChart from "./TempVarChart";
import DayNightTemp from "./Temp";
import utils from "../utils/utils";
export default {
  name: "SimpleDay",
  components: {DayNightTemp, TempVarChart},
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
    day(){
      return utils.unixToDate(this.weatherObj.dt);
    }
  }
}
</script>

<style scoped>

</style>
