<!--  -->
<template>
  <div class="top-bar-container">
    <div class="apa-main">
      <a-row>
        <a-col :span="6">
          <logo />
        </a-col>
        <a-col v-if="layout === 'horizontal'" :span="11">
          <a-menu
            class="active-text-color background-color text-color"
            :default-active="activeMenu"
            menu-trigger="hover"
            mode="horizontal"
          >
            <template v-for="route in routesData.routes">
              <apa-menu
                v-if="!route.hidden"
                :key="route.path"
                :layout="layout"
                :item="route"
              ></apa-menu>
            </template>
          </a-menu>
        </a-col>
        <a-col :span="layout === 'horizontal' ? 7 : 18">
          <!-- <div class="right-panel">
            <error-log></error-log>
            <search></search>
            <notice></notice>
            <full-screen></full-screen>
            <language></language>
            <theme class="hidden-md-and-down"></theme>
            <refresh></refresh>
            <avatar></avatar>
          </div> -->
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { Row, Col, Menu } from "ant-design-vue";
import Logo from "../Logo";
import ApaMenu from "../ApaMenu";
// import { useRoute } from "vue-router";
// import store from "@/store";
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
  getCurrentInstance
} from "vue";
export default {
  name: "TopBar",
  props: {
    layout: {
      type: String,
      default: ""
    }
  },
  components: {
    ARow: Row,
    ACol: Col,
    AMenu: Menu,
    Logo,
    ApaMenu
  },
  setup(props) {
    onBeforeMount(() => {}); //挂载前
    onMounted(() => {
      console.log("props1", props);
    }); //挂载完成之后调用
    onBeforeUpdate(() => {}); //DOM数据更新前调用
    onUpdated(() => {}); //DOM数据更新完成调用
    onBeforeUnmount(() => {}); //实例销毁之前
    onUnmounted(() => {}); //实例销毁后
    // const routers = useRoute();
    const { ctx } = getCurrentInstance();
    const routesData = reactive({
      routes: computed(() => ctx.$router.getRoutes())
    });
    // console.log("store", store.state.routes.routes);
    console.log("routesData", ctx.$router.getRoutes());
    const computedData = reactive({
      activeMenu: computed(() => {
        const { meta, path } = ctx.$router.currentRoute.value;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      })
    });

    const computedDatatoRefs = toRefs(computedData);
    console.log("computedDatatoRefs", computedDatatoRefs);
    //这里存放返回数据
    return {
      ...computedDatatoRefs,
      routesData
    };
  }
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
@import "@/config/variables.scss";

.active-text-color {
  //菜单选中文字颜色变量导出
  color: $base-menu-color-active;
}
.background-color {
  background: $base-menu-background;
}

.ant-layout-header {
  background: transparent;
}
</style>
