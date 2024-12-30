// forbid socket requests without user id

const socketMiddleware = (socket, next) => {
  const { userId } = socket.handshake.auth;
  if (!userId) {
    return next(new Error('FORBIDDEN'));
  }
  next();
};

module.exports = {
  socketMiddleware,
};
