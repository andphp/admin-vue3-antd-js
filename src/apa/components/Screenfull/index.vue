<template>
  <div class="top-bar-right-padding">
    <FullscreenExitOutlined @click="click" v-if="isFullscreen" />
    <FullscreenOutlined @click="click" v-else />
  </div>
</template>

<script>
import screenfull from "screenfull"; // FullscreenOutlined, FullscreenExitOutlined,
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "screenfull",
  components: {
    FullscreenOutlined,
    FullscreenExitOutlined,
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    },
  },
};
</script>

<style scoped></style>
