<template>
  <el-popover>
    <span class="header-notice">
      <el-badge value="12">
        <i style="font-size: 16px; padding: 4px" class="el-icon-bell"></i>
      </el-badge>
    </span>
  </el-popover>
</template>
<script>
export default {
  name: "NoticeIcon"
};
</script>
<style lang="less" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}
</style>
