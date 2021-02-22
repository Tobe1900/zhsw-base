import Vue from 'vue'
import App from '../App.vue'
import store from '../store'
import {registerMicroApps, start, setDefaultMountApp,initGlobalState} from 'qiankun'
import {getStorageToken} from '../utils/user-vali.js'
// 创建qkStart方法
import emits from "../utils/emit"
import appStore from '../utils/app-store'

let props = {
  data: store.getters,
  emits
}

const instance = new Vue({
  store,
  render: h => h(App),
}).$mount('#app')


const loader = loading => {
  if(instance && instance.$children) {
    instance.$children[0].isLoading = loading
  }
}

const appContainer = "#subapp-viewport";
const qkStart = appList => {
  const apps = []
  let defaultApp = null; // 默认注册应用路由前缀
  appList.forEach(i => {
    apps.push({
      name: i.module,
      entry: i.entry,
      container: appContainer,
      activeRule: i.routerBase,
      loader,
      props: { ...props, routes: i.data, routerBase: i.routerBase }
    })
    if (i.defaultRegister) defaultApp = i.routerBase;
  })

  registerMicroApps(apps, {
    beforeLoad: app => {
      console.log('before load app.name====>>>>>', app.name)
    },
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      }
    ],
    afterMount: [
      app => {
        console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
      }
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      }
    ]
  })

  setDefaultMountApp(defaultApp + '/')
  start();
  appStore(initGlobalState);
}


//
const href = "http://" + location.hostname;

// 无需登录的应用
const noAuthApps = [
  {
    module: "common-login",
    defaultRegister: true,
    entry: href + ':7766',
    routerBase: "/common-login",
    useExternals: true,
    data: [
      {
        id: "1",
        title: "login",
        icon: "el-icon-monitor",
        children: [
          {
            id: "1-1",
            title: "home",
            url: "/login"
          }
        ]
      }
    ]
  },
]

// 需要登陆身份但是和模块菜单授权无关的子应用
const nextAuthApps = [

]

// getMicroApps
const getMicroApps = () => {
  let _res = [
    {
      defaultRegister: true,
      entry: "//localhost:7777",
      module: "pipepr-web",
      routerBase: "/pipepr-web",
      data: [{
        children: [
          {
            id:'0-1',
            title:'导入管网数据',
            ul: '/mainpage',
            data: [
              {
                children: [
                  {
                    id:'0-1',
                    title:'导入管网数据111',
                    ul: '/mainpage',
                  }
                ]
              }
            ]
          },
          {
            id:'0-2',
            title:'统计查询',
            ul: '/mainpage'
          }
        ],
        icon: "el-icon-monitor",
        id: "0",
        title: "管线宝"
      }]

    },
    {
      defaultRegister: false,
      entry: "//localhost:7788",
      module: "sub-project-1",
      routerBase: "/sub-project-1",
      data: [{
        children: [
          {
            id:'1-1',
            title:'子项目菜单1',
            ul: '/menuOne'
          },
          {
            id:'1-2',
            title:'子项目菜单2',
            ul: '/menuTwo'
          }
        ],
        icon: "el-icon-date",
        id: "1",
        title: "子项目1"
      }]

    }
  ]
  let _menu = [];
  _res.forEach(i => {
    if (Array.isArray(i.data)) _menu.push(...i.data)
  })
  store.dispatch('menu/setMenu', _menu);
  qkStart([..._res, ...nextAuthApps])
}


// 创建microAppStart方法动态启动微应用

const microAppStart = () => {
  const token = getStorageToken();
  /**
   * @name 已登录状态获取服务端微应用注册表
   */
  if (token) {
    // 处理token状态共享
    store.dispatch('app/setToken', token);
    getMicroApps();
    return;
  }
  /**
   * @name 默认加载未登录时无需服务端获取的微应用
   */
  console.log('hello qiankun login')
  qkStart(noAuthApps)
}

export default microAppStart
