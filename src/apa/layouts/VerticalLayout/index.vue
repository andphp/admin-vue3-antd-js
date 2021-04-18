<template>
  <div class="layout-container-vertical">
    <a-layout>
      <!-- side-bar start -->
      <!-- <a-drawer
        v-if="device == 'mobile'"
        placement="left"
        :closable="false"
        :visible="!collapse"
        :bodyStyle="{ padding: '0px' }"
        @close="toggleCollapse"
      >
        <side-bar></side-bar>
      </a-drawer> -->
      <div
        v-if="device === 'mobile' && !collapse"
        class="apa-mask"
        @click="toggleCollapse"
      ></div>
      <side-bar
        class="apa-sider"
        :class="classObj"
        :collapse="collapse"
      ></side-bar>
      <!-- side-bar end -->
      <a-layout
        class="apa-layout"
        :class="'mobile' == device ? 'apa-mobile-layout' : ''"
      >
        <TopBar
          :collapse="collapse"
          layout="vertical"
          :device="device"
          @showThemeDrawer="showThemeDrawer"
          class="apa-header"
        ></TopBar>

        <ThemeDrawer
          :collapse="collapse"
          :visible="visible"
          @closeThemeDrawer="closeThemeDrawer"
        ></ThemeDrawer>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <!-- <tabs-bar /> -->
          <apa-main />
          ================================== {{ collapse }}
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { Layout } from "ant-design-vue";

import SideBar from "@/apa/components/SideBar";
import ThemeDrawer from "@/apa/components/ThemeDrawer";
import TopBar from "@/apa/components/TopBar";
// import TabsBar from "@/apa/components/TabsBar";
import ApaMain from "@/apa/components/ApaMain";
import { provide, ref, reactive, computed, toRefs } from "vue";
import store from "@/store";
// import ApaMenu from "@/apa/components/ApaMenu";

export default {
  name: "Vertical",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    // ADrawer: Drawer,
    SideBar,
    ThemeDrawer,
    TopBar,
    // TabsBar,
    ApaMain,
  },
  props: {
    collapse: {
      type: Boolean,
      default() {
        return false;
      },
    },
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
    // console.log("collapse==", props.collapse);
    provide("collapse", props.collapse);
    // console.log("fixedHeader==", props.fixedHeader);
    provide("fixedHeader", props.fixedHeader);
    // console.log("showTabsBar==", props.showTabsBar);
    provide("showTabsBar", props.showTabsBar);
    // console.log("device==", props.device);
    provide("device", props.device);
    provide("layout", "vertical");

    // 全局主题设置
    const visible = ref(false);
    const showThemeDrawer = () => {
      visible.value = true;
    };
    const closeThemeDrawer = () => {
      visible.value = false;
    };
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
          "apa-collapse": props.collapse,
        };
      }),
    });
    return {
      visible,
      showThemeDrawer,
      closeThemeDrawer,
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
      display: flex;
      justify-content: flex-end;
      padding: 0 @apa-padding;
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
