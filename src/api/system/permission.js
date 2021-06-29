import request from "@/utils/request";

const baseUrl = "manage";

export async function roleList(params) {
  return request({
    url: baseUrl + "/permisson/role_list",
    method: "get",
    params,
  });
}

export async function roleAuth(data) {
  return request({
    url: baseUrl + "/permisson/role_auth",
    method: "post",
    data,
  });
}


export async function depList(params) {
  return request({
    url: baseUrl + "/permisson/department_list",
    method: "get",
    params,
  });
}

export async function depAuth(data) {
  return request({
    url: baseUrl + "/permisson/department_auth",
    method: "post",
    data,
  });
}
