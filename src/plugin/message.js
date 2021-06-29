import message from "@/utils/message";

const install = (app) => {
  app.provide("message", message);
  app.config.globalProperties.$message = message;
};

export default install;
