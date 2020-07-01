<template>
  <div id="visibility">
    <h3>Visibility:</h3>
    {{visInfo}}
  </div>
</template>

<script>
export default {
  name: "visibility",
  props:['highlights'],
  data(){
    return{
      visInfo: this.currentWeather.visibility
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
