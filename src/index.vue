<template>
  <div id="app" >
    <router-view></router-view>
  </div>
</template>
<script>
import Vue from 'vue'
import md5 from 'md5'
//md5加密
Vue.prototype.Md5 = function(name,day){
  let str = md5(this.Random()).substr(0,10)+md5(md5(md5(name+'tuodui2016')+day))+md5(this.Random())
  return str;
}
//获取cookie
Vue.prototype.getCookie = function(name){
  let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
   return unescape(arr[2]);
   else
   return null;
}
//设置cookie
Vue.prototype.setCookie = function(name,value){
    var expdate = new Date();   //初始化时间
    expdate.setHours(expdate.getHours() + (24 * 1)); //保存1天
    document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";
}
//随机数
Vue.prototype.Random = function(){ //1000-9999的随机数
    do
    var out = Math.floor(Math.random()*10000);
    while( out < 1000 );
    return out;
}
//装换时间格式
Vue.prototype.toTimeFormat = function(time){
  let oDate = new Date(time);
  let Month = toDouble(oDate.getMonth()+1);
  let Year = toDouble(oDate.getFullYear());
  let Day = toDouble(oDate.getDate());
  let Hour = toDouble(oDate.getHours());
  let Min = toDouble(oDate.getMinutes());
  let t = Year+'/'+Month+'/'+Day;
  let format = time?t:'';
  function toDouble(n){//个位数加零
      var two = n>9?n:'0'+n;
      return two;
  }
  return {
    Month:Month,
    Year:Year,
    Day:Day,
    Min:Min,
    Hour:Hour,
    Format:format
  }
}
Vue.prototype.toTwo = function(val){
  let oV;
  if (typeof val =='string')oV=val;
  if (!val)oV = '';
  if (typeof val =='number')oV = val.toFixed(2);
  return oV;
}
Vue.prototype.urlParam =  function (hash) {
    if (hash) {
        url = hash;
    } else {
        url = location.search || location.hash;
    }
    var param = {};

    if (url.indexOf("?") != -1) {

        str = url.substr(1);

        strs = str.split("&");

        key = new Array(strs.length);

        value = new Array(strs.length);

        for (i = 0; i < strs.length; i++) {

            key[i] = strs[i].split("=")[0]

            value[i] = strs[i].split("=")[1];

            if (!key[i]) continue;

            param[key[i]] = decodeURI(value[i]);
        }
    }
    return param;
}
Vue.prototype.evel = function(json1,json2){
  return eval('('+(JSON.stringify(json1)+JSON.stringify(json2)).replace(/}{/,',')+')');
}
</script>

<style lang="less">
@import './assets/css/common.less';
@import './assets/css/variable.less';

</style>

