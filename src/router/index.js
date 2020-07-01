import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Weather from "../components/Weather";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '123',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Weather',
      component: Weather
    }
  ]
})
