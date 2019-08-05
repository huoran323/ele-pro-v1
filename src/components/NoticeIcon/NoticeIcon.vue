<template>
  <el-popover
    placement="bottom"
    title="标题"
    width="200"
    trigger="click"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <span class="header-notice" slot="reference">
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
  height: 100%;

  span {
    vertical-align: initial;
  }
}
</style>
