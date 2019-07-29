import { Menu, Submenu, MenuItem, Icon } from "element-ui";

// const { MenuItem, SubMenu } = Menu;

export default {
  name: "SMenu",
  props: {
    menu: {
      type: Array,
      required: true
    }
  },
  data() {},
  computed: {},
  mounted: {},
  watch: {},
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
        <MenuItem {...{ key: menu.path }}>
          <tag {...{ props, attrs }}>
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </tag>
        </MenuItem>
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
        <Submenu>
          <span slot="title">
            {this.renderIcon(menu.meta.icon)}
            <span>{menu.meta.title}</span>
          </span>
          {itemArr}
        </Submenu>
      );
    },
    // 渲染菜单前面的图标
    renderIcon(icon) {
      if (icon === "none" || icon === undefined) {
        return null;
      }
      const props = {};
      typeof icon === "object" ? (props.component = icon) : (props.type = icon);
      return <Icon {...{ props }} />;
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

    return <Menu>{menuTree}</Menu>;
  }
};
