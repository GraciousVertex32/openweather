<template>
  <div class="weather">
    <h1>weather page compoment</h1>
    <p>with child compoment:{{childComponents1}}</p>
    <p>with child compoment:{{childComponents2}}</p>
    <p>{{weather_data}}</p>
    <p>current time:</p>
    <temp-chart
      v-bind:tempVar0="tempCurr"
      v-bind:tempVar1="tempMax"
      v-bind:tempVar2="tempMin"
    ></temp-chart>
    <p><today-highlights v-bind:highlights="highlights"></today-highlights></p>
  </div>
</template>

<script>

import HighLights from "./HighLights";
import TempVarChart from "./TempVarChart";
export default {
  name: "Weather",
  components: {
    'temp-chart':TempVarChart,
    'today-highlights': HighLights
  },
  props: ["weather_data"],
  data(){
    return{
      childComponents1: 'TempVarChart',
      childComponents2: 'HighLights',
      tempCurr: this.weather_data.temp,
      tempMax: this.weather_data.todayTempHigh,
      tempMin: this.weather_data.todayTempLow
    }
  },
  methods:{

  },
  computed:{

  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
