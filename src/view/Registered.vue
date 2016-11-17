<template>
	<div class="regisiter">
        <div class="login_box">
        	<div id="logo"><img src="/static/images/logo.png" /></div>
            <div class="login_form">
            	<p class="login_text">拨打驼队重卡客服进行电话注册<br/><span style="color:#FF4343;">注册热线：010-56767886</span></p>
            	<router-link to="/Login" id="button">返回登录</router-link>
            	
            </div>
        </div>
        <div class="agree">已阅读并同意《软件许可及服务协议》</div>
    </div>
</template>
<script>
export default {
  name: 'login',
  data(){
     return {

     }
  }
}
</script>
<style lang="less" scoped>
@import './../assets/css/variable.less';
.regisiter{
	width:380px;
	position:absolute;
	top:50%;
	left:50%;
	margin-top:-190px;
	margin-left:-190px;
	.login_box{
		height:380px;
		margin-bottom:26px;
		.login_form{
			width:380px;
			height:280px;
			background:@white;
			padding:10px 40px 0;
			box-sizing: border-box;
			.login_text{
				text-align:center; 
				padding-top:40px;
				font-size:16px; 
				line-height:60px; 
				color:rgba(153,153,153,1);
			}
		}
		#logo{
			height:100px;
			background:@blue;
			line-height:100px;
			text-align:center;
			img{
				height:35px;
				width:309px;
				vertical-align:middle;
			}
		}
	}
	#button{
		.ct_btn(300px,30px);
		margin-top:30px;
		display: inline-block;
	}
	.agree{
		width:100%;
		text-align:center;
	}
}

</style>