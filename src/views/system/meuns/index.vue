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
        title: "Name",
        dataIndex: "name",
        slots: { customRender: "name" },
      },
      {
        title: "Cash Assets",
        className: "column-money",
        dataIndex: "money",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
    ];

    const data = [
      {
        key: "1",
        name: "John Brown",
        money: "￥300,000.00",
        address: "New York No. 1 Lake Park",
      },
      {
        key: "2",
        name: "Jim Green",
        money: "￥1,256,000.00",
        address: "London No. 1 Lake Park",
      },
      {
        key: "3",
        name: "Joe Black",
        money: "￥120,000.00",
        address: "Sidney No. 1 Lake Park",
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
