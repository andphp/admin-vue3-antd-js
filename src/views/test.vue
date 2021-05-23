<template>
  <div>
    <p-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk" >
      <a-tree
        v-if="treeData.length"
        checkable
        :tree-data="treeData"
        :defaultExpandAll="true"
        @check="handleCheck"
      >
        <template #custom="{ title, extra: data }">
          <div class="action-item">
            <a-row type="flex">
              <a-col>
                <span :style="{ marginRight: '10px' }">{{ title }}</span></a-col
              >
              <a-col :flex="1">
                <a-checkbox
                  v-for="(item, index) in data.actions"
                  :key="item.key"
                  v-model:value="item.checked"
                  >{{ item.value }}</a-checkbox
                >
              </a-col>
            </a-row>
          </div>
        </template>
      </a-tree>
    </p-modal>
  
  </div>
</template>
<script>
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { computed, defineComponent, reactive, ref, toRefs } from "vue";

import { getDataTable, getTree } from "@/api/components";
import { message } from "ant-design-vue";

export default {
  setup() {
    const visible = ref(true);
    const state = reactive({
      treeData: [],
    });
    const onSelect = (s, e) => {
      // console.log(e.node.$props);
      const {
        node,
        node: { dataRef },
        node: {
          dataRef: { extra: data },
        },
      } = e;
    };
    const handleCheck = (checkedKeys, e) => {
      const { checked, checkedNodes, node, event } = e;
      const {
        dataRef: { extra: data },
      } = node;
      console.log(data);
    };
    getTree("/components/tree").then((res) => {
      state.treeData = res.data;
    });

    const handleOk=()=>{
      alert(1)
    }
    return {
      ...toRefs(state),
      onSelect,
      handleCheck,
      visible,
      handleOk
    };
  },
};
</script>
<style lang="less" scoped>
:deep(.ant-tree-node-content-wrapper) {
  width: 100%;
}
</style>
