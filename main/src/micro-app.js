const microApps = [
 {
   name: 'pipepr-web',
   entry: process.env.VUE_APP_PIPEPR_WEB,
   activeRule: '/pipepr-web'
 },
 {
   name:'sub-project-1',
   entry: process.env.VUE_APP_SUB_PROJECT_1,
   activeRule: '/sub-project-1'
 }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport',
    props: {
      routerBase: item.activeRule
    }
  }
})

export default apps
