<!-- 全局主题设置 -->
<template>
  <a-drawer
    :title="themeTitle"
    placement="right"
    :closable="true"
    :visible="visible"
    @close="onClose"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script>
import { Drawer } from "ant-design-vue";
import { useI18n } from "vue-i18n";
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
} from "vue";
export default {
  name: "ThemeDrawer",
  components: {
    ADrawer: Drawer,
  },
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  emits: {
    closeThemeDrawer: null,
  },
  setup(props, context) {
    const parent = { ...context };
    const { t } = useI18n({ useScope: "global" });
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后
    const reactiveData = reactive({
      onClose: () => {
        parent.emit("closeThemeDrawer");
      },
      themeTitle: t("主题配置标题"),
      collapse: computed(() => store.state.settings.collapse),
    });
    // 这里存放返回数据

    return {
      ...toRefs(reactiveData),
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
