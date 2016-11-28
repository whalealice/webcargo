<template>
  <el-dialog title="提示" v-model="dialogVisible" size="tiny" show-close="false">
    <span>{{message}}</span>
    <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click.native="dialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props:['message','dialogVisible'],
    methods:{
      dialog(){
        let val = "1";
        this.$emit("dialog",val)
      }
    }
  };
</script>
<style lang="less">
  .el-button--primary{
    border-radius: 0px;
    span{
      color:#fff;
    }
    
  }
</style>