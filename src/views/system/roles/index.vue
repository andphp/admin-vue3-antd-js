<!-- Roles -->
<template>
  <div v-if="selectList.length">
    <p-table
      row-key="id"
      :columns="columns"
      :form-item="formItem"
      :default-form-model="defaultFormModel"
      option-tip-field="roleName"
      :action-url="actionUrl"
      :param="param"
      :fetch="fetch"
      :operate="true"
    ></p-table>
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
import { list, selectList } from "@/api/system/role";
export default {
  name: "roles",
  components: {},
  setup() {
    const state = reactive({
      param: {},
      columns: [
        {
          title: "角色名称",
          dataIndex: "roleName",
          key: "roleName",
          sorter: false,
        },

        {
          title: "上级",
          dataIndex: "parentName",
          key: "parentName",
          sorter: false,
        },
        { title: "备注", dataIndex: "remark", key: "remark", sorter: false },
      ],
      defaultFormModel: {
        id: "",
        roleName: "",
        parentId: 0,
        remark: "",
      },
      formItem: [
        {
          type: "input",
          label: "角色名称",
          field: "roleName",
          value: "",
          props: {
            placeholder: "角色名称",
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
          type: "tree-select",
          label: "上级",
          field: "parentId",
          value: 0,
          treeData: computed(() => {
            return state.selectList;
          }),
          props: {
            placeholder: "上级",
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
        // {
        //   type: "input",
        //   label: "密码",
        //   field: "password",
        //   value: "",
        //   props: {
        //     "has-feedback": true,
        //     placeholder: "请输入密码",
        //   },
        //   rules: [
        //     {
        //       required: true,
        //       message: "密码不能为空",
        //       validator: async (rule, value) => {
        //         // 获取二次确认密码
        //         const {
        //           confirmPassword,
        //           password,
        //         } = dynamicForm.value.modelRef;
        //         if (password === "") {
        //           return Promise.reject("请输入密码");
        //         } else {
        //           // if (confirmPassword !== '') {
        //           //     dynamicForm.value.validateField('confirmPassword');
        //           // }
        //           return Promise.resolve();
        //         }
        //       },
        //     },
        //   ],
        // },
      ],
      actionUrl: {
        add: "/manage/role/create",
        edit: "/manage/role/update",
        del: "/manage/role/delete",
        batchDel: "/manage/role/delete",
      },
      selectList: [],
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

    onMounted(() => {
      selectList().then((res) => {
        const { data } = res;
        state.selectList = data;
      });
    }); // 挂载完成之后调用

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
