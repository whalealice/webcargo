<template>
	<div class="search">
       	<div class="ord_search">
	       	<el-col :span="5">
		        <el-input  :span="5" placeholder="请输入内容">
				    <el-button slot="append" icon="search"></el-button>
				</el-input>
			 </el-col>
			 <el-button  size="small">高级<i class="icon_arrow"></i></el-button>
	        <p class="export"><span class="el-icon-upload2"></span>导出</p>
       	</div>
       	<div class="grade_search">
       		<el-form :inline="true" :model="formInline" class="demo-form-inline">
       			<el-button type="text">发货地</el-button>
			  	<el-form-item>
			    	<el-input size="small" v-model="formInline.user" placeholder="请输入发货地"></el-input>
			  	</el-form-item>
			  	<el-button type="text">收货地</el-button>
			  	<el-form-item>
			    	<el-input size="small" v-model="formInline.user" placeholder="请输入收货地"></el-input>
			  	</el-form-item>
			  	<el-button type="text">发货时间</el-button>
			  	<el-form-item>
			    	<el-date-picker type="date" placeholder="选择日期" size="small" v-model="formInline.user" ></el-date-picker>
			  	</el-form-item>
			  	<el-button type="text">至</el-button>
			  	<el-form-item >
			    	<el-date-picker type="date" placeholder="选择日期" v-model="formInline.user" ></el-date-picker>
			  	</el-form-item>
  				<button class="select_btn">筛选</button>
			  	
			</el-form>
			
       	</div>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
}
</style>