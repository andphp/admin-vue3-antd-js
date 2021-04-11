import en_US from "ant-design-vue/lib/locale-provider/en_US";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import zh_TW from "ant-design-vue/lib/locale-provider/zh_TW";
import { ENUM_LANG } from "@/constants/lang.js";

const store = {
  namespaced: true,
  state: () => ({
    locale: zh_CN
  }),
  mutations: {
    setLang(state, selectLang) {
      switch (selectLang) {
        case ENUM_LANG.enUS:
          state.locale = en_US;
          console.log("lang：", ENUM_LANG.enUS);
          break;
        case ENUM_LANG.zhTW:
          state.locale = zh_TW;
          console.log("lang：", ENUM_LANG.zhTW);
          break;
        default:
          state.locale = zh_CN;
          console.log("lang：", ENUM_LANG.zhCN);
      }
    }
  },
  actions: {
    setLanguage({ commit }, locale) {
      commit("setLang", locale);
    }
  }
};

export default store;
