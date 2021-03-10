const getters = {
  menu: state => state.menu.menu,
  is_collapse: state => state.menu.is_collapse,
  size: state => state.app.size,
  token: state => state.app.token,
  sidebar: state => state.app.sidebar,
  // msg: state => state.appstore.msg,
}

export default getters
