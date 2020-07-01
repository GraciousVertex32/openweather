<template>
  <div class="weather">
    <h1>weather lookup</h1>
    <p>{{weather_data}}</p>
    <p>current time:todo</p>
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
      
    }
  },
  methods:{

  },
  computed:{
    tempCurr(){
      return this.weather_data.temp
    },
    tempMax(){
      return this.weather_data.todayHighLow.todayTempHigh
    },
    tempMin(){
      return this.weather_data.todayHighLow.todayTempLow
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
