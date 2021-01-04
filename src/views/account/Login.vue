<template>
  <div class="main">
    <div class="login-title">登录管理后台</div>
    <a-form
      :rules="rules"
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
    >
      <a-form-item required style="padding: 30px 0 0 0">
        <a-input
          size="large"
          type="text"
          autocomplete="on"
          placeholder="账户: admin"
          :value="loginForm.username"
        >
          <UserOutlined />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input-password
          size="large"
          autocomplete="on"
          placeholder="密码: admin or ant.design"
          :value="loginForm.password"
        >
          <LockOutlined />
        </a-input-password>
      </a-form-item>

      <a-form-item name="rememberMe">
        <a-radio :value="loginForm.rememberMe">
          自动登录
        </a-radio>
      </a-form-item>

      <a-form-item style="margin-top:50px">
        <a-button
          size="large"
          type="primary"
          class="login-button"
          @click="loginSubmit"
          >登陆</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { Form, Input, Button, Radio } from "ant-design-vue";
export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputPassword: Input.Password,
    AButton: Button,
    ARadio: Radio
  },
  data() {
    let validatePass = async (rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else {
        return Promise.resolve();
      }
    };
    return {
      classLoginChecking: "", // 登陆样式
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      loginForm: {
        username: "admin",
        password: "admin",
        rememberMe: "checked"
      },
      rules: {
        username: [{ message: "Please input Activity name", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "change" }]
      },
      loading: false
    };
  },
  methods: {
    loginSubmit() {
      this.$refs.formLogin
        .validate()
        .then(() => {
          console.log("values", this.form);
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    resetForm() {
      this.$refs.formLogin.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
//.main
//  height: 500px
//  padding-top: 50px
//.login-title
//  width: 100%
//  text-align: center
//  font-size: 24px
//  color: #1890ff
//  margin-bottom: 30px
</style>
