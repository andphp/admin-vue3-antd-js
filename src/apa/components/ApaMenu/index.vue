<!-- 菜单/主导航 -->
<template>
  <a-menu
    mode="inline"
    theme="dark"
    v-if="layout == 'vertical'"
    :inline-collapsed="collapse"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @click="handleClick"
    @select="handleSelect"
    @openChange="onOpenChange"
  >
    <template v-for="route in routes">
      <template v-if="handleChildren(route.children).length == 0">
        <menu-item
          v-if="!route.meta.hidden"
          :route="route"
          :key="route.path"
        ></menu-item>
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
          :key="route.path"
        ></menu-item>
      </template>
      <template v-else>
        <!-- <Submenu :route="route"></Submenu> -->
        <Submenu :route="route" :key="route.path" />
      </template>
    </template>
  </a-menu>
  <!-- 横向导航 -->
  <a-menu
    :mode="layout"
    theme="dark"
    v-else
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @click="handleClick"
    @select="handleSelect"
    @openChange="onOpenChange"
  >
    <template v-for="route in routes">
      <template v-if="handleChildren(route.children).length == 0">
        <menu-item
          v-if="!route.meta.hidden"
          :route="route"
          :key="route.path"
        ></menu-item>
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
          :key="route.path"
        ></menu-item>
      </template>
      <Submenu
        :route="route"
        v-else
        style="mix-width: 160px"
        :key="route.path"
      />
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
  watch,
} from "vue";
export default {
  name: "ApaMenu",
  props: {
    layout: {
      type: String,
      default: "vertical",
    },
  },
  components: {
    AMenu: Menu,
    MenuItem,
    Submenu,
  },
  setup() {
    onBeforeMount(() => {}); //挂载前

    onMounted(() => {}); //挂载完成之后调用

    onBeforeUpdate(() => {}); //DOM数据更新前调用

    onUpdated(() => {}); //DOM数据更新完成调用

    onBeforeUnmount(() => {}); //实例销毁之前

    onUnmounted(() => {}); //实例销毁后

    const state = reactive({
      selectedKeys: ["/system"],
      openKeys: ["/system", "/"],
      preOpenKeys: ["/system", "/"],
      collapse: computed(() => store.state.settings.collapse),
    });
    watch(
      () => state.openKeys,
      (val, oldVal) => {
        console.log("oldVal", oldVal);
        console.log("val", Object.values(oldVal));
        state.preOpenKeys = oldVal;
      }
    );

    watch(
      () => state.collapse,
      (val) => {
        if (val) {
          state.openKeys = [];
        } else {
          state.openKeys = state.preOpenKeys;
        }
        console.log("被改变", val);
        console.log("被改变", state.preOpenKeys);
      }
    );

    const filterRoutes = reactive({
      routes: computed(() => {
        return store.state.routes.routes;
      }),
    });
    const layoutData = reactive({
      layout: computed(() => store.state.settings.layout),
    });

    function handleChildren(children = []) {
      if (children === null) return [];
      return children.filter((item) => item.meta.hidden !== true);
    }
    // console.log("filterRoutes.routes==", filterRoutes.routes);
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
      handleChildren,
      ...toRefs(filterRoutes),
      ...toRefs(layoutData),
      ...toRefs(state),
      handleClick,
      handleSelect,
      onOpenChange,
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
