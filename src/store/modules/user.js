/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import { getUserInfo, login, logout } from "@/api/auth";
import { resetRouter } from "@/router/index";
import { getToken, removeToken, setToken } from "@/utils/token";
import { title, tokenName } from "@/config";
import { message, notification } from "ant-design-vue";

const state = () => ({
  token: getToken(),
  id: 0,
  uuid: "",
  nickname: "",
  username: "",
  avatar: "",
});
const getters = {
  token: (state) => state.token,
  nickname: (state) => state.nickname,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  uuid: (state) => state.uuid,
  id: (state) => state.id,
};
const mutations = {
  /**
   * @description 设置token
   * @param {*} state
   * @param {*} token
   */
  SetToken(state, token) {
    state.token = token;
    setToken(token);
  },
  /**
   * @description 设置昵称
   * @param {*} state
   * @param {*} nickname
   */
  setNickname(state, nickname) {
    state.nickname = nickname;
  },
  /**
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username;
  },
  /**
   * @description 设置头像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state, avatar) {
    state.avatar = avatar;
  },
  /**
   * @description 设置唯一用户ID
   * @param {*} state
   * @param {*} uuid
   */
  setUuid(state, uuid) {
    state.uuid = uuid;
  },
  /**
   * @description 设置普通用户ID
   * @param {*} state
   * @param {*} id
   */
  setId(state, id) {
    state.id = id;
  },
  /**
   * @description 重置登录信息
   * @param {*} state
   */
  LoginOut(state) {
    state.id = 0;
    state.uuid = "";
    state.token = "";
    state.avatar = "";
    state.username = "";
    state.nickname = "";
    sessionStorage.clear();
    window.location.reload();
  },
};
const actions = {
  /**
   * @description 登录拦截放行时，设置虚拟角色
   * @param {*} { commit, dispatch }
   */
  setVirtualRoles({ commit, dispatch }) {
    dispatch("acl/setFull", true, { root: true });
    commit(
      "setAvatar",
      "https://i.gtimg.cn/club/item/face/img/2/15922_100.gif"
    );
    commit("setUsername", "admin(未开启登录拦截)");
  },
  /**
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    const result = await login(userInfo);
    // console.log("login", result["data"]);
    if (result["data"] && result["data"][tokenName]) {
      commit("SetToken", result["data"][tokenName]);
      const hour = new Date().getHours();
      const thisTime =
        hour < 8
          ? "早上好"
          : hour <= 11
          ? "上午好"
          : hour <= 13
          ? "中午好"
          : hour < 18
          ? "下午好"
          : "晚上好";
      notification.open({
        message: `欢迎登录${title}`,
        description: `${thisTime}！`,
      });
    }
    return result;
  },
  /**
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch }
   * @returns
   */
  async getUserInfo({ commit, dispatch }) {
    const { data } = await getUserInfo();
    if (!data) {
      message.error(`验证失败，请重新登录...`);
      return false;
    }

    const { id, uuid, nickname, username, avatar, roles, ability } = data;
    if (id) commit("setId", id);
    if (uuid) commit("setUuid", uuid);
    if (nickname) commit("setNickname", nickname);
    if (username) commit("setUsername", username);
    if (avatar) commit("setAvatar", avatar);
    if (ability && ability.length > 0) {
      dispatch("acl/setAbility", ability, { root: true });
    }
    if (roles && Array.isArray(roles)) {
      dispatch("acl/setRole", roles, { root: true });
    } else {
      message.error("用户信息接口异常");
    }
  },

  /**
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ commit, dispatch }) {
    const res = await logout(state.token);
    if (res.code == process.env.VUE_APP_SUCCESS_CODE) {
      await dispatch("resetAll");
      commit("LoginOut");
    }
  },
  /**
   * @description 重置token、roles、ability、router等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ dispatch }) {
    await dispatch("setToken", "");
    await dispatch("acl/setFull", false, { root: true });
    await dispatch("acl/setRole", [], { root: true });
    await dispatch("acl/setAbility", [], { root: true });
    await resetRouter();
    removeToken();
  },
  /**
   * @description 设置token
   */
  setToken({ commit }, token) {
    commit("setToken", token);
  },
};
export default { state, getters, mutations, actions };
