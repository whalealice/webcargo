<template>
	<div class="account">
		<Fold :title="title"></Fold>
		<div class="account_wrap">
            <ul>
                <li class="det_list">
                    <span >账户信息</span>
                    <p class="det_text"><i class="det_num">0</i>元</p>
                </li>
                <li class="det_list">
                    <span style="background:#FFA300;">代付款总计</span>
                    <p class="det_text" style="color:#FFA300;"><i class="det_num">0</i>元</p>
                </li>
                <li class="det_list">
                    <span style="background:#3EB6B1;">今日总充值</span>
                    <p class="det_text" style="color:#3EB6B1;"><i class="det_num">0</i>元</p>
                </li>
                <li class="det_list">
                    <span style="background:#3EB6B1;">今日总支出</span>
                    <p class="det_text" style="color:#3EB6B1;"><i class="det_num">0</i>元</p>
                </li>
                <li class="det_list">
                    <span style="background:#61C3E1;">累计总充值</span>
                    <p class="det_text" style="color:#61C3E1;"><i class="det_num">0</i>元</p>
                </li>
                <li class="det_list">
                    <span >累计总支出</span>
                    <p class="det_text"><i class="det_num">0</i>元</p>
                </li>
            </ul>
		</div>
		
	</div>
</template>
<script>

import Fold from '../components/_fold.vue';
import Page from '../components/_page.vue';
export default {
	name:"account",
	data() {
		return {
			title:"账户信息",
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

.account_wrap{
    background: #f5f5f5;
	width: 100%;
	height: 100%;
	overflow: hidden;
	padding: 30px 20px 0 5%;
	box-sizing: border-box;
    .det_list{
        height: 200px;
        width: 28%;
        background: #fff;
        text-align: center;
        display: inline-block;
        margin: 0 30px 50px 0;
        span{
            width: 170px;
            .height(30px);
            color:@white;
            font-size: 20px;
            font-weight: bold;
            border-radius: 30px;
            display: inline-block;
            margin:26px 0 64px;
            background: #FF6A67;
        }
        .det_text{
            font-size:20px;
            color: #FF6A67;
        }
        .det_num{
            font-size: 40px;
            margin-right: 5px;
        }
    }
}
</style>