const { socketService } = require('../services');

const createNewConnection = async (socket) => {
  const { userId } = socket.handshake.auth;

  const previousConnection = await socketService.findPreviousConnection(userId);
  const socketId = socket.id;

  if (previousConnection) {
    await socketService.updateConnection(previousConnection, socketId, 'online');
  } else {
    await socketService.createNewConnection({ userId, socketId });
  }
};

const disconnection = async (socketId) => {
  await socketService.disconnection(socketId);
};

module.exports = {
  disconnection,
  createNewConnection,
};
