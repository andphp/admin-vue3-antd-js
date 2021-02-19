<!--  -->
<template>
  <div class="top-bar-container">
    <a-layout-header>
      <a-row type="flex" justify="space-between" align="middle">
        <a-col :xs="4" :sm="12" :md="12">
          <div style="float:left">
            <div v-if="layout === 'horizontal'">
              <logo :collapse="false"></logo>
            </div>
            <div v-else>
              <template v-if="!collapse">
                <MenuFoldOutlined class="trigger" @click="handleFoldSideBar" />
              </template>
              <template v-else>
                <MenuUnfoldOutlined
                  class="trigger"
                  @click="handleUnFoldSideBar"
                />
              </template>
            </div>
          </div>
          <div v-if="device !== 'mobile'">
            <div
              v-if="layout === 'horizontal'"
              style="float:left;padding-top:20px;"
            >
              <apa-menu :collapse="collapse" layout="horizontal"></apa-menu>
            </div>
            <div v-else style="float:left;padding-top:20px;">
              <a-breadcrumb>
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item
                  ><a href="">Application Center</a></a-breadcrumb-item
                >
                <a-breadcrumb-item
                  ><a href="">Application List</a></a-breadcrumb-item
                >
                <a-breadcrumb-item>An Application</a-breadcrumb-item>
              </a-breadcrumb>
            </div>
          </div>
        </a-col>
        <a-col :xs="20" :sm="12" :md="12">
          <div style="float:right;padding-right:20px;">
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
  BgColorsOutlined
} from "@ant-design/icons-vue";
import ApaMenu from "../ApaMenu";
import { useRouter } from "vue-router";
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
  getCurrentInstance
} from "vue";
export default {
  name: "TopBar",
  props: {
    collapse: {
      type: Boolean,
      default() {
        return false;
      }
    },
    layout: {
      type: String,
      default: ""
    },
    device: {
      type: String,
      default() {
        return "desktop";
      }
    }
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
    Logo
  },
  emits: {
    showThemeDrawer: null
  },
  setup(props, context) {
    const parent = { ...context };
    onBeforeMount(() => {}); //挂载前
    onMounted(() => {
      console.log("props1", props);
    }); //挂载完成之后调用
    onBeforeUpdate(() => {}); //DOM数据更新前调用
    onUpdated(() => {}); //DOM数据更新完成调用
    onBeforeUnmount(() => {}); //实例销毁之前
    onUnmounted(() => {}); //实例销毁后
    const routers = useRouter();
    const { ctx } = getCurrentInstance();
    const routesData = reactive({
      routes: computed(() => ctx.$router.getRoutes())
    });
    // console.log("store", store.state.routes.routes);
    console.log("routesData", routers.getRoutes());
    const computedData = reactive({
      activeMenu: computed(() => {
        const { meta, path } = ctx.$router.currentRoute.value;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      })
    });

    function handleFoldSideBar() {
      store.dispatch("settings/foldSideBar");
    }
    function handleUnFoldSideBar() {
      store.dispatch("settings/openSideBar");
    }
    function onShow() {
      parent.emit("showThemeDrawer");
    }
    //这里存放返回数据
    return {
      ...toRefs(computedData),
      routesData,
      handleFoldSideBar,
      handleUnFoldSideBar,
      onShow
    };
  }
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
