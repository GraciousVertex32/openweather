<template>
  <div id="searchbar">
    <input
      id="location-input"
      type="text"
      placeholder="Shanghai"
      @keyup.enter="apiRequest(location)"
      v-model="location"
    >
    <button id="search-btn" name="search" @click="apiRequest(location)">search</button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data(){
    return {
      location: 'Shanghai'
    }
  },
  methods:{
    apiRequest(location){
      this.$emit('search',location)
    }
  }
}
</script>

<style scoped>

</style>
