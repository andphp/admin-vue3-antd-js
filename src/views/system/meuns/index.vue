<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #title>Header</template>
    <template #footer>Footer</template>
  </a-table>
</template>

<script>
import {
  // reactive,
  // computed,
  // toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
import { Table } from "ant-design-vue";
export default {
  name: "Roles",
  components: {
    ATable: Table,
  },
  setup() {
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后

    // 这里存放返回数据

    const columns = [
      {
        title: "路由name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "路由path",
        dataIndex: "path",
        key: "path",
      },
      {
        title: "组件",
        dataIndex: "component",
        key: "component",
      },
      {
        title: "跳转",
        dataIndex: "redirect",
        key: "redirect",
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "介绍",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "图标",
        dataIndex: "icon",
        key: "icon",
      },
      {
        title: "角色",
        dataIndex: "roles",
        key: "roles",
      },
      // {
      //   title: "是否隐藏",
      //   dataIndex: "hidden",
      //   key: "hidden",
      // },
      // {
      //   title: "子集单行显示",
      //   dataIndex: "alwaysShow",
      //   key: "alwaysShow",
      // },
    ];

    const data = [
      {
        key: "1",
        name: "John Brown",
        path: "￥300,000.00",
        redirect: "New York No. 1 Lake Park",
        title: "New York No. 1 Lake Park",
        description: "New York No. 1 Lake Park",
        icon: "New York No. 1 Lake Park",
        roles: "New York No. 1 Lake Park",
      },
      {
        key: "2",
        name: "Jim Green",
        path: "￥300,000.00",
        redirect: "New York No. 1 Lake Park",
        title: "New York No. 1 Lake Park",
        description: "New York No. 1 Lake Park",
        icon: "New York No. 1 Lake Park",
        roles: "New York No. 1 Lake Park",
      },
      {
        key: "3",
        name: "Joe Black",
        path: "￥300,000.00",
        redirect: "New York No. 1 Lake Park",
        title: "New York No. 1 Lake Park",
        description: "New York No. 1 Lake Park",
        icon: "New York No. 1 Lake Park",
        roles: "New York No. 1 Lake Park",
      },
    ];
    return {
      data,
      columns,
    };
  },
};
</script>
<style lang="less" scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
