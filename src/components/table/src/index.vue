<template>
  <div id="p-table">
    <div class="p-table-tool">
      <!-- 表格工具栏 -->
      <div class="p-table-prev">
        <template :key="index" v-for="(item, index) in toolbars">
          <!-- 更多按钮 -->
          <a-dropdown v-if="item.children && item.children.length > 0">
            <!-- -->
            <a-button>
              {{ item.label }}
            </a-button>
            <template #overlay>
              <a-menu>
                <!-- 遍历子集 -->
                <a-menu-item v-for="(child, i) in item.children" :key="i">
                  <a @click="child.event(selectedRowKeys)">
                    {{ child.label }}
                  </a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-button
            v-else
            :type="index == 0 ? 'primary' : ''"
            @click="item.event(selectedRowKeys)"
          >
            {{ item.label }}
          </a-button>
        </template>
      </div>
      <!-- 默认工具栏 -->
      <div class="p-table-next">
        <a-button @click="reload">
          <template #icon
            ><LoadingOutlined v-if="loading" /><SyncOutlined v-else
          /></template>
        </a-button>
        <a-dropdown>
          <a-button>
            <template #icon><AppstoreOutlined /></template>
          </a-button>
          <template #overlay>
            <a-menu class="filtration">
              <a-checkbox-group
                v-model:value="filtrationColumnKeys"
                @change="filtration"
              >
                <a-row class="ck">
                  <a-col
                    :span="24"
                    :key="index"
                    v-for="(filtrationColumn, index) in filtrationColumns"
                  >
                    <a-checkbox :value="filtrationColumn.value">
                      {{ filtrationColumn.label }}
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <!-- 表格组件 -->
    <a-table
      v-bind="$props"
      :dataSource="datasource"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @change="fetch"
      :row-selection="
        checkbox
          ? {
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
            }
          : null
      "
      class="ant-table-striped"
      :rowClassName="
        (record, index) => (striped && index % 2 === 1 ? 'table-striped' : null)
      "
    >
      <!-- 默认插槽 [自定义列替换]-->
      <slot></slot>
      <!-- 行操作 -->
      <template v-slot:action="{ record }">
        <span>
          <template :key="index" v-for="(item, index) in operates">
            <!-- 下拉操作 -->
            <a-dropdown v-if="item.children && item.children.length > 0">
              <a> {{ item.label }} </a>
              <template #overlay>
                <a-menu>
                  <!-- 遍历子集 -->
                  <a-menu-item v-for="(child, i) in item.children" :key="i">
                    <a @click="child.event(record)"> {{ child.label }} </a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <!-- 单个操作 -->
            <a v-else @click="item.event(record)"> {{ item.label }} </a>
            <a-divider type="vertical" />
          </template>
        </span>
      </template>
    </a-table>
  </div>
  <p-modal
    v-model:visible="show"
    v-model:title="modalTitle"
    @ok="handleSubmit"
    @cancel="handleModalClose"
    :force-render="true"
  >
    <p-form ref="formRef" :form-schema="formSchema"> </p-form>
  </p-modal>
