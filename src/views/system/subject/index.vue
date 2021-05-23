<!-- Roles -->
<template>
  <p-table
    row-key="id"
    :columns="columns"
    :form-item="formItem"
    :default-form-model="defaultFormModel"
    option-tip-field="username"
    :action-url="actionUrl"
    :param="param"
    :fetch="fetch"
    :operate="true"
  ></p-table>
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
import { list } from "@/api/system/subject";
export default {
  name: "roles",
  components: {},
  setup() {
    const state = reactive({
      param: {},
      columns: [
        {
          title: "科目名称",
          dataIndex: "name",
          key: "name",
          sorter: false,
        },
        {
          title: "支付公司",
          dataIndex: "支付公司",
          key: "payCompany",
          sorter: false,
        },

        {
          title: "支付公司类型",
          dataIndex: "payCompanyTypeStr",
          key: "payCompanyTypeStr",
          sorter: false,
        },
        {
          title: "科目类型",
          dataIndex: "typeStr",
          key: "typeStr",
          sorter: false,
        },
      ],
      defaultFormModel: {
        id: "",
        name: "",
        payCompany: "",
        account: "",
        payCompanyType: "",
        type: "",
      },
      formItem: [
        {
          type: "input",
          label: "科目名称",
          field: "name",
          value: "",
          props: {
            placeholder: "科目名称",
          },
          rules: [
            {
              required: false,
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
          label: "支付公司",
          field: "payCompany",
          value: "",
          props: {
            placeholder: "支付公司",
          },
          rules: [
            {
              required: false,
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
          type: "select",
          label: "支付公司类型",
          field: "payCompanyType",
          value: "",
          options: [
            {
              value: 1,
              label: "第三方公司",
            },
            {
              value: 2,
              label: "银行",
            },
            {
              value: 3,
              label: "虚拟币",
            },
          ],
          props: {
            "has-feedback": true,
            placeholder: "请输入密码",
          },
          rules: [{}],
        },
        {
          type: "input",
          label: "收款账号",
          field: "account",
          value: "",
          props: {
            placeholder: "收款账号",
          },
          rules: [
            {
              required: false,
              message: "不能为空",
            },
          ],
        },

        {
          type: "input",
          label: "科目类型",
          field: "type",
          value: "",
          props: {
            placeholder: "科目类型",
          },
          rules: [
            {
              required: false,
              message: "不能为空",
            },
          ],
        },
      ],
      actionUrl: {
        add: "/manage/subject/create",
        edit: "/manage/subject/update",
        del: "/manage/subject/delete",
        batchDel: "/manage/subject/delete",
      },
      // selectList: [],
    });
    // 这里存放返回数据
    const fetch = async (param) => {
      let { data } = await list(param);
      console.log(data);
      return {
        total: data.total,
        data: data.data,
      };
    };
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后

    return {
      ...toRefs(state),
      fetch,
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
