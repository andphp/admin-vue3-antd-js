<template>
  <a-layout class="apa-layout-wrap">
    <div
      v-if="device === 'mobile' && !collapse"
      class="apa-mask"
      @click="handleFoldSideBar"
    ></div>
    <a-layout-sider
      collapsible
      class="apa-sider"
      width="250"
      v-model:collapsed="collapse"
      :class="classObj"
      :trigger="null"
    >
      <apa-logo />
      <a-menu
        class="apa-menu"
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
      >
        <apa-menu v-for="route in routes" :key="route.path" :item="route" />
      </a-menu>
    </a-layout-sider>
    <a-layout
      class="apa-layout"
      :class="'mobile' === device ? 'apa-mobile-layout' : ''"
    >
      <a-layout-header class="apa-header">
        <a-row>
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <menu-unfold-outlined
              v-if="collapse"
              class="trigger"
              @click="toggleCollapse"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="toggleCollapse"
            />
          </a-col>
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <apa-avatar />
          </a-col>
        </a-row>
      </a-layout-header>
      <apa-tabs />
      <apa-content />
    </a-layout>
  </a-layout>
</template>

<script>
import { Layout } from "ant-design-vue";
import ApaMenu from "@/apa/components/ApaMenu";
import store from "@/store";
export default {
  name: "Vertical",
  components: {
    ALayout: Layout,
    ALayoutSider: Layout.Sider,
    ALayoutHeader: Layout.Header,
    ApaMenu
  },
  setup() {
    console.log("roteres==", store.state.routes.routes);
    //这里存放返回数据
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
