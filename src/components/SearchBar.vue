<template>
  <div id="searchbar">
    <el-input
      id="location-input"
      type="text"
      placeholder="Shanghai"
      @keyup.native.enter="apiRequest(location)"
      v-model="location"
    ></el-input>
    <div id="btn">
      <el-button id="search-btn" name="search" @click="apiRequest(location)">search</el-button>
    </div>
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
#search-btn{
  type: primary;
}

#btn{
  float: right;
}
#searchbar{

}
</style>
