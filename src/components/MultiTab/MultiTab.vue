<script>
export default {
  name: "MultiTab",
  data() {
    return {
      activeKey: "",
      pages: [],
      fullPathList: []
    };
  },
  created() {
    this.pages.push(this.$route);
    this.fullPathList.push(this.$route.fullPath);
    this.selectedLastPath();
  },
  methods: {
    selectedLastPath() {
      this.activeKey = this.fullPathList[this.fullPathList.length - 1];
    },
    removeTab(targetKey) {
      this.pages = this.pages.filter(page => page.fullPath !== targetKey);
      this.fullPathList = this.fullPathList.filter(path => path !== targetKey);
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!this.fullPathList.includes(this.activeKey)) {
        this.selectedLastPath();
      }
    }
  },
  watch: {
    $route: function(newVal) {
      this.activeKey = newVal.fullPath;
      if (this.fullPathList.indexOf(newVal.fullPath) < 0) {
        this.fullPathList.push(newVal.fullPath);
        this.pages.push(newVal);
      }
    },
    activeKey: function(newPathKey) {
      this.$router.push({ path: newPathKey });
    }
  },
  render() {
    const { pages } = this;
    // 用来判断是否只剩一个tab，若只剩一个tab，不能关闭
    let lastPath = pages.length > 1 ? true : false;
    const panes = pages.map(page => {
      return (
        <el-tab-pane
          label={page.meta.title}
          name={page.path}
          key={page.path}
        ></el-tab-pane>
      );
    });

    return (
      <div>
        <el-tabs
          v-model={this.activeKey}
          closable={lastPath}
          type="card"
          // jsx语法添加点击事件
          {...{ on: { "tab-remove": this.removeTab } }}
        >
          {panes}
        </el-tabs>
      </div>
    );
  }
};
</script>
