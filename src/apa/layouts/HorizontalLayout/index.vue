<!-- 横向布局  -->
<template>
  <a-layout>
    <a-layout-header>
      <top-bar layout="horizontal"></top-bar>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <tabs-bar></tabs-bar>
      <main-content></main-content>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { Layout } from "ant-design-vue";
import {
  // reactive,
  // computed,
  // toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from "vue";
import TopBar from "../../components/TopBar";
import TabsBar from "../../components/TabsBar";
import MainContent from "../../components/MainContent";
export default {
  name: "Horizontal",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    TopBar,
    TabsBar,
    MainContent
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
  setup() {
    onBeforeMount(() => {}); //挂载前
    onMounted(() => {}); //挂载完成之后调用
    onBeforeUpdate(() => {}); //DOM数据更新前调用
    onUpdated(() => {}); //DOM数据更新完成调用
    onBeforeUnmount(() => {}); //实例销毁之前
    onUnmounted(() => {}); //实例销毁后
    //这里存放返回数据
    return {};
  }
};
</script>
<style lang="less" scoped></style>
