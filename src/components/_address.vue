<template>
	<div class="address_wrap">
		<!-- <el-select v-model="value" filterable placeholder="请选择">
		    <el-option
				v-for="item in options"
				:label="item.label"
				:value="item.value">
		    </el-option>
	  	</el-select> -->
		<el-col class="line" >
		 	<el-input size="small" v-model="inputName" :value="cityValue" placeholder="请选择地地址" @click.native="inputHandle"></el-input>
		 	<i class="el-icon-close" @click="deleteValue"></i>
		</el-col>
		<div class="address_select" v-show="isShow">
			<p>
				<span style="margin-right:20px;">省份</span>
				<span>{{cityName}}</span>
			</p>
			<ul class="city_select">
				<li class="item_select" :value="parentId" @click="patentDefault">不限</li>
				<li class="item_select" v-for="item in cityDefault" :value="item.id" @click="itemHandle(item.id,item.name,item.parent_id)">{{item.name}}</li>
			</ul>
		</div>
    </div>
</el-row>
</template>
<script>
import {POST,GET} from "../assets/js/api.js"
export default {
    data() {
		return {
			isShow:false,
			cityName:"",  //城市名称
			cityDefault:[],//地址内容
			inputName:"", //input显示的内容
			cityValue:"", //input存储的value值
			parentId:""
		}
    },
    methods:{
    	patentDefault(){//点击不限 
    		this.isShow = false;
    		// console.log(this.cityValue)
    		this.citySelect(this.cityValue);
    	},
    	deleteValue(){ //删除选框里面的内容
    		this.cityValue = "";
    		this.inputName = "";
    		this.citySelect(this.cityValue);
    	},
    	inputHandle(){ //选框点击出现地址
    		this.isShow = true;
    		this.inputName = "";
    		this.cityName = "";
    		this.cityValue= "";
    		// console.log(this.parentId)
    		// this.getDistrict("");
    		this.getDistrict("");
    	},
    	getDistrict(_id){ //获取地址城市
    		POST({
    			url:this.Api().district,
    			data:{id:_id},
    			callback:data=>{
    				if (data.results.length) {
    					this.cityDefault = data.results;
    					// console.log(this.cityDefault)
    				}else{
    					this.isShow = false;
    					let val = this.cityValue;
    					// console.log(val)
    					this.citySelect(val)
    				}
    				
    			}
    		})
    	},
    	itemHandle(id,name,parentId){
    		this.cityName += " "+name;
    		this.inputName += " "+name;
    		this.cityValue = id;
    		this.parentId = parentId;

    		this.getDistrict( id )
    	},
    	citySelect(val){
    		this.$emit("sendValue",val);
    		this.$emit("receiveValue",val);
    	}
    },
    created(){
    	
    }
}
</script>
<style lang="less">
@import './../assets/css/variable.less';
.address_wrap{
	display:inline-block;
	position: relative;
	.el-icon-close{
		position: absolute;
		right: 10px;
		top: 8px;
	}
}
.address_select{
	position: absolute;
	top: 40px;
	width: 500px;
	height: auto;
	.border(@border_color);
	background: @white;
	z-index: 100;
	padding: 6px;
	box-sizing: border-box;
	p{
		.height(30px);
		border-bottom:1px solid #8492a6;
		color:#8492a6;
		text-indent: 10px;
		span{
			padding-right: 20px;
			margin-right: 10px;
			cursor:pointer;
			color:#8492a6;
		}
	}
	.item_select{
		float: left;
		padding:0 10px 0 10px ;
		.height(30px);
		color:@blue;
		cursor: pointer;
	}
}
</style>