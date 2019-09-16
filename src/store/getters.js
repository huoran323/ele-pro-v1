const getters = {
  addRouters: state => state.permission.addRouters,
  userType: state => state.user.user_type,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  userInfo: state => state.user.userInfo
};

export default getters;
