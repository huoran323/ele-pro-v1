<template>
  <div>
    <!-- 列表搜索过滤 -->
    <div>
      <el-form :model="searchForm" ref="searchForm">
        <el-row :gutter="24">
          <el-col :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="新闻类型">
              <el-select v-model="searchForm.type_new" clearable>
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
            <el-button size="small" type="success" @click="getNewsList">查询</el-button>
            <el-button size="small" type="primary" @click="editRow({},'新增')">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 列表 -->
    <div>
      <el-table
        :data="tableList"
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
        <el-table-column label="新闻标题" align="center" prop="news_title"></el-table-column>
        <el-table-column label="新闻类型" width="200" align="center" prop="news_type">
          <template slot-scope="scope">
            <span>
              {{
              scope.row.news_type | typeText
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="编辑" width="300" align="center">
          <template slot-scope="scope">
            <el-button type="text" class="button-green" @click="editRow(scope.row,'修改')">修改</el-button>
            <div class="split-line"></div>
            <el-button type="text" class="button-red" @click="delRow(scope.row)">删除</el-button>
            <div class="split-line"></div>
            <el-button type="text" class="button-blue" @click="editRow(scope.row,'查看')">查看</el-button>
          </template>
        </el-table-column>
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
      <el-dialog :title="dialogTitle" width="80%" :visible.sync="dialogStatus" @close="closeDiaCb">
        <div>
          <el-form
            :model="newsDetail"
            ref="newsDetail"
            :rules="newsDetailRules"
            label-width="120px"
          >
            <el-form-item label="新闻标题" prop="news_title">
              <el-input
                placeholder="请输入新闻标题"
                v-model="newsDetail.news_title"
                :disabled="dialogTitle === '查看'"
              ></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="新闻来源" prop="news_source">
                  <el-input
                    placeholder="请输入新闻来源"
                    v-model="newsDetail.news_source"
                    :disabled="dialogTitle === '查看'"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="新闻类型" prop="news_type">
                  <el-select
                    v-model="newsDetail.news_type"
                    style="width: 100%"
                    :disabled="dialogTitle === '查看'"
                  >
                    <el-option
                      v-for="item in typeList"
                      :key="item.news_type"
                      :label="item.name"
                      :value="item.news_type"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="新闻详情" prop="news_detail">
              <vue-ueditor-wrap
                v-model="newsDetail.news_detail"
                :config="myConfig"
                v-if="dialogTitle !== '查看'"
              ></vue-ueditor-wrap>
              <div
                class="ueditor-wrap"
                v-else
                v-html="newsDetail.news_detail"
              >{{newsDetail.news_detail}}</div>
            </el-form-item>
            <el-form-item label="新闻图片" prop="news_img">
              <el-upload
                class="avatar-uploader"
                :action="'#'"
                :disabled="dialogTitle === '查看'"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imgUrl" :src="imgUrl" class="avatar" alt />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button
            type="primary"
            size="small"
            @click="saveSupplierTech"
            v-if="dialogTitle !== '查看'"
          >保存</el-button>
          <el-button @click="dialogStatus = false" size="small">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
const types = [
  {
    news_type: "1",
    name: "技术服务功能"
  },
  {
    news_type: "2",
    name: "政策法规"
  },
  {
    news_type: "3",
    name: "能源新闻"
  }
];
import VueUeditorWrap from "vue-ueditor-wrap";
import * as api from "@/api/news.js";
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
      totalNum: 0,
      dialogTitle: "新增", //弹出框标题
      dialogStatus: false, //控制新增查看弹出框
      newsDetail: {
        news_id: "",
        news_title: "", //新闻标题
        news_source: "", //新闻来源
        news_type: "", //新闻类型
        news_detail: "", //新闻详情
        news_img: "" //新闻图片
      },
      imgUrl: "", //上传图片
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 250,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: "",
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/UEditor/",
        imageUrlPrefix: "",
        // imagePathFormat: "/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}"
      },
      // 表单验证
      newsDetailRules: {
        news_title: [
          {
            required: true,
            message: "新闻标题不能为空",
            trigger: "blur"
          }
        ],
        news_source: [
          {
            required: true,
            message: "新闻来源不能为空",
            trigger: "blur"
          }
        ],
        news_type: [
          {
            required: true,
            message: "新闻类型不能为空",
            trigger: "change"
          }
        ],
        news_detail: [
          {
            required: true,
            message: "新闻内容不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    //获取新闻列表
    getNewsList() {
      api
        .getNewsList({
          page: this.pageNum,
          pageSize: this.pageSize,
          news_type: this.searchForm.type_new
        })
        .then(res => {
          if (res) {
            this.tableList = res.data.data;
            this.totalNum = res.data.total;
          }
        });
    },
    /**
      新增，查看
     */
    editRow(row, type) {
      if (type !== "新增") {
        this.newsDetail.news_id = row.news_id;
        this.newsDetail.news_title = row.news_title;
        this.newsDetail.news_source = row.news_source;
        this.newsDetail.news_type = row.news_type;
        this.newsDetail.news_detail = row.news_detail;
        this.newsDetail.news_img = row.news_img;
        this.imgUrl = row.news_img;
      }

      this.dialogTitle = type;
      this.dialogStatus = true;
    },
    /**
     * 删除
     */
    delRow(row) {
      this.$confirm("您确定删除这条数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(_ => {
        console.log("row:", row);
        api.deleteNews({ news_id: row.news_id }).then(res => {
          if (res) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.getNewsList();
          }
        });
      });
    },
    /**
     * 列表条数改变回调
     */
    handleSizeChange(e) {
      this.pageNum = 1;
      this.pageSize = e;
      this.getNewList();
    },
    /**
     * 企业列表页码改变回调
     */
    handleCurrentChange(e) {
      this.pageNum = e;
      this.getNewList();
    },
    /**
      图片上传
     */
    beforeAvatarUpload(file) {
      let formData = new FormData();
      formData.append("file", file);
      api.upload(formData).then(res => {
        this.newsDetail.news_img = res.data.url;
        this.imgUrl = res.data.url;
      });
    },
    /**
      新增、修改 保存
     */
    saveSupplierTech() {
      this.$refs["newsDetail"].validate(valid => {
        if (valid) {
          let params = {};
          if (this.dialogTitle === "新增") {
            params = this.newsDetail;
          } else {
            params = { ...this.newsDetail, new_id: "" };
          }

          api.saveNews(params).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getNewsList();
              this.dialogStatus = false;
            }
          });
        }
      });
    },
    /**
     * 关闭弹窗回调函数
     */
    closeDiaCb() {
      this.$refs.newsDetail.resetFields();
      this.imgUrl = "";
    }
  },
  filters: {
    typeText(val) {
      if (val === undefined) return;
      if (val == 1) {
        return "技术服务功能";
      } else if (val == 2) {
        return "政策法规";
      } else {
        return "能源新闻";
      }
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

  .button-green {
    color: #40be6c;
  }
  .button-red {
    color: #ff8971;
  }
  .button-blue {
    color: #0090e7;
  }
  .split-line {
    width: 2px;
    height: 12px;
    background: #adadad;
    display: inline-block;
    margin: 0 8px;
    vertical-align: middle;
  }

  .ueditor-wrap {
    border: 1px solid #ededed;
    min-height: 200px;
    max-height: 200px;
    overflow-y: auto;
  }
}
.avatar-uploader {
  text-align: left;

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    background-color: #409eff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    border: 1px dashed #d9d9d9;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>