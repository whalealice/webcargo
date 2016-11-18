<template>
	<div class="orders">
		<Fold :title="title"></Fold>
		<div class="order_wrap">
			<Search></Search>
            <ul class="order_title">
                <li class="ordernum">货单号</li>
                <li class="address">收发地</li>
                <li>发货日期</li>
                <li>发货信息</li>
                <li>状态</li>
                <li>操作</li>
            </ul>
            <ul class="order_list">
                <li class="item_list">
                    <p class="order ordernum"><span>231231231231</span></p>
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
                        <span class="two_line ">23231</span>
                        <span class="two_line">大法师打发第三方</span>
                    </p>
                    <p><span>23231</span></p>
                    <!-- <div class="car_operate">操作<span class="state_icon"></span>
                        <ul class="state_list">
                            <li ><a href="javascript:;" >1111</a></li>
                        </ul>
                    </div> -->
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
	name:"orders",
	data() {
		return {
			title:"全部货单"
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
.order_wrap{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: @white;
	padding: 0 20px 0 30px;
	box-sizing: border-box;
}
</style>