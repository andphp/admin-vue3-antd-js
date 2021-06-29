<!--  -->
<template>
  <a-sub-menu :key="route.path" @titleClick="titleClick">
    <template v-slot:title>
      <span class="anticon">
        <svg-icon v-if="route.meta.icon" :iconName="route.meta.icon"></svg-icon>
      </span>
      <span>{{ route.meta.title }}</span>
    </template>
    <template
      v-for="itemRoute in handleChildren(route.children)"
      :key="itemRoute.path"
    >
      <template v-if="handleChildren(itemRoute.children).length == 0">
        <MenuItem
          v-if="!itemRoute.meta.hidden"
          :route="itemRoute"
          :key="itemRoute.path"
        ></MenuItem>
      </template>
      <template
        v-else-if="
          handleChildren(itemRoute.children).length === 1 &&
          itemRoute.meta.alwaysShow !== true
        "
      >
        <MenuItem
          v-if="!itemRoute.meta.hidden"
          :route="handleChildren(itemRoute.children)[0]"
          :key="itemRoute.path"
        ></MenuItem>
      </template>
      <template v-else>
        <Submenu :route="itemRoute" :key="itemRoute.path" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from "ant-design-vue";
import SvgIcon from "@/apa/components/Icons/SvgIcon";
import MenuItem from "./MenuItem";
import Submenu from "./Submenu";
import { useRouter } from "vue-router";
import store from "@/store";
import {
  reactive,
  computed,
  // toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

export default {
  name: "submenu-vertical",
  components: {
    ASubMenu: Menu.SubMenu,
    SvgIcon,
    MenuItem,
    Submenu,
  },
  props: {
    route: {
      type: Object,
      default: () => null,
    },
  },
  setup() {
    onBeforeMount(() => {}); // 挂载前
    onMounted(() => {}); // 挂载完成之后调用
    onBeforeUpdate(() => {}); // DOM数据更新前调用
    onUpdated(() => {}); // DOM数据更新完成调用
    onBeforeUnmount(() => {}); // 实例销毁之前
    onUnmounted(() => {}); // 实例销毁后
    const _this = reactive({
      routes: computed(() => store.state.routes.routes),
      openKeys: computed(() => store.state.menus.menuOpenKeys),
    });
    const router = useRouter();
    function handleChildren(children = []) {
      if (children === null) return [];
      return children.filter((item) => item.meta.hidden !== true);
    }
    const titleClick = (e) => {
      console.log("titleClicks", e);
      const filterRoutes = _this.routes;
      const filterRoute = filterRoutes.filter(
        (item) => item.meta.hidden !== true
      );
      const isTopMenu =
        filterRoute.map((item) => item.path == e.key).indexOf(true) > -1;

      if (isTopMenu && _this.openKeys.indexOf(e.key) == -1) {
        // console.log("sssa");
        router.push({ name: "NavigationCard", params: { routePath: e.key } });
      }
    };
    // 这里存放返回数据
    return { handleChildren, titleClick };
  },
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
