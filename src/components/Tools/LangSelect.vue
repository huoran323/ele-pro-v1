<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <span>
        {{language}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    </div>
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
</style>