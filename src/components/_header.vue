<template>
	<div class="nav">
    	<p class="sidebar_toggle" ></p>
    	<router-link to="/Publish" class="home">首页</router-link>
        <div class="time">
        	<img src="/static/images/time_one.png" > 
            <span id="date">2016/9月16日星期五</span> &nbsp;
            <img src="/static/images/time_two.png"> 
            <span id="time">5 ：28 ：55  AM</span>
        </div>
        <div class="right nav_about">
           <router-link to="/Publish"><img src="/static/images/about.png">关于我们</router-link>
           <router-link to="/Login"><img src="/static/images/return.png">退出登录</router-link>
        </div>
	</div>
</template>
<style lang="less" scoped>

@import './../assets/css/variable.less';

.nav{
	width: 100%;
	padding-left: 254px;
	box-sizing: border-box;
	position: relative;
	.height(70px);
	.sidebar_toggle {
		width: 30px;
		height: 30px;
		.roundedCorners(4px);
		display:inline-block;
		margin-right:20px;
		vertical-align: middle;
		background: url(/static/images/nav.png) no-repeat;
		background-size: cover;
	}
	.home {
		.height(70px);
		color:@white;
	}
	.time{
		width: 380px;
		.height(40px);
		position: absolute;
		left: 55%;
		top: 15px;
		margin-left: -190px;
		background:rgba(0,0,0,.3);
		.pre(border-radius,100px);
		text-align:center;
		img{
			width: 18px;
			height: 18px;
			vertical-align: middle;
		}
		span{
		    padding: 0 10px;
		    color:@white;
		}
		#date{
			border-right: 1px solid #000;
		}
	}
	.nav_about{
		a{
			color:@white;
			margin-right: 30px;
		}
		img{
			width: 14px;
			height: 14px;
			position: relative;
			top: 2px;
			margin-right: 4px;
		}
	}
}
</style>