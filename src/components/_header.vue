<template>
	<div class="header">
    	<p class="sidebar_toggle" @click="toggleNav"></p>
    	<router-link to="/Home/FundsDetail" class="home">首页</router-link>
        <div class="time">
        	<img src="/static/images/time_one.png" > 
            <span id="date">{{day}}</span> &nbsp;
            <img src="/static/images/time_two.png"> 
            <span id="time">{{time}}</span>
        </div>
        <div class="right nav_about">
           <router-link to="/Publish"><img src="/static/images/about.png">关于我们</router-link>
           <a href="javascript:;" @click="quiteLogin"><img src="/static/images/return.png">退出登录</a>
        </div>
	</div>
</template>
<script>
import {POST,GET} from '../assets/js/api.js';
export default {
    name: 'header',
    data () {
        return {
        	day:'',
        	time:''
        }
    },
    methods:{
    	quiteLogin(){
    		POST({
    			url:this.Api().quitAdminUser,
    			data:{"token":this.getCookie("token")},
    			callback:data=>{
    				if (data.error==0) {
    					alert(data.results.msg);
    					this.$router.push('/Login');
    				}
    			}
    		})
    	},
    	toggleNav(){
    		this.$emit('toggle');
    	},
    	getTime(){
    		POST({
	            url:this.Api().sync,
	            data:{"token":this.getCookie("token")},
	            callback:data=>{
	                let time = data.results.data;

		        	let T = time.replace(/:/g,'-').replace(' ','-').split('-');
				    let oDate = new Date(T[0],T[1]-1,T[2],T[3],T[4],T[5]).getTime();
				 	
				 	let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			 		let year = this.toTimeFormat(oDate).Year;
			 		let month = this.toTimeFormat(oDate).Month;
			 		let day = this.toTimeFormat(oDate).Day;
			 		let weekday = weekDay[new Date(oDate).getDay()];
			 		this.day = ""+year+"/"+month+"月"+day+"日"+weekday+"";

			 		this.setTime(oDate);
				 	let timer = setInterval(()=>{
				 		oDate += 1000;
				 		this.setTime(oDate);
				 	},1000);
	            }
	        })
    	},
    	setTime(oDate){
	 		let hour =this.toTimeFormat(oDate).Hour;
	 		let min = this.toTimeFormat(oDate).Min;
	 		let second = new Date(oDate).getSeconds();
	 		let DM = "AM";
	 		if (hour>=12) {
	 			DM = "PM"
	 		};
	 		
	 		this.time = ""+hour+" ："+min+" ："+this.toDouble(second)+" "+DM+"";
    	}
    },
    created(){
    	this.getTime();
    }
}
</script>
<style lang="less" scoped>

@import './../assets/css/variable.less';
.header{
	width: 100%;
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
		left: 45%;
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