<!-- 菜单/主导航 -->
<template>
  <!--    @click="handleClick"
    @select="handleSelect"
    @openChange="onOpenChange" -->
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :inline-collapsed="collapse"
  >
    <template v-for="route in routes">
      <template v-if="handleChildren(route.children).length == 0">
        <menu-item v-if="!route.meta.hidden" :key="route.path" :route="route" />
      </template>
      <template
        v-else-if="
          handleChildren(route.children).length === 1 &&
          route.meta.alwaysShow !== true
        "
      >
        <menu-item
          v-if="!route.meta.hidden"
          :key="route.path"
          :route="handleChildren(route.children)[0]"
        />
      </template>
      <template v-else>
        <!-- <Submenu :route="route"></Submenu> -->
        <Submenu :key="route.path" :route="route" />
      </template>
    </template>
  </a-menu>
</template>

<script>
import { Menu } from "ant-design-vue";
import MenuItem from "./components/MenuItem";
import Submenu from "./components/Submenu";
import store from "@/store";
import { useRoute } from "vue-router";
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
  name: "apa-menu-vertical",
  components: {
    AMenu: Menu,
    MenuItem,
    Submenu,
  },
  props: {
    layout: {
      type: String,
      default: "vertical",
    },
  },
  setup() {
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后
    const route = useRoute();
    const state = reactive({
      selectedKeys: computed({
        set() {},
        get() {
          return [route.path];
        },
      }),
      openKeys: computed({
        get() {
          return store.state.menus.menuOpenKeys;
        },
        set(value) {
          store.dispatch("menus/toggleMenuOpenKeys", value);
        },
      }),
      preOpenKeys: computed({
        get() {
          return store.state.menus.menuPreOpenKeys;
        },
        set(value) {
          store.dispatch("menus/toggleMenuPreOpenKeys", value);
        },
      }),
      collapse: computed(() => store.state.settings.collapse),
    });
    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    watch(
      () => state.collapse,
      (val) => {
        state.openKeys = val ? [] : state.preOpenKeys;
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

    /* const handleClick = ({ item, key, keyPath }) => {
         console.log("clickitem", item);
         console.log("clickkey", key);
         console.log("clickkeyPath", keyPath);
       };
       const handleSelect = ({ item, key, keyPath }) => {
         console.log("Selectitem", item);
         console.log("Selectkey", key);
         console.log("cSelectkeyPath", keyPath);
       };
       // 打开/折叠 侧边栏 二级菜单
       function onOpenChange(openKey) {
         console.log("openKey", openKey);
       } */

    // 这里存放返回数据
    return {
      handleChildren,
      ...toRefs(filterRoutes),
      ...toRefs(layoutData),
      ...toRefs(state),

      /* handleClick,
         handleSelect,
         onOpenChange, */
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
