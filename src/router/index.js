import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Weather from "../components/Weather";
import SimpleDay from "../components/SimpleDay";
import ChartParent from "../components/ChartParent";
import HighLightParent from "../components/forecastday/HighLightParent";
import store from '../main'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '123',
      name: 'HelloWorld',
      component: HelloWorld,
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
      meta: { requiresData: true },

      //props: true
    },
    {
      path: '/HighLight',
      name: 'HighLight',
      component: HighLightParent,
      meta: { requiresData: true },
      //props: true
    },
    {
      path: '/day/:id',
      name: 'day',
      component: SimpleDay,
      props: true,
      meta: { requiresData: true },
    },
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresData)){  // 判断该路由是否需数据
    if (store.state.currentWeather.time == ''){
      next({ name: 'Weather' });
      console.log('没有天气数据');
      console.log(store.state)
    }else {next();}
  }else {next();}
})
export default router;
