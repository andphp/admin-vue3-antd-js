<template>
  <div class="container" :class="{ 'sign-up-mode': signUpMode }">
    <!-- form表单容器 -->
    <div class="forms-container">
      <div class="signin-signup">
        <!-- 登录 -->
        <div class="signin">
          <a-card :title="signUpMode? $t('login.loading') : $t('login.title')"
                  bordered hoverable
                  style="border-radius: 20px 20px 20px 20px;
    background: rgba(250, 250, 250, 0.7);
        box-shadow: 0px 2px 14px 6px rgba(24, 144, 255, 0.2), -11px -4px 9px -16px rgba(24, 144, 255, 0.2);
    background: transparent;"
                  headStyle="text-align: center;font-size: 24px;color: #1890ff;"
                  :loading="signUpMode"
          >
            <a-form
              name="custom-validation"
              class="sign-in-form"
            >
              <a-form-item>
                   <a-input
              size="large"
              type="text"
              autocomplete="on"
              placeholder="账户: admin"
            >
            </a-input>
              </a-form-item>
              <a-form-item>
                     <a-input-password
              size="large"
              autocomplete="on"
              placeholder="密码: admin or ant.design"
            >
            </a-input-password>
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
          <h3>学习是为了有更多的选择,让生活变的更美好!</h3>
          <p>何以解忧,唯有米修</p>
          <button @click="signUpMode = !signUpMode" class="btn transparent">
            注册
          </button>
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
        <img src="@/assets/svg/register.svg" class="image" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { Form, Input, Card } from "ant-design-vue"

export default {
  name: "Login",
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputPassword: Input.Password,
    ACard: Card
  },
  setup() {
    const signUpMode = ref(false);

    return { signUpMode };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/login";
.ant-input,.ant-input-password{
  border: none;
  outline: none;
  border-bottom: 1px solid #1890ff !important;
  box-shadow: none;
  background: transparent;
}
.ant-row {
  display: block;
}
</style>
