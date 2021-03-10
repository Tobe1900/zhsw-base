<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/home"
      >
        <img v-if="logo" :src="logo" class="sidebar-logo" alt="" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/home">
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-left: 8px;
          "
        >
          <div>
            <img v-if="logo" :src="logo" class="sidebar-logo" alt="" />
            <span class="sidebar-title">{{ title }} </span>
          </div>
          <div class="sub-title">{{ subTitle }}</div>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
const logo = require("@/assets/headerLogo.svg");
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: "管网数字化管理系统",
      subTitle: "Pipe-networks Management System",
      logo: logo,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 35px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-right: 8px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 25px;
      font-size: 16px;
      font-family: sans-serif;
      vertical-align: middle;
    }
    & .sub-title {
      height: 20px;
      line-height: 18px;
      font-size: 11px;
      font-family: Microsoft YaHei, serif;
      transform: scaleX(0.8) scaleY(0.8);
      color: #fff;
      position: absolute;
      top: 30px;
      left: -5px;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
