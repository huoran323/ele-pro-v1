const getters = {
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  userInfo: state => state.user.userInfo
};

export default getters;
