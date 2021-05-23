import request from "@/utils/request";

const baseUrl = "manage";

export async function list(params) {
  return request({
    url: baseUrl + "/role/list",
    method: "get",
    params,
  });
}

export async function selectList(params) {
  return request({
    url: baseUrl + "/role/select",
    method: "get",
    params,
  });
}

