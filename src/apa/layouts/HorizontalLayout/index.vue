<!-- 横向布局  -->
<template>
  <div
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabsBar
    }"
    class="layout-container-horizontal"
  >
    <div :class="fixedHeader ? 'fixed-header' : ''" class="layout-header">
      <top-bar></top-bar>
      <div v-if="showTabsBar" :class="{ 'tag-bar-horizontal': showTabsBar }">
        <div class="vab-main">
          <tabs-bar></tabs-bar>
        </div>
      </div>
    </div>
    <div class="vab-main main-padding">
      <main-content></main-content>
    </div>
  </div>
</template>

<script>
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
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
