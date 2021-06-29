import moment from "moment";

const install = (app) => {
  app.provide("moment", moment);
};

export default install;
