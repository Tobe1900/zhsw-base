<template>
  <div id="root" class="main-container">
    <template v-if="hasToken">
      <sidebar class="sidebar-container" />
      <!--      <custom-menu class="main-menu-box" />-->
      <div class="main-container-content">
<!--        <custom-nav />-->
        <navbar/>
        <div class="main-container-view">
          <el-scrollbar class="wl-scroll">
            <div id="subapp-viewport" class="app-view-box"></div>
          </el-scrollbar>
        </div>
      </div>
    </template>
    <div v-else id="subapp-viewport" class="app-view-box"></div>
  </div>
</template>

<script>
// import Menu from "@/components/Menu.vue";
// import Nav from "@/components/Nav.vue";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import NProgress from "nprogress";
import microApps from "./micro-app";
export default {
  name: "App",
  data() {
    return {
      isLoading: true,
      microApps,
      current: "/pipepr-web/",
    };
  },
  components: {
    // 'custom-menu': Menu,
    // "custom-nav": Nav,
    Sidebar,
    Navbar,
  },
  computed: {
    hasToken() {
      return !!this.$store.getters.token;
    },
  },
  watch: {
    isLoading(val) {
      if (val) {
        NProgress.start();
      } else {
        this.$nextTick(() => {
          NProgress.done();
        });
      }
    },
  },
  methods: {
    goto(item) {
      history.pushState(null, item.activeRule, item.activeRule);
      // this.current = item.name
    },
    bindCurrent() {
      const path = window.location.pathname;
      if (this.microApps.findIndex((item) => item.activeRule === path) >= 0) {
        this.current = path;
      }
    },
    listenRouterChange() {
      const _wr = function (type) {
        const orig = history[type];
        return function () {
          const rv = orig.apply(this, arguments);
          const e = new Event(type);
          e.arguments = arguments;
          window.dispatchEvent(e);
          return rv;
        };
      };
      history.pushState = _wr("pushState");
      window.addEventListener("pushState", this.bindCurrent);
      window.addEventListener("popstate", this.bindCurrent);
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("pushState", this.bindCurrent);
        window.removeEventListener("popstate", this.bindCurrent);
      });
    },
  },
  created() {
    this.bindCurrent();
    NProgress.start();
  },
  mounted() {
    this.listenRouterChange();
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.main-container-content {
  flex: 1;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  > .main-container-view {
    padding: 8px;
    width: 100%;
    height: calc(100% - 60px);
    background: $main-base-color;
    box-sizing: border-box;
    > .wl-scroll {
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 4px;
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }

    .app-view-box {
      width: 100%;
      padding: 12px;
      box-sizing: border-box;
    }
  }
}
</style>
