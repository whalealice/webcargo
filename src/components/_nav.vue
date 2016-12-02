<template>
	<div class="nav">
        <div class="logo">驼队重卡货主端</div>
        <el-row class="nav_bar">
			<el-col :span="23.3">
			    <el-menu 
			    	:default-active="defaultAc" 
			    	:default-openeds='defaultOpen' 
			    	class="el-menu-vertical-demo"  
			    	theme="dark"
			    	:unique-opened="true">
			      	<el-submenu :index="String(index)" v-for="(item, index) in navDefault">
				        <template slot="title">{{item.name}}</template>
				        <template v-for="items in item.child">
				        	<el-menu-item  :index="items.url.toLowerCase()" @click.native="routerGo(items.url)">{{items.name}}</el-menu-item>
				        </template>
			      	</el-submenu>
			    </el-menu>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import Vue from 'vue'
import {POST,GET} from '../assets/js/api.js'
export default {
    name: 'nav',
    data () {
        return {
        	navDefault:[],
        	defaultAc:'1',
        	defaultOpen:['1']
        }
    },
    components:{},
    methods:{
        getAdminModule() {
            POST({
				url:this.Api().getAdminModule,
				data:{token:this.getCookie("token")},
				callback:data=>{
					let _results = data.results;
					let _this = this;
					this.defaultAc = this.$route.path.split('/')[2].toLowerCase();
					if (data.error == 0) {
						this.navDefault = _results;
                        _results.forEach(function(elem,index){
                            if (elem.child) {
                                elem.child.forEach(function(el,index2){
                                    if (el.url.toLowerCase()===_this.defaultAc) {
                                         _this.defaultOpen=[String(index)]; 
                                    }
                                })
                            }
                        })
					}
				}
    		})
        },
        routerGo(path){
        	this.$router.push('/home/'+path);
        }
    },
    created(){
    	this.getAdminModule();
    },
    mounted(){
    }
}
</script>
<style lang="less" scoped>
@import './../assets/css/variable.less';
.nav{
	position:absolute;
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