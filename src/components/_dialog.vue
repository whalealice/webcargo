<template>
  <el-dialog title="提示" v-model="dialogVisible" size="tiny">
    <span>{{dialogMessage}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="submitCancle">取 消</el-button>
      <el-button type="primary" @click.native="submitOK">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    props:["dialogMessage","dialogVisible"],
    methods:{
      submitOK(){
        this.$emit("submitOK")
      },
      submitCancle(){
        this.$emit("submitCancle")
      }
    }
  };
</script>
<style lang="less">
  .el-button{
    border-radius: 0px;
  }
</style>