</template>
<script>
import "./index.less";
import T from "ant-design-vue/es/table/Table";
import {
  watch,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  ref,
  getCurrentInstance,
  computed,
  nextTick,
} from "vue";
import {
  AppstoreOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";

const TProps = T.props;

import { apiAdd, apiEdit, apiDel } from "@/api/components";
export default defineComponent({
  name: "p-table",
  components: {
    AppstoreOutlined,
    LoadingOutlined,
    SyncOutlined,
  },
  emits: ["reload"],
  props: Object.assign({}, TProps, {
    // / 扩展参数
    param: {
      type: Object,
    },
    // / 数据来源
    fetch: {
      type: Function,
      required: false,
      default: null,
    },
    // / 数据解析
    columns: {
      type: Array,
      required: true,
      default: [],
    },
    // / 表格工具
    toolbar: {
      type: Array,
      default: [],
    },
    // / 行操作
    operate: {
      type: Array,
      default: false,
    },
    striped: {
      type: Boolean,
      required: false,
      default: true,
    },
    checkbox: {
      type: Boolean,
      required: false,
      default: false,
    },
    //表单开始
    formItem: {
      type: Array,
      default: [],
    },
    actionUrl: {
      type: Object,
      default: {
        add: "",
        edit: "",
        del: "",
        batchDel: "",
      },
    },
    optionTipField: {
      type: String,
      default: "",
    },
    defaultFormModel: {
      type: Object,
      default: {},
    },
  }),

  setup(props, context) {
    let isAdd = ref(false);
    const { proxy } = getCurrentInstance();
    const formRef = ref(null);
    const getFormSchema = (dynamicForm) => {
      return {
        formItemLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        },
        formItem: props.formItem,
      };
    };

    const mergeToolbar = (...bars) => {
      const [a, b] = bars;
      return a.map((item1) => {
        return Object.assign(
          item1,
          b.find((item2) => {
            return item2 && item1.label === item2.label;
          })
        );
      });
    };
    const toolbar = [
      {
        label: "新增",
        event: () => add(),
        permission: "create",
      },
      {
        label: "删除",
        event: () => batchDel(),
        permission: "batch_del",
      },
    ];
    const operate = [
      // {
      //   label: "查看",
      //   event: function (record) {
      //     view(record);
      //   },
      // },
      {
        label: "修改",
        event: (record) => {
          edit(record);
        },
      },
      {
        label: "删除",
        event: function (record) {
          del(record);
        },
      },
    ];
    // / 状态共享
    const state = reactive({
      pagination: Object.assign(
        {
          current: 1,
          pageSize: 10,
          total: 0,
          showQuickJumper: true,
          showSizeChanger: true,
        },
        props.pagination
      ),
      datasource: [],
      loading: false,
      columns: props.columns || [],
      filtrationColumnKeys: [],
      selectedRowKeys: [],
      toolbars: props.toolbar ? mergeToolbar(toolbar, props.toolbar) : [],
      //模态框start
      show: false,
      modalTitle: computed(() => {
        return isAdd.value ? "新增" : "修改";
      }),
      formSchema: getFormSchema(formRef),
      operates: [],
      currentFormModel: props.defaultFormModel,
    });
    // / 默认操作
    if (props.operate != false) {
      const { columns } = state;
      if (columns && Array.isArray(columns)) {
        if (columns.length > 0) {
          let last = columns[columns.length - 1];
          if (!last.title.includes("操作")) {
            state.columns.push({
              dataIndex: "action",
              key: "action",
              title: "操作",
              slots: { customRender: "action" },
            });
          }
        } else {
          state.columns.push({
            dataIndex: "action",
            key: "action",
            title: "操作",
            slots: { customRender: "action" },
          });
        }
      }

      if (Array.isArray(props.operate)) {
        state.operates = mergeToolbar(props.operate, operate);
              
      } else {
        state.operates = operate;
      }
    }

    // / 过滤字段
    const filtrationColumns = [];

    props.columns.forEach(function (item) {
      filtrationColumns.push({ label: item.title, value: item.key });
      state.filtrationColumnKeys.push(item.key);
    });

    // / 过滤字段
    const filtration = function (value) {
      state.columns = props.columns.filter((item) => value.includes(item.key));
      state.filtrationColumnKeys = value;
    };

    // / 选中回调
    const onSelectChange = (selectedRowKeys) => {
      state.selectedRowKeys = selectedRowKeys;
    };

    /**
     * @param fluter 过滤字段
     * @param param 分页参数
     * @param sort 排序字段
     */
    const fetchData = async (param) => {
      if (props.fetch != null) {
        // / 开启加载
        state.loading = true;

        param.page = param.current;
        param.size = param.pageSize;
        // / 请求数据
        const { total, data } = await props.fetch(param);
        // / 状态重置
        state.pagination.pageSize = param.pageSize;
        state.pagination.current = param.current;
        state.pagination.total = total;
        state.datasource = data;
        state.loading = false;
      }
    };

    // / 刷新方法
    const reload = function () {
      // fetchData();
      fetchData(state.pagination);
      // context.emit('reload')
    };

    // / 初始数据
    onMounted(async () => {
      await fetchData(state.pagination);
    });

    // / 监听扩展参数, 触发表格刷新
    watch(
      () => props.param,
      () => {
        fetchData();
      },
      { deep: true }
    );

    const add = () => {
      formRef.value.modelRef = Object.assign({}, props.defaultFormModel);
      isAdd.value = true;
      state.show = true;
    };

    const edit = (data) => {
      state.currentFormModel = Object.assign({}, data);
      formRef.value.modelRef = state.currentFormModel;
      isAdd.value = false;
      state.show = true;
    };
    const del = (data) => {
      let title = "";
      if (props.optionTipField) {
        title = `确认删除" ${data[props.optionTipField]} "？`;
      }
      proxy.$message.confirm(title).then(async () => {
        let res = await apiDel({
          url: props.actionUrl.del,
          data: { id: data.id },
        });
        if (res.code == 0) {
          proxy.$message.success("删除成功");
          state.show = false;
          reload();
        }
      });
    };
    const batchDel = () => {
      if (state.selectedRowKeys.length <= 0) {
        proxy.$message.info("请先选择项");
        return;
      }
      let ids = state.selectedRowKeys.join(",");

      proxy.$message.confirm().then(async () => {
        let res = await apiDel({
          url: props.actionUrl.batchDel,
          data: { id: ids },
        });
        if (res.code == 0) {
          proxy.$message.success("删除成功");
          state.show = false;
          reload();
        }
      });
    };
    const handleSubmit = () => {
      console.log(formRef.value.modelRef);

      formRef.value.validate().then((r) => {
        // proxy.$message.success("验证通过！");
        console.log(formRef.value.modelRef);
        if (isAdd.value) {
          apiAdd({
            url: props.actionUrl.add,
            data: formRef.value.modelRef,
          }).then((res) => {
            if (res.code == 0) {
              proxy.$message.success("添加成功");
              state.show = false;
              reload();
            }
          });
        } else {
          apiEdit({
            url: props.actionUrl.edit,
            data: formRef.value.modelRef,
          }).then((res) => {
            if (res.code == 0) {
              proxy.$message.success("修改成功");
              state.show = false;
              reload();
            }
          });
        }
      });
    };
    const handleModalClose = () => {
      formRef.value.resetFields();
      isAdd.value = false;
    };
    return {
      formRef,
      // / 数据信息
      ...toRefs(state),
      // / 数据加载
      fetch: fetchData,
      // / 刷新方法
      reload: reload,
      // / 过滤字段
      filtrationColumns,
      filtration,
      // / 选中字段
      onSelectChange,
      add,
      edit,
      del,
      batchDel,
      handleSubmit,
      handleModalClose,
    };
  },
});
</script>

<style lang="less" scoped>
.ck .ant-checkbox-wrapper {
  width: 90%;
}
.ck .ant-col:hover {
  background: #e6f7ff;
}
.ant-table-striped :deep(.table-striped) {
  background-color: #fafafa;
}
</style>
