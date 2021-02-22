const microApps = [
  {
    name: 'common-login',
    entry: process.env.VUE_APP_COMMON_LOGIN,
    activeRule: '/common-login',
    container: '#login-viewport'
  },

 {
   name: 'pipepr-web',
   entry: process.env.VUE_APP_PIPEPR_WEB,
   activeRule: '/pipepr-web',
   container: '#subapp-viewport'
 },
 {
   name:'sub-project-1',
   entry: process.env.VUE_APP_SUB_PROJECT_1,
   activeRule: '/sub-project-1',
   container: '#subapp-viewport'
 }
]

const apps = microApps.map(item => {
  return {
    ...item,
    props: {
      routerBase: item.activeRule
    }
  }
})

export default apps
