class Socket {
  static socket = null;

  static initialize = (httpServer) => {
    if (!this.socket) {
      this.socket = require('socket.io')(httpServer);
    }
    return this.socket;
  };
}

module.exports = Socket;
