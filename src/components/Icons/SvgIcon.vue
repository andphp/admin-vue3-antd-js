<template>
  <div v-if="isExternal" class="svg-external-icon svg-icon" :style="styleExternal"></div>
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :href="iconName"></use>
  </svg>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
export default {
  name: "SvgIcon",
  props: {
    iconClass: { type: String, required: true }, // icon名称
    className: { type: String, default: "" } // 自定义class类名
  },
  setup(props){

    // 判断是否为外部连接 https: mailto: tel:
    const isExternal = (path) => {
      return /^(https?:|mailto:|tel:)/.test(path);
    };

    const data = toRefs( reactive({
      // 监听是否外链
      isExternal: computed(()=> {
        return isExternal(props.iconClass);
      }),
      // 监听icon名称
      iconName: computed(()=> `#icon-${props.iconClass}`),
      // 监听样式变化
      svgClass: computed(()=> props.className ? "svg-icon " + props.className : "svg-icon"),
      // 监听样式
      styleExternal: computed(()=>{
        return {
          mask: `url(${props.iconClass}) no-repeat 50% 50%`,
          '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
        }
      })
    }))

    return {
      ...data
    };
  }
};
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
