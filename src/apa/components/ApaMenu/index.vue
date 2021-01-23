<!-- 菜单/主导航 -->
<template>
  <div><p>dsfsd</p></div>
  <!-- <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :route-children="routeChildren"
  >
    <el-scrollbar
      v-if="
        item.children && item.children.length > 18 && layout === 'horizontal'
      "
      style="height: 86vh"
    >
      <template v-if="item.children && item.children.length">
        <vab-menu
          v-for="route in item.children"
          :key="route.fullPath"
          :item="route"
        ></vab-menu>
      </template>
    </el-scrollbar>
    <template v-else-if="item.children && item.children.length">
      <vab-menu
        v-for="route in item.children"
        :key="route.fullPath"
        :item="route"
      ></vab-menu>
    </template>
  </component> -->
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
  components: {},
  setup() {
    onBeforeMount(() => {}); //挂载前

    onMounted(() => {
      // console.log("props", props);
    }); //挂载完成之后调用

    onBeforeUpdate(() => {}); //DOM数据更新前调用

    onUpdated(() => {}); //DOM数据更新完成调用

    onBeforeUnmount(() => {}); //实例销毁之前

    onUnmounted(() => {}); //实例销毁后
    // console.log("props", props);
    //这里存放返回数据

    return {};
  }
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
