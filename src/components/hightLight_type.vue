<template>
<div id="test">
  <b>天气:</b>
  {{type}}

</div>
</template>

<script>
export default {
  name: "test",
  props: ['type'],
  data() {
    return {}
  },
  methods: {},
  computed: {}
}
</script>

<style scoped>

</style>
