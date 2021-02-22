const getStorageToken = () => {
  return window.localStorage.getItem('token')
}

export {
  getStorageToken
}
