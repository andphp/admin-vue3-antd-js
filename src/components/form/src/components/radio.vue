<template>
  <a-radio-group v-model:value="modelValue" v-on="formItem.eventObject"  v-bind="formItem.props">
    <template v-for="option in formItem.options" :key="option.value">
      <a-radio :value="option.value">
        {{ option.label }}
      </a-radio>
    </template>
  </a-radio-group>
</template>
<script>
import { defineComponent, PropType, computed } from "vue";
import { Radio } from "ant-design-vue";

export default defineComponent({
  name: "p-radio",
  components: {
    [Radio.name]: Radio,
    [Radio.Group.name]: Radio.Group,
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
