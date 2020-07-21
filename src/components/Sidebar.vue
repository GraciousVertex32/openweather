<template>
<ul>
  <li><router-link to="/HighLight" >high light</router-link></li>
  <li><router-link to="/temperature">temperature</router-link></li>
  <li><a>other</a></li>
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
