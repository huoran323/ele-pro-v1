const getters = {
  addRouters: state => state.permission.addRouters,
  roleId: state => state.user.roleId,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  userInfo: state => state.user.userInfo
};

export default getters;
