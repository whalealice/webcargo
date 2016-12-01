<template>
	<div class="publish">
        <Fold :title="title"></Fold>
        <div class="publish_wrap">
        	<div class="publish_title">
                <ul>
                    <li><span class="one"></span>填写发货信息</li>
                    <li><span class="two"></span>物流公司报价</li>
                    <li><span class="three"></span>选择物流公司下单</li>
                    <li><span class="four"></span>运输</li>
                </ul>
            </div>
        	<div class="form">
        		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
					<el-form-item label="发货地址" prop="send_address" class="input_wrap">
						<el-input v-model="ruleForm.send_address" placeholder="请填写发货地址" ></el-input>
					</el-form-item>
					<el-form-item label="发货人" required>
					    <el-col :span="7">
					      <el-form-item prop="send_user_name">
					        <el-input placeholder="发货人姓名" v-model="ruleForm.send_user_name" style="width: 100%;"></el-input>
					      </el-form-item>
					    </el-col>
					    <el-col class="line" :span="3" style="text-align:center;color:#5e6d82;">电话</el-col>
					    <el-col :span="7">
					      <el-form-item prop="send_user_mobile">
					        <el-input  placeholder="发货人电话" v-model="ruleForm.send_user_mobile" :maxlength="11" style="width: 100%;"></el-input>
					      </el-form-item>
					    </el-col>
					</el-form-item>
					<el-form-item label="发货日期" required>
					    <el-col :span="7">
					      	<el-form-item prop="send_start_time">
					        	<el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" v-model="ruleForm.send_start_time" style="width: 100%;"></el-date-picker>
					      	</el-form-item>
					    </el-col>
					    <el-col class="line" :span="3" style="text-align:center;color:#5e6d82;">至</el-col>
					    <el-col :span="7">
					      	<el-form-item prop="send_end_time">
					        	<el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" v-model="ruleForm.send_end_time" style="width: 100%;"></el-date-picker>
					      	</el-form-item>
					    </el-col>
					</el-form-item>
					<el-form-item label="收货地址" prop="receive_address" class="input_wrap" style="margin-top:40px;">
						<el-input v-model="ruleForm.receive_address" placeholder="请填写收货地址" autocomplete="on"></el-input>
					</el-form-item>
					<el-form-item label="收货人" required >
					    <el-col :span="7">
					      <el-form-item prop="receive_user_name">
					        <el-input placeholder="收货人姓名" v-model="ruleForm.receive_user_name"  style="width: 100%;"></el-input>
					      </el-form-item>
					    </el-col>
					    <el-col class="line" :span="3" style="text-align:center;color:#5e6d82;">电话</el-col>
					    <el-col :span="7">
					      <el-form-item prop="receive_user_mobile">
					        <el-input  placeholder="收货人电话" v-model="ruleForm.receive_user_mobile" :maxlength="11" style="width: 100%;"></el-input>
					      </el-form-item>
					    </el-col>
					</el-form-item>
					<el-form-item label="货物类型" prop="goods_type_default" style="margin-top:40px;">
						<el-col :span="7" class="tac">
							<el-autocomplete
						      v-model="selected"
						      :fetch-suggestions="querySearch"
						      placeholder="请输入内容"
						      @select="handleSelect"
						    ></el-autocomplete>
					    </el-col>
					</el-form-item>
				
					<el-form-item label="货物重量" required>
					    <el-col :span="7">
					      <el-form-item prop="cargo_weight">
					        <el-input placeholder="货物重量" v-model="ruleForm.cargo_weight" style="width: 100%;"></el-input>
					      </el-form-item>
					    </el-col>
					    <el-col class="line" :span="2" style="text-align:center;color:#5e6d82;">吨</el-col>
					</el-form-item>
					<el-form-item label="期望运费" required>
					    <el-col :span="7">
					      <el-form-item prop="expect_price">
					        <el-input placeholder="期望运费" v-model="ruleForm.expect_price" style="width: 100%;"></el-input>
					      </el-form-item>
					    </el-col>
					    <el-col class="line" :span="3" style="text-align:center;color:#5e6d82;">元 / 吨</el-col>
					</el-form-item>
					<el-form-item label="付款方式" prop="payment" class="input_wrap">
					    <el-checkbox-group v-model="ruleForm.payment">
					      	<el-checkbox label="线下付款" name="ruleForm.payment" style="margin-right:20px;"></el-checkbox>
					      	<el-checkbox label="线上付款（未开通）" name="ruleForm.payment" style="margin-right:20px;" disabled></el-checkbox>
					      	<el-checkbox label="货物保险" name="ruleForm.payment"></el-checkbox> 
					    </el-checkbox-group>
					</el-form-item>
					<el-form-item label="备注" class="input_wrap" >
					    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
					</el-form-item>
				</el-form>

        	</div>
        	<div class="btn_wrap">
				<button class="sure_btn" @click="handleSubmit">招标</button>
			</div>
        </div>
	</div>
