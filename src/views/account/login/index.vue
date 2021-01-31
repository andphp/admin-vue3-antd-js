<template>
  <div class="container" :class="{ 'sign-up-mode': signUpMode }">
    <!-- form表单容器 -->
    <div class="forms-container">
      <div class="signin-signup">
        <!-- 登录 -->
        <div class="signin">
          <a-card
            :title="signUpMode ? $t('登录加载') : $t('后台标题')"
            bordered
            hoverable
            class="a-card"
            headStyle="text-align: center;font-size: 24px;color: #1890ff;"
            :loading="signUpMode"
          >
            <a-form
              class="sign-in-form"
              :model="account"
              :rules="rules"
              @finish="loginSubmit"
            >
              <a-form-item name="username">
                <a-input
                  size="large"
                  autocomplete="on"
                  placeholder="账户: admin"
                  v-model:value="account.username"
                >
                  <template #prefix>
                    <UserOutlined style="color:#1890ff" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item name="password">
                <div style="border-radius: 8px 8px;">
                  <a-input-password
                    size="large"
                    autocomplete="on"
                    placeholder="密码: admin or ant.design"
                    v-model:value="account.password"
                  >
                    <template #prefix>
                      <LockOutlined style="color:#1890ff" />
                    </template>
                  </a-input-password>
                </div>
              </a-form-item>
              <!-- 登录验证码 -->
              <a-form-item>
                <slider-verify-code
                  class="v-base"
                  @onVerify="success"
                  :options="sliderVerifyCodeOptions"
                >
                  <template #icon>
                    <svg-icon
                      v-if="sliderVerifyCodeOptions.icon && isSuccess"
                      icon-name="slider-success"
                      class-name="v-success v-large"
                    ></svg-icon>
                    <svg-icon
                      v-else
                      icon-name="slider"
                      class-name="v-black v-large"
                    ></svg-icon>
                  </template>
                </slider-verify-code>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-button
                  size="large"
                  type="primary"
                  class="login-button"
                  @click="loginSubmit"
                  block
                >
                  {{ $t("登录标签") }}
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
import { toRefs, reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { Form, Input, Card, Button } from "ant-design-vue";
import SliderVerifyCode from "@/apa/components/SliderVerifyCode/SliderVerifyCode.vue";
import SvgIcon from "@/apa/components/Icons/SvgIcon";
import { useRouter } from "vue-router";
import store from "@/store";
// import { useI18n } from "vue-i18n";
// import { setLang, getLang } from "@/language";

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
    LockOutlined: LockOutlined,
    SliderVerifyCode: SliderVerifyCode,
    SvgIcon: SvgIcon
  },
  setup() {
    // const { t } = useI18n({ useScope: "global" });

    const router = useRouter();
    // setLang("en_US");
    const formData = reactive({
      account: {
        username: "admin",
        password: "123456"
      },
      signUpMode: false,
      sliderVerifyCodeOptions: {
        text: "请向右滑动验证",
        successText: "验证成功", // 验证成功文字
        sliderTextColor: "#54e346", // 滑块验证成功的文本颜色
        sliderBackground: "#54e346", // 滑块滑动时背景颜色
        sliderColor: "#fff", // 滑块颜色
        height: 40, // 高度默认40
        color: "#fff", // 初始化的字体颜色
        backgroud: "#cfd3ce", // 背景颜色
        fontSize: 12, // 字体大小
        icon: true // 是否使用自定义的图标文件
      },
      isSuccess: false
    });
    //验证规则
    let rules = reactive({
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [
        { required: true, min: 6, message: "密码最少六位", trigger: "change" }
      ]
    });

    function loginSubmit() {
      formData.signUpMode = !formData.signUpMode;
      setTimeout(function() {
        store
          .dispatch("user/login", formData.account)
          .then(res => {
            console.log("od===", res);
            router.push("/");
          })
          .catch(err => alert(err.message));
        // router.push("/");
      }, 3000);
    }

    const success = e => {
      formData.isSuccess = e;
    };
    const data = toRefs(formData);
    const columns = [];
    return { columns, loginSubmit, ...data, success, rules, router };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/login";

.ant-input,
.ant-input-affix-wrapper,
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
  border-radius: 5px 5px;
}
</style>
