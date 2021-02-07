<!--  -->
<template>
  <a-menu-item :key="routeChildren.path" @click.capture="handleLink">
    <span class="anticon">
      <svg-icon
        v-if="item.meta.icon"
        :iconName="routeChildren.meta.icon"
      ></svg-icon>
    </span>
    <span>{{ routeChildren.meta.title }}</span>
  </a-menu-item>
</template>

<script>
import { Menu } from "ant-design-vue";
import { isExternal } from "@/utils/validate";
import SvgIcon from "@/apa/components/Icons/SvgIcon";
import { useRouter, useRoute } from "vue-router";
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
  setup(props) {
    onBeforeMount(() => {}); //挂载前
    onMounted(() => {}); //挂载完成之后调用
    onBeforeUpdate(() => {}); //DOM数据更新前调用
    onUpdated(() => {}); //DOM数据更新完成调用
    onBeforeUnmount(() => {}); //实例销毁之前
    onUnmounted(() => {}); //实例销毁后
    let router = useRouter();
    let route = useRoute();

    function handleLink() {
      const routePath = props.routeChildren.path;
      const target = props.routeChildren.meta.target;
      if (target === "_blank") {
        if (isExternal(routePath)) window.open(routePath);
        else if (route.path !== routePath) window.open(routePath.href);
      } else {
        if (isExternal(routePath)) window.location.href = routePath;
        else if (route.path !== routePath) router.push(routePath);
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
