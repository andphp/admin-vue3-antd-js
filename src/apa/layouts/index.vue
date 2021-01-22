<template>
  <div class="vue-admin-antd-wrapper">
    <component
      :is="layout"
      :collapse="collapse"
      :fixed-header="fixedHeader"
      :show-tabs-bar="showTabsBar"
      :device="device"
    ></component>
    <a-back-top></a-back-top>
  </div>
</template>

<script>
import { BackTop } from "ant-design-vue";
import {
  reactive,
  computed,
  toRefs,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  nextTick
} from "vue";
import store from "@/store";
// import { tokenName } from "@/config";
import { tokenName } from "@/config";
export default {
  name: "Layout",
  components: {
    ABackTop: BackTop
  },
  setup() {
    const initData = reactive({
      oldLayout: store.state.settings.layout,
      width: 0,
      classObj: computed(() => {
        return { mobile: store.state.settings.device === "mobile" };
      }),
      layout: computed(() => store.state.settings.layout),
      showTabsBar: computed(() => store.state.settings.showTabsBar),
      collapse: computed(() => store.state.settings.collapse),
      fixedHeader: computed(() => store.state.settings.fixedHeader),
      device: computed(() => store.state.settings.device)
    });

    onBeforeMount(() => {
      // console.log("onBeforeMount!");
      window.addEventListener("resize", handleLayouts);
    });

    onBeforeUnmount(() => {
      // console.log("onBeforeUnmount!");
      window.removeEventListener("resize", handleLayouts);
    });
    onMounted(() => {
      initData.oldLayout = initData.layout;
      handleLayouts();
      nextTick(() => {
        //  window.location.reload();
        window.addEventListener(
          "storage",
          e => {
            if (e.key === tokenName && (e.key === null || e.value === null))
              console.log("reload");
            window.location.reload();
          },
          false
        );
      });
    });
    function handleLayouts() {
      const width = document.body.getBoundingClientRect().width;
      if (initData.width !== width) {
        const isMobile = width - 1 < 992;
        store.dispatch(
          "settings/changeLayout",
          isMobile ? "Vertical" : initData.oldLayout
        );
        store.dispatch(
          "settings/toggleDevice",
          isMobile ? "mobile" : "desktop"
        );
        initData.width = width;
      }
    }
    const data = toRefs(initData);
    return {
      ...data
    };
  }
};
</script>

<style lang="scss" scoped>
.vue-admin-antd-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  /* 手机端开始 */
  &.mobile {
    ::v-deep {
      .el-pager,
      .el-pagination__jump {
        display: none;
      }
      .layout-container-vertical {
        .el-scrollbar.side-bar-container.is-collapse {
          width: 0;
        }
        .vab-main {
          width: 100%;
          margin-left: 0;
        }
      }
      .vab-main {
        .fixed-header {
          left: 0 !important;
          width: 100% !important;
        }
      }
    }
  }
  /* 手机端结束 */
}
</style>
