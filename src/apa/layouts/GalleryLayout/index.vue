<!-- 画廊 -->
<template>
  <div id="Gallery"></div>
  <router-view />
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
  name: "Gallery",
  setup() {
    onBeforeMount(() => {}); //挂载前
    onMounted(() => {}); //挂载完成之后调用
    onBeforeUpdate(() => {}); //DOM数据更新前调用
    onUpdated(() => {}); //DOM数据更新完成调用
    onBeforeUnmount(() => {}); //实例销毁之前
    onUnmounted(() => {}); //实例销毁后
    //这里存放返回数据
    return {};
  }
};
</script>

<style lang="less" scoped></style>
