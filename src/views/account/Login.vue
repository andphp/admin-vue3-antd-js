<template>
  <div class="container" :class="{ 'sign-up-mode': signUpMode }">
    <!-- form表单容器 -->
    <div class="forms-container">
      <div class="signin-signup">
        <!-- 登录 -->
        <div class="signin">
          <a-card
            :title="signUpMode ? $t('login.loading') : $t('login.title')"
            bordered
            hoverable
            class="a-card"
            headStyle="text-align: center;font-size: 24px;color: #1890ff;"
            :loading="signUpMode"
          >
            <a-form name="custom-validation" class="sign-in-form" @submit="loginSubmit">
              <a-form-item>
                <a-input
                  size="large"
                  autocomplete="on"
                  placeholder="账户: admin"
                  v-model:value="user.username"
                >
                  <svg-icon icon-name="user" style="width:20px; height:20px;" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <div style="border-radius: 8px 8px;">
                  <a-input-password
                    size="large"
                    autocomplete="on"
                    placeholder="密码: admin or ant.design"
                    v-model:value="user.password"
                  >
                    <svg-icon icon-name="locked"></svg-icon>
                  </a-input-password>
                </div>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-button type="primary" html-type="submit" class="login-button" block>
                  {{ $t("login.btn_title") }}
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </div>
      </div>
    </div>
    <!-- 左右切换动画 -->
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>admin-vue3-antd</h3>
          <p>牛逼plus 江北区最具影响力的 Web 后台管理系统</p>
        </div>
        <img src="@/assets/login/table_bg.png" class="image" alt="" />
      </div>

      <div class="panel right-panel">
        <div class="content">
          <h3>以人为镜,可明得失, 以代码为镜,可通逻辑!</h3>
          <p>学习编程,让你的生活更有趣</p>
          <button @click="signUpMode = !signUpMode" class="btn transparent">
            取消
          </button>
        </div>
        <img src="@/assets/login/register.png" class="image" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import { Form, Input, Card, Button } from "ant-design-vue";
import SvgIcon from "../../components/Svgicon";

export default {
  name: "Login",
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputPassword: Input.Password,
    ACard: Card,
    AButton: Button,
    SvgIcon: SvgIcon
  },
  setup() {
    let signUpMode = ref(false);
    let user = reactive({
      username: "admin",
      password: "123456"
    });

    function loginSubmit() {
      console.log(signUpMode);
      signUpMode.value = !signUpMode.value;
    }

    return { signUpMode, loginSubmit, user };
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/login";

.ant-input,
.ant-input-password {
  border: none;
  border-radius: 5px 5px;
  outline: none;
  border-bottom: 1px solid #1890ff !important;
  box-shadow: none;
  background: transparent;
}

.ant-row {
  display: block;
}

.a-card {
  border-radius: 20px 20px 20px 20px;
  background: rgba(250, 250, 250, 0.7);
  box-shadow: 0px 2px 14px 6px rgba(24, 144, 255, 0.2),
  -11px -4px 9px -16px rgba(24, 144, 255, 0.2);
  background: transparent;
}

.login-button {
  margin-top: 30px;
  border-radius: 5px 5px;
}
</style>
