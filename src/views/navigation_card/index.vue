<!-- System -->
<template>
  <div v-if="menus.children && menus.children.length >= 1">
    <a-divider orientation="left">
      <svg-icon v-if="menus.meta.icon" :iconName="menus.meta.icon"></svg-icon>
      {{ menus.meta.title }}</a-divider
    >
    <a-row :gutter="[16, 16]">
      <menu-card
        v-for="itemMenu in menus.children"
        :key="itemMenu.path"
        :menu="itemMenu"
      ></menu-card>
    </a-row>
  </div>
  <div v-else></div>
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
import { useRoute } from "vue-router";
import MenuCard from "./components/MenuCard";
import { Divider, Row } from "ant-design-vue";
import store from "@/store";
import SvgIcon from "@/apa/components/Icons/SvgIcon";
export default {
  name: "index",
  components: {
    ADivider: Divider,
    ARow: Row,
    MenuCard: MenuCard,
    SvgIcon,
  },
  setup() {
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后

    const _this = reactive({
      route: computed(() => new useRoute()),
      menus: computed(() => {
        for (let item of store.state.routes.routes) {
          if (item.path == _this.route.params.routePath) {
            return item;
          }
        }
        return [];
      }),
    });

    /* console.log("routePath", route.params);
       这里存放返回数据 */

    return {
      ...toRefs(_this),
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
