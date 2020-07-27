<template>
  <div>
    <ul>
      <h4>Today's Weather</h4>
      <ul>
        <li><router-link to="{path:'/HighLight', params:}" >high light</router-link></li>
        <li><router-link to="/temperature">temperature</router-link></li>
        <li><p>other</p></li>
      </ul>
      <h4>7-day forecast</h4>
      <ul>
        <li><router-link to="/day/0">{{ days[week[0]] }}</router-link></li>
        <li><router-link to="/day/1">{{ days[week[1]] }}</router-link></li>
        <li><router-link to="/day/2">{{ days[week[2]] }}</router-link></li>
        <li><router-link to="/day/3">{{ days[week[3]] }}</router-link></li>
        <li><router-link to="/day/4">{{ days[week[4]] }}</router-link></li>
        <li><router-link to="/day/5">{{ days[week[5]] }}</router-link></li>
        <li><router-link to="/day/6">{{ days[week[6]] }}</router-link></li>
      </ul>
    </ul>
    <el-row class="tac">
      <el-col>
        <h5>默认颜色</h5>
        <el-menu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group title="分组一">
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group >
            <el-submenu index="1-4" title="选项4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
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
  data(){
    return{
      days : ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
      sth: '123',
    }
  },
  computed:{
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
</style>
