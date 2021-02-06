<!-- 菜单/主导航 -->
<template>
  <component
    :is="menuComponent"
    v-if="!item.meta.hidden"
    :item="item"
    :route-children="routeChildren"
  >
    <template v-if="item.children && item.children.length">
      <apa-menu
        v-for="route in item.children"
        :key="route.path"
        :item="route"
      ></apa-menu>
    </template>
  </component>
</template>

<script>
import { Layout } from "ant-design-vue";
import MenuItem from "./components/MenuItem";
import Submenu from "./components/Submenu";
import ApaMenu from "./index";
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
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    ALayoutSider: Layout.Sider,
    MenuItem,
    Submenu,
    ApaMenu
  },
  setup(props) {
    onBeforeMount(() => {}); //挂载前

    onMounted(() => {}); //挂载完成之后调用

    onBeforeUpdate(() => {}); //DOM数据更新前调用

    onUpdated(() => {}); //DOM数据更新完成调用

    onBeforeUnmount(() => {}); //实例销毁之前

    onUnmounted(() => {}); //实例销毁后

    const dataComponent = reactive({
      routeChildren: "",
      menuComponent: computed(() => {
        const showChildren = handleChildren(props.item.children);
        console.log("length", showChildren.length);
        if (showChildren.length === 0) {
          addRouteChildren(props.item);
          return "MenuItem";
        } else if (
          showChildren.length === 1 &&
          props.item.meta.alwaysShow !== true
        ) {
          addRouteChildren(showChildren[0]);
          return "MenuItem";
        } else {
          return "Submenu";
        }
      })
    });

    function addRouteChildren(children) {
      dataComponent.routeChildren = children;
    }
    const layout = ref(inject("layout"));
    console.log("props--===--", layout.value);
    console.log("dataComponent", dataComponent.menuComponent);
    function handleChildren(children = []) {
      if (children === null) return [];
      return children.filter(item => item.meta.hidden !== true);
    }
    const dataComponentToRefs = toRefs(dataComponent);
    //这里存放返回数据
    return {
      ...dataComponentToRefs,
      layout
    };
  }
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
