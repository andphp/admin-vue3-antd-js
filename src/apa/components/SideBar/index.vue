<!-- SideBar -->
<template>
  <div class="side-bar">
    <a-layout-sider :collapsed="collapse" :trigger="null" collapsible>
      <logo :collapse="collapse"></logo>
      <a-menu>
        <template v-for="route in routes">
          <apa-menu
            v-if="!route.hidden"
            :key="route.path"
            :item="route"
          ></apa-menu>
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
import { Layout, Menu } from "ant-design-vue";
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
  onUnmounted
} from "vue";
export default {
  name: "SideBar",
  components: {
    ALayoutSider: Layout.Sider,
    AMenu: Menu,
    ApaMenu,
    Logo
  },
  props: {
    collapse: {
      type: Boolean,
      default() {
        return false;
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
    const routesData = reactive({
      routes: computed(() => store.state.routes.routes)
    });

    //这里存放返回数据
    const routes = toRefs(routesData);
    return {
      ...routes
    };
  }
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
.side-bar {
  ::v-deep(.ant-layout-sider) {
    background: $base-gallery-first-menu-background;
    height: 100vh;
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>
