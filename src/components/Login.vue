<template>
  	<div class="login">
        <div class="login_box">
        	<div id="logo"><img src="./../assets/images/logo.png"/></div>
            <div class="login_form" >
                <div class="login_cont">
                    <div class="vlidation_error">111</div>
                    <input type="text" name="user_name" id="user_name"
                        autocomplete="on"
                        v-model="mobile"/>
                    <div class="login_icon"><img src="./../assets/images/login_pos.png"/></div>
                </div>
                <div class="login_cont">
                    <div class="vlidation_error">11111</div>
                    <input type="password" name="user_password" id="user_password"
                        onpaste="return false;"
                        oncopy="return false"
                        placeholder="请输入密码......"
                        v-model="password"/>
                    <div class="login_icon"><img src="./../assets/images/login_pass.png"/></div>
                </div>
                <div class="checkBox">
                    <div class="left">
                        <input type="checkbox" class="left" :checked="isCheck" @click="!isCheck">
                        <span >记住密码</span>
                    </div>
                    <div class="right"><router-link to="/ForgetLogin">忘记密码</router-link><span>|</span> &nbsp;
                    <router-link to="/Registered">注册</router-link></div>
                </div>
                <button id="button"  @click="routerGo()">登 录</button>
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
			padding:30px 40px 0;
			box-sizing: border-box;
			.login_cont{
				position:relative;
				height:60px
			}
			.vlidation_error{
				.height(30px);
				color:@red;
				text-align:right;
				margin-top:10px;
			}
			.login_icon{
				position:absolute;
				right:10px;
				bottom:6px;
				width:16px;
				height:16px;
				img{
					width:16px;
					height:16px;
				}
			}
			.checkBox{
				margin-top:6px;
				.height(30px);
				input[type=checkbox]{
					margin-right:6px;
				}
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
