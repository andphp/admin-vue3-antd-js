<template>
  <div class="pro-query">
    <p-card-base>
      <template #title>
        <slot name="title"></slot>
      </template>
      <!-- 表单内容 -->
      <a-form layout="inline" :model="formState">
        <a-form-item
          v-show="!param.hidden || !hidden"
          :label="param.label"
          :key="index"
          v-for="(param, index) in searchParam"
        >
          <!-- 输入框 -->
          <a-input
            allowClear
            v-model:value="formState[param.key]"
            v-if="param.type == 'input'"
            type="text"
            v-bind="{ ...param.props }"
          >
          </a-input>
          <!-- 选择框 -->
          <a-select
            v-if="param.type == 'select'"
            v-model:value="formState[param.key]"
            class="pro-query-select"
            optionFilterProp="label"
            :showSearch="true"
            v-bind="{ ...param.props }"
          >
            <template v-for="(option, index) in param.options" :key="index">
              <a-select-option
                :value="option.value"
                :label="option.label + option.value"
              >
                {{ option.label }}
              </a-select-option>
            </template>
          </a-select>
          <!-- 下拉树 -->
          <template v-if="param.type == 'tree-select'">
            <a-tree-select
              v-model:value="formState[param.key]"
              :style="{ width: '100%', minWidth: '200px' }"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="param.options"
              tree-default-expand-all
              treeNodeFilterProp="title"
              v-bind="{ ...param.props }"
            >
            </a-tree-select>
          </template>

          <!-- 日期 -->
          <template v-if="param.type == 'datepicker'">
            <a-date-picker
              v-model:value="formState[param.key]"
              v-if="param.datetype == 'date' || !param.datetype"
              v-bind="{ ...param.props }"
            >
            </a-date-picker>
            <a-month-picker
              v-model:value="formState[param.key]"
              v-if="param.datetype == 'month'"
              v-bind="{ ...param.props }"
            >
            </a-month-picker>
            <a-range-picker
              v-model:value="formState[param.key]"
              v-if="param.datetype == 'range'"
              :ranges="{
                今天: [moment().startOf('day'), moment()],
                昨天: [
                  moment().startOf('day').subtract(1, 'days'),
                  moment().endOf('day').subtract(1, 'days'),
                ],
                一周: [moment().startOf('day').subtract(1, 'weeks'), moment()],
                两周: [moment().startOf('day').subtract(2, 'weeks'), moment()],
                一个月: [
                  moment().startOf('day').subtract(1, 'months'),
                  moment(),
                ],
                三个月: [
                  moment().startOf('day').subtract(3, 'months'),
                  moment(),
                ],
                六个月: [
                  moment().startOf('day').subtract(6, 'months'),
                  moment(),
                ],
                一年: [moment().startOf('day').subtract(1, 'years'), moment()],
              }"
              v-bind="{ ...param.props }"
            >
            </a-range-picker>
            <a-week-picker
              v-model:value="formState[param.key]"
              v-if="param.datetype == 'week'"
              v-bind="{ ...param.props }"
            >
            </a-week-picker>
          </template>

          <!-- <component
            :is="getComponent(formItem.type)"
            v-model:value="formModel[formItem.field]"
            :form-item="formItem"
            v-on="{ ...getTriggerEvent(formItem) }"
          />
          -->
          <a-alert
            v-if="param.tip"
            :message="param.tip"
            type="success"
          ></a-alert>
        </a-form-item>
        <!-- 按钮组 -->
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="pro-query-button"
            @click="search"
          >
            <!-- <a-button type="primary" class="pro-query-button" @click="search"  @keyup.enter="search"> -->
            查询
          </a-button>
          <a-button class="pro-query-button" @click="reset"> 重置 </a-button>
          <!-- 收起 隐藏 -->
          <a
            class="pro-query-hidden"
            @click="hiddenHandle"
            v-show="hidden && more"
            >展开 &nbsp;<DownOutlined
          /></a>
          <a
            class="pro-query-hidden"
            @click="hiddenHandle"
            v-show="!hidden && more"
            >收起 &nbsp;<UpOutlined
          /></a>
        </a-form-item>
        <a-form-item>
          <slot name="extra"></slot>
        </a-form-item>
      </a-form>
    </p-card-base>
  </div>
</template>
<script>
import "./index.less";
import { defineComponent, reactive, ref, toRaw, inject } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { useForm } from "@ant-design-vue/use";

export default defineComponent({
  name: "p-query",
  props: {
    searchParam: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
  components: {
    DownOutlined,
    UpOutlined,
  },
  emits: ["search", "reset"],
  setup(props, { emit }) {
    const hidden = ref(true);
    const more = ref(false);
    const moment = inject("moment");
    const formState = reactive({});
    const formRules = reactive({});

    const generateFormState = (array) => {
      array.length > 0 &&
        array.forEach((it) => {
          const { key, rules = [], value } = it;
          switch (it.type) {
            case "select":
            case "tree-select":
              formState[key] = value;
              break;

            default:
              formState[key] = value == undefined ? "" : value;
              break;
          }

          formRules[key] = rules;
        });
    };

    generateFormState(props.searchParam);

    const { validate, resetFields } = useForm(formState, formRules);

    /// 是否存在隐藏表单
    props.searchParam.forEach((element) => {
      if (element.hidden) {
        return (more.value = true);
      }
    });

    /// 更多操作
    const hiddenHandle = function () {
      hidden.value = !hidden.value;
    };

    /// 表单查询
    const search = async function () {
      var o = await validate();
      emit("search", o);
    };

    /// 重置表单
    const reset = function () {
      resetFields();
      emit("reset", toRaw(formState));
    };

    const preset = [
      "input",
      "textarea",
      "select",
      "radio",
      "checkbox",
      "input-number",
      // "input-range",
      "switch",
      "tree-select",
      "password",
    ];

    // 获取组件名称
    const getComponent = (type) => {
      // 预设组件
      if (preset.includes(type)) {
        return "p-" + type;
      } else if (isReactive(type) || isRef(type)) {
        // 自定义组件
        return createVNode(type);
      } else {
        // 不识别组件
        return type;
      }
    };

    return {
      more: more,
      hidden: hidden,
      hiddenHandle: hiddenHandle,
      /// EMIT
      search: search,
      reset: reset,
      /// 状态
      formState,
      formRules,
      getComponent,
      moment,
    };
  },
});
</script>
