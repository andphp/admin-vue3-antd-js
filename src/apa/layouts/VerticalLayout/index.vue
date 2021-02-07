<template>
  <div class="layout-container-vertical">
    <a-layout>
      <side-bar :collapse="collapse"></side-bar>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <div class="trigger">
            <template v-if="!collapse">
              <MenuFoldOutlined @click="handleFoldSideBar" />
            </template>
            <template v-else>
              <MenuUnfoldOutlined @click="handleUnFoldSideBar" />
            </template>
          </div>
        </a-layout-header>
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
import { Layout } from "ant-design-vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import SideBar from "@/apa/components/SideBar";
import { provide } from "vue";
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
    MenuUnfoldOutlined
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
    console.log("collapse==", props.collapse);
    provide("collapse", props.collapse);
    console.log("fixedHeader==", props.fixedHeader);
    provide("fixedHeader", props.fixedHeader);
    console.log("showTabsBar==", props.showTabsBar);
    provide("showTabsBar", props.showTabsBar);
    console.log("device==", props.device);
    provide("device", props.device);
    provide("layout", "vertical");
    function handleFoldSideBar() {
      store.dispatch("settings/foldSideBar");
    }
    function handleUnFoldSideBar() {
      store.dispatch("settings/openSideBar");
    }
    //这里存放返回数据
    return {
      handleFoldSideBar,
      handleUnFoldSideBar
    };
  }
};
</script>

<style lang="scss" scoped>
.layout-container-vertical .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.layout-container-vertical .trigger:hover {
  color: #1890ff;
}
</style>
