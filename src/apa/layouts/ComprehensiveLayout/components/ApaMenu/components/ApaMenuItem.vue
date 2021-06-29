<!--  -->
<template>
  <a-menu-item :key="route.path" @click.capture="handleLink(route)">
    <span class="anticon" v-if="route.meta.icon">
      <svg-icon :iconName="route.meta.icon"></svg-icon>
    </span>
    <span>{{ route.meta.title }}</span>
  </a-menu-item>
</template>

<script>
import { Menu } from "ant-design-vue";
import SvgIcon from "@/apa/components/Icons/SvgIcon";
import { useRoute, useRouter } from "vue-router";
import { isExternal } from "@/utils/validate";
import store from "@/store";
import {
  /* reactive,
     computed,
     toRefs, */
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

export default {
  name: "apa-menuitem-comprehensive",
  components: {
    AMenuItem: Menu.Item,
    SvgIcon,
  },
  props: {
    route: {
      type: Object,
      default: () => null,
    },
  },

  setup(props) {
    onBeforeMount(() => {}); // 挂载前
    onMounted(() => {}); // 挂载完成之后调用
    onBeforeUpdate(() => {}); // DOM数据更新前调用
    onUpdated(() => {}); // DOM数据更新完成调用
    onBeforeUnmount(() => {}); // 实例销毁之前
    onUnmounted(() => {}); // 实例销毁后

    const route = useRoute(); // 当前路由信息
    const router = useRouter();

    function handleLink(e) {
      // console.log("route", route.path);
      const routePath = props.route.path;
      const target = props.route.meta.target;
      if (target === "_blank") {
        if (isExternal(routePath)) window.open(routePath);
        else if (route.path !== routePath) window.open(routePath.href);
      } else {
        if (isExternal(routePath)) window.location.href = routePath;
        else if (route.path !== routePath) {
          store.dispatch("routes/setPartialRoutes", props.route.children);
          // meun-card
          router.push({
            name: "NavigationCard",
            params: { routePath: e.path },
          });
        }
      }
    }
    // 这里存放返回数据
    return { handleLink };
  },
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
