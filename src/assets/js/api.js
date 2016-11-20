import Vue from 'vue'
//接口
Vue.prototype.Api = function(){
  return {
    //默认发货信息
    getCargoDefault:"/CargoApi/Cargo/getCargoDefault",
    //确认发货
    getCargoDefault:"/CargoApi/Cargo/getCargoDefault",
    //全部货单
    getCargoList:"/CargoApi/Cargo/getCargoList",
    //货单详情
    getCargoDetail:"/CargoApi/Cargo/getCargoDetail",
    //报价信息
    getCargoPriceList:"/CargoApi/Cargo/getCargoPriceList"
  }
};

export function POST(params){
    Vue.http.post(params.url,params.data)
    .then((response) => {
      let data = typeof response.data ==="string"?JSON.parse(response.data):response.data;
      params.callback(data)
      // if (data.error=="144") {
      //   alert("登陆已过期");
      //   this.$router.push({ path: '/Login'})
      // }
    }, (response) => {
      // error callback
        alert(response.errorMsg)
    })
}    
export function GET(params){
    Vue.http.get(params.url,params.data)
    .then((response) => {
      let data = typeof response.data ==="string"?JSON.parse(response.data):response.data;
      params.callback(data)
    }, (response) => {
      // error callback
    })
}    