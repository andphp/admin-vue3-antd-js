<template>
  <div class="top-bar-right-padding">
    <FullscreenExitOutlined @click="click" v-if="isFullscreen" />
    <FullscreenOutlined @click="click" v-else />
  </div>
</template>

<script>
import screenfull from "screenfull"; // FullscreenOutlined, FullscreenExitOutlined,
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import {
  // reactive,
  // computed,
  // toRefs,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
export default {
  name: "Screenfull",
  components: {
    FullscreenOutlined,
    FullscreenExitOutlined,
  },
  setup() {
    onBeforeMount(() => {}); //挂载前

    onMounted(() => {}); //挂载完成之后调用

    onBeforeUpdate(() => {}); //DOM数据更新前调用

    onUpdated(() => {}); //DOM数据更新完成调用

    onBeforeUnmount(() => {
      destroy();
    }); //实例销毁之前

    onUnmounted(() => {}); //实例销毁后

    let isFullscreen = ref(false);

    init();

    function init() {
      // console.log("screenfull.isEnabled", screenfull.isEnabled);
      if (screenfull.isEnabled) {
        screenfull.on("change", change);
      }
    }
    function destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", change);
      }
    }
    function change() {
      // console.log("screenfull.isFullscreen", screenfull.isFullscreen);
      isFullscreen.value = screenfull.isFullscreen;
    }
    function click() {
      // console.log("screenfull.enabled", screenfull.isEnabled);
      if (!screenfull.isEnabled) {
        message.warning("不支持全屏");
        return false;
      }
      screenfull.toggle();
    }
    //这里存放返回数据

    return { isFullscreen, click };
  },
};
</script>

<style scoped></style>
