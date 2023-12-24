const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const clientSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    budget: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
clientSchema.plugin(toJSON);
clientSchema.plugin(paginate);

/**
 * @typedef Client
 */
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
