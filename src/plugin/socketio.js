import io from "socket.io-client";
export default {
  install: (app) => {
    // const socket = io(connection, options);
    app.config.globalProperties.$socketio = io;
    app.provide("socketio", io);
  },
};
