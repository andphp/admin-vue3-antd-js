import request from "@/utils/request";

export function getRouterList(params) {
  return request({
    // url: "/menu/navigate",
    url: "/manage/menu/render_list",
    method: "get",
    params
  });
}
