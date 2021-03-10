import Vue from "vue";
import App from "../App.vue";
import store from "../store";
import router from "../router";
import {
  registerMicroApps,
  start,
  setDefaultMountApp,
  initGlobalState,
} from "qiankun";
import { getStorageToken } from "@/utils/user-vali";
// 创建qkStart方法
import emits from "../utils/emit";
import appStore from "../utils/app-store";

let props = {
  data: store.getters,
  emits,
};

const instance = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

const loader = (loading) => {
  if (instance && instance.$children) {
    instance.$children[0].isLoading = loading;
  }
};

const appContainer = "#subapp-viewport";
const qkStart = (appList) => {
  const apps = [];
  let defaultApp = null; // 默认注册应用路由前缀
  appList.forEach((i) => {
    apps.push({
      name: i.module,
      entry: i.entry,
      container: appContainer,
      activeRule: i.routerBase,
      loader,
      props: { ...props, routes: i.data, routerBase: i.routerBase },
    });
    if (i.defaultRegister) defaultApp = i.routerBase;
  });

  registerMicroApps(apps, {
    beforeLoad: (app) => {
      console.log("before load app.name====>>>>>", app.name);
    },
    beforeMount: [
      (app) => {
        console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
      },
    ],
    afterMount: [
      (app) => {
        console.log("[LifeCycle] after mount %c%s", "color: green;", app.name);
      },
    ],
    afterUnmount: [
      (app) => {
        console.log(
          "[LifeCycle] after unmount %c%s",
          "color: green;",
          app.name
        );
      },
    ],
  });

  setDefaultMountApp(defaultApp + "/");
  start();
  appStore(initGlobalState);
};

//
const href = "http://" + location.hostname;

// 无需登录的应用
const noAuthApps = [
  {
    module: "common-login",
    defaultRegister: true,
    entry: href + ":7766",
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
            url: "/login",
          },
        ],
      },
    ],
  },
];

// 需要登陆身份但是和模块菜单授权无关的子应用
const nextAuthApps = [];

