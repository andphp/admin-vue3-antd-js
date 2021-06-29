import request from "@/utils/request";

const baseUrl = "manage";

export async function list(params) {
  return request({
    url: baseUrl + "/api/list",
    method: "get",
    params,
  });
}
