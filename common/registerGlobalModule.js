export default function registerGlobalModule(store, props = {}) {
  if (!store || store.hasModule === undefined) {
    return;
  }
  const initState = (props.getGlobalState && props.getGlobalState) || {
    token: "",
    userInfo: {},
    menu: [],
  };
  if (!store.hasModule("global")) {
    const globalModule = {
      namespaced: true,
      state: initState,
      action: {
        setGlobalState({ commit }, payload) {
          commit("setGlobalState", payload);
          commit("emitGlobalState", payload);
        },
        initGlobalState({ commit }, payload) {
          commit("setGlobalState", payload);
        },
      },
      mutations: {
        setGlobalState(state, payload) {
          state = Object.assign(state, payload);
        },
        emitGlobalState(state) {
          if (props.setGlobalState) {
            props.setGlobalState(state);
          }
        },
      },
    };
    store.registerModule("global", globalModule);
  } else {
    store.dispatch("global/initGlobalState", initState);
  }
}
