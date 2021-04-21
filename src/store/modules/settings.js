/**
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */
import defaultSettings from "@/config";
import { isJson } from "@/utils/validate";

const {
  logo,
  title,
  i18n,
  layout,
  themeName,
  fixedHeader,
  showProgressBar,
  showTabsBar,
  showLanguage,
  showRefresh,
  showSearch,
  showTheme,
  showNotice,
  showFullScreen,
} = defaultSettings;

const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  if (isJson(value)) {
    return JSON.parse(value);
  } else {
    return false;
  }
};

const theme = getLocalStorage("admin-vue-antd-js-theme");
const { collapse } = getLocalStorage("admin-vue-antd-js-collapse");
const { language } = getLocalStorage("admin-vue-antd-js-language");
const { menuOpenKeys } = getLocalStorage("admin-vue-antd-js-menu-open-keys");
const { menuPreOpenKeys } = getLocalStorage(
  "admin-vue-antd-js-menu-pre-open-keys"
);
const { showThemeChange } = getLocalStorage("admin-vue-antd-js-show-theme");
const toggleBoolean = (key) => {
  return typeof theme[key] !== "undefined" ? theme[key] : key;
};

const state = {
  collapse,
  menuOpenKeys,
  menuPreOpenKeys,
  device: "desktop",
  logo,
  title,
  language: language || i18n,
  layout: theme.layout || layout,
  themeName: theme.themeName || themeName,
  fixedHeader: theme.fixedHeader || fixedHeader,
  showProgressBar: toggleBoolean(showProgressBar),
  showTabsBar: toggleBoolean(showTabsBar),
  showLanguage: toggleBoolean(showLanguage),
  showRefresh: toggleBoolean(showRefresh),
  showSearch: toggleBoolean(showSearch),
  showTheme: toggleBoolean(showThemeChange) || toggleBoolean(showTheme),
  showNotice: toggleBoolean(showNotice),
  showFullScreen: toggleBoolean(showFullScreen),
};
const getters = {
  collapse: (state) => state.collapse,
  menuOpenKeys: (state) => state.menuOpenKeys,
  menuPreOpenKeys: (state) => state.menuPreOpenKeys,
  device: (state) => state.device,
  logo: (state) => state.logo,
  title: (state) => state.title,
  language: (state) => state.language,
  layout: (state) => state.layout,
  themeName: (state) => state.themeName,
  fixedHeader: (state) => state.fixedHeader,
  showProgressBar: (state) => state.showProgressBar,
  showTabsBar: (state) => state.showTabsBar,
  showLanguage: (state) => state.showLanguage,
  showRefresh: (state) => state.showRefresh,
  showSearch: (state) => state.showSearch,
  showTheme: (state) => state.showTheme,
  showNotice: (state) => state.showNotice,
  showFullScreen: (state) => state.showFullScreen,
};
const mutations = {
  toggleMenuOpenKeys(state, openKeys) {
    state.menuOpenKeys = openKeys;
    const obj = {
      menuOpenKeys: Array.isArray(openKeys) ? openKeys : [],
    };
    localStorage.setItem(
      "admin-vue-antd-js-menu-open-keys",
      JSON.stringify(obj)
    );
  },
  toggleMenuPreOpenKeys(state, preOpenKeys) {
    state.menuPreOpenKeys = preOpenKeys;
    const obj = {
      menuPreOpenKeys: Array.isArray(preOpenKeys) ? preOpenKeys : [],
    };
    localStorage.setItem(
      "admin-vue-antd-js-menu-pre-open-keys",
      JSON.stringify(obj)
    );
  },
  toggleCollapse(state) {
    state.collapse = !state.collapse;
    localStorage.setItem(
      "admin-vue-antd-js-collapse",
      `{"collapse":${state.collapse}}`
    );
  },
  toggleDevice(state, device) {
    state.device = device;
  },
  changeLanguage(state, language) {
    localStorage.setItem(
      "admin-vue-antd-js-language",
      `{"language":"${language}"}`
    );
    state.language = language;
  },
  changeLayout(state, layout) {
    state.layout = layout;
  },
  changeFixedHeader(state, fixedHeader) {
    state.fixedHeader = fixedHeader;
  },
  handleShowProgressBar(state, showProgressBar) {
    state.showProgressBar = showProgressBar;
  },
  handleShowTabsBar(state, showTabsBar) {
    state.showTabsBar = showTabsBar;
  },
  handleShowLanguage(state, showLanguage) {
    state.showLanguage = showLanguage;
  },
  handleShowRefresh(state, showRefresh) {
    state.showRefresh = showRefresh;
  },
  handleShowSearch(state, showSearch) {
    state.showSearch = showSearch;
  },
  handleShowTheme(state, showTheme) {
    state.showTheme = showTheme;
  },
  handleShowNotice(state, showNotice) {
    state.showNotice = showNotice;
  },
  handleShowFullScreen(state, showFullScreen) {
    state.showFullScreen = showFullScreen;
  },
  openSideBar(state) {
    state.collapse = false;
  },
  foldSideBar(state) {
    state.collapse = true;
  },
  saveTheme(state) {
    const obj = {
      layout: state.layout,
    };
    localStorage.setItem("admin-vue-antd-js-theme", JSON.stringify(obj));
  },
  reseTheme() {
    const obj = {};
    localStorage.setItem("admin-vue-antd-js-theme", JSON.stringify(obj));
  },
};
const actions = {
  toggleMenuOpenKeys({ commit }, openKeys) {
    commit("toggleMenuOpenKeys", openKeys);
  },
  toggleMenuPreOpenKeys({ commit }, openKeys) {
    commit("toggleMenuPreOpenKeys", openKeys);
  },
  toggleCollapse({ commit }) {
    commit("toggleCollapse");
  },
  toggleDevice({ commit }, device) {
    commit("toggleDevice", device);
  },
  changeLanguage: ({ commit }, language) => {
    commit("changeLanguage", language);
  },
  changeLayout({ commit }, layout) {
    commit("changeLayout", layout);
  },
  changeFixedHeader({ commit }, fixedHeader) {
    commit("changeFixedHeader", fixedHeader);
  },
  handleShowProgressBar: ({ commit }, showProgressBar) => {
    commit("handleShowProgressBar", showProgressBar);
  },
  handleShowTabsBar({ commit }, showTabsBar) {
    commit("handleShowTabsBar", showTabsBar);
  },
  handleShowLanguage: ({ commit }, showLanguage) => {
    commit("handleShowLanguage", showLanguage);
  },
  handleShowRefresh: ({ commit }, showRefresh) => {
    commit("handleShowRefresh", showRefresh);
  },
  handleShowSearch: ({ commit }, showSearch) => {
    commit("handleShowSearch", showSearch);
  },
  handleShowTheme: ({ commit }, showTheme) => {
    commit("handleShowTheme", showTheme);
  },
  handleShowNotice: ({ commit }, showNotice) => {
    commit("handleShowNotice", showNotice);
  },
  handleShowFullScreen: ({ commit }, showFullScreen) => {
    commit("handleShowFullScreen", showFullScreen);
  },
  openSideBar({ commit }) {
    commit("openSideBar");
  },
  foldSideBar({ commit }) {
    commit("foldSideBar");
  },
  saveTheme({ commit }) {
    commit("saveTheme");
  },
  resetTheme({ commit }) {
    commit("resetTheme");
  },
};
export default { state, getters, mutations, actions };
