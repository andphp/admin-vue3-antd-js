<template>
  <div class="layout-container-vertical">
    <a-layout>
      <!-- side-bar start -->
      <div
        v-if="device === 'mobile' && !collapse"
        class="apa-mask"
        @click="toggleCollapse"
      ></div>
      <side-bar class="apa-sider" :class="classObj"></side-bar>
      <!-- side-bar end -->
      <a-layout
        class="apa-layout"
        :class="'mobile' == device ? 'apa-mobile-layout' : ''"
      >
        <TopBar layout="vertical" :device="device" class="apa-header"></TopBar>
        <tabs-bar />
        <ThemeDrawer></ThemeDrawer>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <main-content />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { Layout } from "ant-design-vue";

import SideBar from "./components/SideBar";
import ThemeDrawer from "@/apa/components/ThemeDrawer";
import TopBar from "./components/TopBar";
import TabsBar from "./components/TabsBar";
import MainContent from "./components/MainContent";
import { reactive, computed, toRefs } from "vue";
import store from "@/store";

export default {
  name: "Vertical",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    // ADrawer: Drawer,
    SideBar,
    ThemeDrawer,
    TopBar,
    TabsBar,
    MainContent,
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
  setup(props) {
    // function handleFoldSideBar() {
    //   store.dispatch("settings/foldSideBar");
    // }
    function toggleCollapse() {
      store.dispatch("settings/toggleCollapse");
    }
    // 这里存放返回数据
    const computedData = reactive({
      classObj: computed(() => {
        return {
          "apa-mobile": props.device === "mobile",
          "apa-collapse": computedData.collapse,
        };
      }),
      collapse: computed({
        get() {
          return store.state.settings.collapse;
        },
        set() {
          store.dispatch("settings/toggleCollapse");
        },
      }),
    });
    return {
      toggleCollapse,
      ...toRefs(computedData),
    };
  },
};
</script>

<style lang="less">
.layout-container-vertical {
  .apa-sider {
    position: fixed;
    left: 0;
    height: 100vh;
    overflow: auto;
    .apa-menu {
      height: calc(100vh - @apa-header-height);
    }
  }
  .apa-layout {
    padding-left: 250px;
    transition: all 0.2s;
  }
  .apa-mobile-layout {
    padding-left: 0;
    transition: all 0.2s;
  }
  .apa-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #000;
    opacity: 0.5;
  }
  .apa-mobile {
    position: fixed !important;
    z-index: 999;
    &.apa-collapse {
      width: 0 !important;
      min-width: 0 !important;
      max-width: 0 !important;
      * {
        display: none !important;
        width: 0 !important;
        min-width: 0 !important;
        max-width: 0 !important;
      }
      .ant-menu-item,
      .ant-menu-submenu {
        display: none !important;
        width: 0 !important;
        min-width: 0 !important;
        max-width: 0 !important;
      }
      & + .apa-layout {
        padding-left: 0px !important;
        transition: all 0.2s;
      }
    }
  }
  .apa-collapse {
    .apa-logo .anticon + span {
      display: inline-block;
      max-width: 0;
      opacity: 0;
      transition: all 0.2s;
    }
    & + .apa-layout {
      padding-left: 81px;
      transition: all 0.2s;
    }
  }
  .apa-header {
    padding: 0;
    background: #fff;
    .ant-col + .ant-col {
      // display: flex;
      justify-content: flex-end;
      // padding: 0 @apa-padding;
    }
    .trigger {
      height: @apa-header-height;
      padding: 0 @apa-padding;
      font-size: 18px;
      line-height: @apa-header-height;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
