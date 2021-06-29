<template>
  <a-card hoverable class="card-base">
    <div :style="{ color: color }" class="card-base-icon">
      <!-- <MenuIcon></MenuIcon> -->
    </div>
    <div class="card-base-title">
      {{ title }}
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </a-card>
</template>
<script>
import "./index.less";
import * as Icons from "@ant-design/icons-vue";
export default {
  name: "p-card-base",
  props: {
    icon: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const MenuIcon = Icons[props.icon] || {};

    return {
      MenuIcon,
    };
  },
};
</script>
