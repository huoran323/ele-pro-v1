<template>
  <el-card>
    <div slot="header">复杂表格</div>
    <div class="searchDiv">
      <el-input placeholder="请输入订单号" class="width1" v-model="sch_order" type="text"></el-input>
      <el-select placeholder="请选择状态" class="width1" v-model="sch_status" clearable>
        <el-option
          v-for="item in options"
          :label="item.label"
          :value="item.value"
          :key="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        type="date"
        placeholder="选择日期"
        class="width1"
        v-model="sch_date"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
    </div>

    <el-table :data="tableList" border stripe>
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="order" label="订单号"></el-table-column>
      <el-table-column prop="dateTime" label="下单时间"></el-table-column>
      <el-table-column prop="address" label="配送地址" width="280"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="name" label="配送员"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | tagClass">
            {{
            scope.row.status | statusText
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300"></el-table-column>
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
</template>
<script>
import { getComplexList } from "@/api/table";
export default {
  name: "TableComplex",
  data() {
    return {
      sch_order: "",
      sch_status: null,
      sch_date: null,
      options: [
        { label: "待审核", value: 1 },
        { label: "配送中", value: 2 },
        { label: "已完成", value: 3 },
        { label: "已取消", value: 4 }
      ],
      sch_Arr: [],
      all_list: [],
      tableList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40]
    };
  },
  filters: {
    statusText(val) {
      if (val === undefined) return;
      if (val === 1) {
        return "待审核";
      } else if (val === 2) {
        return "配送中";
      } else if (val === 3) {
        return "已完成";
      } else {
        return "已取消";
      }
    },
    tagClass(val) {
      if (val === undefined) return;
      if (val === 1) {
        return "";
      } else if (val === 2) {
        return "warning";
      } else if (val === 3) {
        return "success";
      } else {
        return "danger";
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      getComplexList().then(res => {
        this.all_list = res.data.tableList;
        this.total = res.data.count;
        this.schArr = this.all_list;
        this.getPageData();
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPageData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPageData();
    },
    getPageData() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = start + this.pageSize;
      this.tableList = this.schArr.slice(start, end);
    }
  }
};
</script>
<style lang="scss" scoped>
.searchDiv {
  margin-bottom: 20px;
  .el-button {
    padding: 11px 20px;
  }
}
.width1 {
  width: 180px;
  margin-right: 10px;
}
.fyDiv {
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>