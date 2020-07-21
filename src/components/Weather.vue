<template>
  <div class="weather">
    <p>{{weather_data}}</p>
    <h3>fetch time:</h3>
    <p>{{weather_data.time}}</p>
    <temp-chart v-bind:tempInfo="tempInfo"></temp-chart>
    <today-highlights v-bind:highlights="wDate"></today-highlights>
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
      wDate: this.weather_data,
    }
  },
  methods:{

  },
  computed:{
    tempCurr(){
      console.log("updated temp");
      return this.weather_data.temp;
    },
    tempMax(){
      return this.weather_data.todayTempHigh;
    },
    tempMin(){
      return this.weather_data.todayTempLow;
    },
    forTest(){
      console.log("updated test");
      return this.weather_data.humidity;
    },
    highlights(){
      console.log("updated highligts")
      return this.weather_data.highlights;
    },
    tempInfo(){
      return  this.weather_data.tempInfo;
    }
  }
}
</script>

<style scoped>

</style>
