<template>
	<div class="orders">
		<Fold :title="title"></Fold>
		<div class="order_wrap">
			<Search @searchOrder='searchOrder' @getFilter='getFilter' :xls="xls"></Search>
            <ul class="order_title">
                <li class="ordernum">货单号</li>
                <li class="address">收发地</li>
                <li>发货日期</li>
                <li>发货信息</li>
                <li>状态</li>
                <li>操作</li>
            </ul>
            <ul class="order_list"  v-loading.body="loading" :data="data" element-loading-text="拼命加载中" style="width: 100%">
            	
                <li class="item_list" v-for="(item,index) in data" :class="{gray:(index%2!=0)}">
                    <p class="order ordernum"><span>{{item.cargo_sn}}</span></p>
                    <p class="address">
                        <span class="end_address two_line">收货地：{{item.receive_address}}</span>
                        <span class="two_line">发货地：{{item.send_address}}</span>
                    </p>
                    <p>
                    	<span class="three_line">{{item.start_time}}</span>
                    	<span class="three_line">至</span>
                    	<span class="three_line">{{item.end_time}}</span>
                    </p>
                    <p class="good_state">
                        <span class="two_line ">{{item.cargo_detail_name}}</span>
                        <span class="two_line">{{item.cargo_detail_weight}}</span>
                    </p>
                    <p><span>{{item.status_name}}</span></p>
                    <p>
                    	<el-dropdown trigger="click">
						  	<span class="el-dropdown-link">
						    	操作<i class="icon_arrow"></i>
						  	</span>
						  	<el-dropdown-menu slot="dropdown">
						    	<el-dropdown-item 
                                    v-for="items in item.operate"
                                    @click.native="routerGo(items.url,item.cargo_sn)"
                                >{{items.name}}</el-dropdown-item>
						  	</el-dropdown-menu>
						</el-dropdown>
                    </p>
                </li>
            </ul>
            <Page :intoPage="intoPage" @currentPage="currentPage"></Page>
		</div>
        <Dialogs :dialogMessage="dialogMessage" :dialogVisible="dialogVisible" @submitOK="submitOK" @submitCancle="submitCancle"></Dialogs>
	</div>
    
</template>
<script>

import Fold from '../components/_fold.vue';
import Search from '../components/_search.vue';
import Page from '../components/_page.vue';
import Dialogs from '../components/_dialog.vue';
import {POST,GET} from '../assets/js/api.js';
export default {
	name:"orders",
	data() {
		return {
            loading: true,
            dialogVisible: false, //弹出提示内容的显示
            dialogMessage:"", //取消发货弹出提示内容
			title:"全部货单",
            xls:"",
            outPage:{//出参的页码
                "token":this.getCookie("token"),
                "page":1,
                "limit": 10,
                "pageCount": "",
                "totalCount": ""
            },
            intoPage:{//入参的页码
                "token":this.getCookie("token"),
                "curpage":1,
                "limit": 10,
                "pageCount": "",
                "totalCount": ""
            },
            data:{//改变的页面参数
            },
            orderId:'',//订单号筛选
            id:'',//订单号
            search:{ //高级搜索的参数
                xls:"Y",
                status:'',
                send_address:"",
                receive_address:"",
                start_time:"",
                end_time:""
            }
		} 
    },
	components:{Fold,Search,Page,Dialogs},
	methods: {
        message() {
            this.$message('暂无数据');
        },
        submitCancle(){ //提示框点击取消
            this.dialogVisible = false;
        },
        submitOK(val){ //提示框点击确定
            this.cancelOrder();
        },
        //默认货单列表
        cargoDefault(_data){
            POST({
                url:this.Api().getCargoList,
                data:(_data),
                callback:data=>{
                    if (data.results.result) {
                        this.loading = false;
                        this.data = data.results.result;
                        this.intoPage = data.results.page;
                        this.xls = data.results.page.xls;
                    }else{
                        this.message();
                        this.loading = false;
                    }
                }
            })
        },
        //操作的跳转
        routerGo(url,id){
            this.id = id;
            //取消发货
            if (url == "CargoRemove") {
                this.dialogVisible = true;
                this.dialogMessage = "您确定要取消发货吗？"
                return
            }
            //再来一单
            if (url == "CargoAgain") {
                this.$router.push({path:'/Home/SetCargo',query:{id:id}});
                return
            }
            this.$router.push('/Home/'+url+'/'+id);
        },
        //点击页数
        currentPage(val){
            this.outPage.page = val;
            this.outPage.cargo_sn = this.orderId;
            
            this.cargoDefault(this.evel(this.outPage,this.search));
        },
        //搜索订单 -- 搜索组件传回来的参数
        searchOrder(val){
            this.orderId = val;
            let _data = {
                "xls":"Y",
                "status":"",
                "cargo_sn":val,
                "token":this.getCookie("token")
            }
           this.cargoDefault(_data);
        },
        //高级筛选  -- 搜索组件传回来的参数
        getFilter(val){
            this.search = val;
            this.search.xls = "Y";
            this.search.status = "";
            this.search.token = this.getCookie("token");
            delete this.search.cargo_sn;

            this.cargoDefault(this.search);
        },
        //取消发货
        cancelOrder(){
            this.dialogVisible = false;
            POST({
                url:this.Api().cancelCargoOrder,
                data:{
                    "cargo_sn":this.id,
                    "token":this.getCookie("token")
                },
                callback:data=>{
                    if (data.error == 0) {
                        alert(data.results.msg);
                        this.cargoDefault(this.evel(this.outPage,this.search));
                    }
                }
            })
        }
    },
    created(){
    }
}
</script>
<style lang="less">
@import './../assets/css/variable.less';
.order_wrap{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: @white;
	padding: 0 20px 0 30px;
	box-sizing: border-box;
    .order_list{
        position: relative;
        .noDate{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 300px;
        }
    }
    
}
</style>