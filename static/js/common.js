import Vue from 'vue';
//获取cookie
Vue.prototype.getCookie = function(name){
  let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
   return unescape(arr[2]);
   else
   return null;
}