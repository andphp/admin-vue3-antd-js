<template>
  <a-layout class="layout-container-vertical">
    <div
      v-if="device === 'mobile' && !collapse"
      class="mask"
      @click="handleFoldSideBar"
    ></div>
  </a-layout>
</template>

<script>
import { Layout } from "ant-design-vue";
// import ApaMenu from "@/apa/components/ApaMenu";
import store from "@/store";
export default {
  name: "Vertical",
  components: {
    ALayout: Layout
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
    console.log("fixedHeader==", props.fixedHeader);
    console.log("showTabsBar==", props.showTabsBar);
    console.log("device==", props.device);
    function handleFoldSideBar() {
      store
        .dispatch("settings/foldSideBar")
        .then(res => {
          console.log("od===", res);
        })
        .catch(err => alert(err.message));
    }
    //这里存放返回数据
    return {
      handleFoldSideBar
    };
  }
};
</script>

<style lang="scss" scoped></style>
