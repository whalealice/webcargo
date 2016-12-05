import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Index from './index'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import md5 from 'md5'
import Api from './assets/js/api'
import './assets/css/common.less';
import './assets/css/variable.less';

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(md5)

/* eslint-disable no-new */
// require(['./view/Login.vue'], function (Login) {
//   // code here runs after MyComponent.vue is asynchronously loaded.
// });

const routes = [
	{ path: '/',redirect: '/Login'},
	{ path: '/Login',name:"登陆",component: require('./view/Login.vue')},
	{ path: '/Registered',name:"注册",component: require('./view/Registered.vue')},
	{ path: '/ForgetLogin',name:"忘记密码",component: require('./view/ForgetLogin.vue')},
	{ path: '/Home',name:"主页",component: require('./view/Home.vue'),
     children: [
      {
        path: 'welcome',
        name:'欢迎',
        component: require('./view/welcome.vue')
      },
      {
        // 当 /Home/SetCargo 匹配成功，
        // SetCargo.vue 会被渲染在 Home 的 <router-view> 中
        path: 'SetCargo',
        name:'发货',
        component: require('./view/SetCargo.vue')
      },
      {
        path: 'publishInfo',
        name:'确认发货',
        component: require('./view/publishInfo.vue')
      },
      {
        path: 'CargoList',
        name:'全部货单',
        component: require('./view/CargoList.vue')
      },
      {
        path: 'CargoStatusAsk',
        name:'询价中',
        component: require('./view/CargoStatusAsk.vue')
      },
      {
        path: 'CargoStatusGoing',
        name:'进行中',
        component: require('./view/CargoStatusGoing.vue')
      },
      {
        path: 'CargoStatusObl',
        name:'代付款',
        component: require('./view/CargoStatusObl.vue')
      },
      {
        path: 'CargoStatusDone',
        name:'已完成',
        component: require('./view/CargoStatusDone.vue')
      },
      {
        path: 'CargoStatusUnselect',
        name:'已取消',
        component: require('./view/CargoStatusUnselect.vue')
      },
      {
        path: 'CargoStatusStale',
        name:'已过期',
        component: require('./view/CargoStatusStale.vue')
      },
      {
        path: 'CargoPriceList/:id',
        name:'报价信息',
        component: require('./view/CargoPriceList.vue')
      },
      {
        path: 'CargoDetail/:id',
        name:'货单详情',
        component: require('./view/CargoDetail.vue')
      },
      {
        path: 'CargoPriceBOrder/:companyId/:orderId',
        name:'下单详情',
        component: require('./view/CargoPriceBOrder.vue')
      },
      {
        path: 'FundsDetail',
        name:'账户信息',
        component: require('./view/FundsDetail.vue')
      },
      {
        path: 'UserList',
        name:'用户管理',
        component: require('./view/UserList.vue')
      },
      {
        path: 'ModuleList',
        name:'模块管理',
        component: require('./view/ModuleList.vue')
      },
      {
        path: 'RoleList',
        name:'角色管理',
        component: require('./view/RoleList.vue')
      },
      {
        path: 'UserPasswd',
        name:'修改密码',
        component: require('./view/UserPasswd.vue')
      }
    ]
  }
];


// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: 'hash',
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
