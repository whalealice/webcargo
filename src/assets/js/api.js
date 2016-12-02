import Vue from 'vue'
//接口
Vue.prototype.Api = function(){
  return {
    //获取后台时间
    sync:"/CargoApi/login/sync",
    //登陆
    getAdminUser:"/CargoApi/login/getAdminUser",
    //忘记密码
    setUserPassword:"/CargoApi/login/setUserPassword",
    //获取验证码
    getSmsCode:"/CargoApi/login/getSmsCode",
    //退出登录
    quitAdminUser:"/CargoApi/login/quitAdminUser",
    //默认发货信息
    getCargoDefault:"/CargoApi/Cargo/getCargoDefault",
    //确认发货
    setCargo:"/CargoApi/Cargo/setCargo",
    //全部货单
    getCargoList:"/CargoApi/Cargo/getCargoList",
    //货单详情
    getCargoDetail:"/CargoApi/Cargo/getCargoDetail",
    //报价信息
    getCargoPriceList:"/CargoApi/Cargo/getCargoPriceList",
    //下单列表
    getCargoOrder:"/CargoApi/Cargo/getCargoOrder",
    //确认下单
    agreeCargoOrder:"/CargoApi/Cargo/agreeCargoOrder",
    //取消发货
    cancelCargoOrder:"/CargoApi/Cargo/cancelCargoOrder",
    //地区选择
    district:"/DistApi/basis/district",
    //获取用户列表
    getUser:"/CargoApi/User/getUser",
    //修改用户信息
    postUser:"/CargoApi/User/postUser",
    //获取模块管理 -- 获取左侧默认列表
    getAdminModule:"/CargoApi/AdminModule/getAdminModule",
    //修改模块管理
    postAdminModule:"/CargoApi/AdminModule/postAdminModule",
    //获取角色列表
    getAdminRole:"/CargoApi/AdminRole/getAdminRole",
    //修改角色
    postAdminRole:"/CargoApi/AdminRole/postAdminRole",
    //获取权限 -- 修改权限
    getAdminRoleModule:"/CargoApi/AdminRole/getAdminRoleModule",
    //权限修改的保存
    postAdminRoleModule:"/CargoApi/AdminRole/postAdminRoleModule"
  }
};

export function POST(params){
    Vue.http.post(params.url,params.data)
    .then((response) => {
      let data = typeof response.data ==="string"?JSON.parse(response.data):response.data;
      params.callback(data);
      if (data.error == 144) {
        alert("登陆已过期！");
        window.location.href = window.location.origin+'/Login';
        return 
      }else if(data.error== 102){
        alert(data.errorMsg)
      }
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