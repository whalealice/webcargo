<template>
	 <div class="page_wrap">
	    <el-pagination
		    @current-change="handleCurrentChange"
		    :current-page='intoPage.curpage'
		    :page-size="10"
		    layout="total, prev, pager, next, jumper"
		    :total="Number(intoPage.totalCount)">
	    </el-pagination>
	</div>
</template>
<script>
export default {
	props:['intoPage'],
    methods: {
      	handleCurrentChange(val) {
        	console.log(`当前页: ${val}`);
        	this.$emit('currentPage',val)
      	}
    }
}
</script>
<style lang="less">
@import './../assets/css/variable.less';
.page_wrap{
	height:50px;
	padding-top:15px;
	text-align:right;
	border-top:1px solid @border_color;
	margin-top:40px;
	.el-input__inner{
		border-radius: 0px;
	}
	.el-pagination__editor{
		padding: 0;
	}
}

</style>