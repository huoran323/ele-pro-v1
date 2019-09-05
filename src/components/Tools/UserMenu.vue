<template>
  <div class="user-wrapper">
    <div class="content-box">
      <notice-icon class="action"></notice-icon>
      <el-dropdown>
        <span class="action" id="domPersonal">
          <!-- 头像 -->
          <el-avatar :src="avatar()" class="avatar" size="small"></el-avatar>
          <span>{{nickname()}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="{name: 'center'}">
              <span>
                <i class="el-icon-user"></i>
                <span>个人中心</span>
              </span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{name: 'center'}">
              <span>
                <i class="el-icon-setting"></i>
                <span>账户设置</span>
              </span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <a href="javascript:;" @click="handleLogout">
              <span>
                <i class="el-icon-switch-button"></i>
                <span>退出登录</span>
              </span>
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import NoticeIcon from "@/components/NoticeIcon";
export default {
  name: "UserMenu",
  components: { NoticeIcon },
  methods: {
    ...mapActions(["Logout"]),
    ...mapGetters(["nickname", "avatar"]),

    handleLogout() {
      const that = this;

      this.$confirm("真的要注销登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return that.Logout({}).then(() => {
            window.location.reload();
          });
        })
        .catch(err => {});
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.user-wrapper {
  float: right;
  height: 100%;

  .content-box {
    float: right;

    .action {
      cursor: pointer;
      padding: 0 12px;
      display: inline-block;
      transition: all 0.3s;
      height: 100%;
      color: rgba(0, 0, 0, 0.65);

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }

      .avatar {
        margin: 20px 8px 20px 0;
        color: #1890ff;
        background: hsla(0, 0%, 100%, 0.85);
        vertical-align: middle;
      }

      .icon {
        font-size: 16px;
        padding: 4px;
      }
    }
  }
}
</style>
