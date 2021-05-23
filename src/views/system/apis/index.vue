<!-- Apis -->
<template>
  <p-table
    size="middle"
    :fetch="fetch"
    :columns="columns"
    :toolbar="toolbar"
    :operate="operate"
    :pagination="pagination"
    :row-key="(record) => record.id"
    bordered
  >
    <!-- 继承至 a-table 的默认插槽 -->
  </p-table>
</template>

<script>
import {
  reactive,
  computed,
  toRefs,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

import { list } from "@/api/system/apis";
export default {
  name: "apis",
  components: {},
  setup() {
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后

    // 这里存放返回数据

    let query = ref(null);
    /// 数据来源 [模拟]
    const fetch = async (param) => {
      let { data } = await list(param);
      console.log(data);
      return {
        total: data.total,
        data: data.data,
      };
    };
    const selectOptions = [
      {
        value: "",
        text: "全部",
      },
      {
        value: 1,
        text: "关闭",
      },
      {
        value: 2,
        text: "开启",
      },
    ];
    const state = reactive({
      pagination: { current: 1, pageSize: 10 },
      /// 工具栏
      toolbar: false,
      columns: [
        { title: "名称", dataIndex: "name", key: "name", sorter: true },
        { title: "键值", dataIndex: "key", key: "key", sorter: true },
        {
          title: "说明",
          dataIndex: "description",
          key: "description",
          sorter: true,
        },
        { title: "请求方式", dataIndex: "method", key: "method", sorter: true },
        { title: "路径", dataIndex: "path", key: "path", sorter: true },
      ],
      operate: false,
      queryArray: [
        {
          type: "input",
          key: "id",
          rules: [],
          value: "1sfsdfsdfd",
          label: "规则编号",
          hidden: false,
        },
        {
          type: "select",
          key: "status",
          rules: [],
          value: "",
          label: "使用状态",
          options: selectOptions,
          hidden: false,
        },
        {
          type: "select",
          key: "status1",
          rules: [],
          value: "",
          label: "使用状态1",
          options: selectOptions,
          hidden: true,
        },
        {
          type: "select",
          key: "status2",
          rules: [],
          value: "",
          label: "使用状态2",
          options: selectOptions,
          hidden: true,
        },
        {
          type: "input",
          key: "status3",
          rules: [],
          value: "",
          label: "使用状态3",
          hidden: true,
        },
        {
          type: "input",
          key: "status4",
          rules: [],
          value: "",
          label: "使用状态4",
          hidden: true,
        },
        {
          type: "input",
          key: "status5",
          rules: [],
          value: "",
          label: "使用状态5",
          hidden: true,
        },
        {
          type: "input",
          key: "status6",
          rules: [],
          value: "",
          label: "使用状态6",
          hidden: true,
        },
      ],
    });

    const handleSearch = (data) => {
      console.log("query-data ==> ", data);
    };
    const handleReload = (e) => {
      query.value.search();
    };

    const handleReset = (e) => {
      console.log("reset form");
    };
    const onSelectChange = (selectedRowKeys, selectedRows) => {
      state.selectedRowKeys = selectedRowKeys;
      state.selectedRows = selectedRows;
    };

    const rowSelection = computed(() => {
      return {
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
      };
    });
    /// 声明抛出
    return {
      // pagination: { current: 1, pageSize: 10 }, // 分页配置
      // toolbar: toolbar, // 工具栏
      // columns: columns, // 列配置
      // operate: operate, // 行操作
      // queryArray,
      // hiddenQuery,
      ...toRefs(state),
      fetch: fetch, // 数据回调
      rowSelection,
      handleSearch,
      handleReset,
      handleReload,
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
