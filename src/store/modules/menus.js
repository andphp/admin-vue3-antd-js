import { isJson } from "@/utils/validate";
const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  if (isJson(value)) {
    return JSON.parse(value);
  } else {
    return false;
  }
};
const { menuOpenKeys } = getLocalStorage("admin-vue-antd-js-menu-open-keys");
const { menuPreOpenKeys } = getLocalStorage(
  "admin-vue-antd-js-menu-pre-open-keys"
);
const { selectedTopMeun } = getLocalStorage("admin-vue-antd-js-menu-top-meun");
const state = {
  menuOpenKeys: menuOpenKeys || [],
  selectedTopMeun: selectedTopMeun || [],
  menuPreOpenKeys: menuPreOpenKeys || [],
};
const getters = {
  menuOpenKeys: (state) => state.menuOpenKeys,
  selectedTopMeun: (state) => state.selectedTopMeun,
  menuPreOpenKeys: (state) => state.menuPreOpenKeys,
};

const mutations = {
  toggleSelectedTopMeun(state, topMeun) {
    state.selectedTopMeun = topMeun;
    const obj = {
      selectedTopMeun: Array.isArray(topMeun) ? topMeun : [],
    };
    localStorage.setItem(
      "admin-vue-antd-js-menu-top-meun",
      JSON.stringify(obj)
    );
  },
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
};
const actions = {
  toggleSelectedTopMeun({ commit }, SelectedTopMeun) {
    commit("toggleSelectedTopMeun", SelectedTopMeun);
  },
  toggleMenuOpenKeys({ commit }, openKeys) {
    commit("toggleMenuOpenKeys", openKeys);
  },
  toggleMenuPreOpenKeys({ commit }, openKeys) {
    commit("toggleMenuPreOpenKeys", openKeys);
  },
};

export default { state, getters, mutations, actions };
