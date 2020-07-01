<template>
  <div id="highlights">
    <h3>weather highlights:</h3>
    {{highlights}}
    <uv-panel v-bind:UVinfo="UVinfo"></uv-panel>
    <visibility-panel v-bind:highlights="highlights"></visibility-panel>
  </div>
</template>

<script>
import UVindex from "./UVindex";
import visibility from "./visibility";
export default {
  name: "Today-HighLights",
  components:{
    'uv-panel':UVindex,
    'visibility-panel':visibility
  },
  props:['highlights'],
  data(){
    return{
      UVinfo: this.highlights.uvindex
      // which way is better?
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
