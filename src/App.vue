<template>
  <div id="app">
    <div id="search">
      <input
        id="location-input"
        type="text"
        placeholder="Shanghai"
        @keyup.enter="allgo()"
      >
      <button id="search-btn" name="search" @click="allgo()">search
      </button>
    </div>
    <transition name="fade"><Weather v-bind:weather_data=currentWeather></Weather></transition>

  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import weather from './components/Weather';
export default {
  name: 'App',
  components:{
    'Weather':weather
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
          temp: '',
          todayTempHigh: '',
          todayTempLow: '',
          type: '',
          possibility: '',
          humidity:'',
          visibility:''
        },
        tempVar: {
          tempToday: [
            // gets added dynamically by this.getSetHourlyTempInfoToday()
          ],
        },
        highlights: {
          uvIndex: '',
          visibility: '',
          windStatus: {
            windSpeed: '',
            windDirection: '',
            derivedWindDirection: ''
          },
        }

    }
  },
  methods:{

    unixToHuman(timezone,timestamp){
      var t = new Date(timestamp*1000);
      console.log(t);
      var formatted = moment(t).format("dd.mm.yyyy hh:MM:ss");
      return t;
    },
    kTCelsius(tmp){
      var tInC = tmp - 273;
      return tInC;
    },
    getTimezone() {
      return this.rawWeatherData.timezone;
    },
    getSetCurrentTime() {
      var currentTime = this.rawWeatherData.dt;
      var timezone = this.getTimezone();
      this.currentWeather.time = this.unixToHuman(
        timezone,
        currentTime
      );
    },
    getSetTemperature(){
      var cur = this.rawWeatherData.main.temp;
      var curMin = this.rawWeatherData.main.temp_min;
      var curMax = this.rawWeatherData.main.temp_max;
      this.currentWeather.temp = Math.round(this.kTCelsius(cur));
      this.currentWeather.todayTempHigh = Math.round(this.kTCelsius(curMax));
      this.currentWeather.todayTempLow = Math.round(this.kTCelsius(curMin));
    },
    getSetVisibility() {
      var visibilityInMiles = this.rawWeatherData.visibility;
      this.currentWeather.visibility = visibilityInMiles;
    },
    getSetHumidity() {
      var hum = this.rawWeatherData.main.humidity;
      this.currentWeather.humidity = hum;
    },
    getSetWeatherType() {
      var type = this.rawWeatherData.weather[0].description;
      this.currentWeather.type = type;
    },
    sortData(){
      this.getSetCurrentTime();
      this.getSetTemperature();
      this.getSetVisibility();
      this.getSetHumidity();
      this.getSetWeatherType();
    },
    completeWeatherApi(){
      var prefix = 'http://api.openweathermap.org/data/2.5/weather';
      var apikey = '28da538f1a9e32b0cc49cbf3a223510d';
      var city = document.getElementById('location-input').value;
      //change?
      this.urlLink = prefix + '?q=' + city + '&appid=' + apikey;
    },
    fetchData(){
      this.completeWeatherApi();
      axios.get(this.urlLink)
        .then((response) => {
          this.rawWeatherData = response.data;
          this.sortData();
        })
      .catch((error) =>{
        console.log(error);
      })
    },
    allgo(){
      this.fetchData();
    },
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
</style>
