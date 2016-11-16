<template>
  	<div class="login">
        <div class="login_box">
        	<div id="logo"><img src="./../assets/images/logo.png"/></div>
            <div class="login_form" >
                <div class="login_cont">
                        <div class="vlidation_error">111</div>
                        <input type="text" class="log_input" placeholder="请输入手机号"/>
                        <div class="login_icon"><img src="./../assets/images/login_pos.png"/></div>
                    </div>
                    <div class="login_cont">
                        <div class="vlidation_error">111</div>
                        <input type="password" class="log_input left" style="width:210px; border-right:0;" id="user_code" placeholder="请输入验证码"/>   
                        <input type="button" class="get_code left" value="获取验证码" />
                    </div>
                    <div class="login_cont">
                        <div class="vlidation_error">111</div>
                        <input type="password" class="log_input" placeholder="请新输入新密码"/>
                        <div class="login_icon"><img src="./../assets/images/login_pass.png"/></div>
                    </div>
                    <div class="submitBtn">
                    	<router-link to="/Login" class="left button" style="background:#3EB6B1;">返回</router-link>
                    	<router-link to="/" class="right button">提交</router-link>
                      <!--   <a href="login.html" class="left"><button class="code_sub" style="background:rgba(62,182,177,1)">返 回</button></a>
                        <button class="right" id="pre_submit" style="float:right">提 交</button> -->
                    </div>
            </div>
        </div>
        <div class="agree">已阅读并同意《软件许可及服务协议》</div>
    </div>
</template>
<script>

export default {
    name: 'login_box',
    data () {
        return {
            mobile: '请输入手机号......',
            password: '',
            isCheck:false
        }
    },
    components: {
         
    },
    methods:{
      routerGo(){
        console.log(this.password)
        //this.$router.push('/Registered')
      }
    },
    mounted(){

    }
}
</script>
<style lang="less">

@import './../assets/css/variable.less';
.login{
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
			.login_cont{
				position:relative;
				height:56px
			}
			.vlidation_error{
				.height(24px);
				color:@red;
				text-align:right;
				margin-top:6px;
			}
			.login_icon{
				position:absolute;
				right:10px;
				bottom:8px;
				width:16px;
				height:16px;
				img{
					width:16px;
					height:16px;
				}
			}
			.get_code{
				width: 90px;
				.height(30px);
				text-align: center;
				background: @button_blue;
				color:@white;
				text-indent: 0;
				border:none;
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
	.button{
		.ct_btn(110px);
		margin-top:20px;
	}
	input[type=text],input[type=password]{
		width:300px;
	}
	.agree{
		width:100%;
		text-align:center;
	}
}

</style>