</template>
<script>

import Fold from '../components/_fold.vue';
import {POST,GET} from '../assets/js/api.js'
export default {
	name:"nav",
	data() {
		var validateMobile = (rule, value, callback) => {
			var regmobile = /^(((13[0-9]{1})|(147)|(145)|(170)|(17)[6-8]{1}|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	        if (!regmobile.test(value)) {
	          callback(new Error('请输入正确的手机号'));
	        } else {
	          callback();
	        }
	    };
	    var validateNum = (rule, value, callback) => {
			var regnum =/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
	        if (!regnum.test(value)) {
	          callback(new Error('请输入数字'));
	        } else {
	          callback();
	        }
	    };
		return {
			title:"发货",
			id:'',
			options: [],
			selected:'',
			startTime:'',
			endTime:'',
			ruleForm: {
				send_address: '', //发货地址
				receive_address: '',
				send_user_name: '',
				send_user_mobile: '',
				receive_user_name: '',
				receive_user_mobile: '',
				send_start_time: '',
				send_end_time: '',
				goods_type_default: '',
				cargo_weight: '',
				expect_price: '',
				payment: [],
				remark:''
			},
	        rules: {
	          	send_address: [
	            	{ required: true, message: '请输入发货地址', trigger: 'blur' }
	          	],
	          	receive_address:[
	            	{ required: true, message: '请输入收货地址', trigger: 'blur' }
	          	],
	          	send_user_name:[
	            	{ required: true, message: '请输入发货人姓名', trigger: 'blur' }
	          	],
	          	send_user_mobile:[
	            	{ required: true, message: '请输入发货人电话', trigger: 'blur' },
	            	{ validator: validateMobile }
	          	],
	          	receive_user_name:[
	            	{ required: true, message: '请输入收货人姓名', trigger: 'blur' }
	          	],
	          	receive_user_mobile:[
	            	{ required: true, message: '请输入收货人电话', trigger: 'blur' },
	            	{ validator: validateMobile }
	          	],
	          	send_start_time: [
	            	{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
	          	],
	          	send_end_time: [
	           		{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
	          	],
	         	goods_type_default: [
	            	{ required: true, message: '请输入货物类型', trigger: 'change' }
	          	],
	          	cargo_weight: [
	            	{ required: true, message: '请输入货物重量', trigger: 'blur' },
	            	{ validator: validateNum }
	         	],
	          	expect_price: [
	            	{ required: true, message: '请输入期望价格', trigger: 'blur' },
	            	{ validator: validateNum }
	          	],
	          	payment: [
	            { type: 'array', required: true, message: '请至少选择一种支付方式', trigger: 'change' }
	          	]
	        }
		}
    },
	components:{Fold},
	methods: {
		querySearch(queryString, cb) { //input输入框选择内容
	        var options = this.options;
	        // 调用 callback 返回建议列表的数据
	        cb(options);
	    },
	    handleSelect(item) {
	    	this.ruleForm.goods_type_default = item;
	    },
		handleSubmit(ev) { //表单验证
			this.$refs.ruleForm.validate((valid) => {
		  		if (valid) {
		    		this.setCargo();
		  		} else {
		    		console.log('error submit!!');
		    		return false;
		  		}
			});
		},
		isEmptyObject(obj) {
		  for (var key in obj) {
		    return false;
		  }
		  return true;
		},
		setCargo(){ //点击招标 -- 向确认发货页面传内容
			var _data = {
				"token":this.getCookie("token"),
				"send_address":this.ruleForm.send_address,
				"send_user_name":this.ruleForm.send_user_name,
				"send_user_mobile":this.ruleForm.send_user_mobile,
				"send_start_time":this.toTimeFormat(this.ruleForm.send_start_time).Format,
				"send_end_time":this.toTimeFormat(this.ruleForm.send_end_time).Format,
				"receive_address":this.ruleForm.receive_address,
				"receive_user_name":this.ruleForm.receive_user_name,
				"receive_user_mobile":this.ruleForm.receive_user_mobile,
				"cargo_name":this.ruleForm.goods_type_default,
				"cargo_weight":this.ruleForm.cargo_weight,
				"expect_price":this.ruleForm.expect_price,
				"payment":this.ruleForm.payment,
				"remark":this.ruleForm.remark
			}
			// this.setCookie("publish",JSON.stringify(_data));
			this.$router.push({ path:'/Home/publishInfo',query:_data});
			
		},
		getDefaultInfo(){ //获取默认发货信息
			
			if (!this.isEmptyObject(this.$route.query) && !this.$route.query.id) {
				let query = this.$route.query;
	    		this.ruleForm = query;
	    	
	    		this.ruleForm.send_start_time = new Date(query.send_start_time);
	    		this.ruleForm.send_end_time = new Date(query.send_end_time);
				POST({
					url:this.Api().getCargoDefault,
					data:{
						token:this.getCookie("token")
					},
					callback:data=>{
						if (data.results.goods_type_default) {
							this.options = data.results.goods_type_default;
						}
						
						this.selected = "";
					}
	    		})
	    		return;
			}
			
			POST({
				url:this.Api().getCargoDefault,
				data:{
					token:this.getCookie("token"),
					cargo_sn:this.id
				},
				callback:data=>{
					let _results = data.results;
					if (data.results.goods_type_default) {
						this.options = data.results.goods_type_default;
					}
					this.ruleForm.send_address = _results.send_address;
					this.ruleForm.send_user_mobile = _results.send_user_mobile;
					this.ruleForm.send_user_name = _results.send_user_name;
					this.ruleForm.receive_address = _results.receive_address;
					this.ruleForm.receive_user_mobile = _results.receive_user_mobile;
					this.ruleForm.receive_user_name = _results.receive_user_name;
					this.ruleForm.cargo_weight = _results.cargo_weight;
					this.ruleForm.expect_price = _results.expect_price;
				}
    		})
		}
    },
    watch:{
    	selected:function(val){
    		this.ruleForm.goods_type_default = val;
    	}
    },
    mounted() {
    	if (this.$route.query) {
            this.id = this.$route.query.id;
        }
        this.getDefaultInfo();
    }
}
</script>

<style lang="less">

@import './../assets/css/variable.less';
.publish_wrap{
	background:@white;
	width: 100%;
    height: 100%;
    overflow: hidden;
	.publish_title{
		height:50px;
		border-bottom:1px solid #ddd;
		margin-bottom: 40px;
		ul{
			height: 100%;
			margin: 0 auto;
			width: 520px;
			li{
				float: left;
				line-height: 50px;
				margin-right: 20px;
				span{
					width: 16px;
					height:16px;
					display: inline-block;
					background:url(/static/images/one.png) no-repeat ;
					margin-right: 5px;
					position: relative;
					top: 2px;
				}
				.two{background:url(/static/images/two.png) no-repeat;}
				.three{background:url(/static/images/three.png) no-repeat;}
				.four{background:url(/static/images/four.png) no-repeat;}
			}
		}
	}
	.form{
		width: 600px;
		margin: 0 auto;
		color:@a_base;
		margin-bottom: 40px;
		.el-input__inner,.el-date-editor__editor,.el-textarea__inner,input{
			border-radius: 0px;
			padding-left: 0px;
		}
		.input_wrap{
			width: 530px;
			.el-textarea__inner{
				height: 90px;
				padding-left: 10px;
			}
			.el-checkbox__inner{
				width: 12px;
				height:12px;
				border-radius: 0px;
				box-sizing: content-box;
			}
			.el-checkbox__inner::after {
			    content: "";
			    border: 1px solid #fff;
			    border-left: 0;
			    border-top: 0;
			    height: 8px;
			    left: 4px;
			    position: absolute;
			    top: 0px;
			}
		}
	}
	.btn_wrap{
		height: 80px;
		border-top: 1px solid #ddd;
		background: #fff;
		.sure_btn{
			.ct_btn(160px,@rgba:@red);
			font-size: 18px;
			margin:25px auto 0 ;
			display: block;
			cursor: pointer;
		}
	}
}
</style>