const pipepr_web_menus = [
  {
    path: "/pipepr-web/dataUpload",
    name: "数据上传",
    meta: { title: "数据上传", icon: "dataUpload" },
    children: [
      {
        path: "dataImport",
        name: "数据导入",
        meta: { title: "数据导入", icon: "" },
        children: [
          {
            name: "导入管网数据",
            path: "importData",
            meta: { title: "导入管网数据", icon: "" },
          },
          {
            name: "挂载缺陷信息",
            path: "mountFault",
            meta: { title: "挂载缺陷信息", icon: "" },
          },
        ],
      },
      {
        path: "dataCheck",
        name: "数据质检",
        meta: { title: "数据质检", icon: "" },
        children: [
          {
            name: "异常值规则设置",
            path: "abnormalSetting",
            meta: { title: "异常值规则设置", icon: "" },
          },
          {
            name: "全局规则设置",
            path: "globalRuleSetting",
            meta: { title: "全局规则设置", icon: "" },
          },
          {
            name: "开始质检",
            path: "beginCheck",
            meta: { title: "开始质检", icon: "" },
          },
          {
            name: "质检历史",
            path: "checkHistory",
            meta: { title: "质检历史", icon: "" },
          },
        ],
      },
      {
        name: "数据入库",
        path: "dataStorage",
        meta: { title: "数据入库", icon: "" },
      },
    ],
  },
  {
    path: "/pipepr-web/dataManagement",
    name: "数据管理",
    meta: { title: "数据管理", icon: "dataManagement" },
    children: [
      {
        name: "数据列表",
        path: "dataList",
        meta: { title: "数据列表", icon: "" },
      },
      {
        name: "数据拼接",
        path: "dataConcat",
        meta: { title: "数据拼接", icon: "" },
      },
    ],
  },
  {
    path: "/pipepr-web/fault",
    name: "缺陷信息",
    meta: { title: "缺陷信息", icon: "faultInfo" },
    children: [
      {
        name: "缺陷一张图",
        path: "faultGraph",
        meta: { title: "缺陷一张图", icon: "" },
      },
    ],
  },
  {
    path: "/pipepr-web/pipeReview",
    name: "管网复核",
    meta: { title: "管网复核", icon: "pipeReview" },
    children: [
      {
        name: "工单总览",
        path: "orderReview",
        meta: { title: "工单总览", icon: "" },
      },
      {
        name: "工单计划",
        path: "orderPlan",
        meta: { title: "工单计划", icon: "/" },
      },
      {
        name: "复查审核",
        path: "recheck",
        meta: { title: "复查审核", icon: "" },
      },
      {
        name: "统计分析",
        path: "analysis",
        meta: { title: "统计分析", icon: "" },
      },
    ],
  },
  {
    path: "/pipepr-web/stats",
    name: "统计查询",
    meta: { title: "统计查询", icon: "stats" },
    children: [
      {
        name: "综合查询",
        path: "comprehensiveSearch",
        meta: { title: "综合查询", icon: "" },
      },
      {
        name: "分类查询",
        path: "classifySearch",
        meta: { title: "分类查询", icon: "" },
      },
      {
        name: "条件查询",
        path: "conditionsSearch",
        meta: { title: "条件查询", icon: "" },
      },
      {
        name: "缓冲区查询",
        path: "bufferSearch",
        meta: { title: "缓冲区查询", icon: "" },
      },
      {
        name: "资产统计",
        path: "assetsStats",
        meta: { title: "资产统计", icon: "" },
      },
    ],
  },
  {
    path: "/pipepr-web/pipeAnalysis",
    name: "管网分析",
    meta: { title: "管网分析", icon: "pipeAnalysis" },
    children: [
      {
        name: "横剖面分析",
        path: "crossSectionAnalysis",
        meta: { title: "横剖面分析", icon: "" },
      },
      {
        name: "纵剖面分析",
        path: "longitudinalSectionAnalysis",
        meta: { title: "纵剖面分析", icon: "" },
      },
      {
        name: "连通性分析",
        path: "connectivityAnalysis",
        meta: { title: "连通性分析", icon: "" },
      },
      {
        name: "上下游分析",
        path: "upDownStreamAnalysis",
        meta: { title: "上下游分析", icon: "" },
      },
      {
        name: "年限分析",
        path: "yearsAnalysis",
        meta: { title: "年限分析", icon: "" },
      },
      {
        name: "最近设施分析",
        path: "recentFacilitiesAnalysis",
        meta: { title: "最近设施分析", icon: "" },
      },
    ],
  },
  {
    path: "/pipepr-web/systemManagement",
    name: "系统管理",
    meta: { title: "系统管理", icon: "systemManagement" },
    children: [
      {
        name: "日志管理",
        path: "logManagement",
        meta: { title: "日志管理", icon: "" },
      },
      {
        name: "参数设置",
        path: "argumentsSetting",
        meta: { title: "参数设置", icon: "" },
      },
      {
        name: "数据字典",
        path: "dataDictionary",
        meta: { title: "数据字典", icon: "" },
      },
      {
        name: "系统通知",
        path: "systemNotification",
        meta: { title: "系统通知", icon: "" },
      },
    ],
  },
  { name: "扩展功能", path: "/", meta: { title: "扩展功能", icon: "" } },
];

const getMicroApps = () => {
  let _res = [
    {
      defaultRegister: true,
      entry: "//localhost:7777",
      module: "pipepr-web",
      routerBase: "/pipepr-web",
      data: pipepr_web_menus,
    },
    {
      defaultRegister: false,
      entry: "//localhost:7788",
      module: "sub-project-1",
      routerBase: "/sub-project-1",
      data: [
        {
          children: [
            {
              id: "1-1",
              title: "子项目菜单1",
              ul: "/menuOne",
            },
            {
              id: "1-2",
              title: "子项目菜单2",
              ul: "/menuTwo",
            },
          ],
          icon: "el-icon-date",
          id: "1",
          title: "子项目1",
        },
      ],
    },
  ];
  let _menu = [];
  _res.forEach((i) => {
    if (Array.isArray(i.data)) _menu.push(...i.data);
  });
  store.dispatch("menu/setMenu", _menu);
  qkStart([..._res, ...nextAuthApps]);
};

// 创建microAppStart方法动态启动微应用

const microAppStart = () => {
  const token = getStorageToken();
  /**
   * @name 已登录状态获取服务端微应用注册表
   */
  if (token) {
    // 处理token状态共享
    store.dispatch("app/setToken", token);
    getMicroApps();
    return;
  }
  /**
   * @name 默认加载未登录时无需服务端获取的微应用
   */
  console.log("hello qiankun login");
  qkStart(noAuthApps);
};

export default microAppStart;
