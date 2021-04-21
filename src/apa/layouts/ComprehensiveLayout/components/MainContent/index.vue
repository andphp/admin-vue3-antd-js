<!-- ApaMain -->
<template>
  <a-row type="flex" justify="center">
    <a-col :sm="{ span: 24 }" :md="{ span: 24 }">
      <div
        :style="{
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" />
        </router-view></div
    ></a-col>
  </a-row>
</template>

<script>
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
import { Row, Col } from "ant-design-vue";
import store from "@/store";
export default {
  name: "MainContent",
  components: { ARow: Row, ACol: Col },
  setup() {
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后
    const reactiveData = reactive({
      layout: computed(() => store.state.settings.layout),
    });

    // 这里存放返回数据

    return { ...toRefs(reactiveData) };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
