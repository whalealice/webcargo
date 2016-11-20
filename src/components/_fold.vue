<template>
	<div class="title">
        <p class="fold"></p>  
        <div class="tit_wrap">
        	
            <span class="icon_main"></span>
            <!-- <div> -->
	            <span class="el-icon-arrow-right"></span>
	            <span>{{title}}</span>
            <!-- </div> -->
            <p style="display:inline-block;" v-if="message">
	            <span class="el-icon-arrow-right"></span>
	            <span>{{message}}</span>
            </p>
        </div> 
    </div>
</template>
<script>
export default {
	props:['title','message']
};
</script>

<style lang="less" scoped>
@import '../assets/css/variable.less';
.title{
	height:60px; 
	font-size: 14px;
	position: relative;
	border-bottom:1px solid #ddd;
	.fold{
		position: absolute;
		top:0;
		left: 0;
		width:50px;
		height:60px;
		background: url(/static/images/fold.png) no-repeat;
		background-size: contain;
	}
	.tit_wrap{
		margin-left: 50px;
		.height(60px);
		background:#F5F5F5;
		.icon_main{
			width:17px;
			height:17px;
			display: inline-block;
			background: url(/static/images/main.png);
			position: relative;
			top: 2px;
		}
		.icon_arrow{
			width:9px;
			height:12px;
		}
	}
}
</style>