<template>
	<div class="publishInfo">
        <Fold :title="title"></Fold>
        <div class="publish_wrap">
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
	        		<el-form :model="ruleForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
						<el-form-item label="发货地址" prop="send_address" class="input_wrap">
							<el-input readonly="readonly" v-model="ruleForm.send_address" placeholder="请填写发货地址" ></el-input>
						</el-form-item>
						<el-form-item label="发货人" required>
						    <el-col :span="7">
						      <el-form-item prop="send_user_name">
						        <el-input readonly="readonly" placeholder="发货人姓名" v-model="ruleForm.send_user_name" style="width: 100%;"></el-input>
						      </el-form-item>
						    </el-col>
						    <el-col class="line" :span="3" style="text-align:center;color:#5e6d82;">电话</el-col>
						    <el-col :span="7">
						      <el-form-item prop="send_user_mobile">
						        <el-input  readonly="readonly" placeholder="发货人电话" v-model="ruleForm.send_user_mobile" style="width: 100%;"></el-input>
						      </el-form-item>
						    </el-col>
						</el-form-item>
						<el-form-item label="发货日期" required>
						    <el-col :span="7">
						      	<el-form-item prop="send_start_time">
						        	<el-input readonly="readonly" placeholder="选择日期" v-model="ruleForm.send_start_time" style="width: 100%;"></el-input>
						      	</el-form-item>
						    </el-col>
						    <el-col class="line" :span="3" style="text-align:center;color:#5e6d82;">至</el-col>
						    <el-col :span="7">
						      	<el-form-item prop="send_end_time">
						        	<el-input  readonly="readonly" placeholder="选择日期" v-model="ruleForm.send_end_time" style="width: 100%;"></el-input >
						      	</el-form-item>
						    </el-col>
						</el-form-item>
						<el-form-item label="收货地址" prop="receive_address" class="input_wrap" style="margin-top:40px;">
							<el-input readonly="readonly" v-model="ruleForm.receive_address" placeholder="请填写收货地址"></el-input>
						</el-form-item>
						<el-form-item label="收货人" required >
						    <el-col :span="7">
						      <el-form-item prop="receive_user_name">
						        <el-input readonly="readonly" placeholder="收货人姓名" v-model="ruleForm.receive_user_name"  style="width: 100%;"></el-input>
						      </el-form-item>
						    </el-col>
						    <el-col class="line" :span="3" style="text-align:center;color:#5e6d82;">电话</el-col>
						    <el-col :span="7">
						      <el-form-item prop="receive_user_mobile">
						        <el-input readonly="readonly"  placeholder="收货人电话" v-model="ruleForm.receive_user_mobile" style="width: 100%;"></el-input>
						      </el-form-item>
						    </el-col>
						</el-form-item>
						<el-form-item label="货物类型" prop="cargo_name" style="margin-top:40px;">
							<el-col :span="7">
								<el-input readonly="readonly"  placeholder="货物类型" v-model="ruleForm.cargo_name" style="width: 100%;"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="货物重量" required>
						    <el-col :span="7">
						      <el-form-item prop="cargo_weight">
						        <el-input readonly="readonly" placeholder="货物重量" v-model="ruleForm.cargo_weight" style="width: 100%;"></el-input>
						      </el-form-item>
						    </el-col>
						    <el-col class="line" :span="2" style="text-align:center;color:#5e6d82;">吨</el-col>
						</el-form-item>
						<el-form-item label="期望运费" required>
						    <el-col :span="7">
						      <el-form-item prop="expect_price">
						        <el-input readonly="readonly" placeholder="期望运费" v-model="ruleForm.expect_price" style="width: 100%;"></el-input>
						      </el-form-item>
						    </el-col>
						    <el-col class="line" :span="3" style="text-align:center;color:#5e6d82;">元 / 吨</el-col>
						</el-form-item>
						<el-form-item label="付款方式" prop="payment" class="input_wrap">
						    <el-checkbox-group v-model="ruleForm.payment">
						      	<el-checkbox label="线下付款" name="payment" style="margin-right:20px;" disabled></el-checkbox>
						      	<el-checkbox label="线上付款（未开通）" name="payment" style="margin-right:20px;" disabled></el-checkbox>
						      	<el-checkbox label="货物保险" name="payment" disabled></el-checkbox> 
						    </el-checkbox-group>
						</el-form-item>
						<el-form-item label="备注" class="input_wrap" >
						    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
						</el-form-item>
					</el-form>

	        	</div>
	        	<div class="btn_wrap">
	        		<!-- <router-link class="publish_btn left" to="/Home/Publish">返回修改</router-link> -->
					<button class="publish_btn left" @click="backSubmit">返回修改</button>
					<button class="publish_btn right" @click="handleSubmit">确认招标</button>
				</div>
	        </div>
        </div>
        <Alert :message="message" :dialogVisible="dialogVisible" @dialog="dialog"></Alert>
	</div>
</template>
<script>

import Fold from '../components/_fold.vue';
import Alert from '../components/_alert.vue';
import {POST,GET} from '../assets/js/api.js'
export default {
	name:"publishInfo",
	data() {
		return {
			title:"发货",
			message:"",//alert组件的内容
			dialogVisible:false, //alert组件的显示
			ruleForm: {
				send_address: '', //发货地址
				receive_address: '',
				send_user_name: '',
				send_user_mobile: '',
				receive_user_name: '',
				receive_user_mobile: '',
				send_start_time: '',
				send_end_time: '',
				cargo_name: '',
				cargo_weight: '',
				expect_price: '',
				payment:"",
				pay_status:"",
  				cargo_insure:"",
  				remark:""
			}
		}
    },
	components:{Fold,Alert},
	methods: {
		dialog(val){
			if (val == 1) {
				this.dialogVisible = false;
				this.$router.push({ path:'/Home/CargoList'});
			}
		},
		handleSubmit(ev) {
			let _payment = this.ruleForm.payment;
			this.ruleForm.pay_status = _payment.includes('线下付款')?'1':'2';
			this.ruleForm.cargo_insure = _payment.includes('货物保险')?'2':'1';
			var _data = this.ruleForm;
			delete this.ruleForm.payment;

			
			POST({
				url:this.Api().setCargo,
				data:_data,
				callback:data=>{
					if (data.error == 0) {
						this.dialogVisible = true;
						this.message = "您已招标成功！";
						
					}
					
				}
    		})
		},
		backSubmit(){
			this.$router.push({ path:'/Home/SetCargo',query:this.ruleForm});
		}
    },
    created(){
    	let query = this.$route.query;
    	this.ruleForm = query;
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
    .publish{
		width: 600px;
		margin: 0 auto;
		box-shadow: 0px 10px 20px 5px #9EA7B4;
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
			.publish_btn{
				.ct_btn(160px,@rgba:@red);
				font-size: 18px;
				cursor: pointer;
				margin: 25px 70px;
			}
			.left{
				background: @button_blue;
			}
		}
	}
}

</style>