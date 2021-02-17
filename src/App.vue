<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { getLangLocale } from "./language";
export default {
  components: {
    AConfigProvider: ConfigProvider
  },
  computed: {},
  setup() {
    // UI控件 国际多语言
    const language = reactive({
      locale: computed(() => getLangLocale())
    });
    return {
      ...toRefs(language)
    };
  }
};
</script>

<style lang="scss"></style>
