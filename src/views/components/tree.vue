<template>
  <p-tree title="树形菜单测试11111111" :url="url" @select="onSelect"></p-tree>
  <p-form ref="dynamicForm" :form-schema="formSchema">
    <template #operate-button>
      <a-button type="primary" @click="confirm"> 确定 </a-button>
    </template>
    <button v-mosd="add">新增</button>
  </p-form>
</template>
<script>
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { computed, defineComponent, reactive, ref, toRefs } from "vue";

import { getDataTable } from "@/api/components";

import { message } from "ant-design-vue";
export default {
  setup() {
    const state = reactive({
      url: "/components/tree",
    });
    const onSelect = (s, e) => {
      // console.log(e.node.$props);
      const {
        node,
        node: { dataRef },
        node: {
          dataRef: { extra: data },
        },
      } = e;
    };
    const dynamicForm = ref(null);

    // 点击提交
    const confirm = () => {
      dynamicForm.value.modelRef = { ...dynamicForm.value.modelRef };
      dynamicForm.value.validate().then(() => message.success("验证通过！"));
    };
    const getFormSchema = (dynamicForm) => {
      return {
        formItemLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        },
        formItem: [
          {
            type: "input",
            label: "账号",
            field: "name",
            value: "",
            props: {
              placeholder: "请输入账号(长度3-5个字符)",
            },
            rules: [
              {
                required: true,
                message: "请输入账号",
              },
              {
                min: 3,
                max: 5,
                message: "账号长度为3-5个字符",
                trigger: "blur",
              },
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
                required: true,
                message: "密码不能为空",
                validator: async (rule, value) => {
                  // 获取二次确认密码
                  const {
                    confirmPassword,
                    password,
                  } = dynamicForm.value.modelRef;
                  if (password === "") {
                    return Promise.reject("请输入密码");
                  } else {
                    // if (confirmPassword !== '') {
                    //     dynamicForm.value.validateField('confirmPassword');
                    // }
                    return Promise.resolve();
                  }
                },
              },
            ],
          },
          {
            type: "input",
            label: "确认密码",
            field: "confirmPassword",
            value: "",
            props: {
              "has-feedback": true,
              placeholder: "请输入确认密码",
            },
            rules: [
              {
                required: true,
                validator: async (rule, value, callback, source, options) => {
                  // 获取第一个密码
                  const {
                    confirmPassword,
                    password,
                  } = dynamicForm.value.modelRef;
                  console.log(confirmPassword, password);
                  if (confirmPassword === "") {
                    return Promise.reject("请重新输入密码");
                  } else if (confirmPassword !== password) {
                    return Promise.reject("两次输入的密码不匹配!");
                  } else {
                    return Promise.resolve();
                  }
                },
              },
            ],
          },
        ],
      };
    };
    return {
      ...toRefs(state),
      onSelect,

      //表单测试
      dynamicForm,
      confirm,
      formSchema: getFormSchema(dynamicForm),
    };
  },
};
</script>
