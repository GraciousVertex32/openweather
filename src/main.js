// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import './assets/normalize.css'

import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import echarts from 'echarts';
Vue.prototype.$echarts = echarts

import axios from 'axios';
Vue.prototype.$axios = axios;

import Vuex from'vuex';

Vue.config.productionTip = false
Vue.use(ElementUi);
Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    count: 0,
    forecast:{
      hourly:[],
    },
    currentWeather: {
      pressure: '',
      full_location: '', // for full address
      formatted_lat: '', // for N/S
      formatted_long: '', // for E/W
      time: '',
      tempInfo:{
        temp: '',
        todayTempHigh: '',
        todayTempLow: '',
      },
      possibility: '',
      highlights: {
        humidity:'',
        visibility:'',
        type: '',
        windStatus: {
          windSpeed: '',
          windDirection: ''
        },
      }
    },
  },
  mutations:{
    countIncrease(state){
      state.count++;
    },
    populateDay(state,data){
      state.currentWeather = Object.assign(state.currentWeather,data);
    },
    populateWeek(state,data){
      state.forecast = Object.assign(state.forecast,data);
    }
  },

});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
