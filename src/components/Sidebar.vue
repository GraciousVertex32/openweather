<template>
  <div>
    <el-row class="tac">
      <el-col>
        <h5>导航</h5>
        <el-menu router="true">
          <el-submenu index="1" v-bind:disabled="disable">

            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>今日天气</span>
            </template>

            <el-menu-item index="/HighLight" >天气</el-menu-item>
            <el-menu-item index="/temperature">温度</el-menu-item>

          </el-submenu>
          <el-submenu index="2" v-bind:disabled="disable">
            <!--add disable status-->
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>7日预报</span>
            </template>
            <!--title-->
            <el-menu-item index="/day/0">{{ days[week[0]] }}</el-menu-item>

            <el-menu-item index="/day/1">{{ days[week[1]] }}</el-menu-item>

            <el-menu-item index="/day/2">{{ days[week[2]] }}</el-menu-item>

            <el-menu-item index="/day/3">{{ days[week[3]] }}</el-menu-item>

            <el-menu-item index="/day/4">{{ days[week[4]] }}</el-menu-item>

            <el-menu-item index="/day/5">{{ days[week[5]] }}</el-menu-item>

            <el-menu-item index="/day/6">{{ days[week[6]] }}</el-menu-item>

          </el-submenu>

        </el-menu>
      </el-col>
    </el-row>
  </div>


</template>

<script>
import Vue from 'vue';
import utils from "../utils/utils";
export default {
  name: "sidebar",
  props: ["hasData"],
  data(){
    return{
      days : ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
      sth: '123',
    }
  },
  computed:{
    disable(){
      return !this.hasData
    },
    week(){
      var week = [];
      var curr = utils.getDayOfWeek();
      for (let i = 0; i < 7; i++) {
        Vue.set(week, i, i + curr < 7? i + curr : i + curr - 7)
      }
      return week;
    }
  }
}
</script>

<style scoped>
li{
  list-style: none;
}

el-menu{

}
</style>
