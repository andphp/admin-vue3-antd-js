/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import { getUserInfo, login, logout } from "@/api/auth";
import router from "@/router/index";
import { getToken, removeToken, setToken } from "@/utils/token";
import { title, tokenName } from "@/config";
import { message, notification } from "ant-design-vue";

const state = () => ({
  token: getToken(),
  userInfo: {
    id: "",
    uuid: "",
    nickname: "",
    avatar: "",
    authority: ""
  }
});
const getters = {
  token: state => state.token,
  username: state => state.userInfo.nickname,
  avatar: state => state.userInfo.avatar,
  uuid: state => state.userInfo.uuid,
  uid: state => state.userInfo.id
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
   * @description 设置用户信息
   * @param {*} state
   * @param {*} username
   */
  SetUserInfo(state, userinfo) {
    state.userinfo = userinfo;
  },
  LoginOut(state) {
    state.userInfo = {};
    state.token = "";
    sessionStorage.clear();
    router.push({ name: "login", replace: true });
    window.location.reload();
  },
  ResetUserInfo(state, userInfo = {}) {
    state.userInfo = { ...state.userInfo, ...userInfo };
  }
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
        description: `${thisTime}！`
      });
    }
    return result;
  },
  /**
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, state }) {
    const { data } = await getUserInfo(state.token);
    if (!data) {
      message.error(`验证失败，请重新登录...`);
      return false;
    }
    // 赋值
    let user = {
      id: data["id"],
      uuid: data["uuid"],
      nickName: data["nickname"],
      headerImg: data["avatar"],
      authority: data["roleId"]
    };
    commit("SetUserInfo", user);
    // let { username, avatar, roles, ability } = data;
    // if (username && roles && Array.isArray(roles)) {
    //   dispatch("acl/setRole", roles, { root: true });
    //   if (ability && ability.length > 0)
    //     dispatch("acl/setAbility", ability, { root: true });
    //   commit("setUsername", username);
    //   commit("setAvatar", avatar);
    // } else {
    //   message.error("用户信息接口异常");
    // }
  },

  /**
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ commit, dispatch }) {
    const res = await logout(state.token);
    if (res.code == 200) {
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
    // await dispatch("acl/setFull", false, { root: true });
    // await dispatch("acl/setRole", [], { root: true });
    // await dispatch("acl/setAbility", [], { root: true });
    removeToken();
  },
  /**
   * @description 设置token
   */
  setToken({ commit }, token) {
    commit("setToken", token);
  }
};
export default { state, getters, mutations, actions };
