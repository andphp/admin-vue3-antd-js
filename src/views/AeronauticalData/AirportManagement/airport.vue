<template>
  <div>
    <div class="query-form">
      <a-row>
        <a-col :span="24">
          <a-form
            layout="inline"
            :model="queryFormState"
            @keyup.enter="handleQuery"
          >
            <a-form-item label="机场三字码">
              <a-input
                v-model:value="queryFormState.search"
                placeholder="机场三字码"
                allowClear
              />
            </a-form-item>

            <a-form-item>
              <a-button type="primary" @click="handleQuery">
                <template #icon><SearchOutlined /></template>
                查询
              </a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-button type="primary" @click="showModal(true)">新增</a-button>
        </a-col>
      </a-row>
    </div>
    <a-table
      bordered
      :row-key="(record) => record.id"
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      size="middle"
      class="ant-table-striped"
      :rowClassName="
        (record, index) => (index % 2 === 1 ? 'table-striped' : null)
      "
    >
      <template #province="{ text }">
        <span>
          {{ text.province }}
        </span>
      </template>
      <template #isAbroad="{ text }">
        <span>
          {{ text.isAbroad == 1 ? "是" : "否" }}
        </span>
      </template>

      <template #action="{ record }">
        <span>
          <a-button type="primary" size="small" @click="handleEdit(record)"
            >编辑</a-button
          >
          <a-divider type="vertical" />
          <a-button type="danger" size="small" @click="handleDelete(record)"
            >删除</a-button
          >
        </span>
      </template>
    </a-table>
  </div>
  <a-modal
    :title="modalTitle"
    v-model:visible="modalVisble"
    width="50%"
    :maskClosable="false"
  >
    <template #footer>
      <a-button key="reset" @click="resetForm">重置</a-button>
      <a-button key="ok" type="primary" @click="handleOk" :loading="okLoading"
        >确定</a-button
      >
    </template>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      labelAlign="right"
      :label-col="{ span: 6 }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item label="机场三字码" name="airPort">
            <a-input
              v-model:value="formState.airPort"
              placeholder="机场三字码"
            />
          </a-form-item>
          <a-form-item label="机场英文名" name="airPortEname">
            <a-input
              v-model:value="formState.airPortEname"
              placeholder="机场英文名"
            />
          </a-form-item>
          <a-form-item label="国家代码" name="countryCode">
            <a-input
              v-model:value="formState.countryCode"
              placeholder="国家代码"
            />
          </a-form-item>
          <a-form-item label="洲" name="chau">
            <a-input v-model:value="formState.chau" placeholder="洲" />
          </a-form-item>
          <a-form-item label="城市中文名" name="cityName">
            <a-input
              v-model:value="formState.cityName"
              placeholder="城市中文名"
            />
          </a-form-item>
          <a-form-item label="是否境外">
            <a-radio-group v-model:value="formState.isAbroad">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="2">否</a-radio>
            </a-radio-group>
          </a-form-item>
          <!-- <a-form-item  label="城市三字码" name="name">
            <a-input v-model:value="formState.name" placeholder="城市三字码" />
          </a-form-item> -->
        </a-col>
        <a-col :span="12">
          <a-form-item label="机场中文名" name="airPortName">
            <a-input
              v-model:value="formState.airPortName"
              placeholder="机场中文名"
            />
          </a-form-item>
          <a-form-item label="国家中文名" name="country">
            <a-input
              v-model:value="formState.country"
              placeholder="国家中文名"
            />
          </a-form-item>
          <a-form-item label="州/省" name="province">
            <a-input v-model:value="formState.province" placeholder="州/省" />
          </a-form-item>
          <a-form-item label="所属小洲" name="chanChird">
            <a-input
              v-model:value="formState.chanChird"
              placeholder="所属小洲"
            />
          </a-form-item>
          <a-form-item label="城市英文名" name="cityEname">
            <a-input
              v-model:value="formState.cityEname"
              placeholder="城市英文名"
            />
          </a-form-item>
          <!-- <a-form-item  label="排序" name="name">
            <a-input v-model:value="formState.name" placeholder="国家代码"/>
          </a-form-item> -->
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import {
  onMounted,
  reactive,
  toRefs,
  ref,
  toRaw,
  computed,
  createVNode,
  watch,
} from "vue";
import {
  Form,
  Input,
  Card,
  Button,
  Table,
  Divider,
  Row,
  Col,
  Modal,
  Radio,
} from "ant-design-vue";
import {
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";

import {
  getAirportList,
  addAirport,
  editAirport,
  delAirport,
} from "@/api/aeronauticalData";

export default {
  components: {
    SearchOutlined,
    ATable: Table,
    AInput: Input,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ADivider: Divider,
    AButton: Button,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    // eslint-disable-next-line vue/no-unused-components
    ACard: Card,
    AModal: Modal,
  },
  setup() {
    const formRef = ref(null);
    const rules = {
      airPort: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      airPortName: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      airPortEname: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      country: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      countryCode: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      province: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      chau: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      chanChird: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      cityName: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      cityEname: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
    };
    const defaultFormState = {
      id: "",
      airPort: "",
      airPortName: "",
      airPortEname: "",
      country: "",
      countryCode: "",
      province: "",
      chau: "",
      chanChird: "",
      cityName: "",
      cityEname: "",
      isAbroad: 1,
    };
    const state = reactive({
      queryFormState: {
        search: "",
      },
      formState: {
        id: "",
        airPort: "",
        airPortName: "",
        airPortEname: "",
        country: "",
        countryCode: "",
        province: "",
        chau: "",
        chanChird: "",
        cityName: "",
        cityEname: "",
        isAbroad: 1,
      },
      okLoading: false,
      loading: false,
      columns: [
        {
          title: "编号",
          key: "id",
          dataIndex: "id",
        },
        {
          title: "三字码",
          key: "airPort",
          dataIndex: "airPort",
          sorter: true,
        },
        {
          title: "机场名称",
          key: "airPortName",
          dataIndex: "airPortName",
          sorter: true,
        },
        {
          title: "国家",
          key: "country",
          dataIndex: "country",
          sorter: true,
        },
        {
          title: "国家二字码",
          key: "countryCode",
          dataIndex: "countryCode",
          sorter: true,
        },
        {
          title: "省/区域",
          key: "province",
          slots: {
            customRender: "province",
          },
          sorter: true,
        },
        {
          title: "所属大洲",
          key: "chau",
          dataIndex: "chau",
          sorter: true,
        },
        {
          title: "所属小洲",
          key: "chanChird",
          dataIndex: "chanChird",
          sorter: true,
        },
        {
          title: "城市名",
          key: "cityName",
          dataIndex: "cityName",
          sorter: true,
        },
        {
          title: "城市三字码",
          key: "cityCode",
          dataIndex: "cityCode",
          sorter: true,
        },
        {
          title: "是否境外",
          key: "isAbroad",
          slots: {
            customRender: "isAbroad",
          },
          sorter: true,
        },
        {
          title: "操作",
          key: "action",
          slots: {
            customRender: "action",
          },
        },
      ],
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: true,
      },
    });
    const isAdd = ref(false);
    const modalTitle = computed(() => {
      return isAdd.value ? "新增" : "编辑";
    });
    const modalVisble = ref(false);
    const showModal = (add) => {
      isAdd.value = add;
      modalVisble.value = true;
    };
    const handleOk = () => {
      formRef.value
        .validate()
        .then(() => {
          state.okLoading = true;
          const formInfo = toRaw(state.formState);
          // 新增修改
          if (isAdd.value) {
            addAirport(formInfo)
              .then((res) => {
                if (res.code == 0) {
                  handleQuery();
                  modalVisble.value = false;
                  state.okLoading = false;
                } else {
                  state.okLoading = false;
                  alert(res.msg);
                }
              })
              .catch((err) => {
                state.okLoading = false;
              });
          } else {
            editAirport(formInfo)
              .then((res) => {
                if (res.code == 0) {
                  handleQuery();
                  modalVisble.value = false;
                  state.okLoading = false;
                } else {
                  state.okLoading = false;
                  alert(res.msg);
                }
              })
              .catch((err) => {
                state.okLoading = false;
              });
          }
          // console.log("values", toRaw(formState));
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    const handleEdit = (info) => {
      console.log(info);
      showModal(false);
      state.formState = Object.assign({}, info);
    };
    const handleDelete = (info) => {
      Modal.confirm({
        title: "确定删除?",
        icon: createVNode(ExclamationCircleOutlined),
        // content: "Some descriptions",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",

        onOk() {
          delAirport({ id: info.id })
            .then((res) => {
              if (res.code == 0) {
                handleQuery();
              } else {
                alert(res.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        },

        onCancel() {
          // console.log("Cancel");
        },
      });
      console.log(info);
    };

    const resetForm = () => {
      formRef.value.resetFields();
      state.formState = Object.assign({}, defaultFormState);
    };
    const handleQuery = () => {
      // 查询
      getList();
    };
    const getList = () => {
      state.loading = true;
      const params = toRaw(state.queryFormState);
      params.page = state.pagination.current;
      params.size = state.pagination.pageSize;
      console.log(params);
      getAirportList(params)
        .then((res) => {
          console.log(res);
          state.loading = false;
          const { data } = res;
          state.data = data.data;
          state.pagination.total = data.total;
        })
        .catch((err) => {
          console.log(err);
          state.loading = false;
        });
    };
    const handleTableChange = (pag, filters, sorter) => {
      console.log(pag);
      console.log(filters);
      console.log(sorter);
      state.pagination = pag;
      handleQuery();
    };
    watch(modalVisble, (newValue, oldValue) => {
      if (!newValue) {
        resetForm();
      }
    });
    onMounted(() => {
      handleQuery();
    });
    return {
      ...toRefs(state),
      formRef,
      rules,
      modalTitle,
      modalVisble,
      showModal,
      handleTableChange,
      handleOk,
      handleEdit,
      handleDelete,
      handleQuery,
      resetForm,
    };
  },
};
</script>
<style scoped>
.ant-table-striped :deep(.table-striped) {
  background-color: #fafafa;
}
</style>
