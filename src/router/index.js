//初始化一个router数组，数组中添加路由对象，每一个对象都有一个path属性和一个component属性，path属性表示路由的路径，component属性表示路由对应的组件
import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/Index'
import Check_in from "@/components/user/Check_in.vue";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sys',
      name: 'Index',
      component: index,
      // redirect: '/sys/userList',
      children:[
        {path:'check_in',name:'Check_in',component:Check_in},
      ]
    },

  ]
})
