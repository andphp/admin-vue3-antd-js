<!-- 菜单/主导航 -->
<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :route-children="routeChildren"
  >
    <a-scrollbar
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
    </a-scrollbar>
    <template v-else-if="item.children && item.children.length">
      <apa-menu
        v-for="route in item.children"
        :key="route.fullPath"
        :item="route"
      ></apa-menu>
    </template>
  </component>
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
  components: {},
  setup(props) {
    onBeforeMount(() => {}); //挂载前

    onMounted(() => {
      console.log("props", props.item);
      //   const showChildren = handleChildren(this.item.children)
      // if (showChildren.length === 0) {
      //   this.menuComponent = 'MenuItem'
      //   this.routeChildren = this.item
      // } else if (showChildren.length === 1 && this.item.alwaysShow !== true) {
      //   this.menuComponent = 'MenuItem'
      //   this.routeChildren = showChildren[0]
      // } else {
      //   this.menuComponent = 'Submenu'
      // }
    }); //挂载完成之后调用

    onBeforeUpdate(() => {}); //DOM数据更新前调用

    onUpdated(() => {}); //DOM数据更新完成调用

    onBeforeUnmount(() => {}); //实例销毁之前

    onUnmounted(() => {}); //实例销毁后

    // console.log("props", props);
    function handleChildren(children = []) {
      if (children === null) return [];
      return children.filter(item => item.hidden !== true);
    }
    //这里存放返回数据
    return {
      handleChildren
    };
  }
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
