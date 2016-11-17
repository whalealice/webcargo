<template>
  	<div class="login">
        <div class="login_box">
        	<div id="logo"><img src="./../assets/images/logo.png"/></div>
            <!-- <validator name="validation"> -->
            <div class="login_form" >
			<!-- <validator name="validatorMethod"> -->
                <div class="login_cont">
                    <!-- <div class="vlidation_error" v-show="$validatorMethod.username.noempty v-validate:username="['username']"">用户名不能为空</div> -->
                    <div class="vlidation_error" ></div>
                    <input type="text" name="user_name" id="user_name"
                    	placeholder="请输入手机号......"
                        autocomplete="on"
                        v-model="login_name" />
                    <div class="login_icon"><img src="./../assets/images/login_pos.png"/></div>
                </div>
                <div class="login_cont">
                    <div class="vlidation_error"></div>
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
                <button id="button"  @click="loginMethods">登 录</button>
            <!-- </validator> -->
            </div>
        <!-- </validator> -->
        </div>
        <div class="agree">已阅读并同意《软件许可及服务协议》</div>
    </div>
</template>
<script>
import Vue from 'vue'
import md5 from 'md5'
export default {
    name: 'login',
    data () {
        return {
            login_name: '',
            password: '',
            isCheck: true
        }
    },
    methods:{
        loginMethods:function () {
        	
            if (!this.login_name||!this.password) {
                return
            };
            //获取服务器时间
            this.$http.post(
                "/CargoApi/login/sync",
                {token:""},
                {emulateJSON:true})
            .then(
                function (result) {
                    // 处理成功的结果
                    var day = result.results.data.split(" ")[0].split("-").splice(1,2);   //获取当前月日0927
                    var thisDay = day.join("-");
                },function (result) {
                    
                    // 处理失败的结果
                }
            );

            function Random(){ //1000-9999的随机数
                do
                var out = Math.floor(Math.random()*10000);
                while( out < 1000 );
                return out;
            }
            //登陆接口
            // this.$http.post(
            //     "http://112.126.82.117:9099/login/getAdminUser",
            //     {   login_name:this.login_name,
            //         password:this.password,
            //         sign:md5(Random()).substr(0,10)+md5(md5(md5(this.login_name+'tuodui2016')+thisDay))+md5(Random())
            //     },
            //     {emulateJSON:true})
            // .then(
            //     function (result) {
            //         // 处理成功的结果
            //         alert(result.results);
            //     },function (result) {
            //         alert(result.results);
            //         // 处理失败的结果
            //     }
            // );
            // 
            



            
            // var self = this;
            // /**
            //  * 验证目标表单元素。
            //  * true:验证所有
            //  */
            // self.$validate(true,function () {
            //     /*如果所有条件都是false*/
            //     if(!self.$validatorMethod.invalid){
            //         alert("登录成功");
            //     }
            // })
        }
    },
    mounted(){
        console.log(this)
    }
}
</script>
<style lang="less" scoped>

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
			padding:20px 40px 0;
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
