<!--  -->
<template>
  <div class="top-bar-container">
    <a-layout-header>
      <a-row>
        <a-col :xs="4" :sm="12" :md="12">
          <!-- 折叠按钮 -->
          <div style="float: left">
            <div v-if="layout === 'horizontal'">
              <logo :collapse="false"></logo>
            </div>
            <div v-else>
              <template v-if="!collapse">
                <MenuFoldOutlined class="trigger" @click="toggleCollapse" />
              </template>
              <template v-else>
                <MenuUnfoldOutlined class="trigger" @click="toggleCollapse" />
              </template>
            </div>
          </div>
          <div v-if="device !== 'mobile'">
            <!-- 横向菜单 -->
            <div
              v-if="layout === 'horizontal'"
              style="float: left; padding-top: 20px"
            >
              <apa-menu :collapse="collapse" layout="horizontal"></apa-menu>
            </div>
            <!-- 纵向面包屑 -->
            <div v-else style="float: left; padding-top: 20px">
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
          <screenfull></screenfull>
          <div class="top-bar-right-padding">
            <BgColorsOutlined @click="onShow" />
          </div>
          <avatar></avatar>
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
import ApaMenu from "../ApaMenu";
import Avatar from "../Avatar";
import Screenfull from "../Screenfull";
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
  name: "TopBar",
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
    ApaMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BgColorsOutlined,
    Logo,
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
    onBeforeMount(() => {}); //挂载前
    onMounted(() => {}); //挂载完成之后调用
    onBeforeUpdate(() => {}); //DOM数据更新前调用
    onUpdated(() => {}); //DOM数据更新完成调用
    onBeforeUnmount(() => {}); //实例销毁之前
    onUnmounted(() => {}); //实例销毁后

    const routesData = reactive({
      routes: computed(() => ctx.$router.getRoutes()),
    });
    console.log(
      "store",
      ctx.$router.getRoutes().filter((item) => item.name)
    );
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
          // if (val) {
          //   store.dispatch(
          //     "settings/toggleMenuPreOpenKeys",
          //     store.state.settings.menuOpenKeys
          //   );
          //   store.dispatch("settings/toggleMenuOpenKeys", []);
          // } else {
          //   const preOpenKeys = store.state.settings.menuPreOpenKeys;
          //   console.log("store.sta88723423", preOpenKeys);
          //   console.log("store.sta88723423", Object.values(preOpenKeys));
          //   // store.commit(
          //   //   "settings/toggleMenuPreOpenKeys",
          //   //   Object.values(preOpenKeys)
          //   // );
          // }
          // store.dispatch("settings/toggleMenuPreOpenKeys", val);
          // console.log("typeof", typeof computedData.preOpenKeys);
          // const preOpenKeysArray =
          //   typeof computedData.preOpenKeys !== "undefined" && !val
          //     ? Object.values(computedData.preOpenKeys)
          //     : [];
          // console.log("preOpenKeysArray", preOpenKeysArray);
          // store.commit("settings/toggleMenuOpenKeys", preOpenKeysArray);
          store.dispatch("settings/toggleCollapse");
        },
        get: () => {
          console.log("==222==11", store.state.settings.collapse);
          return store.state.settings.collapse;
        },
      }),
    });
    // console.log("activeMenu", computedData.activeMenu);
    console.log("matched", matched);
    // function handleFoldSideBar() {
    //   store.dispatch("settings/foldSideBar");
    //   console.log("settings/collapse1", store.getters["settings/collapse"]);
    // }
    // function handleUnFoldSideBar() {
    //   store.dispatch("settings/openSideBar");
    //   console.log("settings/collapse2", store.getters["settings/collapse"]);
    // }
    function toggleCollapse() {
      // store.dispatch("settings/toggleCollapse");
      computedData.collapse = !computedData.collapse;
      // const preOpenKeys = computedData.preOpenKeys;
      // const collapsed = props.collapse;
      // if (!props.collapse) {
      //   store.dispatch("settings/toggleMenuOpenKeys", []);
      // } else {
      //   store.dispatch("settings/toggleMenuOpenKeys", preOpenKeys);
      // }
    }
    function onShow() {
      parent.emit("showThemeDrawer");
    }
    // 面包屑数据
    // function getBreadcrumb() {
    //   let matched = this.$route.matched.filter(item => item.name);
    //   const first = matched[0];
    //   if (
    //     first &&
    //     first.name.trim().toLocaleLowerCase() !==
    //       "Dashboard".toLocaleLowerCase()
    //   ) {
    //     matched = [{ path: "/dashboard", meta: { title: "dashboard" } }].concat(
    //       matched
    //     );
    //   }
    //   this.levelList = matched;
    // }

    //这里存放返回数据
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
