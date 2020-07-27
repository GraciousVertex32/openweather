<template>
<ul>
  <h4>Today's Weather</h4>
  <ul>
    <li><router-link to="{path:'/HighLight', params:}" >high light</router-link></li>
    <li><router-link to="/temperature">temperature</router-link></li>
    <li><p>other</p></li>
  </ul>
  <h4>7-day forecast</h4>
  <ul>
    <li><router-link to="/day/0">{{ days[week[0]] }}</router-link></li>
    <li><router-link to="/day/1">{{ days[week[1]] }}</router-link></li>
    <li><router-link to="/day/2">{{ days[week[2]] }}</router-link></li>
    <li><router-link to="/day/3">{{ days[week[3]] }}</router-link></li>
    <li><router-link to="/day/4">{{ days[week[4]] }}</router-link></li>
    <li><router-link to="/day/5">{{ days[week[5]] }}</router-link></li>
    <li><router-link to="/day/6">{{ days[week[6]] }}</router-link></li>
  </ul>
</ul>
</template>

<script>
import Vue from 'vue';
import utils from "../utils/utils";
export default {
  name: "sidebar",
  data(){
    return{
      days : ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
      sth: '123',
    }
  },
  computed:{
    week(){
      var week = [];
      var curr = utils.getDayOfWeek();
      for (let i = 0; i < 7; i++) {
        Vue.set(week, i, i + curr < 7? i + curr : i + curr - 7)
      }
      return week;
    }
  }
}
</script>

<style scoped>
li{
  list-style: none;
}
</style>
