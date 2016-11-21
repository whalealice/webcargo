<template>
  	<div class="forgetlogin">
        <div class="login_box">
        	<div id="logo"><img src="/static/images/logo.png"/></div>
            <div class="login_form" >
            	<el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                    <el-form-item  prop="phone">
                        <el-input type="text" 
                            v-model="ruleForm.phone" 
                            auto-complete="on" 
                            placeholder="请输入手机号......">  
                        </el-input>
                        <i class="icon_user"></i>
                    </el-form-item>
                    <el-form-item  prop="code">
                    	<el-input placeholder="请输入验证码......" v-model="ruleForm.code" auto-complete="on" class="code_input" >
						   <!--  <template slot="append" @click.native="codeMethods">获取验证码</template> -->
						</el-input>
                		<p class="code_btn" @click="codeMethods">获取验证码</p>
                    </el-form-item>
                     
                    <el-form-item  prop="password">
                        <el-input type="password" v-model="ruleForm.password" auto-complete="on" placeholder="请输入新密码......"></el-input>
                        <i class="icon_password"></i>
                    </el-form-item>
                    
                   <!--  <el-form-item>
                        <el-button type="primary"  @click="handleSubmit">登陆</el-button>
                    </el-form-item> -->
                </el-form>
                <div class="submitBtn">
                	<router-link to="/Login" class="left button" style="background:#3EB6B1;">返回</router-link>
                	<button class="right button" @click="handleSubmit">提交</button>
                </div>
            </div>
        </div>
        <div class="agree">已阅读并同意《软件许可及服务协议》</div>
    </div>
</template>
<script>
import md5 from 'md5'
import {POST,GET} from '../assets/js/api.js'
export default {
    name: 'forgetlogin',
    data () {
        return {
        	thisDay:'',
            ruleForm: {
                password: '',
                phone: '',
                code:''
            },
            rules: {
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                code:[
                    { required: true, message: '请输入验证码', trigger: 'blur' }
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
            //忘记密码提交
            POST({
                url:this.Api().setUserPassword,
                data:{
                    "phone":this.ruleForm.phone,
                    "password":this.ruleForm.password,
                    "code":this.ruleForm.code,
                    "sign":this.Md5(this.ruleForm.phone,this.thisDay)
                },
                callback:data=>{
                    alert(data.results.msg);
                    this.$router.push({ path:'/Home/FundsDetail'});
                }
            })
        },
        codeMethods:function(){
        	//获取验证码
            POST({
                url:this.Api().getSmsCode,
                data:{
                    "phone":this.ruleForm.phone,
                    "sign":this.Md5(this.ruleForm.phone,this.thisDay)
                },
                callback:data=>{
                    alert(data.results.msg)
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

    },
    mounted(){
        console.log(this)
    }
}
</script>
<style lang="less" >

@import './../assets/css/variable.less';
.forgetlogin{
	width:380px;
	position:absolute;
	top:50%;
	left:50%;
	margin-top:-190px;
	margin-left:-190px;
	.el-form-item{
        margin-top: 30px;
        margin-bottom: 0px;
        .el-form-item__content{line-height: 30px;}
        input,button{border-radius: 0px;.height(30px);}
        .code_input{
        	.el-input__inner{width: 210px;}
        	.el-input-group__append{
        		width: 90px;
        		.height(30px);
        		border-radius: 0px;
        		border:none;
        		background: @button_blue;
        		color:@white;
        		cursor: pointer;
        	}
        }
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

	.login_box{
		height:380px;
		margin-bottom:26px;
		.code_btn{
			.ct_btn(90px,30px,@rgba:@button_blue);
			position: absolute;
			right: 0;
			top: 0;
		}
		.login_form{
			width:380px;
			height:280px;
			background:@white;
			padding:10px 40px 0;
			box-sizing: border-box;
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
		margin-top:30px;
	}
	.agree{
		width:100%;
		text-align:center;
	}
}

</style>
