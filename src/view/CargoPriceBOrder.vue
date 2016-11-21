<template>
    <div class="pricesInfo">
        <Fold :title="title" :message="message"></Fold>
        <div class="price_wrap">
            <div class="message">
                <p class="el-icon-close" @click="routeBack"></p>
                <div>
                    <p class="info_nav">货单信息</p>
                    <ul class="info_con">
                        <li>
                            <p class="info_left">发货地址</p>
                            <p class="info_right">{{item.cargo_info.send_address}}</p>
                        </li>
                        <li>
                            <p class="info_left">发货人</p>
                            <p class="info_right">{{item.cargo_info.send_user_name}}</p>
                        </li>
                        <li>
                            <p class="info_left">电话</p>
                            <p class="info_right">{{item.cargo_info.send_user_mobile}}</p>
                        </li>
                        <li>
                            <p class="info_left">发货日期</p>
                            <p class="info_right">{{item.cargo_info.send_time}}</p>
                        </li>
                        <li>
                            <p class="info_left">收货地址</p>
                            <p class="info_right">{{item.cargo_info.receive_address}}</p>
                        </li>
                        <li>
                            <p class="info_left">收货人</p>
                            <p class="info_right">{{item.cargo_info.receive_user_name}}</p>
                        </li>
                        <li>
                            <p class="info_left">电话</p>
                            <p class="info_right">{{item.cargo_info.receive_user_mobile}}</p>
                        </li>
                        <li>
                            <p class="info_left">货物类型</p>
                            <p class="info_right">{{item.cargo_info.cargo_name}}</p>
                        </li>
                        <li>
                            <p class="info_left">货物重量</p>
                            <p class="info_right">{{item.cargo_info.cargo_weight}}</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <p class="info_nav">承运信息</p>
                    <ul class="info_con">
                        <li>
                            <p class="info_left">承运公司</p>
                            <p class="info_right">{{item.transport_info.company_name}}</p>
                        </li>
                        <li>
                            <p class="info_left">运费单价</p>
                            <input type="text" name="" v-model="item.transport_info.expect_price"> 元/吨
                        </li>
                        <li>
                            <p class="info_left">运费重量</p>
                            <input type="text" name="" v-model="item.transport_info.ton_count"> 吨
                        </li>
                    </ul>
                </div>
                <div>
                    <p class="info_nav">支付信息</p>
                    <ul class="info_con">
                        <li>
                            <p class="info_left">支付方式</p>
                            <p class="info_right">{{item.pay_info.pay_status_name}}</p>
                        </li>
                        <li>
                            <p class="info_left">预计总运费</p>
                            <p class="info_right">{{item.pay_info.total_expect_price}}</p>
                        </li>
                    </ul>
                </div>
                <div style="text-align:center;" >
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
    name:"pricesInfo",
    data() {
        return {
            title:"询价中",
            message:"下单",
            orderId:'',
            companyId:'',
            token:this.getCookie("token"),
            item:{}
        }
    },
    components:{Fold,Page},
    methods: {
        detailDefault(){
            POST({
                url:this.Api().getCargoOrder,
                data:{
                    "cargo_price_id":this.companyId,
                    "token":this.getCookie("token"),
                    "cargo_sn":this.orderId
                },
                callback:data=>{
                    if (data.error=="0") {
                        this.item = data.results;
                        this.item.transport_info.expect_price = parseFloat(data.results.transport_info.expect_price);
                        this.item.transport_info.ton_count = parseFloat(data.results.transport_info.ton_count);
                    }else{
                        // this.message();  
                    }
                }
            })
        },
        sumbitOrder(){
            // console.log(this.item.transport_info.expect_price,this.item.transport_info.ton_count);
            POST({
                url:this.Api().agreeCargoOrder,
                data:{
                    "token":this.getCookie("token"),
                    "cargo_price_id":this.companyId,
                    "cargo_sn":this.orderId,
                    "cargo_expect_price":this.item.transport_info.expect_price,
                    "cargo_ton_count":this.item.transport_info.ton_count
                },
                callback:data=>{
                    // console.log(data)
                    if (data.error == 0) {
                        alert(data.results.msg);
                        this.routeBack();
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
        if (this.$route.params.orderId) {
            this.orderId = this.$route.params.orderId;
            this.companyId = this.$route.params.companyId;
            this.detailDefault();
        }
    }
}
</script>
<style lang="less">
@import './../assets/css/variable.less';

.price_wrap{
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