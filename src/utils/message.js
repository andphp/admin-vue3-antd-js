import { Modal, message } from "ant-design-vue";
export default {
  success: (str) => {
    message.success(str);
  },
  error: (str) => {
    message.error(str);
  },
  info: (str) => {
    message.info(str);
  },
  warning: (str) => {
    message.warning(str);
  },
  warn: (str) => {
    message.warn(str);
  },
  loading: (str) => {
    message.loading(str);
  },
  confirm: (option) => {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: (option && (option.title || option)) || "确认删除？",
        content: (option && option.content) || "",
        onOk() {
          resolve();
        },
        onCancel() {
          reject();
        },
      });
    });
  },
  alert: (option) => {
    return new Promise((resolve, reject) => {
      if (option.type) {
        switch (option.type) {
        case "success":
          Modal.success({
            title: (option && (option.title || option)) || "",
            content: (option && option.content) || "",
            onOk() {
              resolve();
            },
            onCancel() {
              reject();
            },
          });
          break;
        case "warning":
          Modal.warning({
            title: (option && (option.title || option)) || "",
            content: (option && option.content) || "",
            onOk() {
              resolve();
            },
            onCancel() {
              reject();
            },
          });
          break;
        case "error":
          Modal.error({
            title: (option && (option.title || option)) || "",
            content: (option && option.content) || "",
            onOk() {
              resolve();
            },
            onCancel() {
              reject();
            },
          });
          break;
        default:
          Modal.info({
            title: (option && (option.title || option)) || "",
            content: (option && option.content) || "",
            onOk() {
              resolve();
            },
            onCancel() {
              reject();
            },
          });
          break;
        }
      } else {
        Modal.info({
          title: (option && (option.title || option)) || "",
          content: (option && option.content) || "",
          onOk() {
            resolve();
          },
          onCancel() {
            reject();
          },
        });
      }
    });
  },
};
