<template>
  <a-input-password
    v-model:value="modelValue"
    v-bind="formItem.props"
    v-on="formItem.eventObject"
  />
</template>
<script>
import { defineComponent, PropType, computed } from "vue";
import { Input } from "ant-design-vue";

export default defineComponent({
  name: "p-password",
  components: {
    [Input.name]: Input,
  },
  emits: ["update:value"],
  props: {
    formItem: {
      // 表单项
      type: Object,
      default: () => ({}),
    },
    value: undefined, // 表单项值
  },
  setup(props, { attrs, emit }) {
    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit("update:value", val),
    });

    return {
      modelValue,
    };
  },
});
</script>
