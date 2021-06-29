<!-- 全局主题设置 -->
<template>
  <a-drawer
    :title="themeTitle"
    placement="right"
    :closable="true"
    :visible="visible"
    :width="520"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form layout="horizontal">
      <a-form-item label="布局">
        <a-radio-group v-model:value="layout" @change="changeLayout">
          <a-radio-button value="Horizontal">横向</a-radio-button>
          <a-radio-button value="Vertical">纵向</a-radio-button>
          <a-radio-button value="Comprehensive">综合</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="主题">
        <a-input placeholder="input placeholder" />
      </a-form-item>
      <a-form-item label="国际化">
        <a-input placeholder="input placeholder" />
      </a-form-item>
    </a-form>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button style="margin-right: 8px" @click="resetTheme"
        >恢复默认</a-button
      >
      <a-button type="primary" @click="saveTheme">保 存</a-button>
    </div>
  </a-drawer>
</template>

<script>
import { Drawer, Form, Radio, Input, Button } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import store from "@/store";
import {
  reactive,
  computed,
  toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
export default {
  name: "theme-drawer",
  components: {
    ADrawer: Drawer,
    AForm: Form,
    AFormItem: Form.Item,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button,
    AInput: Input,
    AButton: Button,
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后
    const reactiveData = reactive({
      visible: computed(() => store.state.settings.showTheme),
      onClose: () => {
        store.dispatch("settings/handleShowTheme", false);
      },
      themeTitle: t("主题配置标题"),
      layout: computed({
        set: (value) => {
          store.dispatch("settings/changeLayout", value);
        },
        get: () => {
          return store.state.settings.layout;
        },
      }),
    });
    // 这里存放返回数据

    function changeLayout() {
      console.log("layoutss", store.state.settings.layout);
    }

    function resetTheme() {
      store.dispatch("settings/resetTheme");
    }
    function saveTheme() {
      store.dispatch("settings/saveTheme");
    }
    return {
      ...toRefs(reactiveData),
      changeLayout,
      resetTheme,
      saveTheme,
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
