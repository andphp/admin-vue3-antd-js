<!-- Roles -->
<template>
  <div v-if="selectList.length">
    <p-table
      row-key="id"
      :columns="columns"
      :form-item="formItem"
      :default-form-model="defaultFormModel"
      option-tip-field="username"
      :action-url="actionUrl"
      :param="param"
      :fetch="fetch"
       :operate="operate"
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
import { list, selectList } from "@/api/system/staff";
export default {
  name: "roles",
  components: {},
  setup() {
    const state = reactive({
      param: {},
      columns: [
        {
          title: "用户名",
          dataIndex: "username",
          key: "username",
          sorter: false,
        },
        {
          title: "姓名",
          dataIndex: "realname",
          key: "realname",
          sorter: false,
        },

        {
          title: "所属部门",
          dataIndex: "departmentName",
          key: "departmentName",
          sorter: false,
        },
        {
          title: "所属岗位",
          dataIndex: "position",
          key: "position",
          sorter: false,
        },
      ],
      defaultFormModel: {
        id: "",
        username: "",
        realname: "",
        departmentId: 0,
        departmentName: "",
        position: "",
        password: "123456",
      },
      formItem: [
        {
          type: "input",
          label: "用户名",
          field: "username",
          value: "",
          props: {
            placeholder: "用户名",
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
          label: "姓名",
          field: "realname",
          value: "",
          props: {
            placeholder: "姓名",
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
          label: "密码",
          field: "password",
          value: "",
          props: {
            "has-feedback": true,
            placeholder: "请输入密码",
          },
          rules: [
            {
              required: false,
              message: "密码不能为空",
              validator: async (rule, value) => {
                // 获取二次确认密码
                // const {
                //   confirmPassword,
                //   password,
                // } = dynamicForm.value.modelRef;
                // if (password === "") {
                //   return Promise.reject("请输入密码");
                // } else {
                //   // if (confirmPassword !== '') {
                //   //     dynamicForm.value.validateField('confirmPassword');
                //   // }
                //   return Promise.resolve();
                // }
              },
            },
          ],
        },
        {
          type: "tree-select",
          label: "所属部门",
          field: "departmentId",
          value: 0,
          treeData: computed(() => {
            return state.selectList;
          }),
          props: {
            placeholder: "所属部门",
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
          label: "所属岗位",
          field: "position",
          value: "",
          props: {
            placeholder: "所属岗位",
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
        add: "/manage/user/create",
        edit: "/manage/user/update",
        del: "/manage/user/delete",
        batchDel: "/manage/user/delete",
      },
      selectList: [],
      operate:[{
          label: "分配角色",
          event: function (record) {
            alert("查看详情:" + JSON.stringify(record));
          },
        },]
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
