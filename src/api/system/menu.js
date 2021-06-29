import request from "@/utils/request";

const baseUrl = "manage";

export async function list(params) {
  return request({
    url: baseUrl + "/menu/list",
    method: "get",
    params,
  });
}

export async function apiList(params) {
  return request({
    url: baseUrl + "/api/select",
    method: "get",
    params,
  });
}

export async function add(data) {
  return request({
    url: baseUrl + "/menu/create",
    method: "post",
    data,
  });
}

export async function del(data) {
  return request({
    url: baseUrl + "/menu/delete",
    method: "delete",
    data,
  });
}

export async function edit(data) {
  return request({
    url: baseUrl + "/menu/update",
    method: "put",
    data,
  });
}
