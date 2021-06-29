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
            type="primary"
            @click="item.event(selectedRowKeys)"
            v-permission="item.permission"
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
    <!-- v-if="!loading"解决表格默认全部展开 -->
    <a-table
      v-if="showTable"
      v-bind="{ ...$attrs, ...$props }"
      :size="size"
      :data-source="datasource"
      :columns="columns"
      :loading="loading"
      :pagination="pageInfo"
      @change="fetch"
      :row-selection="
        checkbox
          ? {
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
            }
          : undefined
      "
      class="ant-table-striped"
      :row-class-name="
        (record, index) => (striped && index % 2 === 1 ? 'table-striped' : '')
      "
    >
      <!--  自定义slots start-->
      <template v-for="(value, key) in $slots" #[key]="slotProps">
        <slot :name="key" v-bind="slotProps"></slot>
      </template>

      <!--    自定义slots end-->

      <!--  自定义title start-->
      <template
        v-for="slotItem in columns.filter((item) => item.slots)"
        :key="slotItem.dataIndex || slotItem.slots.title"
        #[slotItem.slots.title]="slotProps"
      >
        <slot :name="slotItem.slots.title" v-bind="slotProps"></slot>
      </template>

      <!--    自定义title end-->

      <!--    是否有自定义显示slots start-->
      <template
        v-for="slotItem in columns.filter((item) => item.slots)"
        :key="slotItem.dataIndex || slotItem.slots.customRender"
        #[slotItem.slots.customRender]="slotProps"
      >
        <!--        自定义渲染start-->
        <slot
          v-if="$slots[slotItem.slots.customRender]"
          :name="slotItem.slots.customRender"
          v-bind="slotProps"
        ></slot>
        <!--        自定义渲染end-->

        <!--     非自定义渲染start -->
        <template v-else>
          <!--        非操作 start-->
          <template v-if="slotItem.slots.customRender !== 'action'">
            <!--        使用自定义组件格式化显示start-->
            <template v-if="slotItem.slotsType == 'component'">
              <component :is="slotItem.slotsFunc(slotProps.record)" />
            </template>
            <!--        使用自定义组件格式化显示end-->
            <!--        使用自定义函数格式化显示-->
            <template v-if="slotItem.slotsType == 'format'">
              {{
                slotItem.slotsFunc(
                  slotProps.record[slotItem.dataIndex || slotItem.key],
                  slotProps.record
                )
              }}
            </template>
            <!--        链接用于跳转-->
            <template v-if="slotItem.slotsType == 'link'">
              <router-link
                :to="slotItem.linkPath + slotProps.record[slotItem.linkId]"
                >{{ slotProps.text }}</router-link
              >
            </template>
          </template>
          <!--      非操作 end-->
          <!-- 操作start -->
          <!-- 行操作 -->
          <template v-else>
            <span>
              <template :key="index" v-for="(item, index) in operates">
                <!-- 下拉操作 -->
                <a-dropdown v-if="item.children && item.children.length > 0">
                  <a> {{ item.label }} </a>
                  <template #overlay>
                    <a-menu>
                      <!-- 遍历子集 -->
                      <a-menu-item v-for="(child, i) in item.children" :key="i">
                        <a @click="child.event(slotProps.record)">
                          {{ child.label }}
                        </a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
                <!-- 单个操作 -->
                <a
                  v-else
                  @click="item.event(slotProps.record)"
                  v-permission="item.permission"
                >
                  {{ item.label }}
                </a>
                <a-divider type="vertical" />
              </template>
            </span>
          </template>
          <!-- 操作end -->
        </template>
        <!--      非自定义渲染end-->
      </template>
      <!--    是否有自定义显示slots end-->
    </a-table>
  </div>
  <p-modal
    v-model:visible="show"
    v-model:title="modalTitle"
    v-bind="{ ...modalProps }"
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
  inject,
  toRaw,
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
      default: () => {},
    },
    // / 数据来源
    fetch: {
      type: [Function, undefined],
      required: false,
      default: undefined,
    },
    // / 数据解析
    // / 表格工具
    toolbar: {
      type: [Array, Boolean],
      default: [],
    },
    // / 行操作
    operate: {
      type: [Array, Boolean],
      default: false,
    },
    //表格斑马线
    striped: {
      type: Boolean,
      required: false,
      default: true,
    },
    //是否开启选择框
    checkbox: {
      type: Boolean,
      required: false,
      default: true,
    },
    //表单开始
    formItem: {
      type: Array,
      default: [],
    },
    //表单布局相关
    formItemLayout: {
      type: Object,
      default: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    },
    //表格操作对应的接口地址
    actionUrl: {
      type: Object,
      default: {
        add: "",
        edit: "",
        del: "",
        batchDel: "",
      },
    },
    //删除提示字段
    optionTipField: {
      type: String,
      default: "",
    },
    //模态框默认值
    defaultFormModel: {
      type: Object,
      default: () => {},
    },
    //模态框提交前数据处理函数
    submitBefore: {
      type: [Function, undefined],
      default: undefined,
    },
    //分页属性
    pagination: {
      type: [Object, Boolean],
      default: () => {
        return {
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "40", "50"],
        };
      },
    },
    //模态框属性
    modalProps: {
      type: Object,
      default: () => {},
    },
    //尺寸
    size: {
      type: String,
      default: "small",
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    //是否立即加载数据
    eagerLoad: {
      type: Boolean,
      default: true,
    },
    batchDelKey: {
      type: String,
      default: "ids",
    },
    delKey: {
      type: String,
      default: "id",
    },
    delValueKey: {
      type: String,
      default: "id",
    },
  }),

  setup(props, context) {
    let isAdd = ref(false);
    const { proxy } = getCurrentInstance();
    const formRef = ref(null);
    const getFormSchema = (dynamicForm) => {
      return {
        formItemLayout: props.formItemLayout,
        formItem: props.formItem,
      };
    };

    const mergeToolbar = (...bars) => {
      const [a, b] = bars;
      let c = [];
      try {
        if (b && b.length) {
          b.forEach((s) => {
            let index = a.findIndex((p) => p.label == s.label);
            if (index >= 0) {
              a.splice(index, 1);
            }
          });
        }
        // c = [...a, ...b];
        c = [...b, ...a];
      } catch (error) {
        c = a;
      }
      // let c = [...a, ...b];
      // try {
      //   let hash = {};
      //   const newArr = c.reduce((item, next) => {
      //     hash[next.label] ? "" : (hash[next.label] = true && item.push(next));
      //     return item;
      //   }, []);
      //   c = newArr;
      // } catch (error) {
      //   c = a;
      // }
      return c;

      // return a.map((item1) => {
      //   return Object.assign(
      //     item1,
      //     b.find((item2) => {
      //       return item2 && item1.label === item2.label;
      //     })
      //   );
      // });
    };
    const toolbar = [
      {
        label: "新增",
        event: () => add(),

        permission: proxy.$buttons["新增"],
      },
      {
        label: "删除",
        event: () => batchDel(),
        permission: proxy.$buttons["批量删除"],
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
        permission: proxy.$buttons["修改"],
      },
      {
        label: "删除",
        event: function (record) {
          del(record);
        },
        permission: proxy.$buttons["删除"],
      },
    ];

    const { formItemLayout, formItem } = props;
    const defaultFomrSchema = {
      formItem: toRaw(formItem),
      formItemLayout: toRaw(formItemLayout),
    };
    // / 状态共享
    const state = reactive({
      pageInfo: props.pagination,
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
      showTable: computed(() => {
        //   v-if="
        //   ($props.defaultExpandAllRows && !loading) ||
        //   !$props.defaultExpandAllRows
        // "
        if (props.defaultExpandAllRows) {
          return props.defaultExpandAllRows && !state.loading;
        } else {
          return true;
        }
      }),
    });
    // / 默认操作
    if (props.operate != false) {
      const { columns } = state;
      if (columns && Array.isArray(columns)) {
        if (columns.length > 0) {
          let last = columns[columns.length - 1];
          if (last.title && !last.title.includes("操作")) {
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
        state.operates = mergeToolbar(operate, props.operate);
      } else {
        state.operates = operate;
      }
    }
    /// 为所有 column 新增默认 customRender 属性
    // state.columns.forEach((column) => {
    //   column.slots = { customRender: column.dataIndex };
    // });
    // / 过滤字段
    const filtrationColumns = [];

    props.columns.forEach(function (item) {
      filtrationColumns.push({ label: item.title, value: item.key });
      state.filtrationColumnKeys.push(item.key);
      if (!item.align) {
        item.align = "center";
      }
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
    const fetchData = async (page) => {
      if (props.fetch != null) {
        // / 开启加载
        state.loading = true;
        let params = { ...props.param };
        if (props.pagination) {
          /* 修复表格组件警告bug
          if (state.pageInfo && page != undefined) {
            state.pageInfo.page = page.current;
            state.pageInfo.size = page.pageSize;
          } */

          let pagination = {
            page: page ? page.current : 1,
            size: page ? page.pageSize : 10,
          };
          params = { ...pagination, ...params };
          // / 请求数据
          const { total, data } = await props.fetch(params);
          // / 状态重置
          if (state.pageInfo != false) {
            state.pageInfo.pageSize = page.pageSize;
            state.pageInfo.current = page.current;
            state.pageInfo.total = total;
          }
          state.datasource = data;
        } else {
          const { total, data } = await props.fetch(params);
          state.datasource = data;
        }
        state.loading = false;
      }
    };

    // / 刷新方法
    const reload = async function () {
      // fetchData();
      await fetchData(state.pageInfo);
      context.emit("reload");
    };

    // / 初始数据
    onMounted(async () => {
      if (props.eagerLoad) {
        await fetchData(state.pageInfo);
      }
    });

    const add = () => {
      formRef.value.modelRef = Object.assign({}, props.defaultFormModel);
      isAdd.value = true;
      state.show = true;
    };

    const edit = (data) => {
      state.currentFormModel = Object.assign({}, props.defaultFormModel, data);
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
        let param = {};
        param[props.delKey] = data[props.delValueKey];
        let res = await apiDel({
          url: props.actionUrl.del,
          data: param,
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
      // let ids = state.selectedRowKeys.join(",");
      let ids = state.selectedRowKeys;

      proxy.$message.confirm().then(async () => {
        let param = {};
        param[props.batchDelKey] = ids;
        let res = await apiDel({
          url: props.actionUrl.batchDel,
          data: param,
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
        // formRef.value.validate().then((r) => {
        // proxy.$message.success("验证通过！");
        console.log(formRef.value.modelRef);
        let data = formRef.value.modelRef;
        if (props.submitBefore) {
          data = props.submitBefore(data);
        }
        if (isAdd.value) {
          apiAdd({
            url: props.actionUrl.add,
            data: data,
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
            data: data,
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

    // / 监听扩展参数, 触发表格刷新
    watch(
      () => props.param,
      () => {
        state.pageInfo.current = 1;
        fetchData(state.pageInfo);
      },
      { deep: true }
    );

    // / 监听扩展参数, 触发表格刷新
    watch(
      isAdd,
      (newVal) => {
        try {
          let { formItem, formItemLayout } = defaultFomrSchema;
          let newFormItem = [];
          formItem.forEach((s) => {
            newFormItem.push({ ...s });
          });
          if (!newVal) {
            newFormItem.forEach((s) => {
              s.props = { ...s.props, ...s.editProps };
            });
          }
          state.formSchema = {
            formItem: newFormItem,
            formItemLayout,
          };
        } catch (error) {
          state.formSchema = { ...defaultFomrSchema };
        }
      },
      {
        immediate: true,
      }
    );
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

:deep(.ant-table-thead tr th) {
  background: #f3f7fa;
  text-align: center !important;
}
</style>
