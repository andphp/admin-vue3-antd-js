<template>
  <a-row type="flex" :gutter="20">
    <a-col flex="300px">
      <p-tree
        title="选择部门"
        @select="onSelectDep"
        ref="tree"
        :url="depUrl"
        default-expand-all
        :show-all="true"
      ></p-tree>
    </a-col>
    <a-col :flex="1">
      <p-query
        ref="query"
        :search-param="queryArray"
        @search="handleSearch"
        @reset="handleReset"
      >
        <template #title> 筛选条件 </template>
      </p-query>
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
          ref="tableRef"
        >
        </p-table>
      </div>
    </a-col>
  </a-row>

  <p-modal
    v-model:visible="roleShow"
    :forceRender="true"
    title="分配角色"
    @ok="handleRoleOK"
    @cancel="handleRoleCancel"
  >
    <p-form ref="formRef" :form-schema="formSchema">
      <!-- <template #operate-button>
          <a-button type="primary" @click="confirm"> 确定 </a-button>
        </template> -->
    </p-form>
  </p-modal>
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
import {
  list,
  selectList,
  setRole,
  disable,
  roleSelectList,
} from "@/api/system/staff";
export default {
  name: "staff",
  components: {},
  setup() {
    const formRef = ref(null);
    const tableRef = ref(null);

    const { proxy } = getCurrentInstance();
    const getFormSchema = (dynamicForm) => {
      return {
        formItemLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        },
        formItem: [
          {
            type: "tree-select",
            label: "角色",
            field: "roleId",
            value: ["0"],
            treeData: computed(() => {
              return state.roleSelectList;
            }),
            placeholder: "请选择角色",
            props: {
              multiple: true,
              treeDefaultExpandAll: true,
            },
            rules: [
              // {
              //   type: Array,
              //   required: false,
              //   message: "请输入账号",
              // },
            ],
          },
        ],
      };
    };
    const state = reactive({
      param: {
        department_id: "",
      },
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
        {
          title: "是否启用",
          key: "status",
          dataIndex: "status",
          customRender: ({ text, record, index }) => {
            // return h("div", "hello");
            record.status = record.status > 0 ? true : false;
            return (
              <a-switch
                checked-children="是"
                un-checked-children="否"
                v-model={[record.status, "checked"]}
                onChange={(checked, e) => {
                  disable({
                    id: record.id,
                    status: checked ? 1 : 0,
                  }).then((res) => {
                    if (res.code == 0) {
                      proxy.$message.success("设置成功");
                    } else {
                      tableRef.value.reload();
                    }
                  });
                  // if (checked) {
                  //    record.checked = checked;
                  //    return
                  // }
                }}
              ></a-switch>
            );
          },
        },
        {
          title: "所属角色",
          dataIndex: "roleName",
          key: "roleName",
          sorter: false,
        },
        {
          title: "IP",
          dataIndex: "lastIp",
          key: "lastIp",
          sorter: false,
        },
        {
          title: "登录时间",
          dataIndex: "lastLoginAt",
          key: "lastLoginAt",
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
          type: "password",
          label: "密码",
          field: "password",
          value: "",
          tip: "默认密码为123456",
          props: {
            // "has-feedback": true,
            placeholder: "请输入密码",
            // type: "password",
          },
          rules: [
            {
              required: true,
              message: "不能为空",
              // validator: async (rule, value) => {
              //   // 获取二次确认密码
              //   // const {
              //   //   confirmPassword,
              //   //   password,
              //   // } = dynamicForm.value.modelRef;
              //   // if (password === "") {
              //   //   return Promise.reject("请输入密码");
              //   // } else {
              //   //   // if (confirmPassword !== '') {
              //   //   //     dynamicForm.value.validateField('confirmPassword');
              //   //   // }
              //   //   return Promise.resolve();
              //   // }
              // },
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
      operate: [
        {
          label: "分配角色",
          event: function (record) {
            // alert("查看详情:" + JSON.stringify(record));
            roleClick(record);
          },
        },
      ],
      roleShow: false,
      formSchema: getFormSchema(formRef),
      selectList: [],
      roleSelectList: [],
      currentUser: null,
      depUrl: "manage/department/select",
      queryArray: [
        {
          type: "input",
          key: "username",
          // rules: [],
          value: "",
          label: "用户名",
          hidden: false,
          props: {
            placeholder: "用户名",
          },
        },
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
          type: "input",
          key: "position",
          // rules: [],
          value: "",
          label: "岗位",
          hidden: false,
          props: {
            placeholder: "岗位",
          },
        },
      ],
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
    const roleClick = (data) => {
      state.currentUser = data;
      formRef.value.modelRef.roleId = data.roleIds;
      state.roleShow = true;
    };

    const handleRoleOK = async () => {
      let data = formRef.value.modelRef;
      setRole({
        user_id: state.currentUser.id,
        role_ids: data.roleId.join(","),
      }).then((res) => {
        if (res.code == 0) {
          proxy.$message.success("分配成功");
          tableRef.value.reload();
        }
      });
      state.roleShow = false;
    };

    const handleRoleCancel = () => {
      formRef.value.modelRef.roleId = ["0"];
      state.roleShow = false;
    };
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {
      selectList().then((res) => {
        const { data } = res;
        state.selectList = data;
      });
      roleSelectList().then((res) => {
        const { data } = res;
        state.roleSelectList = data;
      });
    }); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后

    const onSelectDep = async (s, e) => {
      const {
        node,
        node: { dataRef },
        node: {
          dataRef: { extend: data },
        },
      } = e;
      if (dataRef.key || dataRef.id) {
        state.param.department_id = data.id;
      } else {
        state.param.department_id = "";
      }
      // tableRef.value.reload();
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
      formRef,
      tableRef,
      roleClick,
      handleRoleOK,
      handleRoleCancel,
      onSelectDep,
      handleSearch,
      handleReset,
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
