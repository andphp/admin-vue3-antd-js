<!-- System -->
<template>
  <div>Systesdm</div>
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
  onUnmounted,
  watch,
} from "vue";
import { useRoute } from "vue-router";
export default {
  name: "Index",
  components: {},
  setup() {
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后
    const route = new useRoute();
    watch(
      () => route.params,
      (val) => {
        console.log("routePathval", val);
      }
    );
    // console.log("routePath", route.params);
    // 这里存放返回数据

    return {};
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
