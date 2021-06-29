
<!-- Roles -->
<template>
  <div>
    <!-- <p-query
      ref="query"
      :search-param="queryArray"
      @search="handleSearch"
      @reset="handleReset"
    >
      <template #title> 筛选条件 </template>
      <template #extra>
        <a-button type="primary" @click="goto('/system/sell/paltform')"
          >平台管理</a-button
        >
      </template>
    </p-query> -->

    <p-table
      row-key="id"
      :columns="columns"
      :form-item="formItem"
      :form-item-layout="formItemLayout"
      :default-form-model="defaultFormModel"
      option-tip-field="key"
      :action-url="actionUrl"
      :param="param"
      :fetch="fetch"
      :operate="true"
      :submit-before="onSubmitBefore"
      :modal-props="modalProps"
    >
    </p-table>
  </div>
</template>

<script>
import {
  reactive,
  computed,
  ref,
  toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  getCurrentInstance,
} from "vue";
import { list } from "@/api/system/setting/configuration";
export default {
  name: "configuration",
  components: {},
  setup() {
    const state = reactive({
      //查询参数
      param: {},
      //表格数据列定义
      columns: [
        {
          title: "键",
          dataIndex: "key",
          key: "key",
          sorter: false,
        },
        {
          title: "值",
          dataIndex: "value",
          key: "value",
          sorter: false,
        },

        {
          title: "组",
          dataIndex: "group",
          key: "group",
          sorter: false,
        },
        {
          title: "备注",
          dataIndex: "remark",
          key: "remark",
          sorter: false,
        },
      ],
      //新增弹框默认值
      defaultFormModel: {
        id: undefined,
        key: "", //键
        value: "", //值
        remark: "", //备注
        group: "", //组
      },
      //表单输入项
      formItem: [
        {
          type: "input",
          label: "键",
          field: "key",
          value: "",
          props: {
            placeholder: "键",
          },
          rules: [
            {
              required: true,
              message: "不能为空",
            },
            // {
            //   min: 3,
            //   max: 5,
            //   message: "账号长度为3-5个字符",
            //   trigger: "blur",
            // },
          ],
        },
        {
          type: "input",
          label: "值",
          field: "value",
          value: "",
          props: {
            placeholder: "值",
          },
          rules: [
            {
              required: true,
              message: "不能为空",
            },
          ],
        },
        {
          type: "input",
          label: "组",
          field: "group",
          value: "",
          props: {
            placeholder: "组",
          },
          rules: [
            {
              required: false,
              message: "不能为空",
            },
          ],
        },
        {
          type: "textarea",
          label: "备注",
          field: "remark",
          value: "",
          props: {
            placeholder: "备注",
          },
          rules: [
            {
              required: false,
              message: "不能为空",
            },
          ],
        },
      ],
      //增删改查对应接口地址
      actionUrl: {
        add: "/manage/configure/create",
        edit: "/manage/configure/update",
        del: "/manage/configure/delete",
        batchDel: "/manage/configure/batch_del",
      },
      //表单布局所占宽度设置
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      },
      queryArray: [
        {
          type: "input",
          key: "shop_name",
          // rules: [],
          value: "",
          label: "店铺名称",
          hidden: false,
          props: {
            placeholder: "店铺名称",
          },
        },
        {
          type: "select",
          key: "platform_id",
          // rules: [],
          value: "",
          label: "所属平台",
          hidden: false,
          options: computed(() => {
            let result = [
              {
                label: "全部",
                value: "",
              },
            ];
            result = result.concat(
              state.platformList.map((s) => {
                return { label: s.platformName, value: s.id };
              })
            );
            return result;
          }),
          props: {
            // mode: "multiple",
            placeholder: "所属平台",
          },
        },
        {
          type: "tree-select",
          key: "department_id",
          // rules: [],
          value: [""],
          label: "所属部门",
          hidden: false,
          options: computed(() => {
            let result = [
              {
                key: "",
                title: "全部",
                value: "",
              },
            ];
            result = result.concat(state.departmentList);
            return result;
          }),
          props: {
            // multiple: true,
            placeholder: "所属部门",
          },
        },
      ],
      sdList: [], //航司下拉数据
      modalProps:{
        //   width:"50%"
      }
    });
    // 表格查询的异步请求数据
    const fetch = async (param) => {
        // if (param && param.type && param.type.length) {
        //   param.type = param.type.join(",");
        // }
        let { data } = await list(param);
        console.log(data);
        return {
          total: data.total,
          data: data.data,
        };
    };
    onBeforeMount(() => {}); // 挂载前

    onMounted(async () => {
    //   let { data: sdList } = await platformSelect();
    //   state.sdList = platformList;
    }); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后
    const onSubmitBefore = (data) => {
      //   if (data) {
      //     if (data.type && Array.isArray(data.type)) {
      //       data.type = data.type.join(",");
      //     }
      //   }
      return data;
    };
    const handleSearch = (data) => {
      state.param = data;
      // console.log("query-data ==> ", data);
    };

    const handleReset = (e) => {
      // console.log("reset form");
      table.value.reload();
    };

    return {
      ...toRefs(state),
      fetch,
      onSubmitBefore,
      handleSearch,
      handleReset,
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>

