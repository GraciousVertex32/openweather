<template>
  <div id="app">
    <!--<h3>count:{{this.$store.state.count}}</h3>
    <button @click="countIncrease">click to increase</button>-->
    <el-container class="is-vertical">
      <el-header>
        <el-container>
          <Title-panel></Title-panel>
          <el-container class="toppart">
            <SearchBar @search="allgo" id="SearchBar"></SearchBar>
          </el-container>
        </el-container>

      </el-header>

      <el-container>
        <el-aside>
          <Sidebar></Sidebar>
        </el-aside>

        <router-view></router-view>

        <el-main>
          <transition name="fade">
            <Weather v-bind:weather_data=currentWeather></Weather>
          </transition>
        </el-main>
      </el-container>


      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import weather from './components/Weather';
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";


export default {
  name: 'App',
  components:{
    SearchBar,
    Sidebar,
    'Footer': Footer,
    'Weather': weather,
    'Title-panel': Banner
  },
  data(){
    return{
      filename: 'App.vue',
      rawWeatherData:'',
      urlLink:'',
        //---------
      inputLocation:'',
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
      }
    }
  },
  methods:{

    unixToHuman(timezone,timestamp){
      let t = new Date(timestamp*1000);
      let formatted = moment(t).format("dd.mm.yyyy hh:MM:ss");
      return t;
    },
    kTCelsius(tmp){
      let tInC = tmp - 273;
      return tInC;
    },
    getTimezone() {
      return this.rawWeatherData.timezone;
    },
    getSetCurrentTime() {
      let currentTime = this.rawWeatherData.dt;
      let timezone = this.getTimezone();
      this.currentWeather.time = this.unixToHuman(
        timezone,
        currentTime
      );
      this.$store.state.currentWeather.time
    },
    getSetTemperature(){
      let cur = this.rawWeatherData.main.temp;
      let curMin = this.rawWeatherData.main.temp_min;
      let curMax = this.rawWeatherData.main.temp_max;
      this.currentWeather.tempInfo.temp = Math.round(this.kTCelsius(cur));
      this.currentWeather.tempInfo.todayTempHigh = Math.round(this.kTCelsius(curMax));
      this.currentWeather.tempInfo.todayTempLow = Math.round(this.kTCelsius(curMin));
    },
    getSetVisibility() {
      let visibilityInMiles = this.rawWeatherData.visibility;
      this.currentWeather.highlights.visibility = visibilityInMiles;
    },
    getSetHumidity() {
      let hum = this.rawWeatherData.main.humidity;
      this.currentWeather.highlights.humidity = hum;
    },
    getSetWeatherType() {
      let type = this.rawWeatherData.weather[0].description;
      this.currentWeather.highlights.type = type;
    },
    sortData(){
      this.getSetCurrentTime();
      this.getSetTemperature();
      this.getSetVisibility();
      this.getSetHumidity();
      this.getSetWeatherType();
    },
    completeWeatherApi(location){
      let prefix = 'http://api.openweathermap.org/data/2.5/weather';
      let apikey = '28da538f1a9e32b0cc49cbf3a223510d';
      //change?
      this.urlLink = prefix + '?q=' + location + '&appid=' + apikey;
    },
    fetchData(location){
      this.completeWeatherApi(location);
      axios.get(this.urlLink)
        .then((response) => {
          this.rawWeatherData = response.data;
          this.sortData();
          this.populateDateToStore();
        })
      .catch((error) =>{
        console.log(error);
      })
    },
    allgo(location){
      this.fetchData(location);
    },
    countIncrease(){
      this.$store.commit("countIncrease");
    },
    populateDateToStore(){
      this.$store.commit("populate",this.currentWeather);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
#SearchBar{
  align-self: center;
  float: right;
}
.toppart{
  justify-content: flex-end;
}
</style>
