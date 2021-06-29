import request from "@/utils/request";

const baseUrl = "manage";

export async function list(params) {
  return request({
    url: baseUrl + "/user/list",
    method: "get",
    params,
  });
}

export async function selectList(params) {
  return request({
    url: baseUrl + "/department/select",
    method: "get",
    params,
  });
}

export async function roleSelectList(params) {
  return request({
    url: baseUrl + "/role/select",
    method: "get",
    params,
  });
}


export async function setRole(data) {
  return request({
    url: baseUrl + "/user/setting_role",
    method: "post",
    data,
  });
}

export async function disable(data){
  return request({
    url: baseUrl + "/user/disable",
    method: "post",
    data,
  });
}
