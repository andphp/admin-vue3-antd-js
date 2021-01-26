<!-- 菜单/主导航 -->
<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :route-children="routeChildren"
  >
    <!-- <a-layout-sider
      v-if="
        item.children && item.children.length > 18 && layout === 'horizontal'
      "
      style="height: 86vh"
    >
      <template v-if="item.children && item.children.length">
        <apa-menu
          v-for="route in item.children"
          :key="route.fullPath"
          :item="route"
        ></apa-menu>
      </template>
    </a-layout-sider>
    <template v-else-if="item.children && item.children.length">
      <apa-menu
        v-for="route in item.children"
        :key="route.fullPath"
        :item="route"
      ></apa-menu>
    </template> -->
    <!-- <template>
      <apa-menu
        v-for="route in item.children"
        :key="route.fullPath"
        :item="route"
      ></apa-menu>
    </template> -->
  </component>
</template>

<script>
import { Layout } from "ant-design-vue";
import MenuItem from "./components/MenuItem";
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
  name: "ApaMenu",
  props: {
    item: {
      type: Object,
      required: true
    },
    layout: {
      type: String,
      default: ""
    }
  },
  components: {
    ALayoutSider: Layout.Sider,
    MenuItem
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
        if (showChildren.length === 0) {
          dataComponent.routeChildren = props.item;
          return "MenuItem";
        } else if (
          showChildren.length === 1 &&
          props.item.alwaysShow !== true
        ) {
          dataComponent.routeChildren = showChildren[0];
          return "MenuItem";
        } else {
          return "Submenu";
        }
      })
    });
    console.log("props", props.item);
    // console.log("dataComponent", dataComponent.menuComponent);
    function handleChildren(children = []) {
      if (children === null) return [];
      return children.filter(item => item.hidden !== true);
    }
    const dataComponentToRefs = toRefs(dataComponent);
    //这里存放返回数据
    return {
      handleChildren,
      ...dataComponentToRefs
    };
  }
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
