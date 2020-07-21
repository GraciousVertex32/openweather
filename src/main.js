// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment";
import axios from 'axios';
import Vuex from'vuex';

Vue.config.productionTip = false
Vue.use(ElementUi);
Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    count: 0,
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
      type: '',
      possibility: '',
      highlights: {
        humidity:'',
        visibility:'',
        windStatus: {
          windSpeed: '',
          windDirection: ''
        },
      }
    }
  },
  mutations:{
    countIncrease(state){
      state.count++;
    },
    populate(state,data){
      state.currentWeather = Object.assign(state.currentWeather,data);
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
