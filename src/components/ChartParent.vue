<template>
  <TempVarChart v-bind:temp-info="tempInfoFromVuex"></TempVarChart>
</template>

<script>
import TempVarChart from "./TempVarChart";
export default {
  name: "ChartParent",
  components: {TempVarChart},
  computed:{
    tempInfoFromVuex(){
      var obj = {
        hourly:[],
        tempInfo:{}
      };
      obj.hourly = this.$store.state.forecast.hourly
      obj.tempInfo = this.$store.state.currentWeather.tempInfo;
      return obj
    },
  }
}
</script>

<style scoped>

</style>
