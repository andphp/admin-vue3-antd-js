// 语言
import { ENUM_LANG } from "@/constants/lang.js";
import { createI18n } from "vue-i18n";
// import { useStore } from "vuex";
import store from "@/store";
import customEnUS from "./en_US";
import customZhCN from "./zh_CN";
import customZhTW from "./zh_TW";

import enUS from "ant-design-vue/lib/locale-provider/en_US";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import zhTW from "ant-design-vue/lib/locale-provider/zh_TW";
import moment from "moment";
import "moment/locale/zh-cn";
import "moment/locale/zh-tw";
import "moment/locale/en-au";

export const i18n = createI18n({
  locale: store.state.settings.language, // 设置默认语言
  messages: {
    [ENUM_LANG.enUS]: {
      ...customEnUS,
      ...enUS,
    },
    [ENUM_LANG.zhCN]: {
      ...customZhCN,
      ...zhCN,
    },
    [ENUM_LANG.zhTW]: {
      ...customZhTW,
      ...zhTW,
    },
  },
  silentTranslationWarn: true,
});
// const store = useStore();
// 切换语言
export const setLang = (lang) => {
  // 设置组件国际化
  switch (lang) {
    case ENUM_LANG.enUS:
      moment.locale(enUS.locale);
      break;
    case ENUM_LANG.zhTW:
      moment.locale(zhTW.locale);
      break;
    default:
      moment.locale(zhCN.locale);
  }
  // 当前语言
  store.dispatch("settings/changeLanguage", lang);
  i18n.global.locale = lang;
  console.log(lang, "antd组件设置成功");
};

// 获取当前语言
export const getLang = () => {
  return i18n && i18n.global.locale;
};

// 获取当前语言antd组件
export const getLangLocale = () => {
  const language = getLang();
  let locale = "";
  switch (language) {
    case ENUM_LANG.enUS:
      locale = enUS;
      break;
    case ENUM_LANG.zhTW:
      locale = zhTW;
      break;
    default:
      locale = zhCN;
  }
  return locale;
};
