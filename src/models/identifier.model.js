const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const identifierSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    identifierId: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
identifierSchema.plugin(toJSON);
identifierSchema.plugin(paginate);

/**
 * @typedef Identifier
 */
const Identifier = mongoose.model('Identifier', identifierSchema);

module.exports = Identifier;
