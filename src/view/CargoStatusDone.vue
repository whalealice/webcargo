<template>
	<div class="complete">
		<Fold :title="title"></Fold>
		<div class="complete_wrap">
			<Search @searchOrder='searchOrder' @getFilter='getFilter'  :xls="xls"></Search>
            <ul class="order_title">
                <li class="ordernum">货单号</li>
                <li class="address">收发地</li>
                <li>发货日期</li>
                <li>货物信息</li>
                <li>承运公司</li>
                <li>运费</li>
                <li>操作</li>
            </ul>
            <ul class="order_list" v-loading.body="loading" :data="data" style="width: 100%" element-loading-text="拼命加载中" >
                <li class="item_list" v-for="(item,index) in data" :class="{gray:(index%2!=0)}">
                    <p class="ordernum">
                        <span>{{item.cargo_sn}}</span>
                    </p>
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
                    <p class="price">
                        <span class="two_line rows">单价:<br/>{{item.freight_price}}</span>
                        <span class="two_line">单价:<br/>{{item.freight_total_price}}</span>
                    </p>
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
		
	</div>
</template>
<script>

import Fold from '../components/_fold.vue';
import Search from '../components/_search.vue';
import Page from '../components/_page.vue';
import {POST,GET} from '../assets/js/api.js';
export default {
	name:"complete",
	data() {
		return {
			title:"已完成",
			xls:"",
            loading:true,
            outPage:{
                "token":this.getCookie("token"),
                "page":1,
                "limit": 10,
                "pageCount": "",
                "totalCount": "",
                "xls": ""
            },
            intoPage:{
                "token":this.getCookie("token"),
                "curpage":1,
                "limit": 10,
                "pageCount": "",
                "totalCount": "",
                "xls": ""
            },
            data:{},
            orderId:'',
            search:{
                xls:"Y",
                status:'4',
                send_address:"",
                receive_address:"",
                start_time:""
            }
		}
    },
	components:{Fold,Search,Page},
	methods: {
        message() {
            this.$message('暂无数据');
        },
        //默认货单列表
        cargoDefault(_data){
            POST({
                url:this.Api().getCargoList,
                data:(_data),
                callback:data=>{
                    if (data.results.result) {
                        this.data = data.results.result;
                        this.intoPage = data.results.page;
                        this.xls = data.results.page.xls;
                        this.loading = false;
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
        //搜索订单
        searchOrder(val){
            this.orderId = val;
            let _data = {
                "xls":"Y",
                "status":"4",
                "cargo_sn":val,
                "token":this.getCookie("token")
            }
           this.cargoDefault(_data);
        },
        //高级筛选
        getFilter(val){
            this.search = val;
            this.search.xls = "Y";
            this.search.status = "4";
            this.search.token = this.getCookie("token");
            delete this.search.cargo_sn;

            this.cargoDefault(this.search);
        }
    },
    created(){
    }
}
</script>
<style lang="less">
@import './../assets/css/variable.less';
.complete_wrap{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: @white;
	padding: 0 20px 0 30px;
	box-sizing: border-box;
	.order_title{
        li{.width(11%)}
        .ordernum{.width(18%);}
        .address{.width(27%);}
    }
    .order_list{
        .price{
            span{line-height: 22px;}
            .rows{border-bottom: 1px solid @border_color;}
        }
        .item_list{
            p{.width(11%)}
            .ordernum{.width(18%);}
            .address{.width(27%);}
        }
        .progess{
            border-top: 1px solid @border_color;
            line-height: normal;
            .pro_title{
                display: inline-block;
                margin-top: 8px;
                font-size: 12px;
                .pro_num{color:@red;}
            }
            .pro_gray{
                width: 130px;
                height:8px;
                margin-top: 5px;
                margin-left: 5px;
                background: red;
                display: inline-block;
                position: relative;
                .pro_bl{
                    width: 40px;
                    height: 8px;
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
        }
    }
}
</style>