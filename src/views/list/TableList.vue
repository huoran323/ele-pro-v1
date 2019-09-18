<template>
  <div>
    <el-card>
      <div slot="header">基础表格</div>
      <el-table :data="tableData" border>
        <el-table-column prop="time" label="日期"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-card>

    <el-card style="margin-top: 20px;margin-bottom: 20px">
      <div slot="header">带分页的表格</div>
      <el-table :data="pageData" border>
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | tagClass">
              {{
              scope.row.status | typeText
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
        class="fyDiv"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import { getBasicList, getPageList } from "@/api/table";
export default {
  name: "TableList",
  data() {
    return {
      tableData: [],
      pageData: [],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      total: 0
    };
  },
  mounted() {
    this.getBasicTable();
    this.getPageTable(this.currentPage, this.pageSize);
  },
  filters: {
    typeText(val) {
      if (val === undefined) return;
      if (val === 1) {
        return "高兴";
      } else if (val === 2) {
        return "痛苦";
      } else {
        return "悲伤";
      }
    },
    tagClass(val) {
      if (val === undefined) return;
      if (val === 1) {
        return "success";
      } else if (val === 2) {
        return "warning";
      } else {
        return "danger";
      }
    }
  },
  methods: {
    getBasicTable() {
      getBasicList({ page: 1, pageSize: 5 }).then(res => {
        this.tableData = res.data.data;
      });
    },
    getPageTable(current, size) {
      getPageList({ page: current, pageSize: size }).then(res => {
        this.pageData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPageTable(val, this.pageSize);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPageTable(this.currentPage, val);
    }
  }
};
</script>
<style lang="scss" scoped>
.fyDiv {
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
