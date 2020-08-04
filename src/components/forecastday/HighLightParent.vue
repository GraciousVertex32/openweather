<template>
  <TodayHighLights v-bind:highlights="highlights"></TodayHighLights>
</template>

<script>
import TodayHighLights from "./HighLights";
export default {
  name: "HighLightParent",
  components: {TodayHighLights},
  computed:{
    highlights(){
      var obj = {
        visibility:'',
        humidity:'',
        type:'',
        icon:''
      };
      obj.visibility = this.$store.state.currentWeather.highlights.visibility;
      obj.humidity = this.$store.state.currentWeather.highlights.humidity;
      obj.type = this.$store.state.currentWeather.highlights.type;
      obj.icon = this.$store.state.currentWeather.highlights.icon;
      return obj;
    }
  }
}
</script>

<style scoped>

</style>
