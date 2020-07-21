<template>
<div id="tempvarchart">
  <h3>temperature:</h3>
  current temperature:{{tempVar0}}<br>
  today's highest:{{tempVar1}}<br>
  today's  lowest:{{tempVar2}}
</div>
</template>

<script>
export default {
  name: "TempVarChart",
  props:['tempInfo'],
  data(){
    return{

    }
  },
  methods:{

  },
  computed:{
    tempVar0(){
      return this.tempInfo.temp;
    },
    tempVar1(){
      return this.tempInfo.todayTempHigh;
    },
    tempVar2(){
      return this.tempInfo.todayTempLow;
    }
  }
}
</script>

<style scoped>

</style>
