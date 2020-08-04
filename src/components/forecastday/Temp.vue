<template>
  <div id="dayNightTemp">
    <h3>当天温度</h3>
    <b>白天温度:</b>{{dayTemp}}<br>
    <b>夜间温度:</b>{{nightTemp}}<br>
    <b>最高温度:</b>{{highTemp}}<br>
    <b>最低温度:</b> {{lowTemp}}
  </div>
</template>

<script>
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
#dayNightTemp{
  margin: 10px;
  padding: 50px;
  background-color: white;
}
</style>
