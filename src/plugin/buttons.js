import { BUTTONOBJECT } from "@/utils/buttons";
const install = (app) => {
  app.config.globalProperties.$buttons = BUTTONOBJECT;
};

export default install;
