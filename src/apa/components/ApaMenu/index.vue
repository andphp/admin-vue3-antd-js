<!-- 菜单/主导航 -->
<template>
  <a-menu
    mode="inline"
    theme="dark"
    :inline-collapsed="collapse"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @click="handleClick"
    @select="handleSelect"
    @openChange="onOpenChange"
  >
    <template v-for="route in routes" :key="route.path">
      <template v-if="handleChildren(route.children).length == 0">
        <menu-item v-if="!route.meta.hidden" :route="route"></menu-item>
      </template>
      <template
        v-else-if="
          handleChildren(route.children).length === 1 &&
            route.meta.alwaysShow !== true
        "
      >
        <menu-item
          v-if="!route.meta.hidden"
          :route="handleChildren(route.children)[0]"
        ></menu-item>
      </template>
      <template v-else>
        <Submenu :route="route"></Submenu>
      </template>
    </template>
  </a-menu>
</template>

<script>
import { Menu } from "ant-design-vue";
import MenuItem from "./components/MenuItem";
import Submenu from "./components/Submenu";
import store from "@/store";
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
  inject,
  ref
} from "vue";
export default {
  name: "ApaMenu",
  props: {
    collapse: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  components: {
    AMenu: Menu,
    MenuItem,
    Submenu
  },
  setup() {
    onBeforeMount(() => {}); //挂载前

    onMounted(() => {}); //挂载完成之后调用

    onBeforeUpdate(() => {}); //DOM数据更新前调用

    onUpdated(() => {}); //DOM数据更新完成调用

    onBeforeUnmount(() => {}); //实例销毁之前

    onUnmounted(() => {}); //实例销毁后

    const selectedKeys = ref(["/"]);
    const openKeys = ref(["/"]);
    const layout = ref(inject("layout"));
    const filterRoutes = reactive({
      routes: computed(() => {
        return store.state.routes.routes;
      })
    });

    function handleChildren(children = []) {
      if (children === null) return [];
      return children.filter(item => item.meta.hidden !== true);
    }
    console.log("filterRoutes.routes==", filterRoutes.routes);
    const handleClick = ({ item, key, keyPath }) => {
      console.log("clickitem", item);
      console.log("clickkey", key);
      console.log("clickkeyPath", keyPath);
    };
    const handleSelect = ({ item, key, keyPath }) => {
      console.log("Selectitem", item);
      console.log("Selectkey", key);
      console.log("cSelectkeyPath", keyPath);
    };
    // const latestOpenKey = ref("/index");
    // 打开/折叠 侧边栏 二级菜单
    function onOpenChange(openKey) {
      // latestOpenKey.value = openKey.find(
      //   key => openKeys.value.indexOf(key) === -1
      // );
      // openKeys.value = latestOpenKey.value ? [latestOpenKey] : [];
      console.log("openKey", openKey);
    }
    //这里存放返回数据
    return {
      layout,
      handleChildren,
      ...toRefs(filterRoutes),
      selectedKeys,
      openKeys,
      handleClick,
      handleSelect,
      onOpenChange
    };
  }
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
