<template>
	 <div class="page_wrap">
	    <el-pagination
		    @size-change="handleSizeChange"
		    @current-change="handleCurrentChange"
		    :current-page="10"
		    :page-sizes="[10, 20, 30, 40]"
		    :page-size="100"
		    layout="total, sizes, prev, pager, next, jumper"
		    :total="100">
	    </el-pagination>
	</div>
</template>
<script>
export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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