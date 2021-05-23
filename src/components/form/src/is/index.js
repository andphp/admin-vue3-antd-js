const toString = Object.prototype.toString;

/**
 *  判断值是否未某个类型
 */
export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 *   是否为函数
 */
export function isFunction(val) {
  return is(val, "Function");
}

/**
 *  是否已定义
 */
export const isDef = (val) => {
  return typeof val !== "undefined";
};

export const isUnDef = (val) => {
  return !isDef(val);
};
/**
 *  是否为对象
 */
export const isObject = (val) => {
  return val !== null && is(val, "Object");
};

/**
 *   是否为时间
 */
export function isDate(val) {
  return is(val, "Date");
}

/**
 *   是否为数值
 */
export function isNumber(val) {
  return is(val, "Number");
}
/**
 *   是否为AsyncFunction
 */
export function isAsyncFunction(val) {
  return is(val, "AsyncFunction");
}
/**
 *   是否为promise
 */
export function isPromise(val) {
  return (
    is(val, "Promise") &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  );
}

/**
 *   是否为字符串
 */
export function isString(val) {
  return is(val, "String");
}

/**
 *   是否为boolean类型
 */
export function isBoolean(val) {
  return is(val, "Boolean");
}

/**
 *   是否为数组
 */
export function isArray(val) {
  return val && Array.isArray(val);
}

/**
 *  是否客户端
 */
export const isClient = () => {
  return typeof window !== "undefined";
};

/**
 *  是否为浏览器
 */
export const isWindow = (val) => {
  return typeof window !== "undefined" && is(val, "Window");
};

export const isElement = (val) => {
  return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === "undefined";

// 是否为图片节点
export function isImageDom(o) {
  return o && ["IMAGE", "IMG"].includes(o.tagName);
}
