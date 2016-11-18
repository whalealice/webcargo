<template>
	<div class="goon">
		<Fold :title="title"></Fold>
		<div class="goon_wrap">
			<Search></Search>
            <ul class="order_title">
                <li class="ordernum">货单号</li>
                <li class="address">收发地</li>
                <li>发货日期</li>
                <li>发货信息</li>
                <li>承运公司</li>
                <li>运费</li>
                <li>操作</li>
            </ul>
            <ul class="order_list">
                <li class="item_list">
                    <div class="warn"></div>
                    <p class="ordernum">
                        <span class="two_line">231231231231</span>
                        <span class="progess two_line">
                            <span class="pro_title">货运进度<em class="pro_num">(11%)</em></span>
                            <span class="pro_gray" style=" background: red;"><i class="pro_bl" style="background: gray;"></i></span>
                        </span>
                    </p>
                    <p class="address">
                        <span class="end_address two_line">收货地：</span>
                        <span class="two_line">发货地：</span>
                    </p>
                    <p>
                    	<span class="three_line">11</span>
                    	<span class="three_line">至</span>
                    	<span class="three_line">实打实大</span>
                    </p>
                    <p class="good_state">
                        <span class="two_line">精煤</span>
                        <span class="two_line">1000/吨</span>
                    </p>
                    <p><span>23231</span></p>
                    <p class="price">
                        <span class="two_line rows">单价:<br/>122元</span>
                        <span class="two_line">单价:<br/>122元</span>
                    </p>
                    <p>
                    	<el-dropdown>
						  	<span class="el-dropdown-link">
						    	操作<i class="icon_arrow"></i>
						  	</span>
						  	<el-dropdown-menu slot="dropdown">
						    	<el-dropdown-item>黄金糕</el-dropdown-item>
						    	<el-dropdown-item>狮子头</el-dropdown-item>
						    	<el-dropdown-item>螺蛳粉</el-dropdown-item>
						  	</el-dropdown-menu>
						</el-dropdown>
                    </p>
                </li>
            </ul>
           <Page></Page>
		</div>
		
	</div>
</template>
<script>

import Fold from '../components/_fold.vue';
import Search from '../components/_search.vue';
import Page from '../components/_page.vue';
export default {
	name:"goon",
	data() {
		return {
			title:"进行中",
		}
    },
	components:{Fold,Search,Page},
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
.goon_wrap{
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
            .ordernum{.width(18%);border-left: 1px solid @border_color;}
            .address{.width(27%);}
            .warn{
                width: 20px;
                height: 20px;
                position: absolute;
                top: -10px;
                left: -10px;
                background: url(/static/images/warn.png) no-repeat;
                z-index: 10;
                border:none;
            }
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