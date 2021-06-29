<template>
  <div v-if="formItem && (formItem.treeData || formItem.options)">
    <a-tree-select
      v-model:value="modelValue"
      v-bind="formItem.props"
      v-on="formItem.eventObject"
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      :tree-data="treeData"
      :placeholder="formItem.placeholder"
      tree-default-expand-all
      treeNodeFilterProp="title"
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
      if (props.formItem) {
        if (props.formItem.treeData) {
          let list = [...props.formItem.treeData];
          if (!list.some((s) => s.value == 0)) {
            if (props.formItem.empty) {
              list.unshift(props.formItem.empty);
            } else {
              list.unshift(empty);
            }
          }
          return list;
        } else if (props.formItem.options) {
          let list = [...props.formItem.options];
          if (!list.some((s) => s.value == 0)) {
            if (props.formItem.empty) {
              list.unshift(props.formItem.empty);
            } else {
              list.unshift(empty);
            }
          }
          return list;
        }
      }
    });
    return {
      modelValue,
      treeData,
    };
  },
});
</script>
