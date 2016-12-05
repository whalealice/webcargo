<template>
	<div class="role_list user_list">
		<Fold :title="title"></Fold>
		<div class="order_wrap">
			<div class="new_edit">
				<a href="javascript:;" @click="newEdit">
					<i class="el-icon-plus"></i>新建
				</a>
			</div>
			<ul class="role_title user_title">
                <li style="width:10%">id</li>
                <li>角色名称</li>
                <li>说明</li>
                <li>操作</li>
            </ul>
            <div style="min-height:140px;">
            	<ul class="role_item user_item"  
	            	v-loading.body="loading" 
	            	:data="data" 
	            	element-loading-text="拼命加载中"
	            	style="width: 100%;margin-bottom: 20px;" >
	            	<li class="user_content" v-for="(item,index) in data" :class="{gray:(index%2!=0)}" >
	            		<p style="width:10%">{{item.role_id}}</p>
	            		<p>{{item.role_name}}</p>
	            		<p>{{item.description}}</p>
	            		<p>
	            			<button class="submit" @click="getEdit(item.role_id)">编辑</button>
	            			<button class="submit"  @click="getPermission(item.role_id)">角色编辑</button>
	            		</p>
	            	</li>
	            </ul>
            </div>
            <el-dialog title="基本信息" v-model="dialogFormVisible">
			  	<el-form :model="form" :rules="rules" ref="form">
				    <el-form-item label="角色名称：" prop="role_name" :label-width="formLabelWidth">
				      	<el-input v-model="form.role_name" auto-complete="on"></el-input>
				    </el-form-item>
				    <el-form-item label="说明："  prop="description" :label-width="formLabelWidth">
				      	<el-input v-model="form.description" auto-complete="on"></el-input>
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
			  						:name="item.module_id" 
			  						:value="item.module_id" 
			  						:checked="item.selected=='Y'"
			  						@change="changeTitleChecked(item.child,$event)">
			  					<i class="el-icon-document"></i>
			  					<label @click="toggleChildren(item)">{{item.name}}</label>
			  				</li>
			  				<ul v-show="item.expanded">
			  					<li class="check checkchild" :index="index"  v-for="itemchild in item.child">
			  						<input type="checkbox"  style="height:12px;" 
			  							v-model="checkList"
			  							:name="itemchild.module_id" 
			  							:value="itemchild.module_id" 
			  							:checked="itemchild.selected=='Y'"
			  							@change="changeChild(item,$event)">
				  					<i class="el-icon-document"></i>
			  						<label>{{itemchild.name}}</label>
			  					</li>
			  				</ul>
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
import {POST,GET} from '../assets/js/api.js';
export default {
	name:"orders",
	data() {
		return {
			title:"角色管理",
            loading: true,
            checkFormVisible:false,
            dialogFormVisible: false, //弹出提示内容的显示
			data:{}, //列表默认信息
			// user_id:"",
			checkdata: {}, //权限编辑的默认信息
			checkList: [], //权限管理的选中
			form: {
				role_name:"",
				description:"",
				role_id:""
			}, //编辑存储的默认信息
		    rules: {
	          	role_name: [{ required: true, message: '', trigger: 'blur' }],
	          	description:[{ required: true, message: '', trigger: 'blur' }]
	        },
		    radio: '1', //编辑弹出的单选框
		    formLabelWidth: '100px', //弹出框的表头宽度
		    default:{
		    	"token":this.getCookie("token"),
		    	"role_id":""
		    },
		    id:""
		} 
    },
	components:{Fold},
	methods: {
		getEdit(val){ //点击编辑弹出基本内容的对话框
			this.dialogFormVisible = true;
			this.default.role_id = val;
			this.getAdminRole(this.default);
		},
		handleSubmit(ev) { //基本内容的对话框验证
			this.$refs.form.validate((valid) => {
		  		if (valid) {
		  			this.postAdminModule();
		  		} else {
		    		console.log('error submit!!');
		    		return false;
		  		}
			});
		},
		getAdminRole(_data){ //编辑获取基本信息
			POST({
                url:this.Api().getAdminRole,
                data:(_data),
                callback:data=>{
                    if (data.error == "0") {
                    	this.form = data.results[0];
                    }
                }
            });
		},
		postAdminModule(){ //模块修改
			POST({
				url:this.Api().postAdminRole,
                data:{
					"token":this.getCookie("token"),
					"role_id":this.form.role_id,
					"role_name":this.form.role_name,
					"description":this.form.description
				},
                callback:data=>{
                    if (data.error == "0") {
                    	alert(data.errorMsg);
                    	this.dialogFormVisible = false;
                    	this.default.role_id = "";
                    	this.getModule(this.default);
                    }
                }
			})
		},
		newEdit(){ //新建
			this.dialogFormVisible = true;
			this.form.role_id="";
			this.form.role_name="";
			this.form.description="";
		},
		getPermission(id){ //点击权限弹出权限对话框
			this.id = id;
			this.checkFormVisible = true;
			this.checkList = [];
			POST({
				url:this.Api().getAdminRoleModule,
				data:{"token":this.getCookie("token"),"role_id":id},
				callback:data=>{
					if (data.error == "0") {
						this.checkdata = data.results;

						let _results = data.results;
						let _this = this;
						_results.forEach(function(el,index){
							//这个动态监听很重要 不用$set监听不到
							_this.$set(el,"expanded",true)

							if(el.selected == "Y"){
								_this.checkList.push(el.module_id)
							}
							if (el.child) {
								el.child.forEach(function(elem,index2){
									if(elem.selected == "Y"){
										_this.checkList.push(elem.module_id)
									}
								})
							}
						})
					}
				}
			})
		},
		toggleChildren(item) { //一级菜单的点击
		 	this.$set(item,'expanded',!item.expanded);
		},
		changeTitleChecked(data,$event){ //父级选框选中触发的事件
			if (event.target.checked === true) {
			    data.forEach((item,index)=>{
			    	this.checkList.indexOf(item.module_id) === -1 && this.checkList.push(item.module_id);
			    })
			  }else {
			    data.forEach((item,index)=>{
			    	this.checkList.remove(item.module_id);
			    })
			  }
		},
		changeChild(data,$event){  //二级菜单点击 父级也被选中
			if (event.target.checked === true) {
				this.checkList.push(data.module_id);
			}else{
				this.checkList.remove(data.module_id);
			}
		},
		checkSubmit(){
			POST({
				url:this.Api().postAdminRoleModule,
				data:{
					"role_id":this.id,
					"module_id":this.checkList,
					"token":this.getCookie("token")
				},
				callback:data=>{
					if (data.error == 0) {
						this.checkFormVisible = false;
						alert(data.errorMsg);
						this.getModule(this.default);
					}
				}
			})
		},
        //默认列表
        getModule(_data){
            POST({
                url:this.Api().getAdminRole,
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
        }
    },
    created(){
    	this.getModule(this.default);
    }
}
</script>
<style lang="less">
@import './../assets/css/variable.less';
.role_list{
	.role_title{
		li{width: 30%;}
	}
	.role_item{
		.user_content{
			p{width: 30%;}
			.submit{
				.height(20px);
				background:@red;
				padding:0 6px;
				color:@white;
				border:none;
            }
		}
	}
}
</style>