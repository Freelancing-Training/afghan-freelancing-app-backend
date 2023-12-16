const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const offerSchema = mongoose.Schema(
  {
    proposalId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Proposal',
      required: true,
    },
    status: {
      type: String,
      enum: ['accepted', 'rejected', 'pending'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
offerSchema.plugin(toJSON);
offerSchema.plugin(paginate);

/**
 * @typedef Offer
 */
const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
