import request from "@/utils/request";

const baseUrl = "/sys";

export async function login(data) {
  return request({
    url: baseUrl + "/sign_in",
    method: "post",
    data
  });
}

export async function socialLogin(data) {
  return request({
    url: "/socialLogin",
    method: "post",
    data
  });
}

export function getUserInfo() {
  //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return request({
    url: baseUrl + "/user/info",
    method: "post"
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post"
  });
}

export function register() {
  return request({
    url: "/register",
    method: "post"
  });
}
