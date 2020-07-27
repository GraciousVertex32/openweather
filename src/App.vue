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



        <el-main>
          <router-view></router-view>
          <!--<transition name="fade">
            <Weather v-bind:weather_data=currentWeather></Weather>
          </transition>-->
        </el-main>
      </el-container>


      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
import utils from "./utils/utils";
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
      rawForecastData:'',
      dayUrlLink:'',
      weekUrlLink:'',
      searchUrlLink:'',
        //---------
      inputLocation:'',
      lat:'',
      lon:'',

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
      hourlyTemp: []
    }
  },
  methods:{
    getTimezone() {
      return this.rawWeatherData.timezone;
    },
    getSetCurrentTime() {
      let currentTime = this.rawWeatherData.dt;
      let timezone = this.getTimezone();
      this.currentWeather.time = utils.unixToHuman(
        timezone,
        currentTime
      );
    },
    getSetTemperature(){
      let cur = this.rawWeatherData.main.temp;
      let curMin = this.rawWeatherData.main.temp_min;
      let curMax = this.rawWeatherData.main.temp_max;
      this.currentWeather.tempInfo.temp = Math.round(utils.kTCelsius(cur));
      this.currentWeather.tempInfo.todayTempHigh = Math.round(utils.kTCelsius(curMax));
      this.currentWeather.tempInfo.todayTempLow = Math.round(utils.kTCelsius(curMin));
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
    sortDayData(){
      this.getSetCurrentTime();
      this.getSetTemperature();
      this.getSetVisibility();
      this.getSetHumidity();
      this.getSetWeatherType();
    },


    //build api link
    completeWeatherApi(location){
      let prefix = 'http://api.openweathermap.org/data/2.5/weather';
      let apikey = '28da538f1a9e32b0cc49cbf3a223510d';
      this.dayUrlLink = prefix + '?q=' + location + '&appid=' + apikey;
    },
    weekForecastApi(lon,lat){
      let prefix = 'https://api.openweathermap.org/data/2.5/onecall';
      let apikey = '28da538f1a9e32b0cc49cbf3a223510d';
      this.weekUrlLink = prefix + '?lat=' + lat + '&lon=' + lon + '&appid=' + apikey
        + '&exclude=minutely,current'
        + '&units=metric';
      console.log(this.weekUrlLink);
    },
    locationToCoordinates(location){
      let prefix = 'https://us1.locationiq.com/v1/search.php';
      let apikey = 'pk.7ea1dfcc6aca9dd5203da5da7f8cbc46';
      this.searchUrlLink = prefix + '?key=' + apikey + '&q=' + location + '&format=json&limit=1';
    },


    //requests
    fetchToday(location){
      this.completeWeatherApi(location);
      //today's weather
      axios.get(this.dayUrlLink)
        .then((response) => {
          this.rawWeatherData = response.data;
          this.sortDayData();
          this.populateDayDateToStore();
        })
        .catch((error) =>{
          console.log(error);
        });
    },
    fetchWeek(location){
      this.locationToCoordinates(location)
      //location to coordinates
      axios.get(this.searchUrlLink)
        .then((response) => {
          this.lat = response.data[0].lat;
          this.lon = response.data[0].lon;
          //complete forecast api
          this.weekForecastApi(this.lon,this.lat);
          //call api for response
          axios.get(this.weekUrlLink)
            .then((response) => {
              this.rawForecastData = response.data;
              //todo: some data processing
              this.populateWeekDateToStore();
            })
            .catch((error) =>{
              console.log(error);
            });
        })
        .catch((error) =>{
          console.log(error);
        });
    },


    //entry point
    fetchData(location){
      this.fetchToday(location);
      this.fetchWeek(location);
    },
    allgo(location){
      this.fetchData(location);
    },

    //save to vuex
    populateDayDateToStore(){
      this.$store.commit("populateDay",this.currentWeather);
    },
    populateWeekDateToStore() {
      this.$store.commit("populateWeek",this.rawForecastData);
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
