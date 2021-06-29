<!-- 标签切换 -->
<template>
  <a-row class="apa-tabs" type="flex" justify="center" align="bottom">
    <a-col :xs="0" :sm="{ span: 22 }" :md="{ span: 22 }">
      <div class="apa-tabs-left-panel">
        <a-tabs
          @tab-click="handleTabClick"
          @edit="handleTabRemove"
          v-model:activeKey="tabActive"
          hide-add
          type="line"
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
    </a-col>
  </a-row>
</template>

<script>
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
  watch,
} from "vue";
import { Tabs, Dropdown, Button, Menu, Row, Col } from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons-vue";
import store from "@/store";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "tabs-bar-horizontal",
  components: {
    DownOutlined,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    ADropdown: Dropdown,
    AButton: Button,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ARow: Row,
    ACol: Col,
  },
  setup() {
    onBeforeMount(() => {}); // 挂载前
    onMounted(() => {}); // 挂载完成之后调用
    onBeforeUpdate(() => {}); // DOM数据更新前调用
    onUpdated(() => {}); // DOM数据更新完成调用
    onBeforeUnmount(() => {}); // 实例销毁之前
    onUnmounted(() => {}); // 实例销毁后
    // store.dispatch("settings/foldSideBar");

    const _this = reactive({
      visitedRoutes: computed(() => store.state.tagsBar.visitedRoutes),
      routes: computed(() => store.state.routes.routes),
      affixTabs: [],
      tabActive: null,
      created: false,
    });
    const route = useRoute();
    const router = useRouter();
    watch(
      () => route.path,
      () => {
        addTabs(route);
      }
    );
    // 初始化
    initAffixTabs(_this.routes);
    addTabs(route);

    // 执行方法
    function initAffixTabs(routes) {
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) addTabs(route);
        if (route.children) initAffixTabs(route.children);
      });
    }

    function addTabs(tag) {
      if (tag.name && tag.meta && tag.meta.tagHidden !== true) {
        let matched = [tag.name];
        if (tag.matched) matched = tag.matched.map((item) => item.name);
        store.dispatch("tagsBar/addVisitedRoute", {
          path: tag.path,
          fullPath: tag.fullPath,
          query: tag.query,
          params: tag.params,
          name: tag.name,
          matched: matched,
          meta: { ...tag.meta },
        });
        _this.tabActive = tag.fullPath;
      }
    }
    function isActive(routeTag) {
      return routeTag.path === route.path;
    }
    function toLastTag() {
      const latestView = _this.visitedRoutes.slice(-1)[0];
      if (latestView) router.push(latestView);
      else router.push("/");
    }
    function toThisTag() {
      const view = _this.visitedRoutes.find(
        (item) => item.fullPath === route.fullPath
      );
      if (route.path !== view.path) router.push(view);
      return view;
    }
    // 事件
    function isAffix(tag) {
      return tag.meta && tag.meta.affix;
    }
    function handleTabClick(tab) {
      const _thisRoute = _this.visitedRoutes.filter(
        (item) => item.path === tab || item.fullPath === tab
      )[0];
      if (route.fullPath !== _thisRoute.fullPath) router.push(_thisRoute);
    }

    function handleTabRemove(fullPath) {
      const view = _this.visitedRoutes.find((item) => {
        return fullPath === item.fullPath;
      });
      store.dispatch("tagsBar/delVisitedRoute", view);
      if (isActive(view)) toLastTag();
    }
    function handleClick({ key }) {
      switch (key) {
        case "closeOthersTabs":
          store.dispatch("tagsBar/delOthersVisitedRoutes", toThisTag());
          break;
        case "closeLeftTabs":
          store.dispatch("tagsBar/delLeftVisitedRoutes", toThisTag());
          break;
        case "closeRightTabs":
          store.dispatch("tagsBar/delRightVisitedRoutes", toThisTag());
          break;
        case "closeAllTabs":
          store.dispatch("tagsBar/delAllVisitedRoutes");
          if (_this.affixTabs.some((tag) => tag.path === toThisTag().path)) {
            return;
          }
          toLastTag();
          break;
      }
    }
    return {
      ...toRefs(_this),
      isAffix,
      handleTabClick,
      handleTabRemove,
      handleClick,
    };
  },
};
</script>
<style lang="less" scoped>
.apa-tabs {
  padding: 5px @apa-margin 0px;
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
