<template>
  <page-view :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ userInfo.name }}</div>
      <div>VUE前端工程师</div>
    </div>
    <div>
      <el-row :gutter="24">
        <el-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <!-- 通过设置body-style来设置card内容区 -->
          <el-card :body-style="{ padding: '0px' }" class="project-list">
            <div slot="header">
              <span>进行中的项目</span>
              <el-button style="float: right; padding: 3px 0" type="text">全部项目</el-button>
            </div>

            <el-card
              v-for="(item, index) in projects"
              :key="index"
              :style="{float: 'left', width: '33.33%'}"
            >
              <div class="card-title">
                <el-avatar :src="item.cover" size="small"></el-avatar>
                <a>{{item.title}}</a>
              </div>
              <div class="card-description">{{item.description}}</div>
              <div class="project-item">
                <a href="/#/">科学搬砖组</a>
                <span class="datetime">9小时前</span>
              </div>
            </el-card>
          </el-card>

          <el-card style="margin-top: 20px;margin-bottom: 20px; min-height:600px">
            <div slot="header">
              <span>动态</span>
            </div>
            <ul>
              <li v-for="(item, index) in activities" :key="index">
                <div class="activity">
                  <el-avatar :src="item.user.avatar" size="small" style="align-item: center"></el-avatar>
                  <div class="activity-content">
                    <div
                      style="margin-left:20px;position:relative;line-height:22px;margin-top:20px"
                    >
                      {{ item.user.nickname }}
                      &nbsp;
                      在&nbsp;
                      <a
                        href="#"
                      >{{ item.project.name }}</a>
                      &nbsp;
                      {{ item.project.action }}&nbsp;
                      <a
                        href="#"
                      >{{ item.project.event }}</a>
                    </div>
                    <div style="margin-left:20px;line-height:22px">{{ item.time }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </el-card>
        </el-col>
        <el-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <el-card>
            <div slot="header">
              <span>快速开始/便捷导航</span>
            </div>
            <div class="item-group">
              <a>操作一</a>
              <a>操作二</a>
              <a>操作三</a>
              <a>操作四</a>
              <a>操作五</a>
              <a>操作六</a>
              <el-button type="primary" icon="el-icon-plus" plain>添加</el-button>
            </div>
          </el-card>

          <el-card style="margin-top:20px">
            <div slot="header">
              <span>XX指数</span>
            </div>
            <Radar />
          </el-card>

          <el-card style="margin-top:20px;min-height: 273px;margin-bottom:20px">
            <div slot="header">
              <span>团队</span>
            </div>
            <div class="members">
              <el-row>
                <el-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <el-avatar :src="item.avatar" size="small"></el-avatar>
                    <span class="member">{{item.name}}</span>
                  </a>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </page-view>
</template>
<script>
import { PageView } from "@/layouts";
import { timeFix } from "@/utils/util";
import { mapGetters } from "vuex";
import { Radar } from "@/components";
export default {
  components: { PageView, Radar },
  data() {
    return {
      timeFix: timeFix(),
      user: {},
      projects: [],
      activities: [],
      teams: []
    };
  },
  computed: {
    // 计算属性，监听userInfo
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  created() {
    this.user = this.userInfo;
  },
  mounted() {
    this.getProjects();
    this.getActivity();
    this.getTeams();
  },
  methods: {
    getProjects() {
      this.$store.commit("SHOW_LOADING");
      debugger;
      this.$http.get("/list/search/projects").then(res => {
        this.projects = res.result && res.result.data;
      });
    },
    getActivity() {
      this.$http.get("/workplace/activity").then(res => {
        this.activities = res.result;
      });
    },
    getTeams() {
      this.$http.get("/workplace/teams").then(res => {
        this.teams = res.result;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }
  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
    font-size: 14px;
    margin-top: 10px;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
}
.item-group {
  font-size: 0;
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

ul {
  list-style: none;

  li {
    line-height: 60px;
    border-bottom: solid 1px #f5f5f5;
  }
}

.activity {
  margin-left: 20px;

  .activity-content {
    display: inline-block;
    position: relative;

    a {
      color: #1890ff;
    }
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}
</style>

