<!-- 标签切换 -->
<template>
  <div class="apa-tabs">
    <div class="apa-tabs-left-panel">
      <a-tabs
        @tab-click="handleTabClick"
        @edit="handleTabRemove"
        v-model:activeKey="tabActive"
        hide-add
        type="editable-card"
      >
        <a-tab-pane
          v-for="item in visitedRoutes"
          :key="item.fullPath"
          :closable="!isAffix(item)"
          :tab="item.meta.title"
        ></a-tab-pane>
      </a-tabs>
    </div>
    <div class="apa-tabs-right-panel">
      <a-dropdown>
        <template v-slot:overlay>
          <a-menu @click="handleClick">
            <a-menu-item key="closeOthersTabs">
              <a>关闭其他</a>
            </a-menu-item>
            <a-menu-item key="closeLeftTabs">
              <a>关闭左侧</a>
            </a-menu-item>
            <a-menu-item key="closeRightTabs">
              <a>关闭右侧</a>
            </a-menu-item>
            <a-menu-item key="closeAllTabs">
              <a>关闭全部</a>
            </a-menu-item>
          </a-menu>
        </template>
        <a-button style="margin-left: 8px">
          更多
          <DownOutlined />
        </a-button>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  // computed,
  toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
import { Tabs, Dropdown, Button, Menu } from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons-vue";
import store from "@/store";
export default {
  name: "TabsBar",
  components: {
    DownOutlined,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    ADropdown: Dropdown,
    AButton: Button,
    AMenu: Menu,
    AMenuItem: Menu.Item,
  },
  setup() {
    onBeforeMount(() => {}); // 挂载前
    onMounted(() => {}); // 挂载完成之后调用
    onBeforeUpdate(() => {}); // DOM数据更新前调用
    onUpdated(() => {}); // DOM数据更新完成调用
    onBeforeUnmount(() => {}); // 实例销毁之前
    onUnmounted(() => {}); // 实例销毁后
    store.dispatch("settings/foldSideBar");
    const data = reactive({
      affixTabs: [],
      tabActive: null,
      created: false,
    });
    // 这里存放返回数据
    return { ...toRefs(data) };
  },
};
</script>
<style lang="less" scoped>
.apa-tabs {
  padding: 0 @apa-margin;
  background: #ffffff;
  &-left-panel {
    float: left;
    width: calc(100% - 52px - @apa-margin - @apa-margin);
  }
  &-right-panel {
    float: left;
    width: 52px;
  }
  .ant-tabs {
    &-bar {
      margin: 0 !important;
    }
    &-tab {
      height: 32px !important;
      margin-right: 5px !important;
      line-height: 32px !important;
      background: #ffffff !important;
      border: 1px solid #dedede !important;
    }
    &-tab-prev,
    &-tab-next {
      height: 32px !important;
      line-height: 32px !important;
    }
    &-tab-active {
      border: 1px solid #1890ff !important;
      .ant-tabs-close-x {
        color: #1890ff !important;
      }
    }
  }
}
</style>
