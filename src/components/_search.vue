<template>
	<div class="search">
       	<div class="ord_search">
	       	<el-col :span="5">
		        <el-input  :span="5" placeholder="请输入内容" v-model="orderId">
				    <el-button slot="append" icon="search" @click="searchOrder"></el-button>
				</el-input>
			 </el-col>
			 <el-button  size="small" @click="searchHanlde">高级<i class="icon_arrow"></i></el-button>
	        <p class="export" @click="getExport"><span class="el-icon-upload2"></span>导出</p>
       	</div>
       	<div class="grade_search" v-show="searchVisible">
       		<el-form :inline="true" :model="formInline" class="demo-form-inline">
       			<el-button type="text">发货地</el-button>

       			<citySelect @sendValue="sendValue"></citySelect>

			  	<el-button type="text">收货地</el-button>

			  	<citySelect @receiveValue="receiveValue"></citySelect>

			  	<el-button type="text">发货时间</el-button>
			  	<el-form-item>
			    	<el-date-picker type="date" placeholder="选择日期" size="small" v-model="formInline.start_time" format="yyyy-MM-dd"></el-date-picker>
			  	</el-form-item>
			  	<el-button type="text">至</el-button>
			  	<el-form-item >
			    	<el-date-picker type="date" placeholder="选择日期" v-model="formInline.end_time" format="yyyy-MM-dd"></el-date-picker>
			  	</el-form-item>
  				<p class="select_btn"  @click="getFilter">筛选</p>
			  	
			</el-form>
			
       	</div>
	</div>
</template>
<script>
import citySelect from "../components/_address.vue";
export default {
    data() {
      	return {
        	searchVisible:false,
        	orderId:"",
        	formInline: {
         	 	start_time: '',
         		end_time: '',
         		send_address:'',
         		receive_address:''
        	}
     	}
    },
    props:['xls'],
    components:{citySelect},
    methods: {
    	searchHanlde(){ //点击高级的显示和隐藏
    		this.searchVisible = !this.searchVisible;
    	},
    	sendValue(val){ //接收城市选择传来的地址
    		this.formInline.send_address = val;
    	},
    	receiveValue(val){ //接收城市选择传来的地址
    		this.formInline.receive_address = val;
    	},
    	searchOrder(){ //搜索订单向父组件传递订单号
    		var val = this.orderId;
    		this.$emit("searchOrder",val);
    	},
    	getFilter(){ //高级筛选向父组件传递参数
    		var val = {
    			start_time: this.toTimeFormat(this.formInline.start_time).Format,
         		end_time: this.toTimeFormat(this.formInline.end_time).Format,
         		send_address:this.formInline.send_address,
         		receive_address:this.formInline.receive_address
    		}
    		this.$emit("getFilter",val);
    	},
    	getExport(){ //导出
    		if (this.xls == "") return;
    		window.location.href = this.xls;
    	}
    }
  }
</script>
<style lang="less">
@import './../assets/css/variable.less';
.search{
	margin: 20px 0;
	.ord_search{
		height: 30px;
		padding-bottom: 20px;
		border-bottom:1px solid @border_color;
		input,.el-input-group__append{
			border-radius: 0px;
			height: 30px;
			box-sizing: border-box;
		}
		button{
			background: none;
			border-radius: 0px;
			overflow: hidden;
			position:relative;
			left: -2px;
		}
		p{
			float: left;
			font-size: 14px;
			cursor: pointer;
		}
		.export{
			float: right;
			height: 30px;
			line-height: 30px;
			width: auto;
			.el-icon-upload2{
				margin-right: 5px;
			}
		}
		.icon_arrow{
			width: 9px;
			height: 6px;
			display: inline-block;
			background: url(/static/images/arrow_b.png) no-repeat 0 0;
			margin-left: 4px;
			position: relative;
		    top: -2px;
		}
	}
	.grade_search{
		height: 70px;
		padding-top: 15px;
		box-sizing: border-box;
		border-bottom:1px solid @border_color;
		input,button{
			border-radius: 0px;
			height: 30px;
			text-indent: 0px;
			margin-right: 10px;
		}
		.el-form-item{
			vertical-align: baseline;
		}
		.el-date-editor{
			width: 110px;
		}
		.select_btn{
			.ct_btn(60px,30px,@rgba:@red);
			float: right;
			cursor: pointer;
			margin:0px;
		}
	}
	.el-icon-close{color:#C0CCDA;}
}
</style>