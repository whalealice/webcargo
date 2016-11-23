<template>
  	<div class="login">
        <div class="login_box">
        	<div id="logo"><img src="/static/images/logo.png"/></div>
            <div class="login_form" >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                    <el-form-item  prop="login_name">
                        <el-input type="text" 
                            v-model="ruleForm.login_name" 
                            auto-complete="on"
                            placeholder="请输入手机号......">  
                        </el-input>
                        <i class="icon_user"></i>
                     </el-form-item>
                    <el-form-item  prop="password">
                        <el-input type="password"  v-model="ruleForm.password" 
                            placeholder="请输入密码......"
                            auto-complete="on">
                        </el-input>
                        <i class="icon_password"></i>
                    </el-form-item>
                    <div class="checkBox">
                        <div class="left">
                            <input type="checkbox" class="left" :checked="isCheck" @click="!isCheck">
                            <span >记住密码</span>
                        </div>
                        <div class="right"><router-link to="/ForgetLogin">忘记密码</router-link><span>|</span> &nbsp;
                        <router-link to="/Registered">注册</router-link></div>
                    </div>
                   <!--  <el-form-item>
                        <el-button type="primary"  @click="handleSubmit">登陆</el-button>
                    </el-form-item> -->
                </el-form>
                <button  class="sumbit" @click="handleSubmit">登陆</button>
            </div>
        </div>
        <div class="agree">已阅读并同意《软件许可及服务协议》</div>
    </div>
</template>
<script>

import Vue from 'vue'
import md5 from 'md5'
import {POST,GET} from '../assets/js/api.js'

export default {
    name: 'login',
    data () {
        return {
            isCheck:false,
            thisDay:'',
            ruleForm: {
                password: '',
                login_name: ''
            },
            rules: {
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                login_name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ]
            }
        }
    },
    components:{},
    methods:{
        handleSubmit(ev) {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.loginMethods();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        loginMethods:function () {
            //登陆接口
            POST({
                url:this.Api().getAdminUser,
                data:{
                    "login_name":this.ruleForm.login_name,
                    "password":this.ruleForm.password,
                    "sign":this.Md5(this.ruleForm.login_name,this.thisDay)
                },
                callback:data=>{
                    this.setCookie("token",data.results.token)
                    // 处理成功的结果
                    this.$router.push({ path:'/Home/SetCargo'});
                }
            })
            
        }
    },
    created(){
        //sign值加密的当天日期
        POST({
            url:this.Api().sync,
            data:{"token":""},
            callback:data=>{
                let day = data.results.data.split(" ")[0].split("-").splice(1,2);   
                //获取当前月日0927
                this.thisDay = day.join("-");
            }
        })
    }
}
</script>
<style lang="less" >

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
        .el-form-item{
            margin-top: 40px;
            margin-bottom: 0px;
            input,button{border-radius: 0px;height: 30px;}
            .el-form-item__error{
                top: -20px;
                right: 0;
                text-align: right;
            }
        }
        .el-form-item__content{
            position: relative;
            height: 30px;
            i{
                width: 20px;
                height: 20px;
                position: absolute;
                right: 10px;
                top: 10px;
                background-size: cover;
            }
            .icon_user{background: url(/static/images/login_pos.png) no-repeat}
            .icon_password{background: url(/static/images/login_pass.png) no-repeat}
        }
        .sumbit{
            .ct_btn(300px,30px,@rgba:@button_blue);
            margin-top: 20px;
        }
		.login_form{
			width:380px;
			height:280px;
			background:@white;
			padding:10px 40px 0;
			box-sizing: border-box;
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
			background:@blue_dank;
			line-height:100px;
			text-align:center;
			img{
				height:35px;
				width:309px;
				vertical-align:middle;
			}
		}
	}
	.agree{
		width:100%;
		text-align:center;
	}
}

</style>
