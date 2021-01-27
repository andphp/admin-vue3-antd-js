<!--  -->
<template>
  <a-menu-item :key="routeChildren.path" @click.capture="handleLink">
    <span class="anticon">
      <svg-icon
        v-if="item.meta.icon"
        :iconClass="routeChildren.meta.icon"
      ></svg-icon>
    </span>
    <span>{{ routeChildren.meta.title }}</span>
  </a-menu-item>
</template>

<script>
import { Menu } from "ant-design-vue";
import { isExternal } from "@/utils/validate";
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
  name: "Menuitem",
  components: {
    AMenuItem: Menu.Item,
    SvgIcon
  },
  props: {
    item: {
      type: Object,
      default: () => null
    },
    routeChildren: {
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

    function handleLink() {
      const routePath = this.routeChildren.path;
      const target = this.routeChildren.meta.target;
      if (target === "_blank") {
        if (isExternal(routePath)) window.open(routePath);
        else if (this.$route.path !== routePath) window.open(routePath.href);
      } else {
        if (isExternal(routePath)) window.location.href = routePath;
        else if (this.$route.path !== routePath) this.$router.push(routePath);
      }
    }
    //这里存放返回数据
    return {
      handleLink
    };
  }
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
