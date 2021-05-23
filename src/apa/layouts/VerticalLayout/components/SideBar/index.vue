<!-- SideBar -->
<template>
  <div class="side-bar">
    <a-layout-sider
      width="256"
      :collapsed="collapse"
      :trigger="null"
      collapsible
    >
      <logo :collapse="collapse"></logo>
      <apa-menu :collapse="collapse"></apa-menu>
    </a-layout-sider>
  </div>
</template>

<script>
import { Layout } from "ant-design-vue";
import ApaMenu from "../ApaMenu";
import store from "@/store";
import Logo from "@/apa/components/Logo";
import {
  reactive,
  computed,
  toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
export default {
  name: "side-bar-vertical",
  components: {
    ALayoutSider: Layout.Sider,
    ApaMenu,
    Logo,
  },
  setup() {
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后
    const reactiveData = reactive({
      routes: computed(() => store.state.routes.routes),
      collapse: computed(() => store.state.settings.collapse),
    });
    // 这里存放返回数据
    return {
      ...toRefs(reactiveData),
    };
  },
};
</script>

<style lang="less" scoped></style>
