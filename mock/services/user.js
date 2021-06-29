const accessTokens = {
  admin: "admin-accessToken",
  caogang: "admin-accessToken",
  editor: "editor-accessToken",
  test: "test-accessToken",
};

module.exports = [
  {
    url: "/publicKey",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "success",
        data: {
          mockServer: true,
          publicKey:
            "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB",
        },
      };
    },
  },
  {
    url: "/login",
    // url: "/sys/sign_in",
    type: "post",
    response(config) {
      const { username } = config.body;
      const accessToken = accessTokens[username];
      /* const { account } = config.body;
         const accessToken = accessTokens[account]; */
      if (!accessToken) {
        return {
          code: 500,
          msg: "帐户或密码不正确",
        };
      }
      return {
        code: 0,
        msg: "successful",
        data: {
          id: 1,
          email: "291846153@qq.com",
          phone: "18202821916",
          username: "admin",
          nickname: "",
          realname: "超级管理员",
          avatar: "",
          lastLoginAt: "2021-06-29 13:36:02",
          status: 1,
          lastIp: "192.168.31.119",
          updatedAt: "2021-06-29 13:36:02",
          roleIds: [1],
          roleName: ["系统管理员"],
          departmentId: 0,
          accessToken,
          expireToken: 86400,
          departmentName: "",
        },
      };
    },
  },
  {
    url: "/socialLogin", // 社交 登录
    type: "post",
    response(config) {
      const { code } = config.body;
      if (!code) {
        return {
          code: 500,
          msg: "未成功获取Token",
        };
      }
      return {
        code: 200,
        msg: "success",
        data: { accessToken: accessTokens.admin },
      };
    },
  },
  {
    url: "/register",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "模拟注册成功",
      };
    },
  },
  {
    url: "/manage/user/info",
    // url: "/userInfo",
    type: "get",
    response(config) {
      const { accessToken } = config.body;
      // const accessToken = "admin-accessToken";
      let roles = ["admin"];
      // let ability = ["READ"];
      let username = "admin";
      if ("admin-accessToken" === accessToken) {
        roles = ["admin"];
        // ability = ["READ", "WRITE", "DELETE"];
        username = "admin";
      }
      if ("editor-accessToken" === accessToken) {
        roles = ["editor"];
        // ability = ["READ", "WRITE"];
        username = "editor";
      }
      if ("test-accessToken" === accessToken) {
        roles = ["admin", "editor"];
        // ability = ["READ"];
        username = "test";
      }
      return {
        code: 0,
        msg: "successful",
        data: {
          jti: "default_60dab23f6c48a4.80314183",
          iat: 1624945215,
          nbf: 1624945215,
          exp: 1625031615,
          id: 1,
          email: "291846153@qq.com",
          phone: "18202821916",
          username,
          nickname: "超级管理员",
          realname: "超级管理员",
          avatar: "https://i.gtimg.cn/club/item/face/img/2/15922_100.gif",
          lastLoginAt: "2021-06-29 13:40:15",
          status: 1,
          lastIp: "192.168.31.119",
          updatedAt: "2021-06-29 13:40:15",
          roleIds: [1],
          roleName: ["系统管理员"],
          departmentId: 0,
          departmentName: "",
          jwtScene: "default",
          token: accessToken,
          roles,
        },
      };
    },
  },
  {
    url: "/logout",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "success",
      };
    },
  },
];
