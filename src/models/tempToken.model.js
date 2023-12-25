const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const tempTokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: Number,
      required: true,
    },
    expiresIn: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tempTokenSchema.plugin(toJSON);

/**
 * @typedef TempToken
 */
const TempToken = mongoose.model('TempToken', tempTokenSchema);

module.exports = TempToken;
