<!--  -->
<template>
  <a-sub-menu :key="item.path">
    <template v-slot:title>
      <span class="anticon">
        <svg-icon v-if="item.meta.icon" :iconName="item.meta.icon"></svg-icon>
      </span>
      <span>{{ item.meta.title }}</span>
    </template>
    <slot></slot>
  </a-sub-menu>
</template>

<script>
import { Menu } from "ant-design-vue";
import SvgIcon from "@/components/Icons/SvgIcon";
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
  name: "Submenu",
  components: {
    ASubMenu: Menu.SubMenu,
    SvgIcon
  },
  props: {
    item: {
      type: Object,
      default: () => null
    }
  },
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
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
