const loading = {
  state: {
    LOADING: false
  },
  mutations: {
    SHOW_LOADING: state => {
      state.LOADING = true;
    },
    HIDE_LOADING: state => {
      state.LOADING = false;
    }
  }
};

export default loading;
