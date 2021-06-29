<!-- Apis -->
<template>
  <p-query
    ref="query"
    :search-param="queryArray"
    @search="handleSearch"
    @reset="handleReset"
  >
    <template #title> 筛选条件 </template>
  </p-query>
  <p-table
    ref="table"
    :param="param"
    size="middle"
    :fetch="fetch"
    :columns="columns"
    :toolbar="toolbar"
    :operate="operate"
    :row-key="(record) => record.id"
    :checkbox="false"
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

import { list } from "@/api/system/logs";
export default {
  name: "logs",
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
    let table = ref(null);
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
      /// 工具栏
      toolbar: false,
      columns: [
        {
          title: "agent",
          dataIndex: "agent",
          key: "agent",
          sorter: false,
          align: "left",
          ellipsis: true,
        },

        {
          title: "错误信息",
          dataIndex: "errorMessage",
          key: "errorMessage",
          sorter: false,
          ellipsis: true,
        },
        {
          title: "ip",
          dataIndex: "ip",
          key: "ip",
          sorter: false,
        },
        {
          title: "等级",
          dataIndex: "level",
          key: "level",
          sorter: false,
          width: 50,
        },
        {
          title: "请求方式",
          dataIndex: "method",
          key: "method",
          sorter: false,
          width: 80,
        },
        {
          title: "路径",
          dataIndex: "path",
          key: "path",
          sorter: false,
          ellipsis: true,
        },
        {
          title: "姓名",
          dataIndex: "realname",
          key: "realname",
          sorter: false,
          width: 100,
        },
        {
          title: "状态码",
          dataIndex: "status",
          key: "status",
          sorter: false,
          width: 100,
        },
        {
          title: "latency",
          dataIndex: "latency",
          key: "latency",
          sorter: false,
        },
        {
          title: "创建时间",
          dataIndex: "createdAt",
          key: "createdAt",
          sorter: false,
          width: 150,
        },
        {
          title: "更新时间",
          dataIndex: "updatedAt",
          key: "updatedAt",
          sorter: false,
          width: 150,
        },
        {
          title: "删除时间",
          dataIndex: "deletedAt",
          key: "deletedAt",
          sorter: false,
          width: 150,
        },
      ],
      operate: false,
      queryArray: [
        {
          type: "input",
          key: "realname",
          // rules: [],
          value: "",
          label: "姓名",
          hidden: false,
          props: {
            placeholder: "姓名",
          },
        },
        {
          type: "select",
          key: "method",
          // rules: [],
          value: "",
          label: "请求方式",
          options: [
            {
              label: "全部",
              value: "",
            },
            {
              label: "GET",
              value: "GET",
            },
            {
              label: "POST",
              value: "POST",
            },
            {
              label: "PUT",
              value: "PUT",
            },
            {
              label: "DELETE",
              value: "DELETE",
            },
          ],
          hidden: false,
          props: {
            placeholder: "请求方式",
          },
        },
        {
          type: "input",
          key: "level",
          // rules: [],
          value: "",
          label: "等级",
          hidden: false,
          props: {
            type: "number",
            allowClear: false,
            placeholder: "等级",
          },
        },
      ],
      param: undefined,
    });

    const handleSearch = (data) => {
      state.param = data;
      // console.log("query-data ==> ", data);
    };
    const handleReload = (e) => {
      // query.value.search();
    };

    const handleReset = (e) => {
      // console.log("reset form");
      table.value.reload();
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
      query,
      table,
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
