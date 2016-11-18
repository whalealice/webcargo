<template>
	<div class="infodetail">
		<Fold :title="title"></Fold>
		<div class="info_wrap">
            <div class="message">
                <p class="el-icon-close"></p>
                <p class="info_nav">货单信息</p>
                <ul class="info_con">
                    <li>
                        <p class="info_left">发货地址</p>
                        <p class="info_right">23232323</p>
                    </li>
                    <li>
                        <p class="info_left">发货人</p>
                        <p class="info_right">的防晒霜的范德萨</p>
                    </li>
                    <li>
                        <p class="info_left">电话</p>
                        <p class="info_right">12323232312321</p>
                    </li>
                    <li>
                        <p class="info_left">发货日期</p>
                        <p class="info_right">12312312321213233</p>
                    </li>
                    <li>
                        <p class="info_left">收获地址</p>
                        <p class="info_right">水电费水电费水电费是</p>
                    </li>
                    <li>
                        <p class="info_left">收货人</p>
                        <p class="info_right">对方水电费水电费方式</p>
                    </li>
                    <li>
                        <p class="info_left">电话</p>
                        <p class="info_right">12323233423</p>
                    </li>
                    <li>
                        <p class="info_left">货物类型</p>
                        <p class="info_right">分地方发生的</p>
                    </li>
                    <li>
                        <p class="info_left">货物重量</p>
                        <p class="info_right">的方法第三方</p>
                    </li>
                    <li>
                        <p class="info_left">期望运费</p>
                        <p class="info_right">11223</p>
                    </li>
                </ul>
            
                <p class="info_nav">承运信息</p>
                <ul class="info_con">
                    <li>
                        <p class="info_left">承运公司</p>
                        <p class="info_right">地方的发生</p>
                    </li>
                    <li>
                        <p class="info_left">承运人</p>
                        <p class="info_right">地方撒旦法</p>
                    </li>
                    <li style="border-bottom:1px solid #f5f5f5;">
                        <p class="info_left">运费单价</p>
                        <p class="info_right">1232</p>
                    </li>
                    <li>
                        <p class="info_left">承运重量</p>
                        <p class="info_right">2323</p>
                    </li>
                    <li>
                        <p class="info_left">已发重量</p>
                        <p class="info_right">232</p>
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
                        <tr>
                            <td>23312312</td>
                            <td>23312312</td>
                            <td>23312312</td>
                            <td>23312312</td>
                            <td><a target="_blabk">查看</a></td>
                        </tr>
                    </table>
                </ul>
            
                <p class="info_nav">支付信息</p>
                <ul class="info_con">
                    <li>
                        <p class="info_left">付款方式</p>
                        <p class="info_right">23232323</p>
                    </li>
                    <li>
                        <p class="info_left">预计总运费</p>
                        <p class="info_right">1111</p>
                    </li>
                </ul>

                <p class="info_nav">系统信息</p>
                <ul class="info_con">
                    <li>
                        <p class="info_left">货单号</p>
                        <p class="info_right">23312312</p>
                    </li>
                    <li>
                        <p class="info_left">状态</p>
                        <p class="info_right">23312312</p>
                    </li>
                    <li>
                        <p class="info_left">操作记录</p>
                        <p class="info_right">dfsfdf地方的第三代 </p>
                    </li>
                </ul>
                <div style="text-align:center;">
                    <button class="info_btn">确认下单</button>  
                </div>
                
            </div>
		</div>
		
	</div>
</template>
<script>

import Fold from '../components/_fold.vue';
import Page from '../components/_page.vue';
export default {
	name:"infodetail",
	data() {
		return {
			title:"货单详情",
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
            .height(40px);
            p{display: inline-block;}
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