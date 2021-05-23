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
};
