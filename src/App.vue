<template>
  <a-config-provider :locale="locale">
    <div id="app" :class="theme">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { getLangLocale, setLang } from "./language";
import { useStore } from "vuex";
export default {
  components: {
    AConfigProvider: ConfigProvider,
  },
  setup() {
    // UI控件 国际多语言
    const store = useStore();
    /* setLang("zh_CN");
       console.log("store.state.settings.language", store.state.settings.language); */
    setLang(store.state.settings.language);
    const language = reactive({
      locale: computed(() => getLangLocale()),
      theme: computed(() => "theme-" + store.state.settings.themeName),
    });
    return {
      ...toRefs(language),
    };
  },
  computed: {},
};
</script>

<style lang="less">
@import "@/styles/main.less";
</style>
