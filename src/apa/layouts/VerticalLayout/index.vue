<template>
  <div class="layout-container-vertical">
    <a-layout>
      <!-- side-bar start -->
      <a-drawer
        v-if="device == 'mobile'"
        placement="left"
        :closable="false"
        :visible="collapse"
        :bodyStyle="{ padding: '0px' }"
        @close="handleUnFoldSideBar"
      >
        <side-bar></side-bar>
      </a-drawer>
      <side-bar v-else :collapse="collapse"></side-bar>
      <!-- side-bar end -->
      <a-layout>
        <a-layout-header>
          <a-row type="flex" justify="space-between" align="middle">
            <a-col :xs="4" :sm="12" :md="12">
              <div style="float:left">
                <template v-if="!collapse">
                  <MenuFoldOutlined
                    class="trigger"
                    @click="handleFoldSideBar"
                  />
                </template>
                <template v-else>
                  <MenuUnfoldOutlined
                    class="trigger"
                    @click="handleUnFoldSideBar"
                  />
                </template>
              </div>
              <div style="float:left;padding:20px;">
                <a-breadcrumb>
                  <a-breadcrumb-item>Home</a-breadcrumb-item>
                  <a-breadcrumb-item
                    ><a href="">Application Center</a></a-breadcrumb-item
                  >
                  <a-breadcrumb-item
                    ><a href="">Application List</a></a-breadcrumb-item
                  >
                </a-breadcrumb>
              </div>
            </a-col>
            <a-col :xs="20" :sm="12" :md="12">
              <div style="float:right;padding-right:20px;">
                <BgColorsOutlined @click="showDrawer" />
              </div>
            </a-col>
          </a-row>
        </a-layout-header>

        <ThemeDrawer
          :collapse="collapse"
          :visible="visible"
          @closeDrawer="closeDrawer"
        ></ThemeDrawer>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px'
          }"
        >
          Content
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { Layout, Drawer, Row, Col, Breadcrumb } from "ant-design-vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BgColorsOutlined
} from "@ant-design/icons-vue";
import SideBar from "@/apa/components/SideBar";
import ThemeDrawer from "@/apa/components/ThemeDrawer";
import { provide, ref } from "vue";
// import ApaMenu from "@/apa/components/ApaMenu";
import store from "@/store";
export default {
  name: "Vertical",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    SideBar,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ADrawer: Drawer,
    ARow: Row,
    ACol: Col,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ThemeDrawer,
    BgColorsOutlined
  },
  props: {
    collapse: {
      type: Boolean,
      default() {
        return false;
      }
    },
    fixedHeader: {
      type: Boolean,
      default() {
        return true;
      }
    },
    showTabsBar: {
      type: Boolean,
      default() {
        return true;
      }
    },
    device: {
      type: String,
      default() {
        return "desktop";
      }
    }
  },
  setup(props) {
    // console.log("collapse==", props.collapse);
    provide("collapse", props.collapse);
    // console.log("fixedHeader==", props.fixedHeader);
    provide("fixedHeader", props.fixedHeader);
    // console.log("showTabsBar==", props.showTabsBar);
    provide("showTabsBar", props.showTabsBar);
    // console.log("device==", props.device);
    provide("device", props.device);
    provide("layout", "vertical");

    function handleFoldSideBar() {
      store.dispatch("settings/foldSideBar");
    }
    function handleUnFoldSideBar() {
      store.dispatch("settings/openSideBar");
    }
    // 全局主题设置
    const visible = ref(false);
    const showDrawer = () => {
      visible.value = true;
    };
    const closeDrawer = () => {
      visible.value = false;
    };
    //这里存放返回数据
    return {
      handleFoldSideBar,
      handleUnFoldSideBar,
      visible,
      showDrawer,
      closeDrawer
    };
  }
};
</script>

<style lang="scss" scoped>
.layout-container-vertical {
  .ant-layout-header {
    background-color: #fff;
    padding: 0px;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: $base-color-red;
  }
}
</style>
