import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Index from './index'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import md5 from 'md5'


Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(md5)

/* eslint-disable no-new */
const routes = [
	{path: '/',redirect: '/Login'},
	{ path: '/Login',name:"登陆",component: require('./view/Login.vue')},
	{ path: '/Registered',name:"注册",component: require('./view/Registered.vue')},
	{ path: '/ForgetLogin',name:"忘记密码",component: require('./view/ForgetLogin.vue')},
	{ path: '/Home',name:"发货",component: require('./view/Home.vue'),
     children: [
      {
        // 当 /Home/publish 匹配成功，
        // one.vue 会被渲染在 Publish 的 <router-view> 中
        path: 'publish',
        name:'第一个',
        component: require('./components/publish.vue')
      },
      {
        path: 'two',
        name:'第二个',
        component: require('./components/two.vue')
      }
    ]
  }
];

// var host ="http://112.126.82.117:9099"
// //请求接口
// let requestUrl = {
//     user: {
//         //登录接口
//         login: host + "/login/getAdminUser"
//     }
// };

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: 'history',
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const webcargo = new Vue({
  router,
  render: h => h(Index)
}).$mount('#webcargo')

//现在，应用已经启动了！
