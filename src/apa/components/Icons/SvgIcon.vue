<template>
  <div
    v-if="isExternal"
    class="svg-external-icon svg-icon"
    :style="styleExternal"
  ></div>
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :href="iconClass"></use>
  </svg>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
export default {
  name: "svg-icon",
  props: {
    iconName: { type: String, required: true }, // icon名称
    className: { type: String, default: "" }, // 自定义class类名
  },
  setup(props) {
    // 判断是否为外部连接 https: mailto: tel:
    const isExternal = (path) => {
      return /^(https?:|mailto:|tel:)/.test(path); 
    };

    // console.log("props.iconName", props.iconName);
    const data = toRefs(
      reactive({
        // 监听是否外链
        isExternal: computed(() => {
          return isExternal(props.iconName);
        }),
        // 监听icon名称
        iconClass: computed(() => `#icon-${props.iconName}`),
        // 监听样式变化
        svgClass: computed(() =>
          props.className ? "svg-icon " + props.className : "svg-icon"
        ),
        // 监听样式
        styleExternal: computed(() => {
          return {
            mask: `url(${props.iconName}) no-repeat 50% 50%`,
            "-webkit-mask": `url(${props.iconName}) no-repeat 50% 50%`,
          };
        }),
      })
    );
    return {
      ...data,
    };
  },
};
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  // vertical-align: -0.15em;
  fill: @current-color;
  // fill: #ffffff;
  overflow: hidden;
}
.svg-external-icon {
  background-color: @current-color;
  mask-size: cover !important;
  display: inline-block;
}
.apa-large {
  width: 32px;
  height: 32px;
}
</style>
