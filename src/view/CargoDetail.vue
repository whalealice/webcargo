<template>
	<div class="infodetail">
		<Fold :title="title" :message="message"></Fold>
		<div class="detail_wrap">
            <div class="message">
                <p class="el-icon-close" @click="routeBack"></p>
                <div v-if="data.cargo_info">
                    <p class="info_nav">货单信息</p>
                    <ul class="info_con" v-if="data.cargo_info">
                        <li>
                            <p class="info_left">发货地址</p>
                            <p class="info_right">{{data.cargo_info.send_address}}</p>
                        </li>
                        <li>
                            <p class="info_left">发货人</p>
                            <p class="info_right">{{data.cargo_info.send_user_name}}</p>
                        </li>
                        <li>
                            <p class="info_left">电话</p>
                            <p class="info_right">{{data.cargo_info.send_user_mobile}}</p>
                        </li>
                        <li>
                            <p class="info_left">发货日期</p>
                            <p class="info_right">{{data.cargo_info.send_time}}</p>
                        </li>
                        <li>
                            <p class="info_left">收货地址</p>
                            <p class="info_right">{{data.cargo_info.receive_address}}</p>
                        </li>
                        <li>
                            <p class="info_left">收货人</p>
                            <p class="info_right">{{data.cargo_info.receive_user_name}}</p>
                        </li>
                        <li>
                            <p class="info_left">电话</p>
                            <p class="info_right">{{data.cargo_info.receive_user_mobile}}</p>
                        </li>
                        <li>
                            <p class="info_left">货物类型</p>
                            <p class="info_right">{{data.cargo_info.cargo_name}}</p>
                        </li>
                        <li>
                            <p class="info_left">货物重量</p>
                            <p class="info_right">{{data.cargo_info.cargo_weight}}</p>
                        </li>
                        <li>
                            <p class="info_left">期望运费</p>
                            <p class="info_right">{{data.cargo_info.expect_price}}</p>
                        </li>
                    </ul>
                </div>
                <div v-if="data.carriage_info.length">
                    <p class="info_nav" >承运信息</p>
                    <ul class="info_con" v-for="item in data.carriage_info">
                        <li>
                            <p class="info_left">承运公司</p>
                            <p class="info_right">{{item.transport_info.company_name}}</p>
                        </li>
                        <li>
                            <p class="info_left">承运人</p>
                            <p class="info_right">{{item.transport_info.company_user}}</p>
                        </li>
                        <li style="border-bottom:1px solid #f5f5f5;">
                            <p class="info_left">运费单价</p>
                            <p class="info_right">{{item.transport_info.expect_price}}</p>
                        </li>
                        <li>
                            <p class="info_left">承运重量</p>
                            <p class="info_right">{{item.delivery_info.accept_total_weight}}</p>
                        </li>
                        <li>
                            <p class="info_left">已发重量</p>
                            <p class="info_right">{{item.delivery_info.initial_weight}}</p>
                        </li>
                        <li>
                            <p class="info_left">订单信息</p>
                        </li>
                        <table class="info_tab" bordercolor="#eee"  border="1" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>订单号</td>
                                <td>送达时间</td>
                                <td>原发重量</td>
                                <td>实收重量</td>
                                <td>卸货榜单</td>
                            </tr>
                            <tr v-for="items in item.delivery_info.order">
                                <td>{{items.order_sn}}</td>
                                <td>{{items.end_time}}</td>
                                <td>{{items.former_weight}}</td>
                                <td>{{items.accept_weight}}</td>
                                <td>
                                    <router-link :to="'items.platform_scale_url'">查看</router-link>
                                </td>
                            </tr>
                        </table>
                        <li>
                            <p class="info_left">付款方式</p>
                            <p class="info_right">{{item.pay_info.pay_status_name}}</p>
                        </li>
                    </ul>
                </div>
                <div v-if="data.system">
                    <p class="info_nav">系统信息</p>
                    <ul class="info_con">
                        <li>
                            <p class="info_left">货单号</p>
                            <p class="info_right">{{data.system.cargo_sn}}</p>
                        </li>
                        <li>
                            <p class="info_left">状态</p>
                            <p class="info_right">{{data.status_info.status_name}}</p>
                        </li>
                        <li v-if="data.system.log.length">
                            <p class="info_left logs">操作记录</p>
                            <p class="info_right" >
                                <span v-for="logs in data.system.log">{{logs.action}} {{logs.author}} {{logs.date}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <div style="text-align:center;" v-if="data.status_info.status == '10'">
                    <button class="info_btn" @click="sumbitOrder">确认下单</button>  
                </div>
                
            </div>
		</div>
		
	</div>
</template>
<script>

import Fold from '../components/_fold.vue';
import Page from '../components/_page.vue';
import {POST,GET} from '../assets/js/api.js';
export default {
	name:"infodetail",
	data() {
		return {
            title:"",
            message:"货单详情",
            orderId:'',
            token:this.getCookie("token"),
            data:{}
		}
    },
	components:{Fold,Page},
	methods: {
        detailDefault(){
            POST({
                url:this.Api().getCargoDetail,
                data:{
                    cargo_sn:this.orderId,
                    token:this.token
                },
                callback:data=>{
                    console.log(data)
                    if (data.error=="0") {
                        this.data = data.results;
                        this.title = data.results.status_info.status_name
                    }else{
                        // this.message();  
                    }
                }
            })
        },
        //返回
        routeBack(){
            this.$router.go(-1);
        }
    },
    created(){
        if (this.$route.params.id) {
            this.orderId = this.$route.params.id;
            this.detailDefault();
        }
    }
}
</script>
<style lang="less">
@import './../assets/css/variable.less';

.detail_wrap{
    background: #f5f5f5;
	width: 100%;
	height: 100%;
	overflow: hidden;
	padding: 0 20px 0 30px;
	box-sizing: border-box;
    .message{
        background: #fff;
        padding: 30px;
        position: relative;
        .el-icon-close{
            position: absolute;
            right: 20px;
            top:20px;
        }
    }
	.info_nav{
        .ct_btn(70px,30px,@rgba:@title);

    }
    .info_con{
        border:1px solid @border_color;
        padding: 0 10px 0;
        margin-bottom: 20px;
        li{
            line-height:40px;
            p{display: inline-block;}
            .logs{vertical-align: top;}
            span{display: block;}
            .info_left{width: 80px;text-align: right;margin-right: 20px;}
        }
        .info_tab{margin-bottom: 20px;}
         tr{    
            height: 30px;
            line-height: 30px;
            text-align: center;
            td{
                padding:0 40px;
            }
        }
    }
    .info_btn{
            .ct_btn(160px,30px,@rgba:@red);
        }
}
</style>