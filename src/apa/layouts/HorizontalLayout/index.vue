<!-- 横向布局  -->
<template>
  <div class="layout-container-horizontal">
    <a-layout>
      <TopBar
        :collapse="collapse"
        :device="device"
        layout="horizontal"
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
  </div>
</template>
<script>
import { Layout } from "ant-design-vue";

import ThemeDrawer from "@/apa/components/ThemeDrawer";
import TopBar from "@/apa/components/TopBar";
import { provide, ref } from "vue";
// import ApaMenu from "@/apa/components/ApaMenu";

export default {
  name: "Horizontal",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
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
    // console.log("props==", props);
    provide("collapse", props.collapse);
    // console.log("fixedHeader==", props.fixedHeader);
    provide("fixedHeader", props.fixedHeader);
    // console.log("showTabsBar==", props.showTabsBar);
    provide("showTabsBar", props.showTabsBar);
    // console.log("device==", props.device);
    provide("device", props.device);
    provide("layout", "horizontal");

    // 全局主题设置
    const visible = ref(false);
    const showThemeDrawer = () => {
      visible.value = true;
    };
    const closeThemeDrawer = () => {
      visible.value = false;
    };
    //这里存放返回数据
    return {
      visible,
      showThemeDrawer,
      closeThemeDrawer
    };
  }
};
</script>
<style lang="less" scoped></style>
