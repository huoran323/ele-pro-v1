<template>
  <div class="driver">
    <el-card>
      <p class="driver_p0">
        <i class="el-icon-s-opportunity"></i>点击按钮可查看本管理系统的基本操作
      </p>
      <!-- @click.stop阻止事件冒泡 -->
      <el-button type="primary" @click.stop="guide">引导</el-button>
    </el-card>
  </div>
</template>
<script>
import driver from "@/mixins/userDriver";
export default {
  components: {},
  mixins: [driver]
};
</script>
<style lang="scss" scoped>
.driver {
  padding: 20px;

  .driver_p0 {
    font-size: 14px;
    margin-bottom: 20px;
    i {
      margin-right: 5px;
      color: #ffc107;
      font-size: 18px;
    }
  }
}
</style>