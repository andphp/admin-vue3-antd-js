<template>
  <div id="table-dome">
    <a-card>
      <p-query
        ref="query"
        :search-param="queryArray"
        @search="handleSearch"
        @reset="handleReset"
      ></p-query>

      <p-table
        size="middle"
        :fetch="fetch"
        :columns="columns"
        :toolbar="toolbar"
        :operate="operate"
        :pagination="pagination"
        :row-key="(record) => record.id"
        bordered
        @reload="handleReload"
      >
        <!-- 继承至 a-table 的默认插槽 -->
      </p-table>
    </a-card>
  </div>
</template>
<script>
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { computed, defineComponent, reactive, ref, toRefs } from "vue";

import { getDataTable } from "@/api/components";
export default {
  setup() {
    let query = ref(null);
    /// 数据来源 [模拟]
    const fetch = async (param) => {
      let { data } = await getDataTable();
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
      toolbar: [
        {
          label: "新增",
          event: function (keys) {
            alert("新增操作:" + JSON.stringify(keys));
          },
        },
        {
          label: "删除",
          event: function (keys) {
            alert("批量删除:" + JSON.stringify(keys));
          },
        },
        {
          label: "更多操作",
          children: [
            {
              label: "批量导入",
              event(keys) {
                alert("批量导入");
              },
            },
            {
              label: "批量导出",
              event(keys) {
                alert("批量导出");
              },
            },
          ],
        },
      ],
      columns: [
        { title: "姓名", dataIndex: "name", key: "name", sorter: true },
        { title: "性别", dataIndex: "sex", key: "sex", sorter: true },
        { title: "年龄", dataIndex: "age", key: "age", sorter: true },
        { title: "地址", dataIndex: "address", key: "address", sorter: true },
      ],
      operate: [
        {
          label: "查看",
          event: function (record) {
            alert("查看详情:" + JSON.stringify(record));
          },
        },
        {
          label: "修改",
          event: function (record) {
            alert("修改事件:" + JSON.stringify(record));
          },
        },
        {
          label: "删除",
          event: function (record) {
            alert("删除事件:" + JSON.stringify(record));
          },
        },
        {
          label: "更多",
          children: [
            {
              label: "导出",
              event: function (record) {
                alert("导出");
              },
            },
            {
              label: "下载",
              event: function (record) {
                alert("下载");
              },
            },
          ],
        },
      ],
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
