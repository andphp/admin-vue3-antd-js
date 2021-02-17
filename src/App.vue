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
import { getLangLocale } from "./language";
import { useStore } from "vuex";
export default {
  components: {
    AConfigProvider: ConfigProvider
  },
  computed: {},
  setup() {
    // UI控件 国际多语言
    const store = useStore();
    const language = reactive({
      locale: computed(() => getLangLocale()),
      theme: computed(() => "theme-" + store.state.settings.themeName)
    });
    return {
      ...toRefs(language)
    };
  }
};
</script>

<style lang="scss"></style>
