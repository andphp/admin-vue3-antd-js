<!--  -->
<template>
  <div class="top-bar-container">
    <a-layout-header>
      <!-- // 纵向头部 -->
      <a-row>
        <a-col :xs="4" :sm="12" :md="12">
          <!-- 折叠按钮 -->
          <div style="float: left">
            <template v-if="!collapse">
              <MenuFoldOutlined class="trigger" @click="toggleCollapse" />
            </template>
            <template v-else>
              <MenuUnfoldOutlined class="trigger" @click="toggleCollapse" />
            </template>
          </div>
          <div v-if="device !== 'mobile'">
            <!-- 纵向面包屑 -->
            <div style="float: left; padding-top: 20px">
              <a-breadcrumb>
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item
                  :key="item.path"
                  v-for="item in matched.slice(1, matched.length)"
                  ><a href="">{{ item.meta.title }}</a></a-breadcrumb-item
                >
              </a-breadcrumb>
            </div>
          </div>
        </a-col>
        <a-col :xs="20" :sm="12" :md="12">
          <avatar></avatar>
          <screenfull></screenfull>
          <div class="top-bar-right-padding">
            <BgColorsOutlined @click="onShow" />
          </div>
        </a-col>
      </a-row>
    </a-layout-header>
  </div>
</template>

<script>
import { Layout, Row, Col, Breadcrumb } from "ant-design-vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BgColorsOutlined,
} from "@ant-design/icons-vue";
import Avatar from "@/apa/components/Avatar";
import Screenfull from "@/apa/components/Screenfull";
import { useRoute } from "vue-router";
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
  getCurrentInstance,
} from "vue";
export default {
  name: "TopBarVertical",
  props: {
    layout: {
      type: String,
      default: "",
    },
    device: {
      type: String,
      default() {
        return "desktop";
      },
    },
  },
  components: {
    ALayoutHeader: Layout.Header,
    ARow: Row,
    ACol: Col,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BgColorsOutlined,
    Avatar,
    Screenfull,
  },
  emits: {
    showThemeDrawer: null,
  },
  setup(props, context) {
    const parent = { ...context };
    const { ctx } = getCurrentInstance();
    const route = useRoute();
    const matched = computed(() => route.matched);
    onBeforeMount(() => {}); // 挂载前
    onMounted(() => {}); // 挂载完成之后调用
    onBeforeUpdate(() => {}); // DOM数据更新前调用
    onUpdated(() => {}); // DOM数据更新完成调用
    onBeforeUnmount(() => {}); // 实例销毁之前
    onUnmounted(() => {}); // 实例销毁后

    const routesData = reactive({
      routes: computed(() => ctx.$router.getRoutes()),
    });
    // console.log(
    //   "store",
    //   ctx.$router.getRoutes().filter((item) => item.name)
    // );
    const computedData = reactive({
      activeMenu: computed(() => {
        const { meta, path } = ctx.$router.currentRoute.value;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      }),
      collapse: computed({
        set: () => {
          store.dispatch("settings/toggleCollapse");
        },
        get: () => {
          return store.state.settings.collapse;
        },
      }),
    });
    // console.log("device", props.device);
    // console.log("store.state.settings.layout", store.state.settings.layout);
    // function handleFoldSideBar() {
    //   store.dispatch("settings/foldSideBar");
    //   console.log("settings/collapse1", store.getters["settings/collapse"]);
    // }
    // function handleUnFoldSideBar() {
    //   store.dispatch("settings/openSideBar");
    //   console.log("settings/collapse2", store.getters["settings/collapse"]);
    // }
    function toggleCollapse() {
      computedData.collapse = !computedData.collapse;
    }
    function onShow() {
      parent.emit("showThemeDrawer");
    }

    // 这里存放返回数据
    return {
      ...toRefs(computedData),
      routesData,
      // handleFoldSideBar,
      // handleUnFoldSideBar,
      toggleCollapse,
      onShow,
      matched,
    };
  },
};
</script>
<style lang="less" scoped>
.active-text-color {
  //菜单选中文字颜色变量导出
  color: red;
}
.background-color {
  background: red;
}

.ant-layout-header {
  background: transparent;
}
</style>
