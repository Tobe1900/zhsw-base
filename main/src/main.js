import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'nprogress/nprogress.css'

import microAppStart from './core/auth'
Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

// const instance = new Vue({
//   store,
//   render: h => h(App),
// }).$mount('#app')

// new Vue({
//   store,
//   render: h => h(App),
// }).$mount('#app')
microAppStart()
// const loader = loading => {
//   if(instance && instance.$children) {
//     instance.$children[0].isLoading = loading
//   }
// }
//
// const apps = microApps.map(item => {
//   return {
//     ...item,
//     loader
//   }
// })
//
// registerMicroApps(apps, {
//   beforeLoad: app => {
//     console.log('before load app.name====>>>>>', app.name)
//   },
//   beforeMount: [
//     app => {
//       console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
//     }
//   ],
//   afterMount: [
//     app => {
//       console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
//     }
//   ],
//   afterUnmount: [
//     app => {
//       console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
//     }
//   ]
// })
//
// setDefaultMountApp('/common-login')
// start()





