<template>
  <div id="highlights">
    <h3>天气情况:</h3>
    <visibility-panel v-bind:visInfo="visInfo"></visibility-panel>
    <humidity-panel v-bind:humidityInfo="humInfo"></humidity-panel>
    <type-panel v-bind:type="typeInfo"></type-panel>
    <img :src="imgLink">
  </div>
</template>

<script>
import humidity from "./highLight_humidity";
import visibility from "./hightLight_visibility";
import type from "./hightLight_type";
export default {
  name: "Today-HighLights",
  components:{
    'humidity-panel':humidity,
    'visibility-panel':visibility,
    'type-panel':type
  },
  props:['highlights'],
  data(){
    return{
    }
  },
  methods:{

  },
  computed:{
    visInfo(){
      console.log("updated visInfo");
      return this.highlights.visibility
    },
    humInfo(){
      return this.highlights.humidity
    },
    typeInfo(){
      return this.highlights.type
    },
    /*highlights(){
      return  this.$store.state.currentWeather.highlights;
    }*/
    imgLink(){
      let base = 'http://openweathermap.org/img/wn/';
      let end = '@2x.png';
      let url = base + this.highlights.icon + end;
      return url
    }
  }
}
</script>
<style scoped>

</style>
