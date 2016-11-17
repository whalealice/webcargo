<template>
	<div class="nav">
        <div class="logo">驼队重卡货主端</div>

        <el-row class="nav_bar">
			<el-col>
			    <el-menu default-active="2" class="el-menu-vertical-demo"  theme="dark">
			      	<el-submenu index="1">
				        <template slot="title">导航一</template>
				        <router-link to="/Publish/one">
				        	<el-menu-item index="1-1">选项1</el-menu-item>
				        </router-link>
				         <router-link to="/Publish/two">
				        	<el-menu-item index="1-2">选项2</el-menu-item>
				        </router-link>
				        </el-menu-item-group>
				        	<el-menu-item index="1-3">选项3</el-menu-item>
				        </el-menu-item-group>
			      	</el-submenu>
			      	<el-menu-item index="2">导航二</el-menu-item>
			      	<el-menu-item index="3">导航三</el-menu-item>
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
}

</style>