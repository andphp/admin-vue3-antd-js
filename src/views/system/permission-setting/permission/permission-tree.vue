<!-- Roles -->
<template>
  <a-tree
    v-if="treeData.length"
    checkable
    :tree-data="treeData"
    :defaultExpandAll="true"
    @check="handleCheck"
  >
    <template #custom="{ title, extend: data }">
      <div class="action-item">
        <a-row type="flex">
          <a-col>
            <span :style="{ marginRight: '10vh' }">{{ title }}</span></a-col
          >
          <a-col :flex="1">
            <a-checkbox
              v-for="(item, index) in data.abilityList"
              :key="item.abilityKey"
              v-model:checked="item.checkBox"
              @change="handleCheckChange"
              @click="handleCheckClick(item)"
              >{{ item.abilityValue }}</a-checkbox
            >
          </a-col>
        </a-row>
      </div>
    </template>
  </a-tree>
</template>

<script>
import {
  reactive,
  computed,
  toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  watch,
  ref,
} from "vue";
import { getTree } from "@/api/components";

export default {
  name: "permission-tree",
  components: {},
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后

    const state = reactive({
      treeData: computed(() => {
        // return props.data.map((s) => toRefs(s));
        return props.data;
      }),
    });
    const onSelect = (s, e) => {
      // console.log(e.node.$props);
      const {
        node,
        node: { dataRef },
        node: {
          dataRef: { extend: data },
        },
      } = e;
    };
    const checkTrigger = (data, checked) => {
      if (data.dataRef) {
        data.dataRef.extend.abilityList.forEach((x, index) => {
          x.checkBox = checked;
        });
        if (data.dataRef.children && data.dataRef.children.length) {
          for (let index = 0; index < data.children.length; index++) {
            checkTrigger(data.dataRef.children[index], checked);
          }
        }
      } else {
        if (data.children) {
          for (let index = 0; index < data.children.length; index++) {
            checkTrigger(data.children[index], checked);
          }
        } else {
          data.extend.abilityList.forEach((x, index) => {
            x.checkBox = checked;
          });
        }
      }
    };
    const handleCheck = (checkedKeys, e) => {
      const { checked, checkedNodes, node, event } = e;
      const {
        dataRef: { extend: data },
      } = node;
      checkTrigger(node, checked);
    };
    // getTree("/components/tree").then((res) => {
    //   state.treeData = res.data;
    // });
    const handleCheckChange = (val) => {
      // debugger;
    };
    const handleCheckClick = (item) => {
      // e.target.checked = !e.target.checked;
      item.checkBox = !item.checkBox;
    };

    // 这里存放返回数据
    return {
      ...toRefs(state),
      onSelect,
      handleCheck,
      handleCheckChange,
      handleCheckClick,
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
:deep(.ant-tree-node-content-wrapper) {
  width: 100%;
}
</style>
