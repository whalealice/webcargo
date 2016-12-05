<template>
	<div class="user_list">
		<Fold :title="title"></Fold>
		<div class="order_wrap">
			<div class="new_edit"><a href="javascript:;" @click="newEdit"><i class="el-icon-plus"></i>新建</a></div>
			<ul class="user_title">
                <li style="width:6%">id</li>
                <li style="width:14%">账号</li>
                <li style="width:15%">用户名</li>
                <li style="width:15%">公司</li>
                <li style="width:14%">状态</li>
                <li style="width:18%">创建时间</li>
                <li style="width:18%">操作</li>
            </ul>
            <div style="min-height:140px;">
            	<ul class="user_item"  
	            	v-loading.body="loading" 
	            	:data="data" 
	            	element-loading-text="拼命加载中"
	            	style="width: 100%;margin-bottom: 20px;" >
	            	<li class="user_content" v-for="(item,index) in data" :class="{gray:(index%2!=0)}">
	            		<p style="width:6%">{{item.user_id}}</p>
	            		<p style="width:14%">{{item.login_name}}</p>
	            		<p style="width:15%">{{item.user_name}}</p>
	            		<p style="width:15%">{{item.company_uid}}</p>
	            		<p style="width:14%">{{item.enabled_name}}</p>
	            		<p style="width:18%">{{item.create_time}}</p>
	            		<p style="width:18%">
	            			<button class="submit" @click="getEdit(item.user_id)">编辑</button>
	            			<button class="submit" @click="getPermission(item.user_id)">权限编辑</button>
	            		</p>
	            	</li>
	            </ul>
            </div>
            <Page :intoPage="intoPage" @currentPage="currentPage"></Page>
            <el-dialog title="基本信息" v-model="dialogFormVisible">
			  	<el-form :model="form" :rules="rules" ref="form">
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
			<el-dialog title="选择角色" v-model="checkFormVisible">
			  	<el-checkbox-group >
		  			<ul>
		  				<template  v-for="(item,index) in checkdata">
			  				<li class="check">
			  					<input type="checkbox"  style="height:12px;" 
			  						v-model="checkList"
			  						:name="item.role_id" 
			  						:value="item.role_id" 
			  						:checked="item.selected=='Y'">
			  					<i class="el-icon-document"></i>
			  					<label>{{item.role_name}}</label>
			  				</li>
			  			</template>
		  			</ul>
				</el-checkbox-group>
			  	<div slot="footer" class="dialog-footer">
			   		<el-button @click="checkFormVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="checkSubmit">确 定</el-button>
			  	</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>

import Fold from '../components/_fold.vue';
import Page from '../components/_page.vue';
import {POST,GET} from '../assets/js/api.js';
export default {
	name:"orders",
	data() {
		return {
			title:"用户列表",
            loading: true,
            checkFormVisible:false,
            dialogFormVisible: false, //弹出提示内容的显示
			intoPage:{
				"token":this.getCookie("token"),
                "curpage":1,
                "limit": 10,
                "pageCount": "",
                "totalCount": ""
			},
			data:{},
			outPage:{
                "token":this.getCookie("token"),
                "page":1,
                "limit":10
            },
			checkList: ["1"], //权限管理的选中
			checkdata: {}, //权限编辑的默认信息
			// user_id:"",
			form: {
				login_name:"",
				user_name:"",
				password:"",
				company_uid:""
			}, //编辑存储的默认信息
		    rules: {
	          	login_name: [{ required: true, message: ' ', trigger: 'blur' }],
	          	user_name:[{ required: true, message: ' ', trigger: 'blur' }]
	        },
	        default:{
		    	"token":this.getCookie("token"),
		    	"user_id":""
		    },
		    radio: '1', //编辑弹出的单选框
		    formLabelWidth: '90px', //弹出框的表头宽度
		    id:""
		} 
    },
	components:{Fold,Page},
	methods: {
		getEdit(val){ //点击编辑弹出基本内容的对话框
			// this.user_id = val;
			this.dialogFormVisible = true;
			this.default.user_id = val;
			this.getUser(this.default);
		},
		handleSubmit(ev) { //基本内容的对话框验证
			this.$refs.form.validate((valid) => {
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
                    }
                }
            });
		},
		postUser(){ //用户基本信息修改
			POST({
				url:this.Api().postUser,
                data:{
					"token":this.getCookie("token"),
					"user_id":this.form.user_id,
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
                    	this.default.user_id = "";
                    	this.getDefault(this.default);
                    }
                }
			})
		},
		newEdit(){ //新建
			this.dialogFormVisible = true;
			this.form.user_id="";
			this.form.login_name="";
			this.form.user_id="";
			this.form.user_name="";
			this.form.company_uid="";
        	this.radio = "1";
		},
		getPermission(id){ //点击权限弹出权限对话框
			this.checkFormVisible = true;
			this.id = id;
			this.checkList = [];
			POST({
				url:this.Api().getAdminUserRole,
				data:{
					"token":this.getCookie("token"),
					"user_id":id
				},
				callback:data=>{
					if (data.error == "0") {
						this.checkdata = data.results;

						let _results = data.results;

						_results.forEach((el,index)=>{
							if(el.selected == "Y"){
								this.checkList.push(el.role_id)
								console.log(this.checkList)
							}
						})
					}
				}
			})
		},
		checkSubmit(){
			POST({
				url:this.Api().postAdminUserRole,
				data:{
					"user_id":this.id,
					"role_id":this.checkList,
					"token":this.getCookie("token")
				},
				callback:data=>{
					if (data.error == 0) {
						this.checkFormVisible = false;
						alert(data.errorMsg);
						this.getDefault(this.default);
					}
				}
			})
		},
        //默认货单列表
        getDefault(_data){
            POST({
                url:this.Api().getUser,
                data:(_data),
                callback:data=>{
                    if (data.results.result) {
                        this.loading = false;
                        this.data = data.results.result;
                        this.intoPage = data.results.page;
                    }else{
                        this.message();
                        this.loading = false;
                    }
                }
            })
        },
        //点击页数
        currentPage(val){
            this.outPage.page = val;
            this.getDefault(this.outPage);
        }
    },
    created(){
    	// this.getDefault(this.default);
    }
}
</script>
<style lang="less">
@import './../assets/css/variable.less';
.user_list{
	width: 100%;
	.new_edit{
		.height(50px);
		text-align: left;
		i{margin-right: 4px;}
	}
	.user_title{
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
		}
	}
	.user_item{
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
			}
			.submit{
				.height(20px);
				background:@red;
				padding:0 6px;
				color:@white;
				border:none;
            }
		}
	}
	.el-checkbox{
		display: block;
		margin-bottom:10px;
	}
	.el-checkbox__input{margin-right: 20px;}
	.el-checkbox-group{
		li{height: 30px;}
	}
	.el-dialog--small{
		width: 35%;
		.el-form-item{margin-bottom: 20px;}
		.el-dialog__body{padding: 20px 30px 0;}
		.el-form-item__label{text-align: right;}
		.el-input__inner{border-radius: 0px;}
	}
	.el-checkbox+.el-checkbox{margin-left: 0px;}
	.checkchild{margin-left: 20px;}
	.el-checkbox__inner{width: 15px;height: 15px;}
	.el-checkbox__inner::after{left:4px;top:0px;}
}
</style>