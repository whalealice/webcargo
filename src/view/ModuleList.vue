<template>
	<div class="module_list">
		<Fold :title="title"></Fold>
		<div class="order_wrap">
			<!-- <div class="new_edit"><el-button type="primary" icon="plus">新建</el-button></div> -->
			<div class="new_edit">
				<a href="javascript:;" @click="newEdit">
					<i class="el-icon-plus"></i>新建
				</a>
				<a href="javascript:;" style="float:right" @click="routeBack" v-show="this.default.parent_id!=0">
					<i class="el-icon-arrow-left"></i>返回
				</a>
			</div>
			<ul class="module_title">
                <li style="width:10%">id</li>
                <li>模块名称</li>
                <li>父ID</li>
                <li>URL</li>
                <li>顺序</li>
                <li>动作模块</li>
                <li>操作</li>
            </ul>
            <div style="min-height:140px;">
            	<ul class="module_item"  
	            	v-loading.body="loading" 
	            	:data="data" 
	            	element-loading-text="拼命加载中"
	            	style="width: 100%;margin-bottom: 20px;" >
	            	<li class="user_content" v-for="(item,index) in data" :class="{gray:(index%2!=0)}" >
	            		<p style="width:10%">{{item.module_id}}</p>
	            		<p @click="getItemModule(item.module_id,item.child)" class="module_name">{{item.name}}</p>
	            		<p>{{item.parent_id}}</p>
	            		<p>{{item.url}}</p>
	            		<p>{{item.sort}}</p>
	            		<p>{{item.action}}</p>
	            		<p>
	            			<button class="submit" @click="getEdit(item.user_id)">编辑</button>
	            		</p>
	            	</li>
	            </ul>
            </div>
            <!-- <Page :intoPage="intoPage" @currentPage="currentPage"></Page> -->
            <el-dialog title="基本信息" v-model="dialogFormVisible">
			  	<el-form :model="form" :rules="rules" ref="ruleForm">
				    <el-form-item label="账号：" prop="login_name" :label-width="formLabelWidth">
				      	<el-input v-model="form.login_name" auto-complete="on"></el-input>
				    </el-form-item>
				    <el-form-item label="用户名：" prop="user_name" :label-width="formLabelWidth">
				      	<el-input v-model="form.user_name" auto-complete="on"></el-input>
				    </el-form-item>
				    <el-form-item label="密码：" :label-width="formLabelWidth">
				      	<el-input type="password" v-model="form.password" auto-complete="on"></el-input>
				    </el-form-item>
				    <el-form-item label="公司：" :label-width="formLabelWidth">
				      	<el-input v-model="form.company_uid" auto-complete="on"></el-input>
				    </el-form-item>
				    <el-form-item label="是否可用：" :label-width="formLabelWidth">
				      	<el-radio class="radio" v-model="radio" label="1">是</el-radio>
  						<el-radio class="radio" v-model="radio" label="0">否</el-radio>
				    </el-form-item>
			  	</el-form>
			  	<div slot="footer" class="dialog-footer">
			   		<el-button @click="dialogFormVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="handleSubmit">保 存</el-button>
			  	</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>

