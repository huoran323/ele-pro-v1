<template>
  <el-dropdown class="international" @command="handleSetLanguage">
    <span class="action" style="height: 60px; padding-top: 25px">
      {{language}}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="cn">中文</el-dropdown-item>
      <el-dropdown-item command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: "LangSelect",
  data() {
    return {
      language: ""
    };
  },
  mounted() {
    const _lang = localStorage.lang || "cn";
    this.getLanguage(_lang);
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
      this.getLanguage(lang);
    },
    getLanguage(val) {
      if (val === "cn") {
        this.language = "中文";
      }
      if (val === "en") {
        this.language = "English";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.international .el-dropdown-link {
  cursor: pointer;
  color: #c0ccda;
  font-size: 14px;
}
.el-icon-arrow-down {
  font-size: 14px;
}
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px !important;
}

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
</style>