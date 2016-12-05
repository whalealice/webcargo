<template>
	<div class="password">
        <Fold :title="title" :message="message"></Fold>
        <div class="passwprd_wrap">
        	<div class="password_cont">
        		<p class="password_title">修改密码</p>
        		<div class="password_inp">
        			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="96px">
						<el-form-item label="原密码" prop="password">
							<el-input type="password" v-model="ruleForm.password" placeholder="请输入原密码" ></el-input>
						</el-form-item>
						<el-form-item label="新密码" prop="new_password">
							<el-input type="password" v-model="ruleForm.new_password" placeholder="请输入新密码" ></el-input>
						</el-form-item>
						<el-form-item label="请确认密码" prop="check_password">
							<el-input type="password" v-model="ruleForm.check_password" placeholder="请输入新密码" ></el-input>
						</el-form-item>
						<el-button type="primary" size="small" @click="handleSubmit">确认</el-button>
					</el-form>
        		</div>
        	</div>
        </div>
        <!-- <Alert :></Alert> -->
	</div>
</template>

<script>
import Fold from '../components/_fold.vue';
import {POST,GET} from '../assets/js/api.js'
export default {
	name:"password",
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
			  	callback(new Error('请输入密码'));
			} else {
			  	if (this.ruleForm.check_password !== '') {
			   	 	this.$refs.ruleForm.validateField('check_password');
			 	}
			  	callback();
			}
		};
		var validateCheckPass = (rule, value, callback) => {
			if (value === '') {
			  	callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm.new_password) {
			  	callback(new Error('两次输入密码不一致!'));
			} else {
			  	callback();
			}
		};
		return {
			title:"系统管理",
			message:"修改密码",
			ruleForm:{
				password:"",
				new_password:"",
				check_password:""
			},
			rules:{
				password:[
					{required: true, message: '请输入密码', trigger: 'blur'}
				],
				new_password:[
					{required: true,  trigger: 'blur',validator: validatePass}
				],
				check_password:[
					{required: true, trigger: 'blur',validator: validateCheckPass}
				]
			}
		}
    },
	components:{Fold},
	methods: {
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
        loginMethods(){
        	POST({
        		url:this.Api().postAdminUser,
        		data:{
        			"password":this.ruleForm.password,
					"new_pwd":this.ruleForm.new_password,
					"token":this.getCookie("token")
        		},
        		callback:data=>{
        			if (data.error == 109) {
        				alert(data.errorMsg)
        			}else if(data.error == 0){
        				alert("您的密码已经修改成功！")
        			}
        		}
        	})
        }
    },
    mounted() {
    }
}
</script>

<style lang="less">
@import './../assets/css/variable.less';
.passwprd_wrap{
	width:100%;
	height:500px;
	background:@gray;
	position:relative;
	.password_cont{
		width:420px;
		position:absolute;
		left:50%;
		margin-left:-210px;
		margin-top:60px;
		.password_title{
			width:100%;
			.height(50px);
			background:@blue_dank;
			text-align: center;
			color:@white;
			font-size: 18px;
		}
		.password_inp{
			width: 100%;
			background: @white;
			padding:20px 70px 40px;
			box-sizing: border-box;
		}
		
	}
	.el-form-item{margin-bottom:16px;}
	.el-button{width: 100%;margin-top: 10px;}
}


</style>