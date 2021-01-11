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
            <a-form name="custom-validation" class="sign-in-form" :model="user" :rules="formRule" ref="formRef"
                    @submit="loginSubmit">
              <a-form-item>
                <a-input
                  size="large"
                  autocomplete="on"
                  placeholder="账户: admin"
                  v-model:value="user.username"
                >
                  <template #prefix>
                    <UserOutlined style="color:#1890ff" />
                  </template>
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
                    <template #prefix>
                      <LockOutlined style="color:#1890ff" />
                    </template>
                  </a-input-password>
                </div>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-button size="large" type="primary" html-type="submit" class="login-button" block>
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
          <h1>Admin-Vue3-Antd</h1>
          <p>牛逼plus 江北区最具影响力的 Web 后台管理系统</p>
        </div>
        <img src="@/assets/login/table_bg.png" class="image" alt="" />
      </div>

      <div class="panel right-panel">
        <div class="content">
          <h1>以人为镜,可明得失, 以代码为镜,可通逻辑!</h1>
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
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { Form, Input, Card, Button, Message } from "ant-design-vue";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputPassword: Input.Password,
    ACard: Card,
    AButton: Button,
    UserOutlined: UserOutlined,
    LockOutlined: LockOutlined
  },
  setup() {
    const router = useRouter();
    const formRef = ref(null);
    let signUpMode = ref(false);
    let user = reactive({
      username: "admin",
      password: "123456"
    });

    //验证规则
    let rules = reactive({
      formRule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, min: 6, message: "密码最少六位", trigger: "blur" }
        ]
      }
    });
    const loginSubmit = () => {
      formRef.value.validate().then(() => {
        console.log(signUpMode);
        signUpMode.value = !signUpMode.value;
        setTimeout(function() {
          router.push({ path: "/" });
        }, 3000);
      })
        .catch(() => {
          //验证失败提示错误信息
          Message.error("用户名或密码未填");
        });
    };

    return { signUpMode, loginSubmit, user, formRef };
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
