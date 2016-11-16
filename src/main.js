import Vue from 'vue'
import Index from './index'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* eslint-disable no-new */
const routes = [
	{path: '/',redirect: '/Login'},
	{ path: '/Login',name:"登陆",component: require('./components/Login.vue')},
	{ path: '/Registered',name:"注册",component: require('./components/Registered.vue')},
	{ path: '/ForgetLogin',name:"忘记密码",component: require('./components/ForgetLogin.vue')}
]

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
