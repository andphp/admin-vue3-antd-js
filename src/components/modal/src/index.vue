<template>
  <a-modal v-bind="$props" @cancel="handleCancel">
    <slot></slot>
  </a-modal>
</template>
<script>
import "./index.less";
import T from "ant-design-vue/lib/modal";
const TProps = T.props;
import { defineComponent, reactive, ref, toRefs, watch, onMounted } from "vue";
export default defineComponent({
  name: "p-modal",
  props: Object.assign({}, TProps),
  setup(props, { emit }) {
    const handleCancel = (e) => {
      emit('update:visible',false)
    };
    return {
      handleCancel
    }
  },
});
</script>
