<template>
  <el-dialog title="提示" v-model="dialogVisible" size="tiny">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    }
  };
</script>