import Fold from '../components/_fold.vue';
import {POST,GET} from '../assets/js/api.js';
export default {
	name:"orders",
	data() {
		return {
			title:"模块管理",
            loading: true,
            dialogFormVisible: false, //弹出提示内容的显示
			data:{},
			form: {}, //编辑存储的默认信息
			module_id:"",
		    rules: {
	          	login_name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
	          	user_name:[{ required: true, message: '请输入用户名', trigger: 'blur' }]
	        },
		    radio: '1', //编辑弹出的单选框
		    formLabelWidth: '90px', //弹出框的表头宽度
		    default:{
		    	"token":this.getCookie("token"),
		    	"parent_id":"0"
		    }
		} 
    },
	components:{Fold},
	methods: {
		message() {
            this.$message('暂无数据');
        },
		getEdit(val){ //点击编辑弹出基本内容的对话框
			this.user_id = val;
			this.dialogFormVisible = true;
			this.getUser({
				token:this.getCookie("token"),
				user_id:val
			});
		},
		handleSubmit(ev) { //基本内容的对话框验证
			this.$refs.ruleForm.validate((valid) => {
		  		if (valid) {
		  			this.postUser();
		  		} else {
		    		console.log('error submit!!');
		    		return false;
		  		}
			});
		},
		getUser(_data){ //获取用户基本信息
			POST({
                url:this.Api().getUser,
                data:(_data),
                callback:data=>{
                    if (data.error == "0") {
                    	this.form = data.results.result[0];
                    	this.radio = data.results.result[0].enabled;
                    }else if(data.error == "109"){
						this.form.user_id="";
						this.form.login_name="";
						this.form.user_id="";
						this.form.user_name="";
						this.form.company_uid="";
                    	this.radio = "1";
                    }
                }
            });
		},
		postUser(){ //用户基本信息修改
			POST({
				url:this.Api().postUser,
                data:{
					"token":this.getCookie("token"),
					"user_id":this.user_id,
					"login_name":this.form.login_name,
					"user_name":this.form.user_name,
					"enabled":this.radio,
					"password":this.form.password,
					"company_uid":this.form.company_uid
				},
                callback:data=>{
                    if (data.error == "0") {
                    	alert(data.errorMsg);
                    	this.dialogFormVisible = false;
                    	this.getDefault({token:this.getCookie("token")});
                    }
                }
			})
		},
		newEdit(){ //新建
			this.dialogFormVisible = true;
			this.getUser({
				token:this.getCookie("token"),
				user_id:"none"
			});
		},
		getItemModule(id,child){ //点击每一行
			if(child == false){
				return ;
			}
			this.default.parent_id = id;
			this.$router.push({ path:'/Home/ModuleList',query:{id:id}});
			this.getModule(this.default)
		},
        //默认列表
        getModule(_data){
            POST({
                url:this.Api().getAdminModule,
                data:(_data),
                callback:data=>{
                    if (data.results) {
                        this.loading = false;
                        this.data = data.results;
                    }else{
                        this.message();
                        this.loading = false;
                    }
                }
            })
        },
        routeBack(){ //点击返回
        	this.default.parent_id = "0";
        	this.$router.go(-1);
        	this.getModule(this.default);
        }
    },
    created(){
    	if (this.$route.query) {
            this.default.parent_id = this.$route.query.id;
        }
    	this.getModule(this.default);
    }
}
</script>
<style lang="less">
@import './../assets/css/variable.less';

.module_list{
	width: 100%;
	.new_edit{
		.height(50px);
		text-align: left;
		i{margin-right: 4px;}
	}
	.module_title{
		box-sizing: border-box;
		margin-bottom: 20px;
		width: 100%;
		.height(40px);
		background: @gray;
		border-bottom: 1px solid @border_color;
		border-top: 1px solid @border_color;
		li{
			float: left;
			text-align: center;
			width: 15%;
		}
	}
	.module_item{
		border-bottom: 1px solid @border_color;
		border-left: 1px solid @border_color;
		overflow: hidden;
		.user_content{
			.height(40px);
			box-sizing:border-box;
			p{
				.height(40px);
				float: left;
				text-align: center;
				border: 1px solid @border_color;
				border-left:none;
				border-bottom:none;
				box-sizing: border-box;
				width: 15%;
			}
			.module_name{cursor: pointer;}
			.module_name:hover{color:@button_blue;}
			.submit{
                .ct_btn(60px,20px,@rgba:@red);
            }
		}
	}
}
.el-dialog--small{
	width: 35%;
	.el-form-item{margin-bottom: 20px;}
	.el-dialog__body{padding: 20px 30px 0;}
	.el-form-item__label{text-align: left;}
	.el-input__inner{border-radius: 0px;}
}
.el-checkbox{
	display: block;
	margin-bottom:10px;
}
</style>