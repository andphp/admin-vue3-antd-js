<!--  -->
<template>
  <div class="top-bar-container">
    <a-layout-header>
      <!-- // 横向头部 -->
      <a-row
        style="background-color: #001529"
        type="flex"
        justify="center"
        v-if="layout === 'horizontal'"
        align="middle"
      >
        <!-- logo -->
        <a-col :span="5">
          <logo :collapse="false"></logo>
        </a-col>
        <!-- meun导航 -->
        <a-col :span="10">
          <apa-menu layout="horizontal"></apa-menu>
        </a-col>
        <!-- 右边 -->
        <a-col :span="7">
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
import { Layout, Row, Col } from "ant-design-vue";
import { BgColorsOutlined } from "@ant-design/icons-vue";
import ApaMenu from "../ApaMenu";
import Avatar from "@/apa/components/Avatar";
import Screenfull from "@/apa/components/Screenfull";
import { useRoute } from "vue-router";
import store from "@/store";
import Logo from "@/apa/components/Logo";
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
  name: "TopBarHorizontal",
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
    ApaMenu,
    BgColorsOutlined,
    Logo,
    Avatar,
    Screenfull,
  },

  setup() {
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
      store.dispatch("settings/handleShowTheme", true);
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
.top-bar-container {
  color: @apa-color-blue;
}
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
