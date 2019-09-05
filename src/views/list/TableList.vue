<template>
  <el-card>
    <div slot="header">基础表格</div>
    <el-table :data="tableData" border>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  name: "TableList",
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getBasicTable();
  },
  methods: {
    getBasicTable() {
      this.$http.get("/table/getBasicList").then(res => {
        this.tableData = res.data;
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
