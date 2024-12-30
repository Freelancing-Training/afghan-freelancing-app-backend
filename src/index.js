const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const Socket = require('./utils/socket.io');
const { socketMiddleware } = require('./middlewares/socket');
const { socketController } = require('./controllers');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
  // initialization of socket.io
  Socket.initialize(server);
  // authentication socket requests
  Socket.socket.use((socket, next) => socketMiddleware(socket, next));
  // socket events
  Socket.socket.on('connection', (socket) => {
    const socketId = socket.id;
    socketController.createNewConnection(socket);

    socket.on('disconnect', () => {
      socketController.disconnection(socketId);
    });
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
