<template>
  <div>
    <!-- 列表搜索过滤 -->
    <div>
      <el-form :model="searchForm" ref="searchForm">
        <el-row :gutter="24">
          <el-col :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="新闻类型">
              <el-select v-model="searchForm.type_new">
                <el-option
                  v-for="item in typeList"
                  :key="item.val"
                  :label="item.name"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="16" :md="16" :lg="16" :xl="16" style="text-align: right">
            <el-button size="small" type="success">查询</el-button>
            <el-button size="small" type="primary" @click="editRow({},'新增')">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 列表 -->
    <div>
      <el-table
        border
        highlight-current-row
        :header-cell-style="{
                        'background-color': '#f2f2f2',
                        'color': '#909399',
                        'font-weight':'bold'
                    }"
      >
        <el-table-column width="50" label="序号" align="center">
          <template slot-scope="scope">
            <span>{{(pageNum - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="新闻标题" align="center"></el-table-column>
        <el-table-column label="新闻类型" width="200" align="center"></el-table-column>
        <el-table-column label="编辑" width="300" align="center"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40,50,100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      ></el-pagination>
    </div>
    <!-- 新增，编辑，查看 -->
    <div>
      <el-dialog :title="dialogTitle" width="80%" :visible.sync="dialogStatus">
        <div>
          <el-form :model="newsDetail" ref="newsDetail" label-width="120px">
            <el-form-item label="新闻标题">
              <el-input placeholder="请输入新闻标题" v-model="newsDetail.news_title"></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="新闻来源">
                  <el-input placeholder="请输入新闻来源" v-model="newsDetail.news_source"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="新增类型">
                  <el-select v-model="newsDetail.news_type" style="width: 100%">
                    <el-option
                      v-for="item in typeList"
                      :key="item.val"
                      :label="item.name"
                      :value="item.val"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="新闻详情">
              <vue-ueditor-wrap v-model="newsDetail.news_detail" :config="myConfig"></vue-ueditor-wrap>
            </el-form-item>
          </el-form>
        </div>
        <div></div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
const types = [
  {
    val: 1,
    name: "技术服务功能"
  },
  {
    val: 2,
    name: "政策法规"
  },
  {
    val: 3,
    name: "能源新闻"
  }
];
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  components: { VueUeditorWrap },
  data() {
    return {
      description: "新闻管理用来录入不同类型的新闻，在首页展示新闻。",
      typeList: types,
      searchForm: {
        type_new: ""
      },
      tableList: [],
      loading: false,
      pageNum: 1,
      pageSize: 10,
      totalNum: 10,
      dialogTitle: "新增", //弹出框标题
      dialogStatus: false, //控制新增查看弹出框
      newsDetail: {
        news_title: "", //新闻标题
        news_source: "", //新闻来源
        news_type: "", //新闻类型
        news_detail: "" //新闻详情
      },
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 250,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: "http://139.9.194.191:5020/hbdldx/ueditor/exec",
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/UEditor/"
        // imageUrlPrefix: "",
        // imagePathFormat: "/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}"
      }
    };
  },
  methods: {
    /**
      新增，查看
     */
    editRow(row, type) {
      if (type === "新增") {
        this.dialogTitle = "新增";
        this.dialogStatus = true;
        return;
      }
    },
    /**
     * 列表条数改变回调
     */
    handleSizeChange(e) {
      this.pageNum = 1;
      this.pageSize = e;
      // this.getNewList();
    },
    /**
     * 企业列表页码改变回调
     */
    handleCurrentChange(e) {
      this.pageNum = e;
      // this.getNewList();
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .search-wrap {
    background: #ffffff;
    padding: 20px;
    padding-bottom: 0px;
    .search-btn-wrap {
      text-align: right;
    }
  }
}
</style>