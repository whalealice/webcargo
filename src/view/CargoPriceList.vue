<template>
	<div class="infomation">
		<Fold :title="title" :message="message"></Fold>
		<div class="info_wrap">
            <ul class="order_title">
                <li>账户信息</li>
                <li>报价时间</li>
                <li>报价金额</li>
                <li>合作次数</li>
                <li>操作</li>  
            </ul>
            <ul class="info_list">
                <li class="info_item" v-for="item in data">
                    <!-- cargo_price_id订单号 -->
                    <p><span>{{item.company_name.company_name}}</span></p>
                    <p><span>{{item.create_time}}</span></p>
                    <p><span>{{item.expect_price}}</span></p>
                    <p><span>{{item.roommates}}</span></p>
                    <p class="info_btn">
                        <router-link to="/Registered">关注</router-link>
                        
                        <button class="submit"  @click="routerGo(item.operate[0].url,item.cargo_price_id)">{{item.operate[0].name}}</button>
                    </p>
                </li>
            </ul>
            <Page :intoPage="intoPage" @currentPage="currentPage"></Page>
		</div>
		
	</div>
</template>
<script>

import Fold from '../components/_fold.vue';
import Page from '../components/_page.vue';
import {POST,GET} from '../assets/js/api.js';
export default {
	name:"infomation",
	data() {
		return {
			title:"",
            message:"报价信息",
            outPage:{
                "token":this.getCookie("token"),
                "page":1,
                "limit":10,
                "cargo_sn":""
            },
            intoPage:{},
            data:{}
		}
    },
	components:{Fold,Page},
	methods: {
        //默认列表
        priceDefault(_data){
            POST({
                url:this.Api().getCargoPriceList,
                data:(_data),
                callback:data=>{
                    if (!data.error) {
                        this.data = data.results.result;
                        this.title = data.results.status_info.status_name;
                        this.intoPage = data.results.page;
                        console.log(this.data)
                    }else{
                    }
                }
            })
        },
        //操作的跳转
        routerGo(url,id){
            alert("111")
            if (url) {
                this.$router.push('/Home/'+url+'/'+id);
            }
            
        },
        //点击页数
        currentPage(val){
            this.outPage.page = val;
            this.cargoDefault(this.outPage);
        }
    },
    created(){
        if (this.$route.params.id) {
            this.outPage.cargo_sn = this.$route.params.id;
            this.priceDefault(this.outPage);
        }
    }
}
</script>
<style lang="less">
@import './../assets/css/variable.less';
.info_wrap{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: @white;
	padding: 30px 20px;
	box-sizing: border-box;
	.order_title{
        margin-bottom: 20px;
        li{.width(20%)}
    }
    .info_list{
        .info_item{
            height: 100%;
            overflow: hidden;
            p{
                .height(40px);
                float: left;
                .width(20%);
                text-align: center;
                border:1px solid @border_gray;
                box-sizing: border-box;
            }
            .info_btn {
                a{
                    display: inline-block;
                    margin-right: 10px;
                    .ct_btn(56px,20px,@rgba:#3E8ACC)
                }
                .submit{
                    .ct_btn(56px,20px,@rgba:@red)
                }
            }
            
        }
    }
}
</style>