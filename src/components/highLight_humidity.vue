<template>
  <div id="uv">
    <b>湿度:</b>
    {{humidityInfo}}
  </div>
</template>

<script>
export default {
  name: "humidity",
  props:['humidityInfo'],
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
