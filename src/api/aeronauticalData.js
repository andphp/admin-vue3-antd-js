import request from "@/utils/request";

export function getAirportList(params) {
  return request({
    url: "/sys/aviation/airport/index",
    method: "get",
    params
  });
}

export function addAirport(params) {
  return request({
    url: "/sys/aviation/airport/create",
    method: "post",
    data: params
  });
}
export function editAirport(params) {
  return request({
    url: "/sys/aviation/airport/update",
    method: "post",
    data: params
  });
}
export function delAirport(params) {
  return request({
    url: "/sys/aviation/airport/destroy",
    method: "post",
    data: params
  });
}
