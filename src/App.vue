<template>
  <div id="app">
    <div id="search">
      <input
        id="location-input"
        type="text"
        placeholder="Location?"
        @keyup.enter="completeWeatherApi()"
      >
      <button id="search-btn" name="search" @click="allgo()">search
      </button>
    </div>
    <Weather v-bind:weather_data=currentWeather></Weather>
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
          full_location: '', // for full address
          formatted_lat: '', // for N/S
          formatted_long: '', // for E/W
          time: '',
          temp: '',
          todayHighLow: {
            todayTempHigh: '',
            todayTempHighTime: '',
            todayTempLow: '',
            todayTempLowTime: ''
          },
          summary: '',
          possibility: ''
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
      var t = new Date(timestamp);
      var formatted = moment(t).format("dd.mm.yyyy hh:MM:ss")
      return {
        time:formatted
      };
    },
    kTCelsius(tmp){
      var tInC = tmp - 273;
      return{temp:tInC};
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
      ).time ;
    },
    getSetTemperature(){
      var cur = this.rawWeatherData.main.temp;
      var curMin = this.rawWeatherData.main.temp_min;
      var curMax = this.rawWeatherData.main.temp_max;
      this.currentWeather.temp =cur;
      this.currentWeather.todayHighLow.todayTempHigh =curMax;
      this.currentWeather.todayHighLow.todayTempLow =curMin;
    },
    getSetVisibility() {
      var visibilityInMiles = this.rawWeatherData.visibility;
      this.currentWeather.visibility = visibilityInMiles;
    },
    sortData(){
      console.log("sorting data");
      this.getSetCurrentTime();
      this.getSetTemperature();
      this.getSetVisibility();
      console.log("sorting complete");
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
          console.log("getting data")
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
