<template>
	<div class="module_list user_list">
		<Fold :title="title"></Fold>
		<div class="order_wrap">
			<div class="new_edit">
				<a href="javascript:;" @click="newEdit">
					<i class="el-icon-plus"></i>新建
				</a>
				<a href="javascript:;" style="float:right" @click="routeBack" v-show="this.default.parent_id!=0">
					<i class="el-icon-arrow-left"></i>返回
				</a>
			</div>
			<ul class="module_title user_title">
                <li style="width:10%">id</li>
                <li>模块名称</li>
                <li>父ID</li>
                <li>URL</li>
                <li>顺序</li>
                <li>动作模块</li>
                <li>操作</li>
            </ul>
            <div style="min-height:140px;">
            	<ul class="module_item user_item"  
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
	            			<button class="submit" @click="getEdit(item.module_id)">编辑</button>
	            		</p>
	            	</li>
	            </ul>
            </div>
            <!-- <Page :intoPage="intoPage" @currentPage="currentPage"></Page> -->
            <el-dialog title="基本信息" v-model="dialogFormVisible">
			  	<el-form :model="form" :rules="rules" ref="ruleForm">
				    <el-form-item label="模块名称：" prop="name" :label-width="formLabelWidth">
				      	<el-input v-model="form.name" auto-complete="on"></el-input>
				    </el-form-item>
				    <el-form-item label="URL："  :label-width="formLabelWidth">
				      	<el-input v-model="form.url" auto-complete="on"></el-input>
				    </el-form-item>
				    <el-form-item label="排序：" prop="sort" :label-width="formLabelWidth">
				      	<el-input v-model="form.sort" auto-complete="on"></el-input>
				    </el-form-item>
				    <el-form-item label="父ID：" :label-width="formLabelWidth">
				      	<el-input v-model="form.parent_id" auto-complete="on"></el-input>
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
			data:{}, //列表默认信息
			module_id:"",
			form: {
				name:"",
				sort:"",
				url:"",
				parent_id:""
			}, //编辑存储的默认信息
		    rules: {
	          	name: [{ required: true, message: ' ', trigger: 'blur' }],
	          	sort:[{ required: true, message: ' ', trigger: 'blur' }]
	        },
		    radio: '1', //编辑弹出的单选框
		    formLabelWidth: '100px', //弹出框的表头宽度
		    default:{
		    	"token":this.getCookie("token"),
		    	"parent_id":"0",
		    	"role":"N"
		    }
		} 
    },
	components:{Fold},
	methods: {
		message() {
            this.$message('暂无数据');
        },
		getEdit(val){ //点击编辑弹出基本内容的对话框
			this.dialogFormVisible = true;
			this.default.module_id = val;
			this.getAdminModule(this.default);
		},
		handleSubmit(ev) { //基本内容的对话框验证
			this.$refs.ruleForm.validate((valid) => {
		  		if (valid) {
		  			this.postAdminModule();
		  		} else {
		    		console.log('error submit!!');
		    		return false;
		  		}
			});
		},
		getAdminModule(_data){ //编辑获取基本信息
			POST({
                url:this.Api().getAdminModule,
                data:(_data),
                callback:data=>{
                    if (data.error == "0") {
                    	this.form = data.results[0];
                    	this.radio = data.results[0].enabled;
                    }
                }
            });
		},
		postAdminModule(){ //模块修改
			console.log(this.form.module_id)
			POST({
				url:this.Api().postAdminModule,
                data:{
					"token":this.getCookie("token"),
					"module_id":this.form.module_id,
					"parent_id":this.form.parent_id,
					"name":this.form.name,
					"url":this.form.url,
					"enabled":this.radio,
					"sort":this.form.sort
				},
                callback:data=>{
                    if (data.error == "0") {
                    	alert(data.errorMsg);
                    	this.dialogFormVisible = false;
                    	this.default.module_id = "";
                    	this.getModule(this.default);
                    }
                }
			})
		},
		newEdit(){ //新建
			this.dialogFormVisible = true;
			this.form.module_id="";
			this.form.parent_id="";
			this.form.name="";
			this.form.url="";
			this.form.sort="0";
        	this.radio = "1";
		},
		//点击每一行
		getItemModule(id,child){ 
			if(child == false)return;
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
    	this.default.parent_id = "0";
    }
}
</script>
<style lang="less">
@import './../assets/css/variable.less';

.module_list{
	.module_title{
		li{	width: 15%;}
	}
	.module_item{
		.user_content{
			p{width: 15%;}
			.module_name{cursor: pointer;}
			.module_name:hover{color: @button_blue;}
			.submit{
                .ct_btn(60px,20px,@rgba:@red);
            }
		}
	}
}

</style>