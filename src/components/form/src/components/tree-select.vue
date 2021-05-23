<template>
  <div v-if="formItem && formItem.treeData">
    <a-tree-select
      v-model:value="modelValue"
      v-bind="formItem.props"
      v-on="formItem.eventObject"
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      :tree-data="treeData"
      placeholder="formItem.placeholder"
      tree-default-expand-all
    >
    </a-tree-select>
  </div>
</template>
<script>
import { defineComponent, PropType, computed } from "vue";
export default defineComponent({
  name: "p-tree-select",
  components: {},
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
    const empty = {
      id: 0,
      key: 0,
      value: 0,
      parentId: 0,
      title: "无",
      checkable: true,
      disableCheckbox: false,
      disabled: false,
      selectable: true,
      isLeaf: false,
    };
    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit("update:value", val),
    });

    const treeData = computed(() => {
      if (props.formItem && props.formItem.treeData) {
        if (!props.formItem.treeData.some((s) => s.value == 0)) {
          if (props.formItem.empty) {
            props.formItem.treeData.unshift(props.formItem.empty);
          } else {
            props.formItem.treeData.unshift(empty);
          }
        }

        return props.formItem.treeData;
      }
    });
    return {
      modelValue,
      treeData,
    };
  },
});
</script>
