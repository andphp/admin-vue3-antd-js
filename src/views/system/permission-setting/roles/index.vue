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
      :operate="operate"
      @reload="onReload"
      :pagination="false"
      :checkbox="false"
      :defaultExpandAllRows="true"
    >
      <template
        #filterDropdown="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
      >
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            placeholder="筛选角色"
            :value="selectedKeys[0]"
            style="width: 200px; margin-bottom: 8px; display: block"
            @change="
              (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
            "
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon><SearchOutlined /></template>
            确认
          </a-button>
          <a-button
            size="small"
            style="width: 90px"
            @click="handleReset(clearFilters)"
          >
            清空
          </a-button>
        </div>
      </template>
      <template #filterIcon="filtered">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
      <template #customRender="{ text, column }">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              class="highlight"
              :key="i"
            >
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template></p-table
    >
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
import { useRouter } from "vue-router";

import { SearchOutlined } from "@ant-design/icons-vue";

export default {
  name: "roles",
  components: { SearchOutlined },
  setup() {
    const searchInput = ref(null);
    const router = useRouter();
    const state = reactive({
      param: {},
      columns: [
        {
          title: "角色名称",
          dataIndex: "roleName",
          key: "roleName",
          sorter: false,
          align: "left",
          slots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender",
          },
          onFilter: (value, record) => {
            return record.roleName
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                // console.log(searchInput.value);
                searchInput.value.focus();
              }, 0);
            }
          },
        },

        // {
        //   title: "上级",
        //   dataIndex: "parentName",
        //   key: "parentName",
        //   sorter: false,
        // },
        {
          title: "备注",
          dataIndex: "remark",
          key: "remark",
          sorter: false,
          ellipsis: true,
        },
      ],
      defaultFormModel: {
        id: "",
        roleName: "",
        parentId: "0",
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
          type: "tree-select",
          label: "上级",
          field: "parentId",
          value: "0",
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
      operate: [
        {
          label: "权限管理",
          event: (record) => {
            // alert("查看详情:" + JSON.stringify(record));
            console.log(router);
            router.push({
              path: "/system/permission-setting/permission",
              query: {
                t: 1,
                id: record.id,
              },
            });
          },
        },
      ],
      selectList: [],
      expandedRowKeys: [],
      searchText: "",
      searchedColumn: "",
    });
    // 这里存放返回数据
    const fetch = async (param) => {
      console.log(!!param);
      console.log(param);
      let { data } = await list(param);
      console.log(data);
      state.expandedRowKeys = data.map((s) => s.id);
      return {
        total: data.length,
        data: data,
      };
    };
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {
      getSelectTree();
    }); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后

    const getSelectTree = () => {
      selectList().then((res) => {
        const { data } = res;
        state.selectList = data;
      });
    };
    const onReload = () => {
      //刷新树
      getSelectTree();
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = (clearFilters) => {
      clearFilters();
      state.searchText = "";
    };
    return {
      ...toRefs(state),
      fetch,
      onReload,
      searchInput,
      handleSearch,
      handleReset,
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类

.ant-table-thead > tr > th .anticon-search > :deep(svg) {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -5px;
  margin-left: -6px;
}
</style>
