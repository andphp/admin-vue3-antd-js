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

import { useStore } from "vuex";
export default {
  components: {
    AConfigProvider: ConfigProvider
  },
  computed: {},
  setup() {
    // UI控件 国际多语言
    const language = reactive({
      locale: ""
    });
    const store = useStore();
    language.locale = computed(() => store.state.lang.locale);

    return {
      ...toRefs(language)
    };
  }
};
</script>

<style lang="less"></style>
