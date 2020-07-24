<template>
<ul>
  <h4>Today's Weather</h4>
  <ul>
    <li><router-link to="/HighLight" >high light</router-link></li>
    <li><router-link to="/temperature">temperature</router-link></li>
    <li><p>other</p></li>
  </ul>
  <h4>7-day forecast</h4>
  <ul>
    <li><router-link to="/day/0">today</router-link></li>
    <li><router-link to="/day/1">Tomorrow</router-link></li>
    <li><router-link to="/day/2">3</router-link></li>
    <li><router-link to="/day/3">4</router-link></li>
    <li><router-link to="/day/4">5</router-link></li>
    <li><router-link to="/day/5">6</router-link></li>
    <li><router-link to="/day/6">7</router-link></li>
  </ul>
</ul>
</template>

<script>
export default {
  name: "sidebar",
  data:{
  }
}
</script>

<style scoped>
li{
  list-style: none;
}
</style>
