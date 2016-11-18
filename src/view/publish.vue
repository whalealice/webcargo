<template>
	<div class="nav">
        <Fold :title="title"></Fold>
        <div class="publish">
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
						<el-input v-model="ruleForm.send_address" placeholder="请填写发货地址"></el-input>
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
					        <el-input  placeholder="发货人电话" v-model="ruleForm.send_user_mobile" style="width: 100%;"></el-input>
					      </el-form-item>
					    </el-col>
					</el-form-item>
					<el-form-item label="发货日期" required>
					    <el-col :span="7">
					      	<el-form-item prop="startdate">
					        	<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startdate" style="width: 100%;"></el-date-picker>
					      	</el-form-item>
					    </el-col>
					    <el-col class="line" :span="3" style="text-align:center;color:#5e6d82;">至</el-col>
					    <el-col :span="7">
					      	<el-form-item prop="enddate">
					        	<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.enddate" style="width: 100%;"></el-date-picker>
					      	</el-form-item>
					    </el-col>
					</el-form-item>
					<el-form-item label="收货地址" prop="receive_address" class="input_wrap" style="margin-top:40px;">
						<el-input v-model="ruleForm.receive_address" placeholder="请填写收货地址"></el-input>
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
					        <el-input  placeholder="收货人电话" v-model="ruleForm.receive_user_mobile" style="width: 100%;"></el-input>
					      </el-form-item>
					    </el-col>
					</el-form-item>
					<el-form-item label="货物类型" prop="goods_type_default" style="margin-top:40px;">
					    <el-select v-model="ruleForm.goods_type_default" placeholder="--请选择--" style="width:144px;">
					      	<el-option v-for="item in ruleForm.goods_type_default" value="111" ></el-option>
					    </el-select>
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
					      	<el-checkbox label="线下付款" name="payment" style="margin-right:20px;"></el-checkbox>
					      	<el-checkbox label="线上付款（未开通）" name="payment" style="margin-right:20px;" disabled></el-checkbox>
					      	<el-checkbox label="货物保险" name="payment"></el-checkbox> 
					    </el-checkbox-group>
					</el-form-item>
					<el-form-item label="备注" class="input_wrap" >
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
			var regnum =/^[\d]+$/;
	        if (!regnum.test(value)) {
	          callback(new Error('请输入数字'));
	        } else {
	          callback();
	        }
	    };
		return {
			title:"发货",
			ruleForm: {
				send_address: '', //发货地址
				receive_address: '',
				send_user_name: '',
				send_user_mobile: '',
				receive_user_name: '',
				receive_user_mobile: '',
				startdate: '',
				enddate: '',
				goods_type_default: [
			      {"name": "精煤"},
			      {"name": "钢材"},
			      {"name": "焦炭"},
			      {"name": "铝材"}
			    ],
				cargo_weight: '',
				expect_price: '',
				payment: []
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
	          	startdate: [
	            	{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
	          	],
	          	enddate: [
	           		{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
	          	],
	         	goods_type_default: [
	            	{ required: true, message: '请选择货物类型', trigger: 'change' }
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
		handleSubmit(ev) {
			this.$refs.ruleForm.validate((valid) => {
		  		if (valid) {
		    		console.log(this.payment)
		  		} else {
		    		console.log('error submit!!');
		    		return false;
		  		}
			});
		}
    }
}
</script>

<style lang="less">

@import './../assets/css/variable.less';
.publish{
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