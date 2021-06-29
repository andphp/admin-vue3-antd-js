import request from "@/utils/request";

export function getDataTable(params) {
  return request({
    url: "/components/table",
    method: "get",
    params,
  });
}

export function getTree(url, params) {
  return request({
    url,
    method: "get",
    params,
  });
}

export function apiAdd(data) {
  return request({
    url: data.url,
    method: "post",
    data: data.data,
  });
}

export function apiEdit(data) {
  return request({
    url: data.url,
    method: "put",
    data: data.data,
  });
}

export function apiDel(data) {
  return request({
    url: data.url,
    method: "delete",
    data: data.data,
  });
}
