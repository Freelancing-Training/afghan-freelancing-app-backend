const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const socketSchema = mongoose.Schema(
  {
    socketId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['online', 'offline'],
      default: 'online',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
socketSchema.plugin(toJSON);
socketSchema.plugin(paginate);

/**
 * @typedef SocketModel
 */
const SocketModel = mongoose.model('SocketModel', socketSchema);

module.exports = SocketModel;
