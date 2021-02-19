<template>
  <div class="layout-container-vertical">
    <a-layout>
      <!-- side-bar start -->
      <a-drawer
        v-if="device == 'mobile'"
        placement="left"
        :closable="false"
        :visible="collapse"
        :bodyStyle="{ padding: '0px' }"
        @close="handleUnFoldSideBar"
      >
        <side-bar></side-bar>
      </a-drawer>
      <side-bar v-else :collapse="collapse"></side-bar>
      <!-- side-bar end -->
      <a-layout>
        <TopBar
          :collapse="collapse"
          layout="vertical"
          :device="device"
          @showThemeDrawer="showThemeDrawer"
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
            minHeight: '280px'
          }"
        >
          Content
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { Layout, Drawer } from "ant-design-vue";

import SideBar from "@/apa/components/SideBar";
import ThemeDrawer from "@/apa/components/ThemeDrawer";
import TopBar from "@/apa/components/TopBar";
import { provide, ref } from "vue";
import store from "@/store";
// import ApaMenu from "@/apa/components/ApaMenu";

export default {
  name: "Vertical",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ADrawer: Drawer,
    SideBar,
    ThemeDrawer,
    TopBar
  },
  props: {
    collapse: {
      type: Boolean,
      default() {
        return false;
      }
    },
    fixedHeader: {
      type: Boolean,
      default() {
        return true;
      }
    },
    showTabsBar: {
      type: Boolean,
      default() {
        return true;
      }
    },
    device: {
      type: String,
      default() {
        return "desktop";
      }
    }
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
    function handleUnFoldSideBar() {
      store.dispatch("settings/openSideBar");
    }
    //这里存放返回数据
    return {
      visible,
      showThemeDrawer,
      closeThemeDrawer,
      handleUnFoldSideBar
    };
  }
};
</script>

<style lang="less" scoped></style>
