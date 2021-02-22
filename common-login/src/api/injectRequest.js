const API = {
  LOGIN: '/auth/login',
}

export default (vm) => {
  vm.handleLogin = (username, password) => vm.post(`${API.LOGIN}`, {
    username: username,
    password: password
  }).then(res => Promise.resolve(res))
}
