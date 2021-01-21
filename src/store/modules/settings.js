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
  showFullScreen
} = defaultSettings;

const getLocalStorage = key => {
  const value = localStorage.getItem(key);
  if (isJson(value)) {
    return JSON.parse(value);
  } else {
    return false;
  }
};

const theme = getLocalStorage("theme");
const { collapse } = getLocalStorage("collapse");
const { language } = getLocalStorage("language");
const toggleBoolean = key => {
  return typeof theme[key] !== "undefined" ? theme[key] : key;
};

const state = {
  collapse,
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
  showTheme: toggleBoolean(showTheme),
  showNotice: toggleBoolean(showNotice),
  showFullScreen: toggleBoolean(showFullScreen)
};
const getters = {
  collapse: state => state.collapse,
  device: state => state.device,
  logo: state => state.logo,
  title: state => state.title,
  language: state => state.language,
  layout: state => state.layout,
  themeName: state => state.themeName,
  fixedHeader: state => state.fixedHeader,
  showProgressBar: state => state.showProgressBar,
  showTabsBar: state => state.showTabsBar,
  showLanguage: state => state.showLanguage,
  showRefresh: state => state.showRefresh,
  showSearch: state => state.showSearch,
  showTheme: state => state.showTheme,
  showNotice: state => state.showNotice,
  showFullScreen: state => state.showFullScreen
};
const mutations = {
  toggleCollapse(state) {
    state.collapse = !state.collapse;
    localStorage.setItem("collapse", `{"collapse":${state.collapse}}`);
  },
  toggleDevice(state, device) {
    state.device = device;
  },
  changeLanguage(state, language) {
    localStorage.setItem("language", `{"language":"${language}"}`);
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
  }
};
const actions = {
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
  }
};
export default { state, getters, mutations, actions };
