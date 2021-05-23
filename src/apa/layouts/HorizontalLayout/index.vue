<!-- 横向布局  -->
<template>
  <div class="layout-container-horizontal">
    <a-layout>
      <TopBar :device="device" layout="horizontal"></TopBar>
      <tabs-bar />
      <ThemeDrawer></ThemeDrawer>
      <a-layout-content>
        <main-content />
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import { Layout } from "ant-design-vue";

import ThemeDrawer from "@/apa/components/ThemeDrawer";
import TopBar from "./components/TopBar";
import TabsBar from "./components/TabsBar";
import MainContent from "./components/MainContent";

// import ApaMenu from "@/apa/components/ApaMenu";

export default {
  name: "horizontal",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ThemeDrawer,
    TopBar,
    MainContent,
    TabsBar,
  },
  props: {
    fixedHeader: {
      type: Boolean,
      default() {
        return true;
      },
    },
    showTabsBar: {
      type: Boolean,
      default() {
        return true;
      },
    },
    device: {
      type: String,
      default() {
        return "desktop";
      },
    },
  },
  setup() {
    // 这里存放返回数据
    return {};
  },
};
</script>
<style lang="less" scoped>
.layout-container-horizontal {
  position: relative;

  &.fixed {
    padding-top: (@base-top-bar-height + @base-tabs-bar-height) !important;
  }

  &.fixed.no-tabs-bar {
    padding-top: @base-top-bar-height !important;
  }

  ::v-deep {
    .vab-main {
      width: 88% !important;
      margin: auto;
    }

    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: @base-z-index - 2;
      width: 100%;
      overflow: hidden;
      transition: @base-transition;
    }

    .tag-bar-horizontal {
      background: @base-color-white;
      box-shadow: @base-box-shadow;
    }

    .nav-bar-container {
      .fold-unfold {
        display: none;
      }
    }

    .main-padding {
      .app-main-container {
        margin-top: @base-padding;
        margin-bottom: @base-padding;
        background: @base-color-white;
      }
    }
  }
}
</style>
