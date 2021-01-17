// 语言
import { ENUM_LANG } from "@/constants/common";
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
  locale: ENUM_LANG.zhCN, // 设置默认语言
  messages: {
    [ENUM_LANG.enUS]: {
      ...customEnUS,
      ...enUS
    },
    [ENUM_LANG.zhCN]: {
      ...customZhCN,
      ...zhCN
    },
    [ENUM_LANG.zhTW]: {
      ...customZhTW,
      ...zhTW
    }
  },
  silentTranslationWarn: true
});
// const store = useStore();
// 切换语言
export const setLang = lang => {
  // 设置组件国际化
  switch (lang) {
    case ENUM_LANG.enUS:
      console.log("--d", enUS.locale);
      moment.locale(enUS.locale);
      break;
    case ENUM_LANG.zhTW:
      moment.locale(zhTW.locale);
      break;
    default:
      console.log("--", zhCN.locale);
      moment.locale(zhCN.locale);
  }
  // 当前语言

  console.log(store);
  store
    .dispatch("lang/setLanguage", lang)
    .then(res => {
      console.log("od===", res);
    })
    .catch(err => alert(err.message));
  i18n.global.locale = lang;
  console.log(lang, "antd组件设置成功");
};

// 获取当前语言
export const getLang = () => {
  return i18n && i18n.global.locale;
};
