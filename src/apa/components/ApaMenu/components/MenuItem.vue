<!--  -->
<template>
  <a-menu-item :key="route.path">
    <span class="anticon">
      <svg-icon v-if="route.meta.icon" :iconName="route.meta.icon"></svg-icon>
    </span>
    <span>{{ route.meta.title }}</span>
  </a-menu-item>
</template>

<script>
import { Menu } from "ant-design-vue";
import SvgIcon from "@/apa/components/Icons/SvgIcon";
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
  name: "Menuitem",
  components: {
    AMenuItem: Menu.Item,
    SvgIcon
  },
  props: {
    route: {
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
