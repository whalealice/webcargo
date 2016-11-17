<template>
	<div class="nav">
        <div class="logo">驼队重卡货主端</div>

        <el-row class="nav_bar">
			<el-col>
			    <el-menu default-active="2" class="el-menu-vertical-demo"  theme="dark">
			      	<el-submenu index="1">
				        <template slot="title">货单管理</template>
				        <router-link to="/Home/publish">
				        	<el-menu-item index="1-1">发货</el-menu-item>
				        </router-link>
				         <router-link to="/Home/quiry">
				        	<el-menu-item index="1-2">询价中</el-menu-item>
				        </router-link>
				        <router-link to="/Home/goon">
				        	<el-menu-item index="1-3">进行中</el-menu-item>
				        </router-link>
				         <router-link to="/Home/payment">
				        	<el-menu-item index="1-3">代付款</el-menu-item>
				        </router-link>
				         <router-link to="/Home/complete">
				        	<el-menu-item index="1-3">已完成</el-menu-item>
				        </router-link>
				         <router-link to="/Home/cancelle">
				        	<el-menu-item index="1-3">已取消</el-menu-item>
				        </router-link>
				         <router-link to="/Home/expire">
				        	<el-menu-item index="1-3">已过期</el-menu-item>
				        </router-link>
			      	</el-submenu>
			      	<el-submenu index="2">
			      		<template slot="title">资金账户</template>
				        <router-link to="/Home/accountinfo">
				        	<el-menu-item index="2-1">账户信息</el-menu-item>
				        </router-link>
				        <router-link to="/Home/record">
				        	<el-menu-item index="2-2">交易记录</el-menu-item>
				        </router-link>
				        <router-link to="/Home/rechange">
				        	<el-menu-item index="2-3">充值</el-menu-item>
				        </router-link>
			      	</el-submenu>
			      	<el-submenu index="3">
			      		<template slot="title">报表管理</template>
				        <router-link to="/Home/todaypublish">
				        	<el-menu-item index="3-1">今日发货</el-menu-item>
				        </router-link>
			      	</el-submenu>
			      	<!-- <el-submenu index="4">
			      		<template slot="title">用户管理</template>
				        <router-link to="/Home/publish">
				        	<el-menu-item index="1-1">用户列表</el-menu-item>
				        </router-link>
			      	</el-submenu>
			      	<el-submenu index="5">
			      		<template slot="title">系统管理</template>
				        <router-link to="/Home/publish">
				        	<el-menu-item index="1-1">我的关注</el-menu-item>
				        </router-link>
				        <router-link to="/Home/publish">
				        	<el-menu-item index="1-1">修改密码</el-menu-item>
				        </router-link>
			      	</el-submenu> -->
			    </el-menu>
			</el-col>
		</el-row>
	</div>
</template>
<style lang="less" scoped>

@import './../assets/css/variable.less';
.nav{
	position:fixed;
	z-index:100;
	left:0;
	top:0;
	min-height:100%;
	width:230px;
	margin-left:12px;
	.logo{
		height: 70px;
		line-height: 70px;
		text-align: center;
		font-size: 28px;
		color:@white;
	}
	.nav_bar{
		.roundedCorners();
	}
	.el-menu{
		background: rgba(0,0,0,.4);
	}
	.is-active{
		background:url(/static/images/nav_bg.png) no-repeat;
		background-size: cover;
		color:@white;
	}
}

</style>