<script>
export default {
  name: "SideMenuItem",
  components: {},
  props: {
    menu: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      bgColor: "#304156"
    };
  },
  computed: {
    activeMenu() {}
  },
  methods: {
    renderItem(menu) {
      if (!menu.hidden) {
        return menu.children && !menu.hideChildrenInMenu
          ? this.renderSubMenu(menu)
          : this.renderMenuItem(menu);
      }
    },
    // 渲染菜单
    renderMenuItem(menu) {
      const target = menu.meta.target || null; // 跳转到外部链接
      const tag = (target && "a") || "router-link"; //跳转外部链接的两种方式
      const props = { to: { name: menu.name } }; //props是用来给上面的<a>标签使用的
      const attrs = { href: menu.path, target: menu.meta.target }; // attrs是用来给上面的<router-link>标签使用的

      if (menu.children && menu.hideChildrenInMenu) {
        // 把有子菜单的 并且 父菜单是要隐藏子菜单的
        // 都给子菜单增加一个 hidden 属性
        // 用来给刷新页面时， selectedKeys 做控制用
        menu.children.forEach(item => {
          //Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。(重新修改hidden的属性)
          item.meta = Object.assign(item.meta, {
            hidden: true
          });
        });
      }

      return (
        <el-menu-item index={menu.path}>
          {this.renderIcon(menu.meta.icon)}
          <span>{menu.meta.title}</span>
        </el-menu-item>
      );
    },

    // 渲染子菜单
    renderSubMenu(menu) {
      const itemArr = [];
      if (!menu.hideChildrenInMenu) {
        menu.children.forEach(item => {
          itemArr.push(this.renderItem(item));
        });
      }
      return (
        <el-submenu index={menu.path}>
          <span slot="title">
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </span>
          {itemArr}
        </el-submenu>
      );
    },
    // 渲染菜单前面的图标
    renderIcon(icon) {
      if (icon === "none" || icon === undefined) {
        return null;
      }
      return <i class={icon} />;
    }
  },
  render() {
    const { menu } = this;

    const menuTree = menu.map(item => {
      if (item.hidden) {
        return null;
      }
      return this.renderItem(item);
    });

    return (
      <el-menu
        mode="vertical"
        router
        default-active={this.$route.path}
        background-color={this.bgColor}
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        unique-opened={true}
      >
        {menuTree}
      </el-menu>
    );
  }
};
</script>
<style lane="less" scoped>
</style>
