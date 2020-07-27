import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Weather from "../components/Weather";
import TempVarChart from "../components/TempVarChart";
import HighLights from "../components/HighLights";
import SimpleDay from "../components/SimpleDay";
import ChartParent from "../components/ChartParent";

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
    },
    {
      path: '/temperature',
      name: 'Temperature',
      component: ChartParent,
      props: true
    },
    {
      path: '/HighLight',
      name: 'HighLight',
      component: HighLights,
      props: true
    },
    {
      path: '/day/:id',
      name: 'day',
      component: SimpleDay,
      props: true
    }
  ]
})
