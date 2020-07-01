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
  props:['tempVar0','tempVar1','tempVar2'],
  data(){
    return{

    }
  },
  methods:{

  },
  computed:{

  }
}
</script>

<style scoped>

</style>
