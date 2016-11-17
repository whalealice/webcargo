import Vue from 'vue';
import Validator from 'vue-validator'
Vue.use(Validator);
//获取cookie
Vue.prototype.getCookie = function(name){
  let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
   return unescape(arr[2]);
   else
   return null;
}


//添加一个简单的手机号验证
//匹配0-9之间的数字,并且长度是11位
Vue.validator('tel', function (val) {
  return /^[0-9]{11}$/.test(val)
});
//添加一个密码验证
//匹配6-20位的任何字类字符，包括下划线。与“[A-Za-z0-9_]”等效。
Vue.validator('passw', function (val) {
  return /^(\w){6,20}$/.test(val)
});