import Cookies from "js-cookie";
export default {
  namespaced: true,
  state: {
    size: 10, // 分页 页大小
    token: "",
    sidebar: {
      opened: Cookies.get("sidebarStatus")
        ? !!+Cookies.get("sidebarStatus")
        : true,
      withoutAnimation: false,
    },
    showSideBarLogo: false
  },
  mutations: {
    // 设置分页大小
    SET_PAGE_SIZE(state, data) {
      state.size = data;
    },
    // 设置token
    SET_TOKEN(state, data) {
      state.token = data;
    },
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        Cookies.set("sidebarStatus", 1);
      } else {
        Cookies.set("sidebarStatus", 0);
      }
    },
  },
  actions: {
    // 设置分页大小
    setPageSize({ commit }, data) {
      commit("SET_PAGE_SIZE", data);
    },
    // 设置token
    setToken({ commit }, data) {
      commit("SET_TOKEN", data);
    },
    toggleSideBar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
  },
};
