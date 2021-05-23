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
    // url: "/login",
    url: "/sys/sign_in",
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
        // code: 200,
        code: 0,
        data: {
          user: {
            ID: 1,
            CreatedAt: "2021-03-04T19:13:37+08:00",
            UpdatedAt: "2021-03-04T19:13:37+08:00",
            uuid: "db77d2fe-d799-4565-9380-551e0d4a19b5",
            userName: "admin",
            nickName: "超级管理员",
            headerImg: "http://qmplusimg.henrongyi.top/gva_header.jpg",
            authority: {
              CreatedAt: "2021-03-04T19:13:37+08:00",
              UpdatedAt: "2021-03-04T19:13:37+08:00",
              DeletedAt: null,
              authorityId: "888",
              authorityName: "普通用户",
              parentId: "0",
              dataAuthorityId: null,
              children: null,
              menus: null,
              defaultRouter: "dashboard",
            },
            authorityId: "888",
          },
          accessToken,
          expiresAt: 1615462376000,
        },
        msg: "登录成功",
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
    // url: "/manage/user/info",
    url: "/userInfo",
    type: "post",
    response(config) {
      const { access_token } = config.body;
      const accessToken = access_token;
      let roles = ["admin"];
      let ability = ["READ"];
      let username = "admin";
      if ("admin-accessToken" === accessToken) {
        roles = ["admin"];
        ability = ["READ", "WRITE", "DELETE"];
        username = "admin";
      }
      if ("editor-accessToken" === accessToken) {
        roles = ["editor"];
        ability = ["READ", "WRITE"];
        username = "editor";
      }
      if ("test-accessToken" === accessToken) {
        roles = ["admin", "editor"];
        ability = ["READ"];
        username = "test";
      }
      return {
        code: 200,
        msg: "success",
        data: {
          roles,
          ability,
          username,
          "avatar|1": [
            "https://i.gtimg.cn/club/item/face/img/2/15922_100.gif",
            "https://i.gtimg.cn/club/item/face/img/8/15918_100.gif",
          ],
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
