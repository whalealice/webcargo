<template>
	<div class="infomation">
		<Fold :title="title"></Fold>
		<div class="info_wrap">
            <ul class="order_title">
                <li>账户信息</li>
                <li>报价时间</li>
                <li>报价金额</li>
                <li>合作次数</li>
                <li>操作</li>  
            </ul>
            <ul class="info_list">
                <li class="info_item">
                    <p>
                        <span>231231231231</span>
                    </p>
                    <p>
                        <span>231231231231</span>
                    </p>
                   <p>
                        <span>231231231231</span>
                    </p>
                    <p>
                        <span>231231231231</span>
                    </p>
                    <p class="info_btn">
                        <router-link to="/Registered">关注</router-link>
                        <router-link to="/Registered" class="submit">下单</router-link>
                    </p>
                </li>
            </ul>
           <Page></Page>
		</div>
		
	</div>
</template>
<script>

import Fold from '../components/_fold.vue';
import Page from '../components/_page.vue';
export default {
	name:"infomation",
	data() {
		return {
			title:"报价信息",
		}
    },
	components:{Fold,Page},
	methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
	padding: 0 20px 0 30px;
	box-sizing: border-box;
    padding-top: 30px;
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